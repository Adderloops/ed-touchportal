#!/usr/bin/env python3
"""Build docs/img/*.jpg from cleaned tablet screenshots (2560x1380 page area).

    python tools/make_screenshots.py <folder with clean/*.png>

Also writes numbered versions (docs/img/keys-<tab>.jpg) for the four pages
whose buttons send keys; numbers follow tools/keybind_map.py order.
"""
import json
import os
import sys

from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, os.path.dirname(__file__))
from keybind_map import BUTTONS, PAGE_TAB  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'docs', 'img')
NAMES = {  # clean file -> (published name, page file)
    'vuelo': ('flight', 'ED - Vuelo.tml'), 'navegacion': ('nav', 'ED - Navegación.tml'),
    'combate': ('combat', 'ED - Combate.tml'), 'exploracion': ('explore', 'ED - Exploración.tml'),
    'comercio': ('trade', 'ED - Comercio.tml'), 'powerplay': ('power', 'ED - Powerplay.tml'),
    'cmdr': ('cmdr', 'ED - CMDR.tml'), 'camara': ('camera', 'ED - Cámara.tml'),
    'apie': ('onfoot', 'ED - A Pie.tml'), 'carrier': ('carrier', 'ED - Carrier y Squadron.tml'),
    'utilidades': ('utils', 'ED - Utilidades.tml'), 'srv': ('srv', 'ED - SRV.tml'),
    'loadout': ('loadout', 'ED - Loadout.tml'),
}
BADGE = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 48)
BADGE2 = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 38)


def button_numbers(page):
    """Ordered [(n, row, col)] for key-sending buttons of a page (table order)."""
    return [(i + 1, r, c) for i, ((p, r, c), _) in enumerate([(k, v) for k, v in BUTTONS.items() if k[0] == page])]


def main(src):
    os.makedirs(OUT, exist_ok=True)
    for clean, (name, page) in NAMES.items():
        im = Image.open(os.path.join(src, f'{clean}.png')).convert('RGB')
        im.resize((1280, 690), Image.LANCZOS).save(os.path.join(OUT, f'{name}.jpg'), quality=84, optimize=True)
        if page in PAGE_TAB:
            d = json.load(open(os.path.join(ROOT, 'pages', 'pages', page), encoding='utf-8'))
            rh, cw = im.height / d['KEY_ROWS'], im.width / d['KEY_COLUMNS']
            k = im.copy()
            dr = ImageDraw.Draw(k)
            for n, r, c in button_numbers(page):
                b = d['BUTTONS'][r][c]
                x0, y0 = c * cw, r * rh
                x1, y1 = (c + b.get('COLS', 1)) * cw, (r + b.get('ROWS', 1)) * rh
                dr.rectangle((x0 + 3, y0 + 3, x1 - 3, y1 - 3), outline=(255, 214, 0), width=5)
                cx, cy, rad = x0 + 46, y0 + 46, 38
                dr.ellipse((cx - rad, cy - rad, cx + rad, cy + rad), fill=(255, 214, 0), outline=(0, 0, 0), width=3)
                t = str(n)
                font = BADGE if n < 10 else BADGE2
                bb = dr.textbbox((0, 0), t, font=font)
                dr.text((cx - (bb[2] + bb[0]) / 2, cy - (bb[3] + bb[1]) / 2), t, font=font, fill=(0, 0, 0))
            k.resize((1600, 862), Image.LANCZOS).save(os.path.join(OUT, f'keys-{name}.jpg'), quality=86, optimize=True)
    print('written to', OUT)


if __name__ == '__main__':
    main(sys.argv[1])
