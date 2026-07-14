import Garden from '../../Garden'
import HeroFlower from '../../HeroFlower'

export default function GardenYay() {
  return (
    <div className="garden-archive">
      <Garden />
      <div className="garden-box">
        <HeroFlower mood="happy" />
        <h1 className="garden-title">Uuueeeebaaa~ vamos combinar o date de sextaaaaa 💖😺</h1>
        <p className="garden-subtitle">Hehehe adoro-te fofa 💘</p>
        <a className="garden-back" href="/garden">← Voltar ao jardim</a>
      </div>
    </div>
  )
}
