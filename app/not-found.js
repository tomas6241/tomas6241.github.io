export default function notFound() {
  return (
    <div className="box">
      <div className="date-label">mensagem numa garrafa</div>
      <div style={{ fontSize: 'clamp(4rem, 16vw, 7rem)', lineHeight: 1 }}>🍾</div>
      <h1 className="title">Esta onda levou a página… 🌊</h1>
      <p className="subtitle">Mas a praia continua logo ali.</p>
      <div style={{ marginTop: '10px' }}>
        <a className="btn-link" href="/">← Voltar à praia</a>
      </div>
    </div>
  )
}
