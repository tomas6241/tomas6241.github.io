import './style.css'
import './beach.css'
import BeachScene from './BeachScene'

export default function layout({children}) {

  return (
    <html lang='pt'>
      <head>
        <link rel='icon' type='image/svg+xml' href='/heart.svg' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Jua&family=Quicksand:wght@500;700&display=swap' />
      </head>
      <body id='app'>
        <BeachScene />
        <main className='page'>{children}</main>
      </body>
    </html>
  )

}