import os
import json
import mimetypes
import boto3
from botocore.exceptions import ClientError

# Configuration
AWS_REGION = "ap-south-1"
BUCKET_NAME = "aabha-candles-713881796636"
LOCAL_DIR = r"c:\Users\Ritushree Dutta\Desktop\AABHA"

# Initialize Boto3 clients
s3 = boto3.client("s3", region_name=AWS_REGION)
cloudfront = boto3.client("cloudfront")

print(f"--- 1. Creating S3 Bucket: {BUCKET_NAME} in {AWS_REGION} ---")
try:
    if AWS_REGION == "us-east-1":
        s3.create_bucket(Bucket=BUCKET_NAME)
    else:
        s3.create_bucket(
            Bucket=BUCKET_NAME,
            CreateBucketConfiguration={"LocationConstraint": AWS_REGION}
        )
    print(f"Bucket '{BUCKET_NAME}' created successfully.")
except ClientError as e:
    code = e.response["Error"]["Code"]
    if code in ["BucketAlreadyOwnedByYou", "BucketAlreadyExists"]:
        print(f"Bucket '{BUCKET_NAME}' already exists and is ready to use.")
    else:
        print(f"Error creating bucket: {e}")
        raise e

# Remove Public Access Block
print("\n--- 2. Configuring S3 Public Access Block ---")
try:
    s3.put_public_access_block(
        Bucket=BUCKET_NAME,
        PublicAccessBlockConfiguration={
            "BlockPublicAcls": False,
            "IgnorePublicAcls": False,
            "BlockPublicPolicy": False,
            "RestrictPublicBuckets": False
        }
    )
    print("Public access block disabled for static website hosting.")
except Exception as e:
    print(f"Notice on public access block: {e}")

# Enable Website Configuration
print("\n--- 3. Enabling Static Website Hosting ---")
try:
    s3.put_bucket_website(
        Bucket=BUCKET_NAME,
        WebsiteConfiguration={
            "IndexDocument": {"Suffix": "index.html"},
            "ErrorDocument": {"Key": "index.html"}
        }
    )
    print("Website configuration enabled.")
except Exception as e:
    print(f"Error enabling website config: {e}")
    raise e

# Apply Public Read Bucket Policy
print("\n--- 4. Applying Public Read Bucket Policy ---")
bucket_policy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": f"arn:aws:s3:::{BUCKET_NAME}/*"
        }
    ]
}
try:
    s3.put_bucket_policy(
        Bucket=BUCKET_NAME,
        Policy=json.dumps(bucket_policy)
    )
    print("Public read policy applied successfully.")
except Exception as e:
    print(f"Error applying bucket policy: {e}")
    raise e

# Upload Website Files
print("\n--- 5. Uploading Website Files to S3 ---")

files_to_upload = [
    ("index.html", "index.html", "text/html; charset=utf-8"),
    ("styles.css", "styles.css", "text/css; charset=utf-8"),
    ("app.js", "app.js", "application/javascript; charset=utf-8"),
]

# Add processed images
processed_dir = os.path.join(LOCAL_DIR, "assets", "processed")
if os.path.exists(processed_dir):
    for f in os.listdir(processed_dir):
        if f.lower().endswith((".webp", ".jpg", ".png", ".svg")):
            local_p = os.path.join(processed_dir, f)
            s3_key = f"assets/processed/{f}"
            content_type = "image/webp" if f.lower().endswith(".webp") else "image/jpeg"
            files_to_upload.append((local_p, s3_key, content_type))

for local_file, s3_key, content_type in files_to_upload:
    full_local = os.path.join(LOCAL_DIR, local_file) if not os.path.isabs(local_file) else local_file
    if os.path.exists(full_local):
        print(f"Uploading {s3_key} ({content_type})...")
        s3.upload_file(
            full_local,
            BUCKET_NAME,
            s3_key,
            ExtraArgs={
                "ContentType": content_type,
                "CacheControl": "max-age=86400" if not s3_key.endswith(".html") else "no-cache"
            }
        )
    else:
        print(f"File not found: {full_local}")

s3_website_url = f"http://{BUCKET_NAME}.s3-website.{AWS_REGION}.amazonaws.com"
print(f"\n[SUCCESS] S3 Direct Website URL: {s3_website_url}")

# Create CloudFront Distribution
print("\n--- 6. Creating Amazon CloudFront Distribution (HTTPS + Free CDN) ---")
cf_origin_domain = f"{BUCKET_NAME}.s3-website.{AWS_REGION}.amazonaws.com"

distribution_config = {
    "CallerReference": f"aabha-{BUCKET_NAME}-v1",
    "Aliases": {"Quantity": 0},
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": f"S3-Website-{BUCKET_NAME}",
                "DomainName": cf_origin_domain,
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only",
                    "OriginSslProtocols": {
                        "Quantity": 1,
                        "Items": ["TLSv1.2"]
                    }
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": f"S3-Website-{BUCKET_NAME}",
        "ForwardedValues": {
            "QueryString": False,
            "Cookies": {"Forward": "none"},
            "Headers": {"Quantity": 0}
        },
        "TrustedSigners": {
            "Enabled": False,
            "Quantity": 0
        },
        "ViewerProtocolPolicy": "redirect-to-https",
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000,
        "Compress": True
    },
    "Comment": "AABHA Candle Studio Global Distribution",
    "Enabled": True,
    "PriceClass": "PriceClass_100"  # Lowest cost: USA, Europe, Asia
}

try:
    # Check if a distribution for this bucket already exists
    existing_dist = None
    dist_list = cloudfront.list_distributions()
    if "DistributionList" in dist_list and "Items" in dist_list["DistributionList"]:
        for d in dist_list["DistributionList"]["Items"]:
            if d.get("Comment") == "AABHA Candle Studio Global Distribution":
                existing_dist = d
                break
    
    if existing_dist:
        cf_domain = existing_dist["DomainName"]
        cf_id = existing_dist["Id"]
        print(f"CloudFront distribution already exists: https://{cf_domain} (ID: {cf_id})")
    else:
        response = cloudfront.create_distribution(DistributionConfig=distribution_config)
        cf_domain = response["Distribution"]["DomainName"]
        cf_id = response["Distribution"]["Id"]
        print(f"CloudFront distribution created successfully!")
        print(f"CloudFront URL: https://{cf_domain} (ID: {cf_id})")

    print("\n=======================================================")
    print("✨ DEPLOYMENT COMPLETE!")
    print(f"1. S3 Website URL:  {s3_website_url}")
    print(f"2. CloudFront HTTPS URL: https://{cf_domain}")
    print("=======================================================")

except Exception as e:
    print(f"CloudFront note: {e}")
    print(f"\nYour S3 website is already live at: {s3_website_url}")
