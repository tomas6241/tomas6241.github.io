// Headless smoke test: load the game, click JOGAR, verify entities are built.
const { JSDOM, VirtualConsole } = require('jsdom');

const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', (e) => errors.push('jsdomError: ' + (e.detail || e.message)));

JSDOM.fromURL('http://localhost:8123/', {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  virtualConsole: vc,
}).then((dom) => {
  const { window } = dom;
  window.HTMLMediaElement.prototype.play = () => Promise.resolve();
  window.HTMLMediaElement.prototype.pause = () => {};
  window.HTMLMediaElement.prototype.load = () => {};

  const done = () => {
    const gc = window.gameCoordinator;
    const startBtn = window.document.getElementById('game-start');
    try {
      startBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    } catch (e) { errors.push('click threw: ' + e.message); }

    setTimeout(() => {
      const dots = window.document.getElementById('dot-container').childElementCount;
      const pacman = window.document.getElementById('pacman');
      const blinky = window.document.getElementById('blinky');
      console.log('GameCoordinator :', !!gc);
      console.log('dot elements    :', dots);
      console.log('remainingDots   :', gc && gc.remainingDots);
      console.log('girl bg         :', pacman && pacman.style.backgroundImage);
      console.log('monster bg      :', blinky && blinky.style.backgroundImage);
      console.log('non-audio errors:', errors.filter((e) => !/AudioContext/.test(e)));
      const ok = !!gc && dots > 100 && pacman.style.backgroundImage && blinky.style.backgroundImage;
      console.log(ok ? '\nRESULT: PASS' : '\nRESULT: FAIL');
      process.exit(ok ? 0 : 1);
    }, 1500);
  };
  if (window.gameCoordinator) done();
  else window.addEventListener('load', () => setTimeout(done, 300));
}).catch((e) => { console.error('fatal:', e); process.exit(2); });
