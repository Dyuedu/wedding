const weddingConfig = window.WEDDING_CONFIG || {};
const bindingTargets = document.querySelectorAll('[data-var]');
bindingTargets.forEach((el) => {
  const key = el.getAttribute('data-var');
  if (!key || !(key in weddingConfig)) return;
  const value = weddingConfig[key];
  if (el.hasAttribute('data-var-html')) {
    el.innerHTML = value;
  } else {
    el.textContent = value;
  }
});

const guestName = new URLSearchParams(window.location.search).get('guest');
const guestNameTargets = document.querySelectorAll('[data-guest-name]');
if (guestName && guestName.trim()) {
  guestNameTargets.forEach((el) => {
    el.textContent = guestName.trim();
  });
}

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.16});
reveals.forEach(el=>io.observe(el));

const layer = document.querySelector('.petal-layer');
function makePetal(){
  if (!layer) return;
  const p=document.createElement('span');
  p.className='petal';
  p.style.left=Math.random()*100+'vw';
  p.style.setProperty('--x',(Math.random()*160-80)+'px');
  p.style.animationDuration=(6+Math.random()*7)+'s';
  p.style.animationDelay=(Math.random()*1.2)+'s';
  p.style.transform=`rotate(${Math.random()*120}deg)`;
  layer.appendChild(p);
  setTimeout(()=>p.remove(),14000);
}
setInterval(makePetal,430);
for(let i=0;i<16;i++) setTimeout(makePetal,i*170);

const musicBtn=document.getElementById('musicBtn');
const bgMusic=document.getElementById('bgMusic');
if (musicBtn && bgMusic) {
  musicBtn.addEventListener('click', async ()=>{
    try{
      if(bgMusic.paused){ await bgMusic.play(); musicBtn.classList.add('playing'); musicBtn.textContent='♪'; }
      else{ bgMusic.pause(); musicBtn.classList.remove('playing'); musicBtn.textContent='♫'; }
    }catch(e){ musicBtn.textContent='♪'; musicBtn.classList.toggle('playing'); }
  });
}

const modal=document.getElementById('rsvpModal');
const rsvpClose=document.getElementById('rsvpClose');
if (modal) {
  if (rsvpClose) rsvpClose.onclick=()=>modal.classList.remove('show');
  modal.addEventListener('click',e=>{ if(e.target===modal) modal.classList.remove('show'); });
}

// Wishlist handling safely check elements
const list=document.getElementById('wishList');
const wishes=JSON.parse(localStorage.getItem('wedding-wishes')||'[]');
function renderWishes(){
  if (!list) return;
  list.innerHTML=wishes.map(w=>`<div class="wish-item"><b>${escapeHtml(w.name)}</b><span>${escapeHtml(w.text)}</span></div>`).join('');
}
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
renderWishes();
