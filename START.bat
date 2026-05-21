@echo off
title KI-Guide mit Lara
cd /d "%~dp0"
color 0B

echo.
echo  ============================================
echo    KI-Guide mit Lara - Auto-Starter
echo  ============================================
echo.

REM ---- Pruefe Node.js ----
where node >nul 2>&1
if errorlevel 1 (
  color 0C
  echo  [FEHLER] Node.js ist nicht installiert.
  echo.
  echo  Bitte installiere Node.js von:
  echo    https://nodejs.org/
  echo.
  echo  Danach diese Datei nochmal doppelklicken.
  echo.
  pause
  exit /b 1
)

for /f "tokens=*" %%v in ('node -v') do set NODE_VERSION=%%v
echo   Node.js gefunden: %NODE_VERSION%
echo.

REM ---- Installiere Pakete falls noetig ----
if not exist node_modules (
  echo  [1/2] Installiere Pakete...
  echo        Dauert beim ersten Start ca. 1-2 Minuten.
  echo.
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    color 0C
    echo.
    echo  [FEHLER] npm install fehlgeschlagen.
    echo  Versuche manuell:   npm install
    pause
    exit /b 1
  )
  echo.
  echo   Pakete installiert.
  echo.
) else (
  echo   Pakete bereits installiert.
  echo.
)

REM ---- Browser-Tab vorbereiten (oeffnet nach 6 Sekunden) ----
start "" cmd /c "timeout /t 6 /nobreak >nul && start http://localhost:3000"

echo  [2/2] Starte Dev-Server...
echo.
echo  ============================================
echo    Browser oeffnet sich automatisch.
echo    URL:   http://localhost:3000
echo.
echo    Zum Beenden: STRG+C druecken
echo  ============================================
echo.

call npm run dev

pause
