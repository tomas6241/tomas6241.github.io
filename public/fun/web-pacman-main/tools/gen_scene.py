#!/usr/bin/env python3
"""Compose a static in-game preview: maze background + first-frame sprites.

Each sprite file is a horizontal strip; we nest it inside a 16x16 <svg> with a
matching viewBox so only the first animation frame shows (the rest is clipped).
"""
import os

ROOT = os.path.join(os.path.dirname(__file__), '..')
G = 'app/style/graphics/spriteSheets'


def sprite(path, x, y, frames=2):
    # nested svg clips the strip to a single 32x32 frame
    return (
        f'<svg x="{x}" y="{y}" width="16" height="16" viewBox="0 0 32 32">'
        f'<image href="{path}" width="{frames * 32}" height="32" '
        f'image-rendering="pixelated"/></svg>'
    )


parts = ['<svg width="224" height="248" viewBox="0 0 224 248" '
         'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">']
parts.append('<image href="{}/maze/maze_blue.svg" width="224" height="248"/>'.format(G))

# small hearts (pacdot) along a couple of corridors (~0.6 tile like in-game)
for col in range(2, 26, 2):
    parts.append(f'<svg x="{col*8+1}" y="17" width="10" height="10" viewBox="0 0 32 32">'
                 f'<image href="{G}/pickups/pacdot.svg" width="32" height="32"/></svg>')
    parts.append(f'<svg x="{col*8+1}" y="225" width="10" height="10" viewBox="0 0 32 32">'
                 f'<image href="{G}/pickups/pacdot.svg" width="32" height="32"/></svg>')

# big hearts (power pellets) in the corners
for (px, py) in [(8, 24), (200, 24), (8, 200), (200, 200)]:
    parts.append(f'<svg x="{px}" y="{py}" width="16" height="16" viewBox="0 0 32 32">'
                 f'<image href="{G}/pickups/powerPellet.svg" width="32" height="32"/></svg>')

# monsters near the house
parts.append(sprite(f'{G}/characters/ghosts/blinky/blinky_left.svg', 88, 112))
parts.append(sprite(f'{G}/characters/ghosts/pinky/pinky_right.svg', 120, 112))
parts.append(sprite(f'{G}/characters/ghosts/inky/inky_down.svg', 88, 96))
parts.append(sprite(f'{G}/characters/ghosts/clyde/clyde_down.svg', 120, 96))
# a scared monster
parts.append(sprite(f'{G}/characters/ghosts/scared_blue.svg', 104, 160))

# the girl
parts.append(sprite(f'{G}/characters/pacman/pacman_up.svg', 104, 176, 4))

parts.append('</svg>')

# written to the game root so the relative hrefs (app/...) resolve for rsvg
out = os.path.join(ROOT, 'scene_preview.svg')
with open(out, 'w') as f:
    f.write('\n'.join(parts))
print('wrote', out)
