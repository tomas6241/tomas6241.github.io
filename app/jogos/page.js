'use client'

import { useRouter } from 'next/navigation'

export default function Jogos() {
  const router = useRouter()
  // The games are static HTML apps under /public, so they aren't Next routes:
  // navigate to them with a full page load.
  const openGame = (url) => { window.location.href = url }

  return (
    <div className="box">
      <div className="date-label">intervalo antes do filme</div>
      <h1 className="title">Joguinhos à beira-mar 🎮🌊</h1>
      <p className="subtitle">Escolhe um jogo, Margarida 💖</p>

      <div className="game-buttons">
        <button onClick={() => openGame('/fun/web-pacman-main/index.html')}>
          💗 Apanha os Corações
        </button>
        <button onClick={() => openGame('/fun/runner/index.html')}>
          🏃‍♀️ A Fuga da Margarida
        </button>
      </div>

      <button className="ghost-btn" onClick={() => router.push('/')}>
        ← Voltar
      </button>
    </div>
  )
}
