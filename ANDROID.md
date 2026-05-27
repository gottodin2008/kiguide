# KI-Guide für Android

Anleitung für Build und Auslieferung der Android-App **per Direkt-Download über Digistore24** (kein Play Store).

## Übersicht

- **Tech:** Tauri 2 Mobile — gleicher Frontend-Code wie Desktop-App
- **Package-ID:** `de.herknermedia.kiguide`
- **Min SDK:** 24 (Android 7.0)
- **Output:** Eine universelle `.apk`-Datei (alle Architekturen), die Käufer nach dem Kauf herunterladen und sideloaden

## Build via GitHub Actions

Lokaler Android-Build braucht JDK 17 + Android SDK + NDK (~10 GB). Stattdessen läuft alles in CI auf Ubuntu.

**Trigger:**
- Push eines Tags `v*` → automatischer signierter Release-Build, an Draft-Release angehängt
- Manuell via GitHub UI → Actions → "Release Android App" → "Run workflow" (debug für schnelle Tests, release für Verkauf)

**Ergebnis:** APK liegt im Workflow-Run unter "Artifacts" und (bei Tag) zusätzlich am Draft-Release.

## Signing — Pflicht, auch ohne Play Store

Android installiert nur signierte APKs. Du brauchst **einmalig** einen Keystore. Wenn du den Keystore verlierst, können bestehende Käufer **keine Updates** mehr installieren (Android verweigert APKs mit anderem Signatur-Schlüssel) — also gut sichern.

### 1. Keystore lokal erzeugen

JDK 17 installieren falls noch nicht da:
```powershell
winget install Microsoft.OpenJDK.17
```

Keystore erzeugen:
```powershell
& "C:\Program Files\Microsoft\jdk-17\bin\keytool.exe" -genkey -v `
  -keystore kiguide-release.jks `
  -keyalg RSA -keysize 2048 -validity 10000 `
  -alias kiguide
```

Du wirst nach Passwort + Daten gefragt (Name, Firma, Land = DE). **Keystore + Passwörter an mindestens zwei Orten sichern** (NAS + Passwortmanager).

### 2. Als Base64 in die Zwischenablage

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("kiguide-release.jks")) | Set-Clipboard
```

### 3. GitHub Secrets setzen

Repo → Settings → Secrets and variables → Actions → New repository secret:

| Secret | Wert |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | Aus Zwischenablage einfügen |
| `ANDROID_KEYSTORE_PASSWORD` | Keystore-Passwort |
| `ANDROID_KEY_ALIAS` | `kiguide` |
| `ANDROID_KEY_PASSWORD` | Key-Passwort (oft = Keystore-Passwort) |

## Erster Test-Build (ohne Signing)

Ohne Keystore-Secrets bekommst du eine debug-signierte APK — die installiert sich auch, ist nur nicht für Verkauf geeignet:

1. Push der Änderungen
2. GitHub → Actions → "Release Android App" → "Run workflow" → `debug`
3. Nach ~10 min APK aus Artifacts laden
4. APK aufs Handy (USB, Cloud, Mail) → öffnen → installieren

## Auslieferung über Digistore24

Genau wie bei der Desktop-App:

1. APK aus dem Release runterladen (`KI-Guide_v0.2.0.apk`)
2. In Digistore24 als zusätzliche Auslieferungsdatei zum bestehenden Produkt hinzufügen
3. Käufer bekommt nach Kauf eine Download-Seite mit drei Links: `.exe` (Win), `.dmg` (Mac), `.apk` (Android)

**Tipp:** Eine kurze HTML-Anleitung auf der Digistore-Download-Seite, damit Käufer wissen, was zu tun ist (Unknown Sources erlauben etc.). Vorlage unten.

## Anleitung für Käufer (Vorlage für Digistore-Download-Seite)

```
📱 KI-Guide auf Android installieren

1. KI-Guide_v0.2.0.apk auf dein Smartphone herunterladen
2. In den Downloads die Datei antippen
3. Android fragt: "Installation aus unbekannten Quellen erlauben?"
   → Auf "Einstellungen" tippen → bei deinem Browser den Schalter aktivieren → zurück
4. "Installieren" antippen → "Öffnen"
5. Lara begrüßt dich — viel Spaß beim Lernen! 🎉

Falls es Probleme gibt: Schreib mir an support@herknermedia.de
```

## Lokaler Build (optional)

Falls du doch lokal bauen willst — siehe Vorbereitung in der Tauri-Doku. Schnellweg:

```powershell
# Einmalig
winget install Microsoft.OpenJDK.17
# Android Studio installieren: https://developer.android.com/studio
# In Android Studio: SDK Manager → Android 14 (API 34) + NDK 27.0.x + Build-Tools 34.0.0

[Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "User")
[Environment]::SetEnvironmentVariable("NDK_HOME", "$env:LOCALAPPDATA\Android\Sdk\ndk\27.0.12077973", "User")
[Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Microsoft\jdk-17", "User")
# Terminal neu öffnen

rustup target add aarch64-linux-android armv7-linux-androideabi x86_64-linux-android i686-linux-android

npm run android:init           # einmalig
npm run android:build:debug    # schneller Test-Build
npm run android:build          # Release-Build (signiert wenn keystore.properties vorhanden)
```

## Bekannte Themen

### Videos auf Android
Android WebView (Chrome-basiert) spielt **VP9-WebM mit Alpha ab Android 10**. Auf Android 7–9 bleibt der Hintergrund evtl. schwarz statt transparent. Falls Beschwerden: WebM ohne Alpha als Fallback hinterlegen.

### App-Größe
Aktuell ~137 MB (Videos + Code). Direkt-Download über Digistore ist kein Problem — kein 150-MB-Play-Store-Limit, das stört.

### Updates ausliefern
Käufer bekommen Updates nur, wenn sie die neue APK manuell installieren. Optional später: Tauri-Updater einbauen oder einen "neue Version verfügbar"-Hinweis in der App mit Download-Link auf Digistore-Käuferbereich.

### Lizenzschutz (optional)
Die APK liegt nach dem Kauf ungeschützt beim Käufer — er könnte sie weitergeben. Falls das ein Problem wird: Lizenz-Login einbauen (Käufer-Email + Digistore-Bestellnummer → einmaliger Server-Check → lokale Freischaltung). Aktuell nicht eingebaut.

## Nächste Schritte

| Priorität | Task |
|---|---|
| 🔴 | Workflow einmal als `debug` triggern → APK auf echtem Gerät testen |
| 🔴 | Alle 15 Lara-Videos in der App checken (besonders auf älterem Android, falls verfügbar) |
| 🟡 | Keystore erzeugen + Secrets setzen → Tag pushen für signierten Release-Build |
| 🟡 | APK in Digistore24 als Auslieferungsdatei hinzufügen + Anleitung auf Download-Seite |
| 🟢 | Lizenz-Login (falls Schwarzkopien stören) |
| 🟢 | In-App-Update-Hinweis bei neuen Versionen |
