#!/usr/bin/env python3
"""
Erzeugt eine STL-Datei fuer einen L-foermigen Lampenfuss (3D-Druck).

Masse:
  - Senkrechter Schenkel: 150 mm hoch, 50 mm breit
  - Waagerechter Schenkel (Winkel/Standflaeche): 50 mm tief, 50 mm breit
  - Materialstaerke: 5 mm
  - Schraubenloch: Durchmesser 8 mm, mittig, Zentrum 10 mm unter der Oberkante

Benoetigt: pip install trimesh numpy manifold3d
Ausfuehren: python3 lampenfuss_generator.py
"""

import numpy as np
import trimesh
from trimesh.creation import box, cylinder

# ---- Parameter (bei Bedarf anpassen, alle Werte in mm) ----
STAERKE = 5.0        # Materialstaerke
BREITE = 50.0        # Breite des Fusses
HOEHE = 150.0        # Gesamthoehe des senkrechten Schenkels
WINKEL_TIEFE = 50.0  # Tiefe der Standflaeche (Winkel)
LOCH_D = 8.0         # Lochdurchmesser
LOCH_ABSTAND = 10.0  # Abstand Lochzentrum von der Oberkante
SEGMENTE = 96        # Kreisaufloesung des Lochs

# Senkrechte Platte (Wand mit dem Schraubenloch)
wand = box(
    extents=[BREITE, STAERKE, HOEHE],
    transform=trimesh.transformations.translation_matrix(
        [BREITE / 2, STAERKE / 2, HOEHE / 2]
    ),
)

# Waagerechter Schenkel (Standflaeche)
fuss = box(
    extents=[BREITE, WINKEL_TIEFE, STAERKE],
    transform=trimesh.transformations.translation_matrix(
        [BREITE / 2, WINKEL_TIEFE / 2, STAERKE / 2]
    ),
)

# Schraubenloch: Zylinder quer durch die Wand
loch = cylinder(radius=LOCH_D / 2, height=STAERKE * 4, sections=SEGMENTE)
loch.apply_transform(trimesh.transformations.rotation_matrix(np.pi / 2, [1, 0, 0]))
loch.apply_translation([BREITE / 2, STAERKE / 2, HOEHE - LOCH_ABSTAND])

teil = trimesh.boolean.union([wand, fuss])
teil = trimesh.boolean.difference([teil, loch])

assert teil.is_watertight, "Mesh ist nicht wasserdicht!"

out = "lampenfuss_L_150x50.stl"
teil.export(out)
print(
    f"{out}: {len(teil.faces)} Dreiecke, "
    f"Volumen {teil.volume / 1000:.1f} cm3, wasserdicht: {teil.is_watertight}"
)
