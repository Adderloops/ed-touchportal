#!/usr/bin/env python3
"""Build the release assets into dist/.

    python tools/package_release.py 0.1.0-beta

Produces:
  dist/ED-TouchPortal-Plugin-v<ver>.tpp   (plugin + node_modules, entry.tp built without audio)
  dist/ED-TouchPortal-Pages-v<ver>.zip    (pages, backgrounds, install.ps1)

Uses the vendored plugin/node_modules.
"""
import json
import os
import subprocess
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PLUGIN = os.path.join(ROOT, 'plugin')
PAGES = os.path.join(ROOT, 'pages')
DIST = os.path.join(ROOT, 'dist')

PLUGIN_EXCLUDE_DIRS = {'test', 'logs', 'tools', '.git'}
PLUGIN_EXCLUDE_SUFFIX = ('.backup', '.log')


def build_entry():
    env = dict(os.environ, ED_TP_AUDIO='0')
    subprocess.run(['node', 'scripts/build-entry.js'], cwd=PLUGIN, env=env, check=True)
    entry = json.load(open(os.path.join(PLUGIN, 'entry.tp'), encoding='utf-8'))
    ids = [c['id'] for c in entry['categories']]
    assert 'ed.audio' not in ids, 'audio category must not ship in this release'
    return entry


def zip_plugin(path):
    if not os.path.isdir(os.path.join(PLUGIN, 'node_modules', 'touchportal-api')):
        sys.exit('plugin/node_modules is missing')
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as z:
        for base, dirs, files in os.walk(PLUGIN):
            rel = os.path.relpath(base, PLUGIN)
            top = rel.split(os.sep)[0]
            if top in PLUGIN_EXCLUDE_DIRS:
                dirs[:] = []
                continue
            for f in sorted(files):
                if '.backup' in f or f.endswith(PLUGIN_EXCLUDE_SUFFIX):
                    continue
                full = os.path.join(base, f)
                arc = os.path.join('ed-touchportal-plugin', os.path.relpath(full, PLUGIN))
                z.write(full, arc.replace(os.sep, '/'))


def zip_pages(path):
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as z:
        for sub in ('pages', 'icons'):
            for f in sorted(os.listdir(os.path.join(PAGES, sub))):
                z.write(os.path.join(PAGES, sub, f), f'{sub}/{f}')
        z.write(os.path.join(ROOT, 'install', 'install.ps1'), 'install.ps1')
        z.write(os.path.join(ROOT, 'README.md'), 'README.md')
        z.write(os.path.join(ROOT, 'THIRD_PARTY_NOTICES.md'), 'THIRD_PARTY_NOTICES.md')
        z.write(os.path.join(ROOT, 'LICENSE'), 'LICENSE')


def main():
    ver = sys.argv[1] if len(sys.argv) > 1 else '0.1.0-beta'
    os.makedirs(DIST, exist_ok=True)
    entry = build_entry()
    tpp = os.path.join(DIST, f'ED-TouchPortal-Plugin-v{ver}.tpp')
    pz = os.path.join(DIST, f'ED-TouchPortal-Pages-v{ver}.zip')
    zip_plugin(tpp)
    zip_pages(pz)
    n_states = sum(len(c['states']) for c in entry['categories'])
    print(f'{tpp}  ({len(entry["categories"])} categories, {n_states} states)')
    print(pz)


if __name__ == '__main__':
    main()
