'use client'

// Snapshot of the original (v1.0) site with the monkey GIFs. It is intentionally
// self-contained: all styling lives in the scoped <style> block below (prefixed
// with .v1-root) so later redesigns of the global stylesheet never change it.

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OldHome() {
  const [img, $img] = useState('monkeys/waiting')
  const [how, $how] = useState(false)
  const [p, $p] = useState(null)
  const [, $moveCount] = useState(0)
  const [sadActive, $sadActive] = useState(false)
  const [, $sadAfterCount] = useState(0)
  const [motivationActive, $motivationActive] = useState(false)
  const [motivationSrc, $motivationSrc] = useState('/monkeys/motivation.gif')

  const updteImg = (im) => $img(im)

  useEffect(() => {
    const files = ['/monkeys/waiting.gif', '/monkeys/excited.gif', '/monkeys/happy.gif',
      '/monkeys/bored.gif', '/monkeys/sad.gif', '/monkeys/motivation.gif', '/monkeys/motivation2.gif']
    const imgs = files.map((src) => { const i = new Image(); i.src = src; return i })
    return () => { imgs.forEach((i) => { i.src = '' }) }
  }, [])

  const router = useRouter()
  const hoverTimer = useRef(null)
  const navigateTimer = useRef(null)

  const moveButton = () => {
    const x = Math.random() * 90
    const y = Math.random() * 90
    $p({ x: `${x}%`, y: `${y}%` })
    $moveCount((prev) => {
      const next = prev + 1
      if (sadActive) return next
      if (next >= 10) { updteImg('monkeys/sad'); $how(true); $sadActive(true) }
      else updteImg('monkeys/bored')
      return next
    })
    if (sadActive && !motivationActive) {
      $sadAfterCount((prev) => {
        const n = prev + 1
        if (n >= 5) { $motivationSrc('/monkeys/motivation.gif'); $motivationActive(true) }
        return n
      })
    }
  }

  return (
    <div className="v1-root">
      <style>{`
        .v1-root { position: fixed; inset: 0; overflow: auto; background: #05030a; color: #bfefff;
          display: grid; font: 900 3rem Jua, sans-serif; margin: 0; }
        .v1-box { display: grid; gap: 10px; margin: auto; place-items: center; text-align: center; padding: 16px; }
        .v1-gif { height: 350px; border-radius: 12px;
          box-shadow: 0 6px 30px rgba(255,128,200,.12), 0 3px 12px rgba(0,160,255,.06); }
        .v1-box img + * { font-size: 1.2rem; }
        .v1-btns { display: flex; gap: 40px; width: 60%; align-items: center; }
        .v1-yes { margin-right: auto; }
        .v1-no { transition: .4s all; z-index: 40; }
        .v1-root button { background: linear-gradient(135deg, #bfefff 0%, #ffd0e8 100%); border: none;
          border-radius: 14px; color: #042233; cursor: pointer; font: 900 2rem Jua, sans-serif;
          padding: 14px 34px; box-shadow: 0 6px 20px rgba(0,140,255,.12), 0 3px 10px rgba(255,90,180,.12);
          transition: transform .12s ease, box-shadow .12s ease; }
        .v1-root button:hover { transform: translateY(-4px); }
        .v1-motivation { position: fixed; top: 12px; right: 12px; display: flex; flex-direction: column;
          align-items: center; gap: 6px; font-size: .9rem; color: #bfefff; z-index: 30; pointer-events: none; }
        .v1-motivation img { width: 300px; height: auto; border-radius: 10px;
          box-shadow: 0 10px 30px rgba(255,90,180,.14), 0 6px 24px rgba(0,140,255,.08); }
        .v1-motivation .label { font-size: 1rem; background: rgba(4,34,51,.5); padding: 6px 10px; border-radius: 999px; }
        .v1-badge { position: fixed; bottom: 12px; left: 12px; font-size: .8rem; opacity: .5; }
        @media (max-width: 600px) { .v1-root { font-size: 2rem } .v1-gif { height: 260px } .v1-btns { width: 90% } }
      `}</style>

      <div className="v1-box">
        <img alt="gumball" className="v1-gif" src={`/${img}.gif`} loading="eager" />
        {how ? 'Hmmmph, não há outra hipótese! Sorry not sorry :)' : 'Oiii queres ir num date comigoo? 😺💖'}
        <div className="v1-btns">
          <div className="v1-yes">
            <button
              onMouseOver={() => {
                if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null }
                updteImg('monkeys/excited')
                if (sadActive) $sadActive(false)
                if (motivationActive) $motivationSrc('/monkeys/motivation2.gif')
              }}
              onMouseOut={() => {
                hoverTimer.current = setTimeout(() => { updteImg('monkeys/waiting'); hoverTimer.current = null }, 280)
              }}
              onClick={() => {
                if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null }
                updteImg('monkeys/happy')
                if (navigateTimer.current) clearTimeout(navigateTimer.current)
                navigateTimer.current = setTimeout(() => router.push('/yay'), 520)
              }}>
              Sim 😻
            </button>
          </div>
          <button className="v1-no"
            style={p ? { position: 'absolute', top: p.x, right: p.y } : null}
            onClick={moveButton} onMouseOver={moveButton}>
            Não 😿
          </button>
        </div>
        {motivationActive && (
          <div className="v1-motivation" role="status" aria-live="polite">
            <img alt="motivation" src={motivationSrc} loading="eager" />
            <div className="label">
              {motivationSrc === '/monkeys/motivation2.gif' ? 'Issoo, desse botão gosto maisss 👀👀' : 'Está aqui uma motivação para ires 🔥🔥🔥'}
            </div>
          </div>
        )}
      </div>
      <div className="v1-badge">v1.0</div>
    </div>
  )
}
