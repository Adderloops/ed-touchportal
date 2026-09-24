# Changelog

## [0.1.0-beta] – 2026-09-24

First public beta.

### Plugin
- 13 categories (Ship Status, CMDR / Pilot, Navigation, Combat, Exploration, Trade / Mining, Powerplay, Missions, Station / Engineers, On Foot / Suits, Fleet Carrier, Squadron, Plugin Utilities) with **261 states, 125 events and 8 actions**.
- Incremental Journal tailing, `Status.json` and `Cargo.json` readers.
- Utility actions: reset session, reload Journal, open Inara / EDSM for the current system, copy system to clipboard, export session stats to JSON, reset Powerplay merit counter.
- All text in the Touch Portal editor (category names, state descriptions, events and actions) is now in English.
- Values shown on the HUD are in English (for example, `Buy`/`Sell`, `Hold empty`, `None equipped`, module and engineering names on the Loadout page).
- Numbers use English thousands separators (`1,234,567`).
- Powerplay tracker status values changed from `SIN_DATOS`/`CONECTADO` to `NO_DATA`/`CONNECTED`.
- Experimental audio mixer category is off by default. It turns on only when `tools/svcl.exe` is present.

### Pages
- 14 pages: Flight, Nav, Combat, Explore, Trade, Powerplay, CMDR, Camera, On Foot, Carrier & Squadron, Utils and SRV, plus the Loadout and Station subpages.
- Loadout page background translated: `‹ BACK` navigation bar, CORE INTERNAL / OPTIONAL INTERNAL / HARDPOINTS / UTILITY MOUNTS headers, and SHIP / NAME / SHIP ID labels.
- App launcher paths use `%LOCALAPPDATA%` / `%APPDATA%`, which the installer fills in for your user.
- `install.ps1` installer with automatic backup.
