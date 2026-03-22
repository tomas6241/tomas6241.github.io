"use client"

import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    // Redirect to the static game page. Use replace so back button doesn't return here.
    const target = '/fun/web-pacman-main/index.html'
    try {
      window.location.replace(target)
    } catch (e) {
      // If window not available for any reason, nothing to do
      // The UI below provides a fallback link and iframe.
      console.error('Redirect failed', e)
    }
  }, [])

  return (
    <div className="box">
      <h2>Redirecionando para o jogo…</h2>
      <p>
        Se não for redirecionado automaticamente,
        <a href="/fun/web-pacman-main/index.html" style={{color: '#bfefff', textDecoration: 'underline', marginLeft: '6px'}}>clique aqui</a>
      </p>

      <div style={{marginTop: '18px'}}>
        {/* Fallback iframe so users without automatic redirect can still play */}
        <iframe
          title="Pacman"
          src="/fun/web-pacman-main/index.html"
          style={{width: '100%', height: '70vh', border: 'none'}}
        />
      </div>
    </div>
  )
}
// Note: kept only the redirect + iframe fallback above. The previous placeholder page
// was removed to avoid duplicate default exports which break static export.
