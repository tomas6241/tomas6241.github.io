'use client'

import {useState, useRef, useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function page() {

  const [img, $img] = useState('monkeys/waiting');
  const [how, $how] = useState(false);
  const [p, $p] = useState(null);
  const [moveCount, $moveCount] = useState(0);
  const [sadActive, $sadActive] = useState(false);
  const [sadAfterCount, $sadAfterCount] = useState(0);
  const [motivationActive, $motivationActive] = useState(false);
  const [motivationSrc, $motivationSrc] = useState('/monkeys/motivation.gif');

  const updteImg = (im) => {
    $img(im);
  }

  // Preload GIFs so hover/click swaps feel instant
  useEffect(() => {
    const files = [
      '/monkeys/waiting.gif',
      '/monkeys/excited.gif',
      '/monkeys/happy.gif',
      '/monkeys/bored.gif',
      '/monkeys/sad.gif',
      '/monkeys/motivation.gif',
      '/monkeys/motivation2.gif'
    ];

    const imgs = files.map((src) => {
      const i = new Image();
      i.src = src;
      return i;
    });

    // cleanup - allow GC
    return () => {
      imgs.forEach((i) => { i.src = ''; });
    };
  }, []);

  const router = useRouter();
  const hoverTimer = useRef(null);
  const navigateTimer = useRef(null);

  const moveButton = () => {
    const x = Math.random() * 90;
    const y = Math.random() * 90;
    $p({x: `${x}%`, y: `${y}%`});

    // increment move counter and trigger sad state when threshold reached
    $moveCount(prev => {
      const next = prev + 1;
      // if already sadActive, keep showing SAD and do not overwrite
      if (sadActive) {
        return next;
      }

      // if threshold reached, switch to SAD and lock it
      if (next >= 10) {
        updteImg('monkeys/sad');
        $how(true);
        $sadActive(true);
      } else {
        // show bored only when not sad yet
        updteImg('monkeys/bored');
      }

      return next;
    });

    // if sad is active, count moves after sad to trigger motivation
    if (sadActive && !motivationActive) {
      $sadAfterCount(prev => {
        const n = prev + 1;
          if (n >= 5) {
            $motivationSrc('/monkeys/motivation.gif');
            $motivationActive(true);
          }
        return n;
      });
    }
  };

  const onNoHover = () => {
    // move the button; moveButton will set bored and possibly sad when threshold is reached
    moveButton();
  }

  const dontdoit = () => {
    // clicking No moves the button; moveButton handles showing bored and triggering sad when threshold reached
    moveButton();
  }

  return (
    <div className='box'>
      <button className='joguinhos-btn' onClick={() => router.push('/jogos')}>
        Joguinhos 🎮
      </button>
  <img alt='gumball' className='gif' src={`/${img}.gif`} loading='eager' />
      {how ? 'Hmmmph, não há outra hipótese! Sorry not sorry :)' : 'Oiii queres ir num date comigoo? 😺💖'}
      <div className='btns'>
        <div className='yes'>
          <button
            onMouseOver={() => {
              // clear any existing hover timer
              if (hoverTimer.current) {
                clearTimeout(hoverTimer.current);
                hoverTimer.current = null;
              }

              // always show excited on hover and clear sad state
              updteImg('monkeys/excited');
              if (sadActive) {
                $sadActive(false);
              }

              // if motivation is visible, swap to motivation2
              if (motivationActive) {
                $motivationSrc('/monkeys/motivation2.gif');
              }
            }}
            onMouseOut={() => {
              // keep excited visible for a short moment so it feels responsive
              hoverTimer.current = setTimeout(() => {
                updteImg('monkeys/waiting');
                hoverTimer.current = null;
              }, 280);
            }}
            onClick={(e) => {
              // show happy gif, delay navigation so user sees it
              if (hoverTimer.current) {
                clearTimeout(hoverTimer.current);
                hoverTimer.current = null;
              }
              updteImg('monkeys/happy');
              // navigate after a short delay
              if (navigateTimer.current) clearTimeout(navigateTimer.current);
              navigateTimer.current = setTimeout(() => router.push('/yay'), 520);
            }}>
            Sim 😻
          </button>
        </div>
        <button className='no' 
          style={p ? {position: 'absolute', top: p.x, right: p.y} : null} 
          onClick={dontdoit} onMouseOver={onNoHover}>
            Não 😿
        </button> 
      </div>
      {motivationActive && (
        <div className='motivation' role='status' aria-live='polite'>
          <img alt='motivation' src={motivationSrc} loading='eager' />
          <div className='label'>
            {motivationSrc === '/monkeys/motivation2.gif' ? 'Issoo, desse botão gosto maisss 👀👀' : 'Está aqui uma motivação para ires 🔥🔥🔥'}
          </div>
        </div>
      )}
    </div>
  )
  
}