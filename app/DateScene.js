export default function DateScene({ mood = 'idle' }) {
  return (
    <div className={`date-scene ${mood}`} aria-hidden="true">
      <div className="scene-hearts"><span>♥</span><span>♥</span><span>♥</span></div>
      <svg viewBox="0 0 420 245" role="img">
        <defs>
          <linearGradient id="postcardSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff9f8f" />
            <stop offset="0.52" stopColor="#ffd49d" />
            <stop offset="1" stopColor="#8bc9d2" />
          </linearGradient>
          <linearGradient id="postcardSea" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#54b8c7" />
            <stop offset="1" stopColor="#176b86" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#713d50" floodOpacity=".22" />
          </filter>
        </defs>

        <rect className="postcard" x="8" y="8" width="404" height="229" rx="28" fill="url(#postcardSky)" />
        <circle className="scene-sun" cx="324" cy="77" r="34" fill="#fff1ad" />
        <path d="M8 135 Q72 124 142 137 T276 134 T412 137 V237 H8Z" fill="url(#postcardSea)" />
        <g className="scene-wave" fill="none" stroke="#d9ffff" strokeWidth="4" strokeLinecap="round" opacity=".8">
          <path d="M12 153 Q42 143 72 153 T132 153 T192 153 T252 153 T312 153 T372 153 T422 153" />
          <path d="M12 175 Q40 166 68 175 T124 175 T180 175 T236 175 T292 175 T348 175 T420 175" opacity=".55" />
        </g>
        <path d="M8 193 Q80 174 151 195 T286 191 T412 195 V237 H8Z" fill="#f5d69c" />

        <g className="umbrella" filter="url(#softShadow)">
          <path d="M108 194 L143 83" stroke="#684957" strokeWidth="6" strokeLinecap="round" />
          <path d="M68 102 Q107 56 167 87 Q142 84 129 107 Q105 89 68 102Z" fill="#ff596e" />
          <path d="M68 102 Q107 56 167 87 Q137 63 129 107 Q104 77 68 102Z" fill="#ffcf73" opacity=".95" />
        </g>

        <g className="blanket" filter="url(#softShadow)">
          <path d="M177 204 L289 198 L324 229 L159 229Z" fill="#f56f79" />
          <path d="M197 203 L217 228 M238 201 L254 228 M280 200 L294 228" stroke="#ffd5c5" strokeWidth="5" opacity=".75" />
        </g>

        <g className="cinema-kit" filter="url(#softShadow)">
          <g transform="translate(238 166) rotate(5)">
            <path d="M0 0 H42 L37 48 H5Z" fill="#fff4e7" />
            <path d="M3 2 H11 L9 45 H3 M18 2 H27 L26 46 H17 M34 2 H41 L37 45 H31" fill="#e64b5d" />
            <g fill="#fff0a8">
              <circle cx="7" cy="2" r="7" /><circle cx="18" cy="0" r="8" />
              <circle cx="30" cy="2" r="8" /><circle cx="39" cy="1" r="7" />
            </g>
          </g>
          <g className="ticket" transform="translate(285 171) rotate(-9)">
            <path d="M0 6 Q7 6 7 0 H68 Q68 7 75 7 V35 Q68 35 68 42 H7 Q7 36 0 36Z" fill="#ffe18b" />
            <path d="M52 5 V37" stroke="#c8874d" strokeWidth="2" strokeDasharray="4 4" />
            <text x="27" y="26" textAnchor="middle" fill="#8d4d54" fontSize="12" fontWeight="700">CINEMA</text>
          </g>
        </g>

        <g className="little-hearts" fill="#ff4f79">
          <path d="M199 167 C187 157 174 174 199 190 C224 174 211 157 199 167Z" />
          <path d="M219 148 C213 143 206 151 219 160 C232 151 225 143 219 148Z" opacity=".75" />
        </g>

        <g className="scene-birds" fill="none" stroke="#654a5a" strokeWidth="3" strokeLinecap="round">
          <path d="M54 62 q9 -9 18 0 q9 -9 18 0" />
          <path d="M189 49 q6 -6 12 0 q6 -6 12 0" />
        </g>
      </svg>
    </div>
  )
}
