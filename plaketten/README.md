# Plaketten – 4 Symbole (45 × 45 mm, 2 mm dick, Gold/Schwarz)

Aus dem Foto extrahierte und vektorisierte Symbole der 4 Messing-Plaketten:

| Nr. | Motiv | Datei-Name |
|-----|-------|------------|
| 1 | Lüfterrad / Gebläse | `luefterrad` |
| 2 | Ölkanne (Schmierstelle) | `oelkanne` |
| 3 | Handrad | `handrad` |
| 4 | Hebel / Bedienknauf | `hebel` |

## SVG – für den Plotter (`svg/`)

- `plakette_1…4_….svg` – je eine Plakette, exakt **45 × 45 mm** (Einheiten in mm).
- `alle_4_plaketten.svg` – alle 4 zusammen auf einem Bogen (2 × 2, 5 mm Abstand).

Jede Datei enthält **zwei Ebenen** (in Inkscape/Plotter-Software als Layer sichtbar):

1. **Gold** – das 45×45-mm-Quadrat (Schnittkontur / Hintergrund, Farbe `#C9A227`)
2. **Schwarz** – das Motiv inkl. Rahmen als gefüllte Vektorpfade

Für Vinyl-Plotten: Ebene „Gold" aus Goldfolie schneiden, Ebene „Schwarz" aus
schwarzer Folie schneiden und aufkleben (entgittern; die feinsten Linien sind
ca. 0,4 mm breit).

## STL – für den 3D-Drucker (`stl/`)

Bündige Zwei-Farb-Einlage, Gesamtdicke exakt **2,0 mm**:

- `…_gold.stl` – Grundkörper 45 × 45 mm: 1,4 mm Vollmaterial + 0,6 mm Deckschicht
  mit Aussparungen für das Motiv
- `…_schwarz.stl` – das Motiv, 0,6 mm dick, sitzt in den Aussparungen (z = 1,4–2,0 mm)
- `…_komplett.stl` – beide Körper vereint (für Einfarb-Druck oder Kontrolle)

**Druck mit 2 Farben:**
- *Multi-Material (AMS/MMU/2 Extruder):* `…_gold.stl` und `…_schwarz.stl`
  zusammen als ein Objekt importieren (Positionen passen bereits zueinander –
  beim Import „als ein Objekt zusammenfügen" wählen), Gold- und Schwarz-Filament zuweisen.
- *Ein Extruder mit Filamentwechsel:* `…_komplett.stl` drucken geht nicht zweifarbig –
  stattdessen beide Teildateien laden **oder** die Ober-/Unterseite tauschen und bei
  1,4 mm Höhe einen Farbwechsel (M600) einfügen.
- Empfehlung: 0,4-mm-Düse, 0,2 mm Schichthöhe (0,6 mm Einlage = 3 Schichten);
  feinste Motivlinien ≈ 0,4–0,5 mm, mit 0,25-mm-Düse werden sie noch sauberer.

## Vorschau (`vorschau/`)

- `foto_ausschnitt_1…4.png` – entzerrte Ausschnitte aus dem Original-Foto
- `svg_vorschau.png` – Rendering der fertigen SVGs
- `stl_querschnitt.png` – Querschnitt der STL-Körper (Gold-Aussparungen + Schwarz-Einlage)
