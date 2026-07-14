// Decorative, non-interactive garden background shared by every page:
// flowers that "grow" in from the bottom and sway, plus petals/hearts drifting up.

function Flower({ pos, scale, color, core, delay, dur }) {
  return (
    <div
      className="flower"
      style={{ ...pos, '--scale': scale, '--delay': delay, '--dur': dur }}
    >
      <svg className="flower-svg" viewBox="0 0 60 120" width="60" height="120" aria-hidden="true">
        <path className="stem" d="M30 120 C 27 92 33 70 30 46" />
        <path className="leaf" d="M30 88 q -22 -4 -27 -22 q 22 0 27 22" />
        <path className="leaf leaf-r" d="M30 76 q 22 -4 27 -22 q -22 0 -27 22" />
        <g className="head" transform="translate(30 32)">
          <g style={{ fill: color }}>
            <ellipse cx="0" cy="-14" rx="7" ry="13" />
            <ellipse cx="0" cy="-14" rx="7" ry="13" transform="rotate(60)" />
            <ellipse cx="0" cy="-14" rx="7" ry="13" transform="rotate(120)" />
            <ellipse cx="0" cy="-14" rx="7" ry="13" transform="rotate(180)" />
            <ellipse cx="0" cy="-14" rx="7" ry="13" transform="rotate(240)" />
            <ellipse cx="0" cy="-14" rx="7" ry="13" transform="rotate(300)" />
          </g>
          <circle r="8" style={{ fill: core }} />
        </g>
      </svg>
    </div>
  )
}

const FLOWERS = [
  { pos: { left: '2%' }, scale: 1.05, color: '#ff7fb0', core: '#ffd24d', delay: '0s', dur: '5s' },
  { pos: { left: '12%' }, scale: 0.68, color: '#ffa6d2', core: '#ffe08a', delay: '.3s', dur: '6s' },
  { pos: { left: '23%' }, scale: 0.85, color: '#c98bff', core: '#ffd24d', delay: '.15s', dur: '5.5s' },
  { pos: { left: '35%' }, scale: 0.6, color: '#ff9ec4', core: '#ffe08a', delay: '.45s', dur: '6.4s' },
  { pos: { right: '3%' }, scale: 1.1, color: '#ff6fa5', core: '#ffe08a', delay: '.1s', dur: '5.2s' },
  { pos: { right: '14%' }, scale: 0.72, color: '#ffb3c6', core: '#ffd24d', delay: '.35s', dur: '6.2s' },
  { pos: { right: '25%' }, scale: 0.9, color: '#b98bff', core: '#ffe08a', delay: '.2s', dur: '5.7s' },
  { pos: { right: '37%' }, scale: 0.58, color: '#ffa6d2', core: '#ffd24d', delay: '.5s', dur: '6.6s' },
]

const FLOATERS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 6.3 + 2) % 100,
  size: 10 + (i % 4) * 4,
  dur: 9 + (i % 5) * 1.6,
  delay: -(i * 1.3),
  heart: i % 3 === 0,
}))

export default function Garden() {
  return (
    <div className="garden-bg" aria-hidden="true">
      <div className="floaters">
        {FLOATERS.map((f, i) => (
          <span
            key={i}
            className={`floater ${f.heart ? 'heart' : 'petal'}`}
            style={{
              left: `${f.left}%`,
              '--size': `${f.size}px`,
              '--dur': `${f.dur}s`,
              '--delay': `${f.delay}s`,
            }}
          >
            {f.heart ? '\u2665' : ''}
          </span>
        ))}
      </div>
      <div className="flowers">
        {FLOWERS.map((f, i) => (
          <Flower key={i} {...f} />
        ))}
      </div>
    </div>
  )
}
