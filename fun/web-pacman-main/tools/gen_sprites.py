#!/usr/bin/env python3
"""Generate themed sprite strips for the Heart Collector reskin (higher-res).

Art is authored on a 32x32 grid per frame using a small pixel-drawing toolkit
(shapes / ellipses / lines) rather than hand-typed pixel maps, giving crisp,
detailed pixel art. The game engine scales each strip to a fixed on-screen box
(2 maze tiles), so the source resolution is free; only the frame COUNT and the
square, horizontally-tiled layout must match what the engine expects:

  - Player (girl):   pacman_{down,left,right,up}.svg = 4 frames  (128x32)
                     pacman_death.svg                = 12 frames (384x32)
  - Enemies:         <name>_{dir}.svg (+ blinky variants), eyes_{dir},
                     scared_blue / scared_white       = 2 frames (64x32)
  - Pickups:         pacdot / powerPellet / extra_life = 1 frame  (32x32)
"""

import math
import os

TILE = 32
BASE = os.path.join(os.path.dirname(__file__), '..', 'app', 'style', 'graphics',
                    'spriteSheets')

# ---------------------------------------------------------------------------
# pixel-drawing toolkit
# ---------------------------------------------------------------------------


class Grid:
    def __init__(self):
        self.d = [['.'] * TILE for _ in range(TILE)]

    def px(self, x, y, c):
        x, y = int(round(x)), int(round(y))
        if 0 <= x < TILE and 0 <= y < TILE:
            self.d[y][x] = c

    def rect(self, x, y, w, h, c):
        for yy in range(int(y), int(y + h)):
            for xx in range(int(x), int(x + w)):
                self.px(xx, yy, c)

    def ellipse(self, cx, cy, rx, ry, c):
        for yy in range(TILE):
            for xx in range(TILE):
                if rx > 0 and ry > 0 and \
                        ((xx + 0.5 - cx) / rx) ** 2 + ((yy + 0.5 - cy) / ry) ** 2 <= 1.0:
                    self.px(xx, yy, c)

    def disc(self, cx, cy, r, c):
        self.ellipse(cx, cy, r, r, c)

    def line(self, x0, y0, x1, y1, c, w=1):
        x0, y0, x1, y1 = int(x0), int(y0), int(x1), int(y1)
        dx, dy = abs(x1 - x0), abs(y1 - y0)
        sx = 1 if x0 < x1 else -1
        sy = 1 if y0 < y1 else -1
        err = dx - dy
        while True:
            self.rect(x0 - (w - 1) / 2, y0 - (w - 1) / 2, w, w, c)
            if x0 == x1 and y0 == y1:
                break
            e2 = 2 * err
            if e2 > -dy:
                err -= dy
                x0 += sx
            if e2 < dx:
                err += dx
                y0 += sy

    def outline(self, fill, edge, bg='.'):
        """Give a filled shape a 1px edge (where fill touches bg)."""
        snap = [row[:] for row in self.d]
        for yy in range(TILE):
            for xx in range(TILE):
                if snap[yy][xx] != fill:
                    continue
                for ddx, ddy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = xx + ddx, yy + ddy
                    if not (0 <= nx < TILE and 0 <= ny < TILE) or snap[ny][nx] == bg:
                        self.d[yy][xx] = edge
                        break

    def rows(self):
        return [''.join(r) for r in self.d]


def mirror(rows):
    return [r[::-1] for r in rows]


def write_strip(path, frames, colors):
    width = TILE * len(frames)
    parts = [
        f'<svg width="{width}" height="{TILE}" viewBox="0 0 {width} {TILE}" '
        f'fill="none" xmlns="http://www.w3.org/2000/svg">'
    ]
    for i, rows in enumerate(frames):
        assert len(rows) == TILE, f'{path}: frame {i} has {len(rows)} rows'
        for y, row in enumerate(rows):
            assert len(row) == TILE, f'{path}: bad row width'
            for x, ch in enumerate(row):
                if ch != '.':
                    parts.append(
                        f'<rect x="{x + i * TILE}" y="{y}" width="1" height="1" '
                        f'fill="{colors[ch]}"/>'
                    )
    parts.append('</svg>')
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write('\n'.join(parts) + '\n')
    print('wrote', os.path.relpath(path, BASE))


# ===========================================================================
# HEARTS
# ===========================================================================
HEART_COLORS = {
    'K': '#FF3D7F',   # fill
    'e': '#B0245A',   # edge
    'i': '#FF9EC4',   # highlight
    'W': '#FFFFFF',
}


def heart_grid(r=10.5, cx=16, cy=13.0):
    g = Grid()
    for yy in range(TILE):
        for xx in range(TILE):
            u = (xx + 0.5 - cx) / r
            v = -(yy + 0.5 - cy) / r
            if (u * u + v * v - 1) ** 3 - u * u * (v ** 3) <= 0:
                g.px(xx, yy, 'K')
    g.outline('K', 'e')
    # highlight on the upper-left lobe (only where the heart already is)
    snap = [row[:] for row in g.d]
    hi = Grid()
    hi.ellipse(cx - r * 0.42, cy - r * 0.4, r * 0.3, r * 0.24, 'i')
    for yy in range(TILE):
        for xx in range(TILE):
            if hi.d[yy][xx] == 'i' and snap[yy][xx] == 'K':
                g.d[yy][xx] = 'i'
    return g.rows()


def build_hearts():
    p = os.path.join(BASE, 'pickups')
    write_strip(os.path.join(p, 'pacdot.svg'), [heart_grid(9.5)], HEART_COLORS)
    write_strip(os.path.join(p, 'powerPellet.svg'), [heart_grid(12.5)], HEART_COLORS)
    write_strip(os.path.join(BASE, '..', 'extra_life.svg'),
                [heart_grid(11.5)], HEART_COLORS)


# ===========================================================================
# GIRL
# ===========================================================================
GIRL_COLORS = {
    'H': '#7B4A2E',   # hair
    'h': '#5E3721',   # hair shadow
    'S': '#FFD3A8',   # skin
    'k': '#E7B085',   # skin shade
    'E': '#3A2418',   # eye
    'D': '#FF5C93',   # dress
    'd': '#D83E77',   # dress shade
    'K': '#FF2E7A',   # bow
    'q': '#FF7FB0',   # bow light
    'O': '#6E2B4E',   # shoes
    'W': '#FFFFFF',
    'B': '#FF9BB5',   # blush
}

DRESS_TOP_Y = 18
DRESS_HEM_Y = 26


def _dress(g, oy, shade_side=0):
    for yy in range(DRESS_TOP_Y, DRESS_HEM_Y + 1):
        t = (yy - DRESS_TOP_Y) / (DRESS_HEM_Y - DRESS_TOP_Y)
        half = 3 + t * 5
        g.rect(16 - half, yy + oy, 2 * half, 1, 'D')
    # shading down one side
    for yy in range(DRESS_TOP_Y, DRESS_HEM_Y + 1):
        t = (yy - DRESS_TOP_Y) / (DRESS_HEM_Y - DRESS_TOP_Y)
        half = 3 + t * 5
        if shade_side >= 0:
            g.rect(16 + half - 2, yy + oy, 2, 1, 'd')
        if shade_side <= 0 and shade_side != 1:
            pass


def _bow(g, oy, cx=16):
    g.px(cx - 3, 3 + oy, 'K'); g.px(cx - 4, 3 + oy, 'K')
    g.px(cx + 2, 3 + oy, 'K'); g.px(cx + 3, 3 + oy, 'K')
    g.ellipse(cx - 3, 4 + oy, 2.4, 2.2, 'K')
    g.ellipse(cx + 3, 4 + oy, 2.4, 2.2, 'K')
    g.ellipse(cx - 3, 3.4 + oy, 1.2, 1.0, 'q')
    g.ellipse(cx + 3, 3.4 + oy, 1.2, 1.0, 'q')
    g.rect(cx - 1, 4 + oy, 2, 2, 'K')


def _legs(g, phase, oy):
    sw = {0: 0, 1: 2, 2: 0, 3: -2}[phase]
    # left leg / shoe
    g.rect(13, 26 + oy, 2, 4, 'S')
    g.rect(12 - max(0, -sw), 30, 3, 2, 'O')
    # right leg / shoe
    g.rect(17, 26 + oy, 2, 4, 'S')
    g.rect(17 + max(0, sw), 30, 3, 2, 'O')


def girl_front(phase, back=False):
    g = Grid()
    oy = -1 if phase % 2 else 0
    # hair mass
    g.ellipse(16, 11 + oy, 8, 8, 'H')
    g.ellipse(16, 13 + oy, 8, 8, 'H')
    if not back:
        # face
        g.ellipse(16, 12 + oy, 6, 6.5, 'S')
        # bangs across the forehead
        g.rect(10, 5 + oy, 12, 3, 'H')
        g.ellipse(16, 8 + oy, 6.5, 2.4, 'H')
        # eyes + blush + smile
        for ex in (13, 19):
            g.rect(ex, 12 + oy, 2, 3, 'E')
            g.px(ex, 12 + oy, 'W')
        g.px(12, 15 + oy, 'B'); g.px(11, 15 + oy, 'B')
        g.px(20, 15 + oy, 'B'); g.px(21, 15 + oy, 'B')
        g.rect(15, 16 + oy, 3, 1, 'k')
    else:
        # back of the head: draw a low ponytail hint
        g.ellipse(16, 14 + oy, 4, 5, 'h')
    _bow(g, oy)
    # neck
    g.rect(15, 17 + oy, 2, 1, 'S')
    # arms
    g.rect(9, 18 + oy, 2, 5, 'S')
    g.rect(21, 18 + oy, 2, 5, 'S')
    _dress(g, oy)
    _legs(g, phase, oy)
    return g.rows()


def girl_side(phase):
    g = Grid()
    oy = -1 if phase % 2 else 0
    cx = 15
    # hair (fuller at back / right)
    g.ellipse(cx + 1, 12 + oy, 8, 8, 'H')
    # face to the left
    g.ellipse(cx - 1, 12 + oy, 5.5, 6.5, 'S')
    g.rect(cx - 6, 5 + oy, 11, 3, 'H')
    g.ellipse(cx, 8 + oy, 6.5, 2.4, 'H')
    # single eye + nose + blush
    g.rect(cx - 4, 12 + oy, 2, 3, 'E')
    g.px(cx - 4, 12 + oy, 'W')
    g.px(cx - 6, 13 + oy, 'S')
    g.px(cx - 5, 15 + oy, 'B')
    _bow(g, oy, cx=cx + 1)
    g.rect(cx - 1, 17 + oy, 2, 1, 'S')
    # one arm forward
    g.rect(cx - 4, 18 + oy, 2, 5, 'S')
    # dress
    for yy in range(DRESS_TOP_Y, DRESS_HEM_Y + 1):
        t = (yy - DRESS_TOP_Y) / (DRESS_HEM_Y - DRESS_TOP_Y)
        half = 3 + t * 4
        g.rect(cx - half, yy + oy, 2 * half, 1, 'D')
        g.rect(cx + half - 2, yy + oy, 2, 1, 'd')
    # legs (side stride)
    sw = {0: 1, 1: 3, 2: 1, 3: -1}[phase]
    g.rect(cx - 2, 26 + oy, 2, 4, 'S')
    g.rect(cx - 3 - max(0, sw), 30, 3, 2, 'O')
    g.rect(cx + 1, 26 + oy, 2, 4, 'S')
    g.rect(cx + 1 + max(0, sw), 30, 3, 2, 'O')
    return g.rows()


def build_girl():
    d = os.path.join(BASE, 'characters', 'pacman')
    down = [girl_front(p) for p in range(4)]
    up = [girl_front(p, back=True) for p in range(4)]
    left = [girl_side(p) for p in range(4)]
    right = [mirror(f) for f in left]
    write_strip(os.path.join(d, 'pacman_down.svg'), down, GIRL_COLORS)
    write_strip(os.path.join(d, 'pacman_up.svg'), up, GIRL_COLORS)
    write_strip(os.path.join(d, 'pacman_left.svg'), left, GIRL_COLORS)
    write_strip(os.path.join(d, 'pacman_right.svg'), right, GIRL_COLORS)

    # death: a little spin, then poof into a shrinking heart
    hc = dict(GIRL_COLORS)
    hc.update(HEART_COLORS)
    def big(r):
        return heart_grid(r)
    death = [down[0], left[0], up[0], right[0],
             down[2], left[2], up[2], right[2],
             big(11), big(8), big(5), ['.' * TILE] * TILE]
    write_strip(os.path.join(d, 'pacman_death.svg'), death, hc)


# ===========================================================================
# CREATURES (Quiet Place-style)
# ===========================================================================
CREATURE_TINTS = {
    'blinky': ('#CDC3B7', '#9C9084'),   # ashen grey
    'pinky': ('#D6B9C2', '#A98A96'),    # pale rose-grey
    'inky': ('#B8CCCC', '#8AA2A2'),     # pale teal-grey
    'clyde': ('#D8C8A6', '#A99772'),    # sickly bone
}
CREATURE_BASE = {
    'o': '#241A18',   # deep outline / mouth
    'm': '#140A0D',   # mouth interior
    't': '#F2ECE2',   # teeth
    'W': '#FFFFFF',
    'P': '#241A18',
}
DIRS = ('up', 'down', 'left', 'right')


def _adj(hexc, f):
    """Lighten (f>0) or darken (f<0) a hex color."""
    hexc = hexc.lstrip('#')
    r, g, b = (int(hexc[i:i + 2], 16) for i in (0, 2, 4))
    if f >= 0:
        r, g, b = (int(c + (255 - c) * f) for c in (r, g, b))
    else:
        r, g, b = (int(c * (1 + f)) for c in (r, g, b))
    return f'#{r:02X}{g:02X}{b:02X}'


def _creature(phase, back=False, scared=False):
    """Hunched predator. Chars: g=highlight b=body s=shade k=deep o=outline."""
    g = Grid()
    oy = 1 if phase else 0
    astride = 1 if phase else 0
    # long clawed legs (drawn first, behind body)
    g.line(14, 23 + oy, 10 - astride, 31, 's', 3)
    g.line(18, 23 + oy, 22 + astride, 31, 's', 3)
    for fx in (9 - astride, 11 - astride, 21 + astride, 23 + astride):
        g.px(fx, 31, 'k')
    # long thin arms reaching down/forward, ending in claws
    g.line(11, 15 + oy, 5 - astride, 26, 'b', 2)
    g.line(21, 15 + oy, 27 + astride, 26, 'b', 2)
    for cx in (5 - astride, 27 + astride):
        g.px(cx, 27, 'k'); g.px(cx - 1, 28, 'k'); g.px(cx + 1, 28, 'k')
    # hunched torso with a spine ridge
    g.ellipse(16, 20 + oy, 5, 7, 'b')
    g.ellipse(17, 20 + oy, 4, 6, 's')
    g.line(15, 15 + oy, 17, 26 + oy, 'k', 1)      # spine
    for ry in range(16, 25, 2):                    # rib hints
        g.px(19, ry + oy, 'k')
    # big bowed head
    g.ellipse(16, 11 + oy, 8, 8, 'b')
    g.ellipse(13, 8 + oy, 4, 4, 'g')               # forehead highlight
    g.ellipse(20, 13 + oy, 4, 6, 's')              # cheek shadow
    g.ellipse(21, 15 + oy, 2.5, 4, 'k')
    g.outline('b', 'o')
    if back:
        # turned away: skull dome, no maw, hint of hunched shoulders
        g.ellipse(13, 9 + oy, 3, 3, 'g')
        g.line(16, 6 + oy, 16, 17 + oy, 'k', 1)
        return g.rows()
    # heavy brow ridge over the maw
    g.rect(10, 8 + oy, 12, 1, 'k')
    g.ellipse(16, 8 + oy, 6, 1.5, 'k')
    if scared:
        g.rect(12, 15 + oy, 8, 2, 'o')             # clamped worried mouth
        for xx in range(12, 20, 2):
            g.px(xx, 15 + oy, 't')
        g.px(12, 11 + oy, 'k'); g.px(19, 11 + oy, 'k')
        return g.rows()
    # gaping maw with jagged fangs
    g.ellipse(16, 13 + oy, 5.5, 4.5, 'm')
    g.ellipse(16, 15 + oy, 3.5, 2.5, 'o')          # dark throat
    for xx in range(11, 22, 2):                    # upper fangs (point down)
        g.px(xx, 9 + oy, 't'); g.px(xx + 1, 9 + oy, 't'); g.px(xx, 10 + oy, 't')
    for xx in range(11, 22, 2):                    # lower fangs (point up)
        g.px(xx, 17 + oy, 't'); g.px(xx + 1, 17 + oy, 't'); g.px(xx, 16 + oy, 't')
    return g.rows()


def _creature_palette(body, shade):
    return {
        **CREATURE_BASE,
        'g': _adj(body, 0.32),
        'b': body,
        's': shade,
        'k': _adj(shade, -0.42),
    }


def creature_strip(path, tint, direction):
    body, shade = tint
    back = direction == 'up'
    colors = _creature_palette(body, shade)
    write_strip(path, [_creature(0, back=back), _creature(1, back=back)], colors)


def _scared_frames(body, shade):
    colors = _creature_palette(body, shade)
    return [_creature(0, scared=True), _creature(1, scared=True)], colors


def build_creatures():
    gbase = os.path.join(BASE, 'characters', 'ghosts')
    for name, tint in CREATURE_TINTS.items():
        for d in DIRS:
            creature_strip(os.path.join(gbase, name, f'{name}_{d}.svg'), tint, d)
        if name == 'blinky':
            for d in DIRS:
                creature_strip(os.path.join(gbase, name, f'{name}_{d}_angry.svg'), tint, d)
                creature_strip(os.path.join(gbase, name, f'{name}_{d}_annoyed.svg'), tint, d)

    # eyes-only (defeated / returning-home): a pair of glowing eyes
    g = Grid()
    for cx in (11, 21):
        g.ellipse(cx, 14, 3, 4, 'W')
        g.ellipse(cx, 15, 1.4, 1.8, 'P')
    eye = g.rows()
    for d in DIRS:
        write_strip(os.path.join(gbase, f'eyes_{d}.svg'), [eye, eye], CREATURE_BASE)

    frames, colors = _scared_frames('#6E7ED6', '#4C5AB0')
    write_strip(os.path.join(gbase, 'scared_blue.svg'), frames, colors)
    frames, colors = _scared_frames('#FFFFFF', '#C9CCE6')
    write_strip(os.path.join(gbase, 'scared_white.svg'), frames, colors)


if __name__ == '__main__':
    build_hearts()
    build_girl()
    build_creatures()
    print('done')
