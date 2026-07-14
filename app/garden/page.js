'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Garden from '../Garden'
import HeroFlower from '../HeroFlower'

export default function GardenArchive() {
  const [mood, setMood] = useState('idle')
  const [how, setHow] = useState(false)
  const [pos, setPos] = useState(null)
  const [, setMoveCount] = useState(0)
  const [sadActive, setSadActive] = useState(false)
  const [motivation, setMotivation] = useState(0)
  const router = useRouter()
  const hoverTimer = useRef(null)
  const navTimer = useRef(null)

  const runAway = () => {
    setPos({ top: `${Math.random() * 82 + 4}%`, left: `${Math.random() * 82 + 4}%` })
    setMood('sad')
    setMoveCount((previous) => {
      const next = previous + 1
      if (next >= 10 && !sadActive) {
        setHow(true)
        setSadActive(true)
      }
      if (sadActive) setMotivation((value) => value || 1)
      return next
    })
  }

  const yesEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    setMood('excited')
    setSadActive(false)
    if (motivation === 1) setMotivation(2)
  }

  const yesLeave = () => {
    hoverTimer.current = setTimeout(() => setMood('idle'), 300)
  }

  const yesClick = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    setMood('happy')
    if (navTimer.current) clearTimeout(navTimer.current)
    navTimer.current = setTimeout(() => router.push('/garden/yay'), 640)
  }

  return (
    <div className="garden-archive">
      <Garden />
      <div className="garden-box">
        <HeroFlower mood={mood} />
        <h1 className="garden-title">
          {how ? 'Hmmmph, não há outra hipótese! Sorry not sorry :)' : 'Oiii queres ir num date comigoo? 😺💖'}
        </h1>
        <div className="garden-btns">
          <button className="garden-yes" onMouseOver={yesEnter} onMouseOut={yesLeave} onClick={yesClick}>
            Sim 😻
          </button>
          <button
            className="garden-no"
            style={pos ? { position: 'fixed', ...pos } : null}
            onClick={runAway}
            onMouseOver={runAway}
          >
            Não 😿
          </button>
        </div>
        {motivation > 0 && (
          <p className="garden-subtitle" role="status" aria-live="polite">
            {motivation === 2
              ? 'Issoo, desse botão gosto maisss 👀👀'
              : 'Vá lá… eu prometo que não te vais arrepender! 🌷💗'}
          </p>
        )}
        <a className="garden-back" href="/">Ver a versão da praia →</a>
      </div>
    </div>
  )
}
