import os
from PIL import Image, ImageEnhance, ImageOps

os.makedirs('assets/processed', exist_ok=True)

configs = [
    {
        'src': 'PXL_20260924_110837190.jpg',
        'dst': 'the_bloom_grandeur.webp',
        'box': (150, 150, 2850, 3500),
        'contrast': 1.1,
        'color': 1.05,
        'brightness': 1.02
    },
    {
        'src': 'PXL_20260904_125140493.jpg',
        'dst': 'blush_blossom_cone.webp',
        'box': (150, 100, 2850, 3700),
        'contrast': 1.12,
        'color': 1.05,
        'brightness': 1.05
    },
    {
        'src': 'PXL_20260819_125927387.PORTRAIT.jpg',
        'dst': 'nirvana_lotus_bowl.webp',
        'box': (50, 200, 2950, 3850),
        'contrast': 1.1,
        'color': 1.05,
        'brightness': 1.02
    },
    {
        'src': 'IMG-20260904-WA0005.jpg',
        'dst': 'oceanic_whisper_gel.webp',
        'box': (80, 240, 1150, 1580),
        'contrast': 1.15,
        'color': 1.1,
        'brightness': 1.05
    },
    {
        'src': 'PXL_20260819_130310102.PORTRAIT.jpg',
        'dst': 'amour_petals_jar.webp',
        'box': (100, 300, 2900, 3800),
        'contrast': 1.1,
        'color': 1.08,
        'brightness': 1.03
    },
    {
        'src': 'PXL_20260801_185551397.jpg',
        'dst': 'soleil_sunflower.webp',
        'box': (500, 100, 2700, 2100),
        'contrast': 1.12,
        'color': 1.08,
        'brightness': 1.05
    },
    {
        'src': 'PXL_20260801_180047930.jpg',
        'dst': 'truffle_elegance.webp',
        'box': (200, 200, 2800, 3600),
        'contrast': 1.12,
        'color': 1.05,
        'brightness': 1.04
    },
    {
        'src': 'PXL_20260827_192726995.jpg',
        'dst': 'ivory_rose_sculpture.webp',
        'box': (1000, 200, 2900, 2100),
        'contrast': 1.15,
        'color': 1.05,
        'brightness': 1.06
    },
    {
        'src': 'PXL_20260821_035822239.jpg',
        'dst': 'aabha_signature_hamper.webp',
        'box': (150, 200, 2850, 3800),
        'contrast': 1.1,
        'color': 1.05,
        'brightness': 1.04
    },
    {
        'src': 'PXL_20260826_132552472.jpg',
        'dst': 'twilight_radiance_glow.webp',
        'box': (50, 400, 2950, 3900),
        'contrast': 1.18,
        'color': 1.1,
        'brightness': 1.1
    }
]

for cfg in configs:
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

print("All done!")
