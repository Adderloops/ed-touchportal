# Key bindings guide

**Read this before you play.** Some buttons on the tablet won't do anything in game until you've gone through it.

---

## 1. Why this matters

Elite Dangerous doesn't let other programs control your ship directly. So when you press a button such as **LANDING GEAR** on the tablet, Touch Portal **pretends to type a key combination on your PC's keyboard**. That button sends `Left Ctrl + G`.

The game only reacts if **that exact key combination** is set up in *your* controls for *that* action.

The buttons were set up with the author's key bindings. Your bindings are almost certainly different, so some buttons will do nothing, and some might even trigger a different action.

You fix this **once**, in one of two ways:

| | Option A: change the game | Option B: change Touch Portal |
|---|---|---|
| **What you do** | In Elite, add the key the button sends to each action | In Touch Portal, change the key each button sends to the one you already use |
| **Good for** | New players and anyone who hasn't used these keys yet | Players who already have keys for these actions and want to keep them |
| **Your HOTAS / gamepad** | Not touched, if you use the **second** column (see below) | Not touched |
| **Recommended?** | ✅ Yes, for most people | ✅ Yes, if the keys clash with ones you already use |

You can mix the two, button by button.

> ❌ **Don't copy the author's `.binds` file into your game.** It would replace your **whole** control setup, including your joystick, HOTAS and gamepad bindings, with someone else's hardware setup.

---

## 2. Which buttons need this?

Only **50 buttons on 4 pages** send keys. Everything else works without any setup: it shows live data from the game or opens apps and websites.

| Page (tab) | Buttons that send keys |
|---|---|
| **FLIGHT** | The 6 toggles (landing gear, FA off, hardpoints, lights, cargo scoop, night vision) and the 5 orange action buttons |
| **COMBAT** | Target Power Plant, Team Mate Nav Lock, Request Docking, and the 7 fighter orders |
| **CAMERA** | All 12 camera buttons |
| **SRV** | Handbrake, Turret View, Drive Assist, High Beams, and all orange buttons |

The status tiles on those pages (DOCKED, SHIELDS, IN SRV…) **don't** need any keys. They light up by themselves.

---

## 3. Things to know first

1. **The game window must be the active window.** Touch Portal types into whatever window is in front. If you've clicked into Discord or your browser, the keys go there. Click once on the game after using another app.
2. **Left Ctrl and Right Ctrl are different keys.** Elite treats them separately. The flight buttons mostly use **Left** Ctrl, while the camera and SRV buttons use **Right** Ctrl. Bind exactly what the table says.
3. **Keyboard layout.** Elite names keys by their position on a **US keyboard**. On other layouts, two buttons are affected:
   - **TARGET POWER PLANT** presses the key to the right of `L`. That's key right of `L` (`Ñ` on Spanish, `;` on US keyboards) on a Spanish keyboard, `;` on a US one and `Ö` on a German one. Elite calls it `;` (Semicolon).
   - **TEAM MATE NAV LOCK** presses the `/` key (Elite: Slash). It sits in a different place on most non-US keyboards.
   
   If either one doesn't work, use **Option B** and record the key again on your own keyboard (section 5).
4. **Hold vs toggle.** Each button taps its key for 0.1 seconds. If an action is set to **Hold** in the game's options (Flight Assist and Silent Running can be), the tap won't stick. Set it to **Toggle**.
5. **Numpad keys:** turn on **Num Lock** for the fighter-order buttons.

---

## 4. Option A: add the keys in Elite Dangerous

### 4.1 Where

1. Start Elite Dangerous and open **Options → Controls**.
2. At the top, check which **preset** is selected. If it's a built-in preset (for example *Keyboard & Mouse* or *Saitek X56*), the game makes a copy called **Custom** as soon as you change something. That's normal.
3. The controls are grouped into sections: **Ship Controls**, **SRV Controls**, **General Controls** and so on, each with sub-sections. The tables below tell you exactly where each option is.

### 4.2 How to bind one action

Each action has **two slots**: *Primary* and *Secondary*.

1. Find the option (for example *Ship Controls → Miscellaneous → Landing Gear*).
2. Click the **slot that's empty**, preferably the **Secondary** one. That way, a button you already have on your joystick (usually in Primary) stays as it is.
3. When it says *"Press a key…"*, press the combination from the table **on your keyboard**. For `Left Ctrl + G`, hold the left Ctrl key and tap G.
4. Check that the slot now shows the combination (for example *Left Ctrl + G*).
5. When you've finished, click **Apply** at the bottom of the screen. Otherwise nothing is saved.

> If the game says the key is **already in use** by another action, decide which one you want. If you need to keep your key, use Option B for that button instead.

> **Tip:** the free website [EDRefCard](https://edrefcard.info) shows your current bindings as a printable picture. It's an easy way to check what you already have before you start.

### 4.3 Checklist, grouped by menu section

Work through it section by section in the game menu. Tick each line when it's done. Every row is needed by at least one button.

**Ship Controls › Cooling**

| ☐ | Option | Bind to | Used by |
|---|---|---|---|
| ☐ | Deploy Heat Sink | `Left Ctrl + H` | FLIGHT › HEAT SINK |
| ☐ | Silent Running | `Left Ctrl + S` | FLIGHT › SILENT RUNNING |

**Ship Controls › Fighter Orders**

| ☐ | Option | Bind to | Used by |
|---|---|---|---|
| ☐ | Recall Fighter | `Numpad 0` | COMBAT › RECALL FIGHTER |
| ☐ | Defend | `Numpad 1` | COMBAT › DEFEND |
| ☐ | Engage At Will | `Numpad 2` | COMBAT › ENGAGE AT WILL |
| ☐ | Attack Target | `Numpad 3` | COMBAT › ATTACK TARGET |
| ☐ | Maintain Formation | `Numpad 4` | COMBAT › MAINTAIN FORMATION |
| ☐ | Hold Position | `Numpad 5` | COMBAT › HOLD POSITION |
| ☐ | Follow Me | `Numpad 6` | COMBAT › FOLLOW ME |

**Ship Controls › Flight Miscellaneous**

| ☐ | Option | Bind to | Used by |
|---|---|---|---|
| ☐ | Toggle Flight Assist | `Left Ctrl + Z` | FLIGHT › FA OFF |

**Ship Controls › Miscellaneous**

| ☐ | Option | Bind to | Used by |
|---|---|---|---|
| ☐ | Landing Gear | `Left Ctrl + G` | FLIGHT › LANDING GEAR |
| ☐ | Ship Lights | `Left Ctrl + L` | FLIGHT › LIGHTS |
| ☐ | Cargo Scoop | `Left Ctrl + C` | FLIGHT › CARGO SCOOP |
| ☐ | Night Vision | `Left Ctrl + N` | FLIGHT › NIGHT VISION |
| ☐ | Jettison All Cargo | `Left Ctrl + J` | FLIGHT › JETTISON ALL CARGO |

**Ship Controls › Mode Switches**

| ☐ | Option | Bind to | Used by |
|---|---|---|---|
| ☐ | External Panel (left panel) | `Left Ctrl + E` | COMBAT › REQUEST DOCKING, FLIGHT › REQUEST DOCKING |

**Ship Controls › Targeting**

| ☐ | Option | Bind to | Used by |
|---|---|---|---|
| ☐ | Target Next System in Route | `Right Ctrl + N` | FLIGHT › TARGET NEXT SYSTEM |
| ☐ | Cycle Previous Subsystem | key right of `L` (`Ñ` on Spanish, `;` on US keyboards) | COMBAT › TARGET POWER PLANT |
| ☐ | Wingman Nav-Lock | `/` | COMBAT › TEAM MATE NAV LOCK |

**Ship Controls › Weapons**

| ☐ | Option | Bind to | Used by |
|---|---|---|---|
| ☐ | Deploy Hardpoints | `Left Ctrl + U` | FLIGHT › HARDPOINTS |

**SRV Controls › Driving**

| ☐ | Option | Bind to | Used by |
|---|---|---|---|
| ☐ | Handbrake | `Right Ctrl + F` | SRV › HANDBRAKE |
| ☐ | Drive Assist | `Right Ctrl + D` | SRV › DRIVE ASSIST |

**SRV Controls › Miscellaneous**

| ☐ | Option | Bind to | Used by |
|---|---|---|---|
| ☐ | Headlights | `Right Ctrl + L` | SRV › HIGH BEAMS |
| ☐ | Recall / Dismiss Ship | `Right Ctrl + R` | SRV › RECALL SHIP |

**SRV Controls › Mode Switches**

| ☐ | Option | Bind to | Used by |
|---|---|---|---|
| ☐ | Toggle Turret Mode | `Right Ctrl + T` | SRV › TURRET VIEW |
| ☐ | External Panel | `1` | SRV › EXTERNAL PANEL |
| ☐ | Comms Panel | `2` | SRV › COMMS PANEL |
| ☐ | Role Panel | `3` | SRV › ROLE PANEL |
| ☐ | Internal Panel | `4` | SRV › INTERNAL PANEL |
| ☐ | Quick Comms | `Enter` | SRV › QUICK COMMS |

**SRV Controls › Weapons**

| ☐ | Option | Bind to | Used by |
|---|---|---|---|
| ☐ | Next Fire Group | `N` | SRV › NEXT GROUP |

**General Controls › Camera Suite**

| ☐ | Option | Bind to | Used by |
|---|---|---|---|
| ☐ | Toggle Camera Suite | `Right Ctrl + P` | CAMERA › PHOTO MODE |

**General Controls › Free Camera**

| ☐ | Option | Bind to | Used by |
|---|---|---|---|
| ☐ | Toggle Free Camera | `Right Ctrl + K` | CAMERA › FREE CAMERA ON / OFF |
| ☐ | Zoom In | `Right Ctrl + O` | CAMERA › ZOOM + |
| ☐ | Zoom Out | `Right Ctrl + V` | CAMERA › ZOOM - |
| ☐ | Lock to World | `Right Ctrl + Y` | CAMERA › LOCK |
| ☐ | Roll Left | `Right Ctrl + Q` | CAMERA › ROLL LEFT |
| ☐ | Roll Right | `Right Ctrl + E` | CAMERA › ROLL RIGHT |
| ☐ | Move Forward | `Right Ctrl + W` | CAMERA › MOVE FORWARD |
| ☐ | Move Backwards | `Right Ctrl + X` | CAMERA › MOVE BACK |
| ☐ | Toggle Zoom/Blur (Advanced Mode) | `Right Ctrl + A` | CAMERA › ZOOM / BLUR TOGGLE |
| ☐ | Toggle Rotation Lock (Stabiliser) | `Right Ctrl + S` | CAMERA › STABILISER OFF |
| ☐ | Lock to Ship | `Right Ctrl + I` | CAMERA › SHIP CONTROLS |

**General Controls › Interface Mode**

| ☐ | Option | Bind to | Used by |
|---|---|---|---|
| ☐ | Previous Panel Tab | `Page Up` | COMBAT › REQUEST DOCKING, FLIGHT › REQUEST DOCKING, SRV › PREVIOUS PAGE |
| ☐ | UI Panel Right | `D` | COMBAT › REQUEST DOCKING, FLIGHT › REQUEST DOCKING, SRV › RIGHT |
| ☐ | UI Panel Select | `Space` | COMBAT › REQUEST DOCKING, FLIGHT › REQUEST DOCKING |
| ☐ | UI Panel Up | `W` | SRV › UP |
| ☐ | Next Panel Tab | `Page Down` | SRV › NEXT PAGE |
| ☐ | UI Panel Left | `A` | SRV › LEFT |
| ☐ | UI Panel Down | `S` | SRV › DOWN |

---

## 5. Option B: change the key a button sends, in Touch Portal

Do this on the **PC**, in the Touch Portal desktop app. Not on the tablet.

1. Open Touch Portal and go to the page (for example **ED - Vuelo** for FLIGHT).
   > Page file names are still in Spanish for now: **ED - Vuelo** = FLIGHT, **ED - Combate** = COMBAT, **ED - Cámara** = CAMERA, **ED - SRV** = SRV.
2. **Click the button** you want to change. The button editor opens.
3. On the **On Pressed** tab, you'll see the button's action list. Look for the keyboard action. It shows the keys, for example **Left Ctrl + G**.
4. Click the key field, then **press the key combination you use in the game**. Touch Portal records it.
   - If there's a "clear" option, clear the old keys first so you don't end up with both.
5. Click **Save**, then check it on the tablet. If the tablet still behaves the old way, reconnect it.

**Don't change anything else on the button** (colours, events, other actions). The status colour of each button is driven by the plugin, and it keeps working however the key is changed.

### Buttons that press several keys ("macros")

Two buttons do more than one thing. To change them, edit **each** keyboard action in the list and **keep the waits** between them.

**REQUEST DOCKING** (FLIGHT and COMBAT) goes through the menus for you:

| Step | Keys | What happens in game |
|---|---|---|
| 1 | `Left Ctrl + E` | Opens the left (external) panel |
| – | wait 0.1 s | |
| 2 | `Page Up` | Previous tab |
| – | wait 0.1 s | |
| 3 | `Page Up` | Previous tab again → **Contacts** |
| – | wait 0.1 s | |
| 4 | `D` | Moves right to the **Request Docking** button |
| – | wait 0.2 s | |
| 5 | `Space` | Presses it |

It's tuned to the author's game: the left panel opening on its default tab, and you being within docking range (7.5 km) of the station. If it stops halfway, raise the waits to 0.3 s, because the menu can take longer to open on a slower PC. If it lands on the wrong tab, add or remove a `Page Up` step.

**TARGET POWER PLANT** (COMBAT) presses **Cycle Previous Subsystem** 6 times in a row (*Repeat 6 times* in the action list). You need a ship targeted first. Change only the key inside the repeat block and leave the *Repeat* and *End repeat* actions as they are.

---

## 6. Full reference: every button, one by one

This is what every button sends, in the order it appears on the tablet. The same data is in [`keybinds.csv`](keybinds.csv), which you can open in Excel or Google Sheets.

### FLIGHT page

| Button on the tablet | Keys it sends | Game action — *Options › Controls › section › option* | Internal name |
|---|---|---|---|
| LANDING GEAR | `Left Ctrl + G` | Ship Controls › Miscellaneous › **Landing Gear** | `LandingGearToggle` |
| FA OFF | `Left Ctrl + Z` | Ship Controls › Flight Miscellaneous › **Toggle Flight Assist** | `ToggleFlightAssist` |
| HARDPOINTS | `Left Ctrl + U` | Ship Controls › Weapons › **Deploy Hardpoints** | `DeployHardpointToggle` |
| LIGHTS | `Left Ctrl + L` | Ship Controls › Miscellaneous › **Ship Lights** | `ShipSpotLightToggle` |
| CARGO SCOOP | `Left Ctrl + C` | Ship Controls › Miscellaneous › **Cargo Scoop** | `ToggleCargoScoop` |
| NIGHT VISION | `Left Ctrl + N` | Ship Controls › Miscellaneous › **Night Vision** | `NightVisionToggle` |
| HEAT SINK | `Left Ctrl + H` | Ship Controls › Cooling › **Deploy Heat Sink** | `DeployHeatSink` |
| SILENT RUNNING | `Left Ctrl + S` | Ship Controls › Cooling › **Silent Running** | `ToggleButtonUpInput` |
| JETTISON ALL CARGO | `Left Ctrl + J` | Ship Controls › Miscellaneous › **Jettison All Cargo** | `EjectAllCargo` |
| TARGET NEXT SYSTEM | `Right Ctrl + N` | Ship Controls › Targeting › **Target Next System in Route** | `TargetNextRouteSystem` |
| REQUEST DOCKING — step 1 | `Left Ctrl + E` | Ship Controls › Mode Switches › **External Panel (left panel)** | `FocusLeftPanel` |
| REQUEST DOCKING — step 2 | `Page Up` | General Controls › Interface Mode › **Previous Panel Tab** | `CyclePreviousPanel` |
| REQUEST DOCKING — step 3 | `Page Up` | General Controls › Interface Mode › **Previous Panel Tab** | `CyclePreviousPanel` |
| REQUEST DOCKING — step 4 | `D` | General Controls › Interface Mode › **UI Panel Right** | `UI_Right` |
| REQUEST DOCKING — step 5 | `Space` | General Controls › Interface Mode › **UI Panel Select** | `UI_Select` |

### COMBAT page

| Button on the tablet | Keys it sends | Game action — *Options › Controls › section › option* | Internal name |
|---|---|---|---|
| TARGET POWER PLANT | key right of `L` (`Ñ` on Spanish, `;` on US keyboards) ×6 | Ship Controls › Targeting › **Cycle Previous Subsystem** | `CyclePreviousSubsystem` |
| TEAM MATE NAV LOCK | `/` | Ship Controls › Targeting › **Wingman Nav-Lock** | `WingNavLock` |
| REQUEST DOCKING — step 1 | `Left Ctrl + E` | Ship Controls › Mode Switches › **External Panel (left panel)** | `FocusLeftPanel` |
| REQUEST DOCKING — step 2 | `Page Up` | General Controls › Interface Mode › **Previous Panel Tab** | `CyclePreviousPanel` |
| REQUEST DOCKING — step 3 | `Page Up` | General Controls › Interface Mode › **Previous Panel Tab** | `CyclePreviousPanel` |
| REQUEST DOCKING — step 4 | `D` | General Controls › Interface Mode › **UI Panel Right** | `UI_Right` |
| REQUEST DOCKING — step 5 | `Space` | General Controls › Interface Mode › **UI Panel Select** | `UI_Select` |
| RECALL FIGHTER | `Numpad 0` | Ship Controls › Fighter Orders › **Recall Fighter** | `OrderRequestDock` |
| DEFEND | `Numpad 1` | Ship Controls › Fighter Orders › **Defend** | `OrderDefensiveBehaviour` |
| ENGAGE AT WILL | `Numpad 2` | Ship Controls › Fighter Orders › **Engage At Will** | `OrderAggressiveBehaviour` |
| ATTACK TARGET | `Numpad 3` | Ship Controls › Fighter Orders › **Attack Target** | `OrderFocusTarget` |
| MAINTAIN FORMATION | `Numpad 4` | Ship Controls › Fighter Orders › **Maintain Formation** | `OrderHoldFire` |
| HOLD POSITION | `Numpad 5` | Ship Controls › Fighter Orders › **Hold Position** | `OrderHoldPosition` |
| FOLLOW ME | `Numpad 6` | Ship Controls › Fighter Orders › **Follow Me** | `OrderFollow` |

### CAMERA page

| Button on the tablet | Keys it sends | Game action — *Options › Controls › section › option* | Internal name |
|---|---|---|---|
| FREE CAMERA ON / OFF | `Right Ctrl + K` | General Controls › Free Camera › **Toggle Free Camera** | `ToggleFreeCam` |
| ZOOM + | `Right Ctrl + O` | General Controls › Free Camera › **Zoom In** | `FreeCamZoomIn` |
| ZOOM - | `Right Ctrl + V` | General Controls › Free Camera › **Zoom Out** | `FreeCamZoomOut` |
| LOCK | `Right Ctrl + Y` | General Controls › Free Camera › **Lock to World** | `FixCameraWorldToggle` |
| ROLL LEFT | `Right Ctrl + Q` | General Controls › Free Camera › **Roll Left** | `RollCameraLeft` |
| ROLL RIGHT | `Right Ctrl + E` | General Controls › Free Camera › **Roll Right** | `RollCameraRight` |
| MOVE FORWARD | `Right Ctrl + W` | General Controls › Free Camera › **Move Forward** | `MoveFreeCamForward` |
| MOVE BACK | `Right Ctrl + X` | General Controls › Free Camera › **Move Backwards** | `MoveFreeCamBackwards` |
| ZOOM / BLUR TOGGLE | `Right Ctrl + A` | General Controls › Free Camera › **Toggle Zoom/Blur (Advanced Mode)** | `ToggleAdvanceMode` |
| STABILISER OFF | `Right Ctrl + S` | General Controls › Free Camera › **Toggle Rotation Lock (Stabiliser)** | `ToggleRotationLock` |
| SHIP CONTROLS | `Right Ctrl + I` | General Controls › Free Camera › **Lock to Ship** | `FixCameraRelativeToggle` |
| PHOTO MODE | `Right Ctrl + P` | General Controls › Camera Suite › **Toggle Camera Suite** | `PhotoCameraToggle` |

### SRV page

| Button on the tablet | Keys it sends | Game action — *Options › Controls › section › option* | Internal name |
|---|---|---|---|
| HANDBRAKE | `Right Ctrl + F` | SRV Controls › Driving › **Handbrake** | `AutoBreakBuggyButton` |
| TURRET VIEW | `Right Ctrl + T` | SRV Controls › Mode Switches › **Toggle Turret Mode** | `ToggleBuggyTurretButton` |
| DRIVE ASSIST | `Right Ctrl + D` | SRV Controls › Driving › **Drive Assist** | `ToggleDriveAssist` |
| HIGH BEAMS | `Right Ctrl + L` | SRV Controls › Miscellaneous › **Headlights** | `HeadlightsBuggyButton` |
| NEXT GROUP | `N` | SRV Controls › Weapons › **Next Fire Group** | `BuggyCycleFireGroupNext` |
| EXTERNAL PANEL | `1` | SRV Controls › Mode Switches › **External Panel** | `FocusLeftPanel_Buggy` |
| COMMS PANEL | `2` | SRV Controls › Mode Switches › **Comms Panel** | `FocusCommsPanel_Buggy` |
| ROLE PANEL | `3` | SRV Controls › Mode Switches › **Role Panel** | `FocusRadarPanel_Buggy` |
| INTERNAL PANEL | `4` | SRV Controls › Mode Switches › **Internal Panel** | `FocusRightPanel_Buggy` |
| QUICK COMMS | `Enter` | SRV Controls › Mode Switches › **Quick Comms** | `QuickCommsPanel_Buggy` |
| PREVIOUS PAGE | `Page Up` | General Controls › Interface Mode › **Previous Panel Tab** | `CyclePreviousPanel` |
| UP | `W` | General Controls › Interface Mode › **UI Panel Up** | `UI_Up` |
| NEXT PAGE | `Page Down` | General Controls › Interface Mode › **Next Panel Tab** | `CycleNextPanel` |
| RECALL SHIP | `Right Ctrl + R` | SRV Controls › Miscellaneous › **Recall / Dismiss Ship** | `RecallDismissShip` |
| LEFT | `A` | General Controls › Interface Mode › **UI Panel Left** | `UI_Left` |
| DOWN | `S` | General Controls › Interface Mode › **UI Panel Down** | `UI_Down` |
| RIGHT | `D` | General Controls › Interface Mode › **UI Panel Right** | `UI_Right` |

> The option names come from the game's English menu. They can vary slightly between game versions or languages. The **internal name** is exactly what's written in your bindings file (`%LOCALAPPDATA%\Frontier Developments\Elite Dangerous\Options\Bindings\*.binds`), so you can search for it there if you can't find an option.

---

## 7. Troubleshooting

| Problem | What to check |
|---|---|
| A button does nothing | Is the game the active window (section 3, point 1)? Is the key bound in the game, in the right section? Left vs Right Ctrl? |
| A button does the **wrong** thing | That key is already used by another action in your setup. Rebind one of them (Option A) or change the button (Option B). |
| It works on the keyboard but not from the tablet | Check the action isn't set to **Hold** in the game. Is Num Lock on (fighter orders)? Try running Touch Portal and the game both as normal user, or both as administrator. Windows blocks simulated keys going *into* an app that runs with higher rights. |
| TARGET POWER PLANT / TEAM MATE NAV LOCK don't work | Keyboard layout (section 3, point 3). Record the key again with Option B. |
| REQUEST DOCKING stops halfway | Raise the waits between steps (section 5), and check that Previous Panel Tab, UI Panel Right and UI Panel Select are bound. |
| Camera buttons do nothing | Most camera buttons only work while the free camera is on. Press **FREE CAMERA ON / OFF** first. |
