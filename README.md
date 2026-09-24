# ED Touch Portal

**v0.1.0-beta** · A Touch Portal plugin and page set for **Elite Dangerous**.

It turns a tablet into a live cockpit panel that works alongside your HOTAS, gamepad and keyboard. The plugin reads the game's Journal and `Status.json` in real time, so the pages show your ship's state, location, cargo, ranks, loadout and more, and light up as things change in game.

> **Beta:** this is the first public release. Expect rough edges and please report anything odd in [Issues](../../issues).

---

## What's included

| Download | What it is |
|---|---|
| `ED-TouchPortal-Plugin-v0.1.0-beta.tpp` | The Touch Portal plugin (Node.js). Reads the game and exposes **261 states, 125 events and 8 actions** in 13 categories. |
| `ED-TouchPortal-Pages-v0.1.0-beta.zip` | 14 ready-made pages with HUD-style backgrounds, plus an install script. |

### The pages

A 12 × 9 grid with 2560 × 1600 artwork, designed for a 16:10 tablet in landscape. Every page shares a 12-tab navigation bar.

| Tab | Page | What it shows / does |
|---|---|---|
| FLIGHT | ED - Vuelo | 17 live status flags, 6 system toggles (landing gear, lights, night vision…), flight actions, and the **LOADOUT ›** subpage |
| NAV | ED - Navegación | Current system, body, security, allegiance, economy, route and jumps; Inara / EDSM / copy-system buttons, and the **STATION ›** subpage |
| COMBAT | ED - Combate | Under attack, interdictions, target, bounties, deaths, fighter status |
| EXPLORE | ED - Exploración | FSS body count, scans, codex, mapping, data sold |
| TRADE | ED - Comercio | Last trades, session profit, mining, live cargo hold, and a Community Goal trade calculator link |
| POWER | ED - Powerplay | Power, rank, merits and merits to the next rank |
| CMDR | ED - CMDR | Commander, ranks, reputation, ship and fuel capacity |
| CAMERA | ED - Cámara | Free camera and photo mode controls |
| ON FOOT | ED - A Pie | Odyssey on-foot flags, suit, environment, organic scans |
| CARRIER | ED - Carrier y Squadron | Fleet Carrier and Squadron info |
| UTILS | ED - Utilidades | Plugin status, session tools (reset, reload Journal, export stats), and launchers for companion apps |
| SRV | ED - SRV | SRV status, cargo, and recall/dismiss ship |
| *(subpage)* | ED - Loadout | Full ship loadout in 4 columns (core, optional, hardpoints, utility), with engineering grades |
| *(subpage)* | ED - Estación | Last engineer, engineer rank, last modification, and Community Goal progress |

---

## Requirements

- **Windows 10/11** (the utility actions and the install script are Windows-only)
- **[Touch Portal](https://www.touch-portal.com/)** (desktop app plus the tablet or phone app). The 12 × 9 grid and multi-page setup most likely need **Touch Portal Pro**.
- **[Node.js](https://nodejs.org/) 18 or later**, installed and on your `PATH`. The plugin starts with `node ./plugin.js`.
- **Elite Dangerous** (Horizons or Odyssey), launched at least once so the Journal folder exists.

---

## Installation

> 📖 **Full step-by-step guide: [docs/INSTALL.md](docs/INSTALL.md)**
> 🎮 **Key bindings, needed for the buttons to work in game: [docs/KEYBINDS.md](docs/KEYBINDS.md)**

Short version:

1. Install **Node.js 18+** and restart the PC.
2. Touch Portal → ⚙ → **Import plug-in…** → pick the `.tpp` → *Trust*. Exit Touch Portal completely (tray icon → Exit).
3. Unzip the pages zip and run **`install.ps1`** (right-click → *Run with PowerShell*) with Touch Portal closed.
4. Open Touch Portal, go to **ED - Vuelo** (FLIGHT) and reconnect the tablet.
5. In game, **UTILS → PLUGIN STATUS** should show `CONNECTED`.
6. **Set up your key bindings** with the [Key bindings guide](docs/KEYBINDS.md). The status tiles work on their own, but every button that *does* something in game presses a key, and it has to match your controls.

---

## Key bindings: please read

Elite Dangerous has no way for other programs to control the ship, so the buttons **press keys on your keyboard**. They were set up with the author's bindings, and yours will be different. Until you match them, buttons such as LANDING GEAR, the fighter orders, the camera and the SRV controls will do nothing, or the wrong thing.

[docs/KEYBINDS.md](docs/KEYBINDS.md) explains the two ways to fix this: add the keys in the game, or change the key each button sends in Touch Portal. It includes a tick-box checklist and a full table of all 50 buttons, also available as a spreadsheet: [docs/keybinds.csv](docs/keybinds.csv).

---

## App launchers (UTILS page)

The launcher row assumes each app's default install location: EDMC, EDDiscovery, VoiceAttack (Steam), ED Odyssey Materials Helper, EDHM-UI, ED CoPilot, ICARUS Terminal and Discord. Web links open Inara, Spansh, Merit Miner and the EDTools hotspot finder. If an app is installed somewhere else, edit that button's *Run application* path in Touch Portal.

---

## Known issues and limitations

- **Credits are approximate.** The Journal doesn't report your balance after every transaction. It syncs on game load and adjusts for the most common transactions.
- **Powerplay merits to the next rank** use an approximate formula, because Frontier publishes no official table.
- **Touch Portal caching:** after changing pages or updating the plugin, restart Touch Portal fully and reconnect the tablet. A simple page refresh often keeps old images.
- **Page file names are still in Spanish** (for example, `ED - Vuelo`). Everything shown on the tablet and in the Touch Portal editor is in English. The file names will be renamed in a later version.
- Six toggle buttons on FLIGHT ask for the `Starduster` font. If it isn't available, Touch Portal falls back to its default font.
- The Community Goal fields on the Station page may show `☐` when no Community Goal is active.

---

## Not in this beta

- **Audio mixer** (per-app volume sliders and mute). It works, but it's experimental and needs NirSoft's SoundVolumeCommandLine, which isn't bundled. It's planned for a later release.
- **Missions page**. It was removed from the navigation during development.
- **Spanish version** of the pages. It's planned.

---

## Building from source

```bash
cd plugin
# dependencies are vendored in plugin/node_modules (touchportal-api 4.0.0 from npm
# doesn't build with current TypeScript), so there's no need to run npm install
npm test                                 # 13 tests, no game or Touch Portal needed
ED_TP_AUDIO=0 node scripts/build-entry.js   # regenerate entry.tp without the audio category
cd ..
python tools/package_release.py 0.1.0-beta  # builds dist/*.tpp and dist/*.zip
```

See [`plugin/README.md`](plugin/README.md) for the architecture and how to add new states and events.

---

## Credits

- Built by **CMDR Adder** ([Adderloops](https://github.com/Adderloops)).
- Plugin architecture inspired by [ChristopheCVB's Touch Portal Elite Dangerous Plugin](https://github.com/ChristopheCVB/TouchPortalEliteDangerousPlugin).
- Journal documentation: [elite-journal.readthedocs.io](https://elite-journal.readthedocs.io/).

Elite Dangerous is © Frontier Developments plc. This is an unofficial fan project. It isn't affiliated with or endorsed by Frontier Developments or Touch Portal. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## License

The code, page layouts and original artwork are released under the [MIT License](LICENSE). Third-party logos and trademarks are excluded; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

---

### Español (resumen)

Plugin y páginas de Touch Portal para Elite Dangerous. Instala el `.tpp` desde *Settings → Plug-ins → Import plug-in*, descomprime el `.zip` de páginas y ejecuta `install.ps1` con Touch Portal cerrado. Necesitas Node.js 18 o posterior. **Importante:** los botones envían teclas, así que tienes que ajustar tus controles siguiendo [docs/KEYBINDS.md](docs/KEYBINDS.md). La guía completa de instalación está en [docs/INSTALL.md](docs/INSTALL.md). La interfaz y las guías están en inglés; hay una versión en español prevista.
