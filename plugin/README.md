# ED Touch Portal Plugin (developer notes)

A Node.js Touch Portal plugin (`com.adder.edtouchportal`) that reads Elite Dangerous' Journal, `Status.json` and `Cargo.json` in real time. It exposes states, events and actions to Touch Portal.

## Architecture

```
plugin.js                  Entry point: connects to Touch Portal and starts everything
definitions/
  flags.js                 Status.json bits (Flags/Flags2) -> id + description
  ranks.js                 Rank name tables (Combat/Trade/Exploration/CQC/Federation/Empire)
  category-*.js            Single source of truth for each category's states/events/actions
  features.js              Feature flags (experimental audio mixer)
  entry-source.js          Combines all categories into the entry.tp structure
src/
  services/
    journal-tailer.js      Follows the newest Journal.*.log incrementally
    status-reader.js       Reads and decodes Status.json (polls every 500 ms)
    cargo-reader.js        Reads Cargo.json for the live ship/SRV hold
    state-store.js         Wraps TPClient: de-duplicates updates and handles "pulses"
    module-names.js        Turns Loadout module ids into readable names and engineering tags
    powerplay-ranks.js     Powerplay rank and colour helpers
    format.js              Thousands separator formatting
  event-router.js          Sends each Journal event to its handlers
  session-stats.js         Counters that live while the plugin runs
  handlers/<category>.js   One file per category, reacting to Journal events
  actions.js               Utility actions (open Inara/EDSM, copy system, export stats…)
scripts/build-entry.js     Generates entry.tp from definitions/entry-source.js
test/                      Tests that run without the game or Touch Portal
```

### Data flow

- **Journal** → `JournalTailer` (incremental, never re-reads the whole file) → `EventRouter.dispatch()` → category handlers → `StateStore.set()` / `.pulse()` → Touch Portal.
- **Status.json** → `StatusReader` (decodes the `Flags`/`Flags2` bitfields) → Ship Status and On Foot states.

### Why "pulses"

Many Journal events are one-off, like an interdiction, a destroyed fighter or a death. For Touch Portal to fire an event, the underlying state has to **change value**. `StateStore.pulse()` sets a state for a moment and then restores its resting value with a non-blocking `setTimeout`.

## Commands

```bash
# node_modules/ is vendored (the npm build of touchportal-api 4.0.0 is broken), so skip npm install
npm test                     # 13 tests
npm run build-entry          # regenerates entry.tp (never edit entry.tp by hand)
ED_TP_AUDIO=0 npm run build-entry   # force-exclude the experimental audio category
```

## Adding a field or category

1. Add the state (and optionally an event) in `definitions/category-<name>.js`.
2. Set it from the matching handler in `src/handlers/<name>.js` with `state.set(...)`.
3. For a new category, register it in `definitions/entry-source.js` and `src/handlers/index.js`.
4. Run `npm run build-entry`, then `npm test`.
5. Restart Touch Portal completely so it reloads `entry.tp`.

Journal reference: <https://elite-journal.readthedocs.io/>

## Environment variables

| Variable | Purpose |
|---|---|
| `ED_JOURNAL_FOLDER` | Overrides the Journal folder (default `%USERPROFILE%\Saved Games\Frontier Developments\Elite Dangerous`) |
| `ED_TP_AUDIO` | `1` forces the audio mixer category on; `0` forces it off. By default it's on only when `tools/svcl.exe` exists. |
