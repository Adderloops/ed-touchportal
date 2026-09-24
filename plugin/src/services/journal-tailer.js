'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const EventEmitter = require('events');

/**
 * Localiza la carpeta de guardado de Elite Dangerous.
 * En Windows es %USERPROFILE%\Saved Games\Frontier Developments\Elite Dangerous.
 * Se puede forzar con la variable de entorno ED_JOURNAL_FOLDER (útil para tests
 * o para instalaciones no estándar / Steam Deck / Proton).
 */
function getJournalFolder() {
  if (process.env.ED_JOURNAL_FOLDER) {
    return process.env.ED_JOURNAL_FOLDER;
  }
  const home = process.env.USERPROFILE || os.homedir();
  return path.join(home, 'Saved Games', 'Frontier Developments', 'Elite Dangerous');
}

function findLatestJournalFile(folder) {
  let entries;
  try {
    entries = fs.readdirSync(folder);
  } catch (err) {
    return null;
  }

  const journalFiles = entries.filter((f) => f.startsWith('Journal.') && f.endsWith('.log'));
  if (journalFiles.length === 0) return null;

  // El nombre incluye timestamp (Journal.YYMMDDHHMMSS.NN.log) así que el
  // orden alfabético ya es cronológico, pero por seguridad comparamos mtime.
  let latest = null;
  let latestMtime = -1;
  for (const name of journalFiles) {
    const full = path.join(folder, name);
    try {
      const stat = fs.statSync(full);
      if (stat.mtimeMs > latestMtime) {
        latestMtime = stat.mtimeMs;
        latest = full;
      }
    } catch (err) {
      // fichero pudo desaparecer entre readdir y stat, se ignora
    }
  }
  return latest;
}

/**
 * Sigue en tiempo real el Journal.log más reciente, de forma incremental:
 * solo lee los bytes nuevos que se van añadiendo al fichero (no relee todo
 * el fichero en cada ciclo), y detecta automáticamente cuándo el juego
 * rota a un fichero de Journal nuevo (nueva sesión de juego).
 *
 * Emite:
 *  - 'event' (parsedJsonLine)  por cada línea de Journal parseada con éxito
 *  - 'rawline' (line)          por cada línea leída, incluso si no parsea (debug)
 *  - 'file-changed' (path)     cuando empieza a seguir un fichero nuevo
 *  - 'error' (err)
 */
class JournalTailer extends EventEmitter {
  constructor(journalFolder = getJournalFolder(), pollIntervalMs = 500) {
    super();
    this.journalFolder = journalFolder;
    this.pollIntervalMs = pollIntervalMs;
    this.currentFile = null;
    this.position = 0;
    this._timer = null;
    this._active = false;
    /** Si true, la primera vez que se abre un fichero se lee desde el principio
     * (útil para tests / "reload"); por defecto se posiciona al final para no
     * disparar años de historial al arrancar. */
    this.readFromStart = false;
  }

  start() {
    if (this._active) return;
    this._active = true;
    this._checkForNewFileAndRead(true);
    this._timer = setInterval(() => this._checkForNewFileAndRead(false), this.pollIntervalMs);
  }

  stop() {
    this._active = false;
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  /** Fuerza una relectura completa del fichero actual desde el principio. */
  reloadFromStart() {
    this.position = 0;
    this._readNewBytes();
  }

  _checkForNewFileAndRead(isFirstRun) {
    const latest = findLatestJournalFile(this.journalFolder);
    if (!latest) {
      if (isFirstRun) {
        this.emit(
          'error',
          new Error(`No Journal.*.log found in ${this.journalFolder}. Is the game installed and has it been launched at least once?`)
        );
      }
      return;
    }

    if (latest !== this.currentFile) {
      this.currentFile = latest;
      // Al detectar un fichero de journal nuevo (nueva sesión de juego),
      // arrancamos desde el principio de ESE fichero para no perdernos el
      // arranque de sesión (Commander/LoadGame/Rank/etc.), salvo que se
      // pida explícitamente lo contrario.
      this.position = 0;
      this.emit('file-changed', this.currentFile);
    }

    this._readNewBytes();
  }

  _readNewBytes() {
    if (!this.currentFile) return;

    let stat;
    try {
      stat = fs.statSync(this.currentFile);
    } catch (err) {
      return;
    }

    if (stat.size < this.position) {
      // El fichero se truncó/reemplazó de forma inesperada -> reset
      this.position = 0;
    }
    if (stat.size === this.position) return; // nada nuevo

    let fd;
    try {
      fd = fs.openSync(this.currentFile, 'r');
    } catch (err) {
      return;
    }

    try {
      const length = stat.size - this.position;
      const buffer = Buffer.alloc(length);
      fs.readSync(fd, buffer, 0, length, this.position);
      this.position = stat.size;

      const text = buffer.toString('utf8');
      const lines = text.split(/\r?\n/).filter((l) => l.length > 0);
      for (const line of lines) {
        this.emit('rawline', line);
        try {
          const json = JSON.parse(line);
          this.emit('event', json);
        } catch (err) {
          // línea incompleta (el juego escribe línea a línea, no debería
          // pasar casi nunca leyendo por tamaño de fichero, pero se protege)
        }
      }
    } finally {
      fs.closeSync(fd);
    }
  }
}

module.exports = { JournalTailer, getJournalFolder, findLatestJournalFile };
