const GLINTS = Array.from({ length: 9 }, (_, index) => ({
  left: `${8 + index * 11}%`,
  top: `${42 + (index % 3) * 7}%`,
  delay: `${-index * 0.45}s`,
}))

export default function BeachScene() {
  return (
    <div className="beach-bg" aria-hidden="true">
      <div className="sunset-sun" />
      <div className="cloud cloud-one" />
      <div className="cloud cloud-two" />
      <div className="birds birds-one">⌁</div>
      <div className="birds birds-two">⌁</div>

      <div className="ocean">
        {GLINTS.map((glint, index) => (
          <span key={index} className="sea-glint" style={glint} />
        ))}
        <div className="wave wave-back" />
        <div className="wave wave-front" />
      </div>

      <div className="shore">
        <span className="shell shell-one">◒</span>
        <span className="shell shell-two">⋆</span>
        <span className="shell shell-three">◡</span>
      </div>
      <div className="film-frame film-frame-left" />
      <div className="film-frame film-frame-right" />
    </div>
  )
}
