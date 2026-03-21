export default function page() {

  return (
    <div className='box'>
      <h2 style={{fontSize: '2rem'}}>Mini página de entretenimento</h2>
      <p style={{maxWidth: 600, textAlign: 'center'}}>
        Aqui vai ficar uma versão alternativa do Pacman que vamos construir com calma. Por agora, é só um placeholder com alguns detalhes sobre o jogo.
      </p>

      <div style={{marginTop: 16}}>
        <strong>Proposta:</strong>
        <ul style={{textAlign: 'left'}}>
          <li>Jogabilidade inspirada no Pacman</li>
          <li>Níveis pequenos e coloridos</li>
          <li>Power-ups com efeitos fofos 💖</li>
        </ul>
      </div>

      <div style={{marginTop: 20}}>
        <a href='/' style={{color: '#bfefff', textDecoration: 'underline'}}>Voltar</a>
      </div>
    </div>
  )

}
