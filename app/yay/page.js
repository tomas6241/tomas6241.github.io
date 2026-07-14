import DateScene from '../DateScene'

export default function page() {
  return (
    <div className="box">
      <div className="date-label">date confirmado</div>
      <DateScene mood="happy" />
      <h1 className="title">Uuueeeebaaa~ temos date, Margarida! 💛</h1>
      <div className="plan-strip">
        <div className="plan-step">🏖️<br />Praia ao pôr do sol</div>
        <span className="plan-arrow">→</span>
        <div className="plan-step">🎬<br />Cinema e pipocas</div>
      </div>
      <p className="subtitle">Agora só tens de esperar! ehehehe</p>

      <div style={{ marginTop: '10px' }}>
        <a className="btn-link" href="/jogos">Joguinhos 🎮</a>
      </div>
    </div>
  )
}
