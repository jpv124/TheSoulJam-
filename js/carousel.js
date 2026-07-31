// carousel.js
// Video carousel for The Soul Jam Live Band — plays each video to the end before advancing.

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const track = carousel.querySelector('.carousel-track');
  const items = Array.from(track.querySelectorAll('.carousel-item'));
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const dotsWrap = carousel.querySelector('.carousel-dots');

  let current = 0;

  // build dots
  items.forEach((v, i) => {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Go to video ${i+1}`);
    btn.dataset.index = i;
    if (i === 0) btn.classList.add('active');
    dotsWrap.appendChild(btn);
  });

  const dots = Array.from(dotsWrap.children);

  function show(index){
    index = (index + items.length) % items.length;
    items.forEach((vid, i) => {
      vid.classList.toggle('active', i === index);
      if (i === index){
        vid.muted = true;
        vid.playsInline = true;
        // try to play; some browsers block autoplay until user interacts
        const promise = vid.play();
        if (promise && typeof promise.then === 'function'){
          promise.catch(() => { /* ignore autoplay block */ });
        }
      } else {
        try { vid.pause(); vid.currentTime = 0; } catch(e) { /* ignore */ }
      }
    });
    dots.forEach((d,i)=> d.classList.toggle('active', i===index));
    current = index;
  }

  function next(){ show((current+1) % items.length); }
  function prev(){ show((current-1 + items.length) % items.length); }

  // When the visible video ends, advance to the next
  items.forEach((vid, i) => {
    vid.muted = true;
    vid.addEventListener('ended', () => {
      if (i === current) next();
    });
  });

  // Controls
  nextBtn.addEventListener('click', () => next());
  prevBtn.addEventListener('click', () => prev());

  dots.forEach(d => d.addEventListener('click', (e) => {
    const idx = Number(e.currentTarget.dataset.index);
    show(idx);
  }));

  // Start on the first
  show(0);

  // Keyboard support
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Pause videos when the page is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden){
      items.forEach(v => v.pause());
    } else {
      const cur = items[current];
      if (cur) cur.play().catch(()=>{});
    }
  });
});
