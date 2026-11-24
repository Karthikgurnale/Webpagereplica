const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
// 1. Scroll reveal
$$('.card,.head,.license,.faq details').forEach(e=>e.classList.add('rv'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv').forEach(e=>io.observe(e));
// 2. Count-up numbers
$$('[data-count]').forEach(el=>{const to=+el.dataset.count;let t0;
  const step=t=>{t0??=t;const p=Math.min((t-t0)/1400,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)};
  reduce?el.textContent=to:requestAnimationFrame(step)});
// 3. Card tilt on hover
if(!reduce&&matchMedia('(hover:hover)').matches)$$('.tilt').forEach(c=>{
  c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    c.style.transform=`perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`});
  c.addEventListener('pointerleave',()=>c.style.transform='')});
// 4. Scroll-linked journey: progress through the tall section drives steps, ship and day counter
const j=$('#journey'),steps=$$('#steps li'),fill=$('#fill'),boat=$('#boat'),day=$('#day');
function journey(){const r=j.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));
  fill.style.width=boat.style.left=p*100+'%';day.textContent='Day '+Math.round(p*35);
  const i=Math.min(steps.length-1,Math.floor(p*steps.length));steps.forEach((s,k)=>s.classList.toggle('on',k===i))}
addEventListener('scroll',journey,{passive:true});journey();
// 5. Quote form -> WhatsApp prefilled message
$('#qform').addEventListener('submit',e=>{e.preventDefault();
  const m=`Hi ImportNow, I'm ${$('#f-name').value}. I want to import: ${$('#f-cat').value}. Quantity: ${$('#f-qty').value||'n/a'}. Details: ${$('#f-msg').value||'n/a'}`;
  open('https://wa.me/919989724320?text='+encodeURIComponent(m),'_blank','noopener')});
