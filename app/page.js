'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import DateScene from './DateScene'

export default function Page() {
  const [mood, setMood] = useState('idle')
  const [how, setHow] = useState(false)
  const [pos, setPos] = useState(null)
  const [moveCount, setMoveCount] = useState(0)
  const [sadActive, setSadActive] = useState(false)
  const [motivation, setMotivation] = useState(0) // 0 none, 1 first, 2 stronger

  const router = useRouter()
  const hoverTimer = useRef(null)
  const navTimer = useRef(null)

  const runAway = () => {
    setPos({ top: `${Math.random() * 82 + 4}%`, left: `${Math.random() * 82 + 4}%` })
    setMood('sad')
    setMoveCount((prev) => {
      const next = prev + 1
      if (next >= 10 && !sadActive) { setHow(true); setSadActive(true) }
      if (sadActive) setMotivation((m) => (m === 0 ? 1 : m))
      return next
    })
  }

  const yesEnter = () => {
    if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null }
    setMood('excited')
    setSadActive(false)
    if (motivation === 1) setMotivation(2)
  }
  const yesLeave = () => {
    hoverTimer.current = setTimeout(() => { setMood('idle'); hoverTimer.current = null }, 300)
  }
  const yesClick = () => {
    if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null }
    setMood('happy')
    if (navTimer.current) clearTimeout(navTimer.current)
    navTimer.current = setTimeout(() => router.push('/yay'), 640)
  }

  return (
    <div className="box">
      <button className="joguinhos-btn" onClick={() => router.push('/jogos')}>
        Joguinhos 🎮
      </button>

      <div className="date-label">uma tarde só nossa</div>
      <DateScene mood={mood} />

      <h1 className="title">
        {how ? 'A maré já decidiu por ti… é um sim 🌊' : 'Margarida, queres ir num date comigo?'}
      </h1>
      {!how && (
        <p className="subtitle">Praia ao pôr do sol, cinema depois… ✨</p>
      )}

      <div className="btns">
        <button className="yes" onMouseOver={yesEnter} onMouseOut={yesLeave} onClick={yesClick}>
          Sim 😻
        </button>
        <button
          className="no"
          style={pos ? { position: 'absolute', ...pos } : null}
          onClick={runAway}
          onMouseOver={runAway}
        >
          Não 😿
        </button>
      </div>

      {motivation > 0 && (
        <div className="subtitle" role="status" aria-live="polite">
          {motivation === 2
            ? 'Esse botão combina muito mais contigo 👀💛'
            : 'Prometo areia, pipocas e uma tarde bonita contigo 🏖️🍿'}
        </div>
      )}
      <a className="archive-link" href="/garden">guardar um bocadinho do jardim 🌷</a>
    </div>
  )
}
