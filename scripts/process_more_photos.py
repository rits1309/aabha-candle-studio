import os
from PIL import Image, ImageEnhance, ImageOps

os.makedirs('assets/processed', exist_ok=True)

more_configs = [
    # Birthday Sunflower with card
    {
        'src': 'PXL_20260826_115659635.jpg',
        'dst': 'birthday_sunflower_gift.webp',
        'box': (100, 150, 2900, 3800),
        'contrast': 1.1,
        'color': 1.05,
        'brightness': 1.05
    },
    # Grand Bouquet close-up
    {
        'src': 'PXL_20260924_110841056.jpg',
        'dst': 'bouquet_detail.webp',
        'box': (200, 200, 2800, 3600),
        'contrast': 1.12,
        'color': 1.05,
        'brightness': 1.03
    },
    # Secret message Bestie candle
    {
        'src': 'IMG-20260924-WA0010.jpg',
        'dst': 'bestie_secret_message.webp',
        'box': (50, 150, 850, 1250),
        'contrast': 1.12,
        'color': 1.08,
        'brightness': 1.04
    },
    # Brand story banner (vase + roses + candle)
    {
        'src': 'PXL_20260819_125844179.PORTRAIT.jpg',
        'dst': 'artisan_story_banner.webp',
        'box': (100, 200, 2900, 3200),
        'contrast': 1.1,
        'color': 1.05,
        'brightness': 1.02
    },
    # Daisy wax melt in hand
    {
        'src': 'PXL_20260730_080247895.jpg',
        'dst': 'petal_daisy_sculpt.webp',
        'box': (800, 100, 2800, 2100),
        'contrast': 1.1,
        'color': 1.05,
        'brightness': 1.05
    }
]

for cfg in more_configs:
    src_p = os.path.join('assets/raw_photos', cfg['src'])
    dst_p = os.path.join('assets/processed', cfg['dst'])
    if not os.path.exists(src_p):
        print(f"Missing: {src_p}")
        continue
    with Image.open(src_p) as im:
        im = ImageOps.exif_transpose(im)
        w, h = im.size
        bx = cfg['box']
        box = (max(0, bx[0]), max(0, bx[1]), min(w, bx[2]), min(h, bx[3]))
        cr = im.crop(box)
        
        cr = ImageEnhance.Brightness(cr).enhance(cfg.get('brightness', 1.0))
        cr = ImageEnhance.Contrast(cr).enhance(cfg.get('contrast', 1.0))
        cr = ImageEnhance.Color(cr).enhance(cfg.get('color', 1.0))
        
        cr.thumbnail((1200, 1500), Image.Resampling.LANCZOS)
        cr.save(dst_p, 'WEBP', quality=88)
        print(f"Processed {cfg['dst']}: {cr.size}, {os.path.getsize(dst_p)//1024} KB")

print("More photos processed successfully!")
