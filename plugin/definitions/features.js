'use strict';

/**
 * Feature flags.
 *
 * AUDIO_ENABLED: the per-app volume mixer (category ed.audio, page
 * "ED - Audio") is experimental and NOT part of the v0.1.0-beta release.
 * It needs NirSoft's SoundVolumeCommandLine (tools/svcl.exe), which is not
 * redistributed with this plugin. It turns on automatically when svcl.exe
 * is present in tools/, or when ED_TP_AUDIO=1 is set while building entry.tp.
 */
const fs = require('fs');
const path = require('path');

const SVCL_PRESENT = fs.existsSync(path.join(__dirname, '..', 'tools', 'svcl.exe'));
const AUDIO_ENABLED = process.env.ED_TP_AUDIO === '1' || (process.env.ED_TP_AUDIO !== '0' && SVCL_PRESENT);

module.exports = { AUDIO_ENABLED };
