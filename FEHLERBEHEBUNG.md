# 🛟 KI-Guide — Anleitung & Fehlerbehebung

**Willkommen bei deinem KI-Kurs mit Lara!** Diese Anleitung hilft dir, wenn etwas nicht auf Anhieb funktioniert.

---

## 📚 Inhaltsverzeichnis

1. [Installation](#installation)
2. [Erster Start](#erster-start)
3. [Häufige Probleme — Windows](#häufige-probleme--windows)
4. [Häufige Probleme — macOS](#häufige-probleme--macos)
5. [Probleme im Kurs (Video, Audio, Anzeige)](#probleme-im-kurs)
6. [App deinstallieren](#app-deinstallieren)
7. [Updates installieren](#updates-installieren)
8. [Kontakt & Support](#kontakt--support)

---

## Installation

### 🪟 Windows (Windows 10 oder neuer)

1. Lade die Datei `KI-Guide_x.x.x_x64-setup.exe` herunter
2. Doppelklick auf die Datei
3. **Wenn SmartScreen warnt** („Der Computer wurde durch Windows geschützt"):
   - Klick auf **„Weitere Informationen"**
   - Dann **„Trotzdem ausführen"**
   - *Das ist normal bei Apps ohne kostenpflichtiges Code-Signing-Zertifikat.*
4. Folge dem Installer (Installationspfad bestätigen → „Installieren")
5. Fertig — App startet automatisch oder über das **Startmenü → KI-Guide**

### 🍎 macOS (macOS 10.15 Catalina oder neuer)

1. Lade die Datei `KI-Guide_x.x.x_x64.dmg` (Intel) oder `_aarch64.dmg` (Apple Silicon/M1/M2/M3) herunter
2. Doppelklick auf die `.dmg`
3. Ziehe das **KI-Guide-Icon** in den **Programme-Ordner**
4. DMG schließen (Auswerfen)

**Wichtig — Erststart:** Die App muss beim ersten Mal **per Rechtsklick geöffnet werden**, da macOS unsignierte Apps blockiert:

1. Öffne den **Programme-Ordner** im Finder
2. **Rechtsklick** auf „KI-Guide" → **„Öffnen"**
3. Im Dialog **„Öffnen"** bestätigen
4. Ab jetzt funktioniert die App per Doppelklick

---

## Erster Start

Wenn die App startet, siehst du:

- **Hero-Bereich oben:** Lara begrüßt dich mit Audio + Video
- **Zwei große Karten:** „Anfänger" und „Fortgeschritten"
- **Klick auf eine Karte** → Kapitelübersicht mit allen Inhalten

**Audio funktioniert nicht beim ersten Mal?**
Browser-Standard: Audio darf nicht automatisch losgehen. Klick einfach 1× auf den ▶️-Button im Hero-Bereich.

---

## Häufige Probleme — Windows

### ❌ „Diese App kann auf Ihrem PC nicht ausgeführt werden"

- **Ursache:** Du hast Windows 7 oder Windows 8.
- **Lösung:** Update auf Windows 10 oder Windows 11 nötig. Die App nutzt moderne Web-Technologien, die ältere Windows-Versionen nicht unterstützen.

### ❌ Schwarzer Bildschirm / weißer Bildschirm nach App-Start

- **Ursache:** Microsoft Edge WebView2 Runtime fehlt (sollte auf Windows 11 vorinstalliert sein, manchmal bei alten Windows 10).
- **Lösung:**
  1. Download: https://developer.microsoft.com/de-de/microsoft-edge/webview2/
  2. „Evergreen Standalone Installer" → x64 → installieren
  3. KI-Guide neu starten

### ❌ Installer startet nicht / „Datei wurde nicht erkannt"

- **Ursache:** Antivirus oder Browser hat die Datei in Quarantäne verschoben.
- **Lösung:**
  1. Antivirus öffnen → Quarantäne checken → Datei freigeben/wiederherstellen
  2. Browser-Download-Ordner: Rechtsklick → Eigenschaften → unten ggf. „Zulassen" anhaken → OK
  3. Datei nochmal von Digistore-Mail herunterladen

### ❌ SmartScreen lässt mich nicht „Trotzdem ausführen" klicken

- **Ursache:** „Windows Defender SmartScreen" ist auf streng eingestellt oder Gruppenrichtlinie.
- **Lösung:**
  1. Rechtsklick auf die `.exe` → **Eigenschaften** → unten **„Zulassen"** anhaken → **OK**
  2. Doppelklick → der Installer startet jetzt ohne Warnung

### ❌ App startet, aber Fenster ist winzig

- **Ursache:** Hochauflösender Bildschirm (4K) und Windows-Skalierung.
- **Lösung:** Rechtsklick auf das App-Icon → Eigenschaften → Kompatibilität → „Hohe DPI-Einstellungen ändern" → „Verhalten bei hoher DPI-Skalierung außer Kraft setzen" → „System (erweitert)" → OK

---

## Häufige Probleme — macOS

### ❌ „KI-Guide.app ist beschädigt und kann nicht geöffnet werden"

- **Ursache:** Klassisches Gatekeeper-Problem bei nicht-notarisierten Apps (besonders nach dem Download aus Safari).
- **Lösung (einfach):** Terminal öffnen (CMD+Leertaste → „Terminal" eintippen) und einmalig:
  ```bash
  xattr -cr /Applications/KI-Guide.app
  ```
  Dann nochmal Rechtsklick → Öffnen.

### ❌ „KI-Guide kann nicht geöffnet werden, da der Entwickler nicht verifiziert ist"

- **Ursache:** Standard macOS-Schutz für unsignierte Apps.
- **Lösung:**
  1. **Rechtsklick** auf KI-Guide.app im Programme-Ordner
  2. **„Öffnen"** wählen (NICHT Doppelklick!)
  3. Im Dialog erneut **„Öffnen"** bestätigen
  4. Ab jetzt funktioniert auch der normale Doppelklick

### ❌ „Erforderlich: macOS 10.15 oder höher"

- **Ursache:** Du hast macOS 10.14 (Mojave) oder älter.
- **Lösung:** macOS-Update durchführen. Die App nutzt WKWebView 2-Features, die ältere macOS-Versionen nicht haben.

### ❌ Video läuft, aber Lara sieht „transparent"/glitchy aus

- **Ursache:** macOS hat Probleme mit dem HEVC-Decoder. Sehr selten bei alten Macs.
- **Lösung:**
  1. macOS-Update prüfen (Apple-Menü → Systemeinstellungen → Allgemein → Softwareupdate)
  2. App neu starten

---

## Probleme im Kurs

### 🔇 Audio läuft nicht / Stimme von Lara fehlt

- **Klick einmal auf den ▶️-Button** im Player (Browser-Autoplay-Block)
- **Lautstärke prüfen:** System-Lautstärke + ggf. Stummschaltung an Tastatur/App
- **Audio-Output prüfen:** Falls Kopfhörer/Bluetooth-Lautsprecher verbunden — eventuell Switch
- Falls weiter still: App-Fenster aktivieren (Klick rein) und nochmal Play drücken

### 🎬 Video lädt aber bleibt schwarz

- **Auf Windows:** WebView2 Runtime aktualisieren (siehe oben)
- **Auf Mac:** App komplett beenden (CMD+Q) und neu starten
- **Schritt zurück:** Klick auf vorheriges Kapitel und dann wieder zurück — manchmal hilft das

### 📺 Untertitel/Slides springen zu schnell oder zu langsam

- **Ursache:** Audio und Slides sind per Zeitstempel synchronisiert. Wenn dein Rechner kurz hängt, kann es 1–2 Sekunden Drift geben.
- **Lösung:** Im Player auf den Fortschrittsbalken klicken um neu zu synchronisieren

### 🖱️ Buttons reagieren nicht / Layout kaputt

- **Strg+F5** drücken (Windows) bzw. **CMD+R** (Mac) — lädt die aktuelle Kursseite neu
- Falls das nicht hilft: App ganz schließen und neu öffnen

### 🐌 App ist langsam / ruckelt

- **Andere Programme schließen** (besonders Browser mit vielen Tabs)
- **RAM-Empfehlung:** mindestens 4 GB freier Arbeitsspeicher
- **Festplatte:** App läuft besser auf SSD als auf alter HDD
- **Stromsparmodus aus** (Laptop): Akku-Symbol → „Höchstleistung"

### 💾 „Speicherort wechseln" oder Notizen machen?

Der KI-Guide ist ein **reiner Lese-Kurs** — er speichert keine Daten von dir. Notizen machst du am besten in einer separaten Datei (z. B. Notes-App, Notion, Word-Dokument).

---

## App deinstallieren

### 🪟 Windows

**Variante 1 (einfach):** Windows-Taste → „KI-Guide" tippen → Rechtsklick → „Deinstallieren"

**Variante 2:** Systemsteuerung → „Programme und Features" → KI-Guide → „Deinstallieren"

### 🍎 macOS

1. Finder öffnen → **Programme**
2. **KI-Guide** in den **Papierkorb** ziehen
3. Papierkorb leeren

Die App hinterlässt keine Spuren auf deinem System.

---

## Updates installieren

Bei einem Update bekommst du eine **neue E-Mail** mit Download-Link.

1. **Aktuelle Version deinstallieren** (siehe oben)
2. **Neue Version installieren** (gleiche Schritte wie beim ersten Mal)
3. Falls SmartScreen/Gatekeeper warnt: gleiche Workarounds wie beim ersten Mal

> 💡 Tipp: Falls du den Kurs aktuell durcharbeitest, schreibe dir vorher auf, in welchem Kapitel du bist. Die App speichert deinen Fortschritt **nicht** automatisch.

---

## Kontakt & Support

**Etwas geht nicht und obige Tipps helfen nicht weiter?**

📧 **E-Mail:** [SUPPORT-MAIL@herknermedia.de]
📱 Bei deiner Mail bitte angeben:
- Welches Betriebssystem (z. B. „Windows 11 Pro" oder „macOS 13 Ventura")
- Welche KI-Guide-Version (siehe Installer-Dateiname, z. B. `0.1.0`)
- Was du gemacht hast und was passiert ist
- Optional: Screenshot vom Fehler

Antwort üblicherweise innerhalb von 1-2 Werktagen.

---

## 🎓 Viel Erfolg mit deinem KI-Kurs!

Lara freut sich, dich begleiten zu dürfen. 🤖✨

— **Herkner Media**
*KI-Guide v0.1.0*
