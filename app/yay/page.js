export default function page() {

  return (
    <div className='box'>
      <img alt='yayyy' className='gif' src='/monkeys/happy.gif' />
      {"Uuueeeebaaa~ vamos combinar o date de sextaaaaa 💖😺"}
      <div style={{fontSize: '1.1rem', marginTop: '10px'}}>Hehehe adoro-te fofa 💘</div>

      <div style={{marginTop: '18px'}}>
        <a
          href='/jogos'
          style={{
            display: 'inline-block',
            textDecoration: 'none',
            background: 'linear-gradient(135deg, #bfefff 0%, #ffd0e8 100%)',
            color: '#042233',
            borderRadius: '14px',
            padding: '12px 26px',
            font: '900 1.4rem Jua',
            boxShadow: '0 6px 20px rgba(0, 140, 255, 0.12), 0 3px 10px rgba(255, 90, 180, 0.12)'
          }}
        >
          Joguinhos 🎮
        </a>
      </div>

    </div>
  )

}