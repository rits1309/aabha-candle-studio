# 🕯️ AABHA - AWS Deployment & Hosting Guide
## Ultra-Low-Cost (< $1 / Month) Serverless Architecture

This guide explains how to host the **AABHA** handmade candle website on **Amazon Web Services (AWS)** for maximum speed, global delivery, SSL security, and minimal cost (virtually **$0 to under $1.00 / month**).

---

### 0. Live Deployment Details

* **Live CloudFront Website URL (Global HTTPS):** [https://dbsko5bhpx48x.cloudfront.net](https://dbsko5bhpx48x.cloudfront.net)
* **Direct S3 Website Endpoint:** [http://aabha-candles-713881796636.s3-website.ap-south-1.amazonaws.com](http://aabha-candles-713881796636.s3-website.ap-south-1.amazonaws.com)
* **CloudFront Distribution ID:** `E3F792QA2ZWVSG`
* **S3 Bucket Name:** `aabha-candles-713881796636` (Region: `ap-south-1` Mumbai)
* **Connected WhatsApp:** `+91 6290840963`

---

### 1. Architecture Overview

```
[ Customer Browser ]
        │
        ▼ (HTTPS / SSL via AWS Certificate Manager - 100% Free)
[ Amazon CloudFront CDN ] (Global caching, 1 TB free transfer/month)
        │
        ▼ (Origin Access Control - Secure & Private)
[ Amazon S3 Bucket ] (Stores static HTML, CSS, JS, & WebP photos)
```

#### Why this architecture?
* **Zero Server Maintenance:** No EC2 instances, no Node.js servers, no patching.
* **Blazing Fast Global Speed:** CloudFront caches your pages and candle images on edge servers worldwide.
* **Virtually Free:**
  * **AWS S3:** Only charges pennies for storing ~15 MB of optimized images and HTML.
  * **AWS CloudFront:** Includes **1 TB of free data transfer** and **10,000,000 free HTTPS requests** every month under the AWS Free Tier.
  * **AWS Certificate Manager (ACM):** Free automated SSL certificate for your custom domain (`https://yourbrand.com`).
  * **Estimated Monthly Bill:** **$0.00 – $0.50 / month** (well within free tier).

---

### 2. Configuration Before Deployment

#### Step 2.1: Set Your WhatsApp Business Number
Open [app.js](file:///c:/Users/Ritushree%20Dutta/Desktop/AABHA/app.js) and update line 186 with your real WhatsApp Business phone number (including country code without `+` or spaces):

```javascript
// Replace with your real WhatsApp Business phone number (e.g., 919876543210 for India)
let WHATSAPP_NUMBER = '91XXXXXXXXXX';
```

---

### 3. Step-by-Step Deployment (AWS Management Console)

#### Step 3.1: Create Amazon S3 Bucket
1. Log in to your [AWS Management Console](https://console.aws.amazon.com/).
2. Search for **S3** and click **Create bucket**.
3. **Bucket name:** Choose a globally unique name, e.g., `aabha-candle-studio` (or `aabhacollection.com`).
4. **AWS Region:** Select your preferred region (e.g., `ap-south-1` Mumbai).
5. **Block Public Access settings:** Keep *Block all public access* **checked** (CloudFront will access it securely via Origin Access Control).
6. Click **Create bucket**.

#### Step 3.2: Upload Website Files
1. Open your newly created bucket.
2. Click **Upload**.
3. Drag and drop the following files and folders:
   * `index.html`
   * `styles.css`
   * `app.js`
   * `assets/processed/` (Rename or place inside an `assets/processed/` path)
4. *(Note: Do NOT upload `assets/raw_photos` or `scripts` to save S3 storage space).*

#### Step 3.3: Create CloudFront CDN Distribution
1. Search for **CloudFront** in the AWS Console and click **Create distribution**.
2. **Origin domain:** Select your S3 bucket from the dropdown (e.g., `aabha-candle-studio.s3.amazonaws.com`).
3. **Origin access:** Choose **Origin access control settings (recommended)** and click **Create control setting**.
4. **Viewer protocol policy:** Select **Redirect HTTP to HTTPS**.
5. **Allowed HTTP methods:** Select **GET, HEAD**.
6. **Default root object:** Enter `index.html`.
7. Click **Create distribution**.
8. **Copy S3 Bucket Policy:** CloudFront will show a yellow banner with the policy. Click **Copy policy**, go to your S3 Bucket -> **Permissions** -> **Bucket Policy** -> **Edit**, paste it, and save.

#### Step 3.4: Custom Domain & Free SSL (Optional)
1. Go to **AWS Certificate Manager (ACM)** in region `us-east-1` (N. Virginia is required for CloudFront).
2. Request a public certificate for your domain (e.g., `aabhacollection.com` and `*.aabhacollection.com`).
3. Validate domain via DNS CNAME records.
4. In your CloudFront distribution settings:
   * Add **Alternate domain names (CNAMEs)**: `aabhacollection.com`, `www.aabhacollection.com`.
   * Select your ACM SSL Certificate.
   * In your domain DNS manager (GoDaddy, Namecheap, or Route 53), add an `ALIAS` or `CNAME` pointing to your CloudFront distribution domain name (e.g. `d123456abcdef8.cloudfront.net`).

---

### 4. Fast One-Command Deployment (AWS CLI)

If you have the **AWS CLI** configured on your machine, you can deploy and sync in seconds:

```bash
# 1. Sync static assets to S3
aws s3 sync . s3://your-aabha-bucket-name \
  --exclude "assets/raw_photos/*" \
  --exclude "scripts/*" \
  --exclude ".git/*" \
  --exclude "AWS_DEPLOYMENT.md" \
  --delete

# 2. Invalidate CloudFront cache so updates appear instantly
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

---

### 5. Local Previewing

To preview the website locally on your computer:
1. Double-click `index.html` to open in any web browser.
2. Or run a lightweight local server:
   ```powershell
   python -m http.server 3000
   ```
   Then open `http://localhost:3000` in your browser.
