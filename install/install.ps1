# ED Touch Portal - page installer (v0.1.0-beta)
# Copies the pages and backgrounds into Touch Portal's data folder.
# Run with Touch Portal CLOSED:  powershell -ExecutionPolicy Bypass -File .\install.ps1

$ErrorActionPreference = 'Stop'
$here      = Split-Path -Parent $MyInvocation.MyCommand.Path
$tpRoot    = Join-Path $env:APPDATA 'TouchPortal'
$pagesDst  = Join-Path $tpRoot 'pages\New Plug In'
$iconsDst  = Join-Path $tpRoot 'icons'
$pagesSrc  = Join-Path $here 'pages'
$iconsSrc  = Join-Path $here 'icons'

Write-Host ''
Write-Host 'ED Touch Portal - page installer' -ForegroundColor Cyan
Write-Host '---------------------------------'

if (-not (Test-Path $tpRoot)) {
    Write-Host "Touch Portal data folder not found: $tpRoot" -ForegroundColor Red
    Write-Host 'Install and open Touch Portal at least once, then run this again.'
    Read-Host 'Press Enter to exit'; exit 1
}

if (Get-Process -Name 'TouchPortal*' -ErrorAction SilentlyContinue) {
    Write-Host 'Touch Portal is running. Close it completely (including the tray icon) and press Enter.' -ForegroundColor Yellow
    Read-Host | Out-Null
    if (Get-Process -Name 'TouchPortal*' -ErrorAction SilentlyContinue) {
        Write-Host 'Touch Portal is still running - aborting so nothing gets overwritten.' -ForegroundColor Red
        Read-Host 'Press Enter to exit'; exit 1
    }
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host 'WARNING: Node.js was not found on PATH. The ED Touch Portal plugin needs Node.js 18+ (https://nodejs.org).' -ForegroundColor Yellow
}

New-Item -ItemType Directory -Force -Path $pagesDst | Out-Null
New-Item -ItemType Directory -Force -Path $iconsDst | Out-Null

# Back up any page we are about to replace
$stamp  = Get-Date -Format 'yyyyMMdd-HHmmss'
$backup = Join-Path $tpRoot "ed-touchportal-backup-$stamp"
$pages  = Get-ChildItem -Path $pagesSrc -Filter '*.tml'
foreach ($p in $pages) {
    $existing = Join-Path $pagesDst $p.Name
    if (Test-Path $existing) {
        New-Item -ItemType Directory -Force -Path $backup | Out-Null
        Copy-Item $existing -Destination $backup -Force
    }
}
if (Test-Path $backup) { Write-Host "Existing pages backed up to: $backup" }

# Copy pages, expanding %LOCALAPPDATA% / %APPDATA% in launcher paths (JSON-escaped)
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$local = $env:LOCALAPPDATA.Replace('\', '\\')
$roam  = $env:APPDATA.Replace('\', '\\')
foreach ($p in $pages) {
    $text = [System.IO.File]::ReadAllText($p.FullName, $utf8NoBom)
    $text = $text.Replace('%LOCALAPPDATA%', $local).Replace('%APPDATA%', $roam)
    [System.IO.File]::WriteAllText((Join-Path $pagesDst $p.Name), $text, $utf8NoBom)
    Write-Host "  page  $($p.Name)"
}

# Copy backgrounds and icons
$icons = Get-ChildItem -Path $iconsSrc -File
foreach ($i in $icons) { Copy-Item $i.FullName -Destination $iconsDst -Force }
Write-Host "  $($icons.Count) backgrounds/icons copied"

Write-Host ''
Write-Host "Done: $($pages.Count) pages installed in $pagesDst" -ForegroundColor Green
Write-Host 'Next: open Touch Portal, then fully reconnect your tablet. Start on the page "ED - Vuelo".'
Read-Host 'Press Enter to exit'
