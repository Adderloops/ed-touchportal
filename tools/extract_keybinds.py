#!/usr/bin/env python3
"""Read every key-sending button from pages/pages/*.tml and write docs/keybinds.csv.

    python tools/extract_keybinds.py [path/to/your.binds]

With a .binds file it also reports, for each button, whether that preset
binds the same keys to the expected Elite Dangerous action.
"""
import csv
import json
import os
import sys
import xml.etree.ElementTree as ET

sys.path.insert(0, os.path.dirname(__file__))
from keybind_map import BUTTONS, ED_ACTIONS, PAGE_TAB  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = os.path.join(ROOT, 'pages', 'pages')

# Touch Portal legacy KEY_PRESS_ACTION codes (Java KeyEvent) -> key name
LEGACY = {17: 'Ctrl', 32: 'Space', 33: 'Page Up', 34: 'Page Down', 47: '/', 68: 'D', 72: 'H', 83: 'S',
          **{96 + i: f'Numpad {i}' for i in range(10)}}
# Touch Portal key name -> Elite Dangerous key name
TP_TO_ED = {'Ctrl': 'Key_LeftControl', 'Left Ctrl': 'Key_LeftControl', 'Right Ctrl': 'Key_RightControl',
            'Space': 'Key_Space', 'Page Up': 'Key_PageUp', 'Page Down': 'Key_PageDown', 'Enter': 'Key_Enter',
            '/': 'Key_Slash', 'ñ': 'Key_SemiColon'}
ED_PRETTY = {'Key_LeftControl': 'Left Ctrl', 'Key_RightControl': 'Right Ctrl', 'Key_PageUp': 'Page Up',
             'Key_PageDown': 'Page Down', 'Key_SemiColon': ';', 'Key_Slash': '/', 'Key_Space': 'Space',
             'Key_Enter': 'Enter', 'Key_Apostrophe': "'"}


def tp_key_name(code):
    if isinstance(code, int):
        return LEGACY[code]
    return code.split('|')[0]


def to_ed(name):
    if name in TP_TO_ED:
        return TP_TO_ED[name]
    if name.startswith('Numpad '):
        return 'Key_Numpad_' + name.split()[1]
    return 'Key_' + name.upper()


def pretty_ed(k):
    if k in ED_PRETTY:
        return ED_PRETTY[k]
    if k.startswith('Key_Numpad_'):
        return 'Numpad ' + k.rsplit('_', 1)[1]
    return k.replace('Key_', '')


def combo_text(names):
    out = []
    for n in names:
        if n == 'Ctrl':
            n = 'Left Ctrl'
        if n == 'ñ':
            n = 'key right of L (Ñ on Spanish, ; on US keyboards)'
        out.append(n)
    return ' + '.join(out)


def read_binds(path):
    root = ET.parse(path).getroot()
    binds = {}
    for el in root:
        for slot in ('Primary', 'Secondary', 'Binding'):
            s = el.find(slot)
            if s is not None and s.get('Device') == 'Keyboard' and s.get('Key'):
                mods = sorted(m.get('Key') for m in s.findall('Modifier'))
                binds.setdefault(el.tag, []).append(tuple(mods + [s.get('Key')]))
    return binds


def extract():
    rows = []
    seen = set()
    for (page, r, c), (label, actions, note) in BUTTONS.items():
        d = json.load(open(os.path.join(PAGES, page), encoding='utf-8'))
        btn = d['BUTTONS'][r][c]
        presses = [a for a in btn['A'] if 'KEY_PRESS' in a['KEY_TYPE']]
        combos = [[tp_key_name(k) for k in a['KEY_KEYCODES']] for a in presses]
        seen.add((page, r, c))
        # 'macro6' = one key inside a REPEAT_AMOUNT_ACTION (pressed 6 times)
        assert len(combos) == len(actions), (page, r, c, combos, actions)
        for step, (combo, act) in enumerate(zip(combos, actions), 1):
            sec, menu = ED_ACTIONS[act]
            rows.append({'tab': PAGE_TAB[page], 'page': page[:-4], 'button': label, 'step': step if len(actions) > 1 else '',
                         'keys': combo_text(combo), 'ed_keys': tuple(sorted(to_ed(k) for k in combo[:-1])) + (to_ed(combo[-1]),),
                         'action': act, 'section': sec, 'menu': menu, 'note': note})
    # every key-sending button in the pages must be documented
    for f in os.listdir(PAGES):
        d = json.load(open(os.path.join(PAGES, f), encoding='utf-8'))
        for r, row in enumerate(d['BUTTONS']):
            for c, b in enumerate(row):
                if b and any('KEY_PRESS' in a.get('KEY_TYPE', '') for a in b.get('A', [])):
                    assert (f, r, c) in seen, f'undocumented key button {f} {r},{c}'
    return rows


def main():
    rows = extract()
    out = os.path.join(ROOT, 'docs', 'keybinds.csv')
    with open(out, 'w', newline='', encoding='utf-8') as fh:
        w = csv.writer(fh)
        w.writerow(['Tab', 'Button', 'Step', 'Keys sent by Touch Portal', 'Elite Dangerous action (internal name)',
                    'Controls menu section', 'Controls menu option'])
        for x in rows:
            w.writerow([x['tab'], x['button'], x['step'], x['keys'], x['action'], x['section'], x['menu']])
    print(f'{len(rows)} rows -> {out}')
    if len(sys.argv) > 1:
        binds = read_binds(sys.argv[1])
        for x in rows:
            got = binds.get(x['action'], [])
            ok = x['ed_keys'] in [tuple(sorted(b[:-1])) + (b[-1],) for b in got]
            have = ', '.join(' + '.join(pretty_ed(k) for k in b) for b in got) or '(no keyboard bind)'
            print(f"{'OK ' if ok else 'XX '} {x['tab']:7} {x['button']:22} sends {x['keys']:22} -> {x['action']:26} preset has: {have}")


if __name__ == '__main__':
    main()
