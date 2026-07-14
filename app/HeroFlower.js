// A cute flower "character" whose face + posture react to a mood prop:
// 'idle' | 'excited' | 'happy' | 'sad'. Pure markup (no hooks) so it can be
// used from both client and server components.

const PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]

export default function HeroFlower({ mood = 'idle' }) {
  const happy = mood === 'happy'
  const sad = mood === 'sad'
  const excited = mood === 'excited'

  return (
    <div className={`hero ${mood}`} aria-hidden="true">
      {(excited || happy) && (
        <div className="hero-hearts"><span>♥</span><span>♥</span><span>♥</span></div>
      )}
      <svg className="hero-svg" viewBox="0 0 120 172" width="120" height="172">
        <g className="hero-inner">
          <path d="M60 172 C 55 132 65 112 60 84" fill="none" stroke="#45b06f" strokeWidth="8" strokeLinecap="round" />
          <path d="M60 128 q -34 -8 -42 -34 q 34 0 42 34" fill="#55c983" />
          <path d="M60 112 q 34 -8 42 -34 q -34 0 -42 34" fill="#3fa564" />

          <g className="petg">
            {PETAL_ANGLES.map((a) => (
              <ellipse key={a} cx="60" cy="24" rx="14" ry="27" transform={`rotate(${a} 60 54)`}
                fill="#ff7fb0" stroke="#ff5c93" strokeWidth="1.5" />
            ))}
          </g>

          <circle cx="60" cy="54" r="23" fill="#ffd76b" stroke="#f2b63c" strokeWidth="2" />

          {happy ? (
            <g stroke="#5a2b45" strokeWidth="3" fill="none" strokeLinecap="round">
              <path d="M48 52 q5 -6 10 0" />
              <path d="M62 52 q5 -6 10 0" />
            </g>
          ) : (
            <g fill="#5a2b45">
              <circle cx="52" cy="51" r="3.6" />
              <circle cx="68" cy="51" r="3.6" />
              <circle cx="53.2" cy="49.8" r="1.1" fill="#fff" />
              <circle cx="69.2" cy="49.8" r="1.1" fill="#fff" />
            </g>
          )}

          {(excited || happy) && (
            <g fill="#ff8fb4" opacity="0.6">
              <ellipse cx="45" cy="59" rx="4.5" ry="2.8" />
              <ellipse cx="75" cy="59" rx="4.5" ry="2.8" />
            </g>
          )}

          {sad ? (
            <path d="M52 66 q8 -6 16 0" fill="none" stroke="#b03b5e" strokeWidth="3" strokeLinecap="round" />
          ) : happy ? (
            <path d="M49 60 q11 13 22 0 q-11 5 -22 0" fill="#b03b5e" />
          ) : excited ? (
            <path d="M52 60 q8 10 16 0 q-8 3 -16 0" fill="#b03b5e" />
          ) : (
            <path d="M53 62 q7 6 14 0" fill="none" stroke="#b03b5e" strokeWidth="3" strokeLinecap="round" />
          )}

          {sad && <path d="M51 55 q-2.5 6 0 9 q2.5 -3 0 -9" fill="#7ec8ff" />}
        </g>
      </svg>
    </div>
  )
}
