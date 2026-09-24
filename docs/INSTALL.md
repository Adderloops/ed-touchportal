# Installation guide

*[Versión en español](es/INSTALACION.md)*

This guide takes you from nothing to a working tablet, step by step. Allow about **20–30 minutes**, most of it for the key bindings at the end.

**Contents**

1. [What you need](#1-what-you-need)
2. [Install Node.js](#2-install-nodejs)
3. [Set up Touch Portal and your tablet](#3-set-up-touch-portal-and-your-tablet)
4. [Install the plugin](#4-install-the-plugin-tpp)
5. [Install the pages](#5-install-the-pages)
6. [Show the pages on your tablet](#6-show-the-pages-on-your-tablet)
7. [First test with the game](#7-first-test-with-the-game)
8. [Set up your key bindings (required)](#8-set-up-your-key-bindings-required)
9. [Optional: app launchers](#9-optional-app-launchers)
10. [Updating and uninstalling](#10-updating-and-uninstalling)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. What you need

| | |
|---|---|
| ☐ **Windows 10 or 11** PC | the one you play Elite Dangerous on |
| ☐ **Elite Dangerous** | Horizons or Odyssey, launched at least once |
| ☐ **A tablet** (Android or iPad) | landscape, ideally 16:10 (for example a 10–11" tablet). Phones work but everything is tiny. |
| ☐ **Touch Portal** | desktop app on the PC and the Touch Portal app on the tablet, both on the same Wi-Fi/network. You'll most likely need **Touch Portal Pro** for the large button grid and multiple pages. |
| ☐ **Node.js 18 or later** | free. It runs the plugin (section 2). |
| ☐ The two release files | `ED-TouchPortal-Plugin-v0.1.0-beta.tpp` and `ED-TouchPortal-Pages-v0.1.0-beta.zip` |

---

## 2. Install Node.js

The plugin is a small program that reads the game's log files. It runs on **Node.js**, which you need to install once.

1. **Check whether you already have it.** Press `Win + R`, type `cmd` and press Enter. In the black window, type:
   ```
   node -v
   ```
   - If you see a version such as `v20.11.0` (18 or higher), skip to section 3.
   - If it says *"'node' is not recognized…"*, carry on.
2. Go to <https://nodejs.org> and download the **LTS** version for Windows.
3. Run the installer and **keep all the default options**. It adds Node to your PATH, which the plugin needs.
4. **Restart your PC.** Touch Portal only sees Node after a restart.
5. Run `node -v` again to confirm it's installed.

---

## 3. Set up Touch Portal and your tablet

If Touch Portal already works on your tablet, skip this section.

1. Install the Touch Portal **desktop** app from <https://www.touch-portal.com>.
2. Install the **Touch Portal** app on your tablet from the Play Store or App Store.
3. Open both and connect the tablet to the PC. The Touch Portal website has a connection guide if you need it.
4. **Close Touch Portal properly** before the next step: right-click its icon in the Windows tray (next to the clock) and choose **Exit**. Closing the window isn't enough, because it keeps running in the background.

---

## 4. Install the plugin (`.tpp`)

1. Open the Touch Portal desktop app.
2. Open the **settings menu** (⚙ icon) and choose **Import plug-in…**.
3. Select `ED-TouchPortal-Plugin-v0.1.0-beta.tpp`.
4. Touch Portal asks whether you trust the plugin. Choose **Trust** so it can start automatically.
5. **Exit Touch Portal completely** (tray icon → Exit) and open it again.

✅ **Check:** in Touch Portal's plug-in settings, **ED Touch Portal Plugin** is listed. When you edit a button, the action list now includes categories such as *Ship Status*, *Navigation* and *Plugin Utilities*.

---

## 5. Install the pages

The pages come with an install script that puts every file in the right place.

1. **Exit Touch Portal completely** (tray icon → Exit).
2. **Unzip** `ED-TouchPortal-Pages-v0.1.0-beta.zip` into a normal folder: right-click → *Extract All…*. Don't run anything from inside the zip.
3. In the unzipped folder, **right-click `install.ps1` → Run with PowerShell**.
   - If Windows says the script is blocked, or the window closes straight away:
     1. Right-click `install.ps1` → **Properties**, tick **Unblock** at the bottom, then OK. Try again.
     2. If it still won't run, click the folder's address bar, type `powershell` and press Enter. In the window that opens, run:
        ```powershell
        powershell -ExecutionPolicy Bypass -File .\install.ps1
        ```
4. The script shows each page as it copies it and ends with **"Done: 14 pages installed"**.

What the script does, so there are no surprises:
- It copies the 14 pages to `%APPDATA%\TouchPortal\pages\New Plug In\`.
- It copies the backgrounds and icons to `%APPDATA%\TouchPortal\icons\`.
- If you already had pages with the same names, it first backs them up to `%APPDATA%\TouchPortal\ed-touchportal-backup-<date>\`.
- It fills in your Windows user folder in the app-launcher buttons.
- It doesn't change anything else.

<details>
<summary><b>Prefer to copy the files by hand?</b></summary>

1. Press `Win + R`, type `%APPDATA%\TouchPortal` and press Enter.
2. Copy all the `.tml` files from the zip's `pages` folder into `pages\New Plug In\`. Create the folder if it doesn't exist, and name it **exactly** `New Plug In`, because the navigation buttons depend on that name.
3. Copy everything in the zip's `icons` folder into `icons\`.
4. The UTILS launchers will still point to `%LOCALAPPDATA%\…` paths. Fix them in Touch Portal if you use them (section 9).
</details>

---

## 6. Show the pages on your tablet

1. Open Touch Portal. The page list (top of the desktop app) now includes pages starting with **ED -**.
2. The start page is **ED - Vuelo** (the FLIGHT tab). From there, the tab bar at the top gets you to every other page.
3. To open it from the tablet's main page, open your **(main)** page in the desktop app, add a button, and give it the action **Go to page → ED - Vuelo**.
4. **On the tablet, fully disconnect and reconnect**, or close and reopen the app. Touch Portal holds on to old images, and a simple refresh often isn't enough after installing pages.

> Page file names are still in Spanish for now (everything on screen is in English):
> **Vuelo** = Flight · **Navegación** = Nav · **Combate** = Combat · **Exploración** = Explore · **Comercio** = Trade · **Cámara** = Camera · **A Pie** = On Foot · **Utilidades** = Utils · **Estación** = Station

---

## 7. First test with the game

1. Start Elite Dangerous and load into the game (in your ship).
2. On the tablet, open **UTILS**. The **PLUGIN STATUS** tile should show **CONNECTED**.
   - `NO_JOURNAL` means the plugin can't find the game's log folder. See [Troubleshooting](#11-troubleshooting).
   - If nothing changes at all, the plugin isn't running. Check Node.js (section 2) and the plugin import (section 4).
3. Open **FLIGHT**. The status tiles (DOCKED, SHIELDS, SUPERCRUISE…) light up to match your ship.
4. Open **CMDR**. Your commander name, ranks and ship appear.

If all of that works, the live data side is done. 🎉

---

## 8. Set up your key bindings (required)

The status tiles work on their own. **Buttons that do something in the game, such as landing gear, lights, fighter orders, the camera and the SRV, press keys on your keyboard.** They only work if those keys are bound in *your* game.

👉 **Follow the [Key bindings guide](KEYBINDS.md).** It explains both ways to fix this (change the game, or change the button), with a checklist of every binding you need.

---

## 9. Optional: app launchers

The bottom half of **UTILS** has buttons that open companion apps and websites: EDMC, EDDiscovery, VoiceAttack, ED Odyssey Materials Helper, EDHM-UI, ED CoPilot, ICARUS Terminal, Discord, Inara, Spansh, Merit Miner and the EDTools hotspot finder. They assume each app is in its default install folder.

If a launcher does nothing, or you don't use that app:
1. In the Touch Portal desktop app, open **ED - Utilidades** and click the launcher.
2. In **On Pressed**, change the path in the *Run application* action to the app's `.exe` on your PC, or replace the action entirely.
3. Save.

---

## 10. Updating and uninstalling

**Updating to a new version**
1. Exit Touch Portal.
2. Import the new `.tpp` (section 4). It replaces the old plugin.
3. Run the new `install.ps1` (section 5). **Any changes you made to the pages will be overwritten**, including keys you changed with Option B of the key bindings guide. The script backs up the old pages first, so you can copy your changed buttons back from there.
4. Reconnect the tablet.

**Uninstalling**
1. In Touch Portal's plug-in settings, remove **ED Touch Portal Plugin**.
2. Delete the `ED - *.tml` pages from `%APPDATA%\TouchPortal\pages\New Plug In\`, and the `BG_ED_*.jpg` files from `%APPDATA%\TouchPortal\icons\`.
3. If you added keys in the game, you can leave them or remove them. They don't affect anything else.

---

## 11. Troubleshooting

| Problem | Fix |
|---|---|
| **PLUGIN STATUS doesn't change / plugin missing** | Is Node.js installed (`node -v`)? Did you restart the PC after installing it? Import the `.tpp` again and choose *Trust*. |
| **PLUGIN STATUS shows `NO_JOURNAL`** | The game's log folder wasn't found. It's usually `%USERPROFILE%\Saved Games\Frontier Developments\Elite Dangerous`. If yours is elsewhere (for example OneDrive moved *Saved Games*), create a Windows environment variable called `ED_JOURNAL_FOLDER` with the correct folder (Start → *"Edit the system environment variables"* → Environment Variables → New). Then exit and reopen Touch Portal. |
| **Pages are black / backgrounds missing** | The `BG_ED_*.jpg` files must be in `%APPDATA%\TouchPortal\icons\`, not in the pages folder. Run `install.ps1` again. |
| **Tablet still shows old or mixed-up pages** | Exit Touch Portal completely (tray → Exit), reopen it, then fully disconnect and reconnect the tablet. |
| **Tab bar buttons don't change page** | The pages must be in a folder called exactly `New Plug In`. Run `install.ps1` again. |
| **Status tiles work, but buttons do nothing in game** | That's the key bindings: see the [Key bindings guide](KEYBINDS.md). |
| **Values look stuck or wrong after a long session** | On **UTILS**, press **RELOAD JOURNAL**. **RESET SESSION** puts the session counters back to zero. |
| **Credits look slightly off** | Known limitation. The game doesn't report your balance after every transaction. It corrects itself the next time the game loads. |

Still stuck? Open an [issue on GitHub](../../../issues) and include the plugin status shown on UTILS, what you tried, and a photo of the tablet if something looks wrong.
