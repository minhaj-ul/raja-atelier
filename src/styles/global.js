const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:    #0f0e0c;
    --paper:  #f5f2ed;
    --cream:  #ede9e1;
    --gold:   #b8943f;
    --muted:  #8a8277;
    --border: #d8d3c8;
    --white:  #faf9f7;
    --fd: 'Cormorant Garamond', serif;
    --fb: 'Jost', sans-serif;
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--paper);
    color: var(--ink);
    font-family: var(--fb);
    font-weight: 300;
    -webkit-tap-highlight-color: transparent;
  }
  ::selection { background: var(--gold); color: var(--white); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--cream); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:none } }
  @keyframes fadeIn   { from { opacity:0 } to { opacity:1 } }
  @keyframes slideInR { from { transform:translateX(100%) } to { transform:none } }
  @keyframes slideInU { from { transform:translateY(100%) } to { transform:none } }
  @keyframes scaleIn  { from { opacity:0; transform:scale(.96) } to { opacity:1; transform:none } }

  .fade-up  { animation: fadeUp  .5s ease both; }
  .scale-in { animation: scaleIn .32s ease both; }
  .slide-r  { animation: slideInR .35s cubic-bezier(.4,0,.2,1) both; }
  .slide-u  { animation: slideInU .38s cubic-bezier(.4,0,.2,1) both; }
  .overlay  { animation: fadeIn .28s ease both; }

  /* Product card */
  .pcard {
    background: var(--white); border: 1px solid var(--border);
    overflow: hidden; transition: transform .3s ease, box-shadow .3s ease;
    cursor: pointer; position: relative;
  }
  @media (hover: hover) {
    .pcard:hover { transform: translateY(-4px); box-shadow: 0 18px 52px rgba(15,14,12,.13); }
    .pcard:hover .cimg { transform: scale(1.04); }
  }
  .cimg { transition: transform .6s ease; width:100%; aspect-ratio:3/4; object-fit:cover; display:block; }

  /* Buttons */
  .btn-dark {
    background: var(--ink); color: var(--paper); border: 1px solid var(--ink);
    padding: 12px 24px; font-family: var(--fb); font-weight: 400; font-size: 12px;
    letter-spacing: .12em; text-transform: uppercase; cursor: pointer;
    transition: background .22s, color .22s, border-color .22s;
    display: inline-flex; align-items: center; gap: 8px; white-space: nowrap;
  }
  .btn-dark:hover { background: var(--gold); border-color: var(--gold); }
  .btn-dark:active { opacity: .85; }
  .btn-out {
    background: transparent; color: var(--ink); border: 1px solid var(--ink);
    padding: 10px 22px; font-family: var(--fb); font-weight: 400; font-size: 12px;
    letter-spacing: .1em; text-transform: uppercase; cursor: pointer;
    transition: background .22s, color .22s;
  }
  .btn-out:hover { background: var(--ink); color: var(--paper); }

  /* Filter pill */
  .fpill {
    padding: 7px 15px; font-size: 12px; letter-spacing: .08em; text-transform: uppercase;
    cursor: pointer; border: 1px solid var(--border); background: transparent;
    color: var(--ink); font-family: var(--fb); transition: all .2s; white-space: nowrap;
  }
  .fpill.active { background: var(--ink); color: var(--paper); border-color: var(--ink); }

  /* Horizontal scroll row */
  .hscroll {
    display: flex; gap: 8px; overflow-x: auto; -webkit-overflow-scrolling: touch;
    scrollbar-width: none; padding-bottom: 2px;
  }
  .hscroll::-webkit-scrollbar { display: none; }

  input[type=search] {
    font-family: var(--fb); font-weight: 300; background: transparent;
    border: none; outline: none; color: var(--ink); width: 100%; font-size: 14px;
  }
  input::placeholder { color: var(--muted); }

  /* Mobile search expand */
  .mob-search {
    max-height: 0; overflow: hidden; transition: max-height .3s ease;
    background: var(--cream); border-bottom: 1px solid transparent;
  }
  .mob-search.open { max-height: 60px; border-bottom-color: var(--border); }

  /* Detail modal */
  .detail-wrap {
    position: fixed; z-index: 51; background: var(--white); overflow-y: auto;
    border-top: 3px solid var(--gold); animation: scaleIn .32s ease both;
  }
  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; }

  /* Filter bottom sheet */
  .filter-sheet {
    position: fixed; left: 0; right: 0; bottom: 0; z-index: 62;
    background: var(--white); border-top: 2px solid var(--gold);
    padding: 22px 20px 36px; animation: slideInU .32s cubic-bezier(.4,0,.2,1) both;
    max-height: 82vh; overflow-y: auto; border-radius: 16px 16px 0 0;
  }

  /* Toast */
  .toast {
    position: fixed; bottom: 22px; left: 50%; transform: translateX(-50%);
    background: var(--ink); color: var(--paper); padding: 12px 20px;
    font-family: var(--fb); font-size: 13px; letter-spacing: .06em; z-index: 300;
    display: flex; align-items: center; gap: 10px; border: 1px solid var(--gold);
    white-space: nowrap; animation: fadeUp .4s ease both;
    max-width: calc(100vw - 28px);
  }

  /* Responsive */
  @media (max-width: 639px) {
    .detail-wrap  { inset: 0; border-radius: 0; border-top: none; }
    .detail-grid  { grid-template-columns: 1fr; }
    .detail-close { top: 12px; right: 12px; position: fixed; z-index: 52; }
    .cart-panel   { border-top: 2px solid var(--gold); border-radius: 16px 16px 0 0; border-left: none !important; }
  }
  @media (min-width: 640px) and (max-width: 1023px) {
    .detail-wrap { inset: 3% 4%; }
  }
  @media (min-width: 1024px) {
    .detail-wrap { inset: 4% 6%; max-width: 1040px; margin: auto; }
  }
`;

export default globalStyles;