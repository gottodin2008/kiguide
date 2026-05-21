# Deployment-Anleitung (für dich, Herky)

## Erststart-Checklist (einmalig)

### 1. Repo auf GitHub pushen
```bash
git init
git add .
git commit -m "Initial commit: KI-Guide Desktop App"
gh repo create kiguide --private --source=. --push
```

### 2. Repo Settings → Actions → Allgemein
- "Read and write permissions" für GITHUB_TOKEN aktivieren (für Auto-Release)

### 3. Lokaler Test-Build (Windows)
**Voraussetzung:** Microsoft C++ Build Tools (~3 GB)
- Download: https://visualstudio.microsoft.com/de/visual-cpp-build-tools/
- Bei Install: "Desktop development with C++" Workload anhaken
- Reboot
- Dann:
```bash
npm run tauri:build
```
→ Output: `src-tauri/target/release/bundle/nsis/KI-Guide_*_x64-setup.exe`

---

## Neuer Release publizieren

```bash
# Version in package.json + src-tauri/tauri.conf.json + src-tauri/Cargo.toml bumpen
git add .
git commit -m "Release v1.0.1"
git tag v1.0.1
git push origin main --tags
```

GitHub Actions baut **automatisch**:
- ✅ Windows `.exe` (NSIS Installer)
- ✅ macOS Universal `.dmg` (Intel + Apple Silicon)
- ✅ HEVC-Alpha-Videos auf Mac-Runner konvertiert
- ✅ Draft-Release angelegt mit Anhängen

Draft-Release durchgehen → "Publish release" → fertige Download-Links.

---

## Digistore24-Integration

1. **Produkt anlegen:**
   - Name: KI-Guide mit Lara
   - Preis: 49 € (oder dein Preis)
   - Lieferung: "Download-Datei" mit Link zur GitHub-Release-`.exe` und `.dmg`
   - "Käufer-E-Mail-Text" mit Inhalt aus `INSTALL.md`

2. **In der App keine Lizenz-Prüfung** (du wolltest „Käufer-Ehrlichkeit").
   Wer den File weitergibt, kann ihn theoretisch teilen.

3. **Affiliate-Programm aktivieren** (optional, Standard 30% Affiliate Provision)

---

## Was wenn du später Code-Signing willst?

**Windows-Cert (~80 €/Jahr):** SSL.com, Sectigo, oder Certum
- Cert kaufen → in GitHub Secret `WINDOWS_CERTIFICATE` + `WINDOWS_CERTIFICATE_PASSWORD` legen
- Tauri-Action signiert automatisch

**Apple Developer ID ($99/Jahr):**
- Apple Developer Account anlegen
- Developer ID Application Certificate erstellen
- Secrets `APPLE_CERTIFICATE`, `APPLE_CERTIFICATE_PASSWORD`, `APPLE_SIGNING_IDENTITY`, `APPLE_ID`, `APPLE_PASSWORD`, `APPLE_TEAM_ID` in GitHub setzen
- Tauri-Action notarisiert automatisch

---

## Bundle-Größe schrumpfen (optional)

Aktuell ~30 MB. Falls zu groß:
- Videos auf 480p reduzieren → ~50% kleiner
- Audio MP3 → Opus konvertieren → ~30% kleiner

```bash
# Videos kleiner machen (qualitätserhaltend)
for f in public/lara/videos/*.webm; do
  ffmpeg -i "$f" -c:v libvpx-vp9 -crf 35 -b:v 500k "$f.tmp" && mv "$f.tmp" "$f"
done
```
