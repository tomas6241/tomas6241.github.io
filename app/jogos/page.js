'use client'

import { useRouter } from 'next/navigation'

export default function Jogos() {
  const router = useRouter()
  // The games are static HTML apps under /public, so they aren't Next routes:
  // navigate to them with a full page load.
  const openGame = (url) => { window.location.href = url }

  return (
    <div className="box">
      <div>Joguinhos 🎮💖</div>
      <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>
        Escolhe um jogo para a Margarida:
      </div>

      <div
        className="btns"
        style={{ width: 'auto', justifyContent: 'center', flexWrap: 'wrap', gap: '24px' }}
      >
        <button
          style={{ fontSize: '1.4rem' }}
          onClick={() => openGame('/fun/web-pacman-main/index.html')}
        >
          💗 Apanha os Corações
        </button>
        <button
          style={{ fontSize: '1.4rem' }}
          onClick={() => openGame('/fun/runner/index.html')}
        >
          🏃‍♀️ A Fuga da Margarida
        </button>
      </div>

      <button
        onClick={() => router.push('/')}
        style={{
          marginTop: '10px',
          fontSize: '1rem',
          padding: '8px 18px',
          background: 'transparent',
          boxShadow: 'none',
          color: '#bfefff'
        }}
      >
        ← Voltar
      </button>
    </div>
  )
}
