// spinwheel.js — Manhattan Likit Çark Çevir Widget
// GitHub Pages'e deploy edilir, manhattandan.com'a embed
(function(){
'use strict';

var GAS_URL='https://script.google.com/macros/s/AKfycbxJKzibWzYOmapPvghMPxbt9u5vjGQyxCXZae4FKfUEsjCMIWEqkyI2CM_CovOGrzTbXQ/exec';

// Segment görsel ayarları (ödül mantığı GAS'ta)
var SEGS=[
  {label:'%3',sub:'İNDİRİM',color:'#292118',text:'#d4b05e',icon:''},
  {label:'HEDİYE',sub:'Manhattan Likit',color:'#5c1018',text:'#ffd700',icon:'🎁',grand:true},
  {label:'%2',sub:'İNDİRİM',color:'#1e1a14',text:'#c9a24e',icon:''},
  {label:'ÜCRETSİZ',sub:'KARGO',color:'#292118',text:'#d4b05e',icon:''},
  {label:'%5',sub:'İNDİRİM',color:'#1e1a14',text:'#c9a24e',icon:''},
  {label:'TEKRAR',sub:'DENE',color:'#292118',text:'#8a8070',icon:''},
  {label:'%10',sub:'İNDİRİM',color:'#1e1a14',text:'#d4b05e',icon:''},
  {label:'%3',sub:'İNDİRİM',color:'#292118',text:'#c9a24e',icon:''}
];
var SEG_COUNT=8;
var SEG_ANGLE=360/SEG_COUNT; // 45°

// ============= CSS =============
var css=`
.sw-trigger{position:fixed;bottom:80px;right:24px;width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#af8c3e,#d4b05e);border:2px solid rgba(255,255,255,.15);cursor:pointer;z-index:999998;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(175,140,62,.4),0 0 0 0 rgba(212,176,94,.4);transition:all .3s ease;animation:sw-pulse 2.5s ease-in-out infinite}
.sw-trigger:hover{transform:scale(1.1);box-shadow:0 6px 28px rgba(175,140,62,.5)}
.sw-trigger svg{width:26px;height:26px;fill:none;stroke:#fff;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
@keyframes sw-pulse{0%,100%{box-shadow:0 4px 20px rgba(175,140,62,.4),0 0 0 0 rgba(212,176,94,.4)}50%{box-shadow:0 4px 20px rgba(175,140,62,.4),0 0 0 10px rgba(212,176,94,0)}}

.sw-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(24px) saturate(180%);-webkit-backdrop-filter:blur(24px) saturate(180%);z-index:1000001;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:all .35s ease;padding:16px}
.sw-overlay.open{opacity:1;visibility:visible}
.sw-overlay.open .sw-main{transform:scale(1)}
.sw-main{transform:scale(.85);transition:transform .4s cubic-bezier(.34,1.56,.64,1);display:flex;flex-direction:column;align-items:center;max-width:480px;width:100%}

.sw-title{font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;color:#d4b05e;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;text-align:center;text-shadow:0 2px 8px rgba(0,0,0,.5)}
.sw-close{position:fixed;top:20px;right:20px;width:36px;height:36px;border-radius:50%;border:none;background:rgba(255,255,255,.1);color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;transition:background .2s}
.sw-close:hover{background:rgba(255,255,255,.2)}

.sw-wheel-wrap{position:relative;width:min(85vw,420px);height:min(85vw,420px);margin:0 auto}
.sw-pointer{position:absolute;top:-14px;left:50%;transform:translateX(-50%);z-index:5;filter:drop-shadow(0 3px 6px rgba(0,0,0,.4))}
.sw-wheel-container{width:100%;height:100%;transition:none;will-change:transform}
.sw-wheel-container.spinning{transition:transform cubic-bezier(.17,.67,.12,.99)}
.sw-canvas{width:100%;height:100%;border-radius:50%;box-shadow:0 0 60px rgba(175,140,62,.25),inset 0 0 30px rgba(0,0,0,.3)}

.sw-spin-btn{margin-top:20px;padding:14px 48px;border-radius:28px;border:2px solid #d4b05e;background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-size:16px;font-weight:700;letter-spacing:1px;cursor:pointer;text-transform:uppercase;box-shadow:0 4px 20px rgba(175,140,62,.4);transition:all .2s}
.sw-spin-btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(175,140,62,.5)}
.sw-spin-btn:disabled{opacity:.5;cursor:not-allowed;transform:none}

.sw-email-wrap{margin-top:12px;display:flex;gap:8px;width:100%;max-width:340px}
.sw-email-input{flex:1;padding:10px 14px;border-radius:12px;border:1px solid rgba(212,176,94,.3);background:rgba(255,255,255,.08);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;outline:none;transition:border .2s}
.sw-email-input:focus{border-color:#d4b05e}
.sw-email-input::placeholder{color:rgba(255,255,255,.35)}

.sw-prize{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:all .4s ease;z-index:20}
.sw-prize.show{opacity:1;visibility:visible}
.sw-prize-card{background:linear-gradient(145deg,#1c1917,#292524);border:2px solid #d4b05e;border-radius:24px;padding:32px 28px;text-align:center;max-width:340px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,.5)}
.sw-prize-emoji{font-size:48px;margin-bottom:12px}
.sw-prize-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:800;color:#d4b05e;margin-bottom:6px}
.sw-prize-sub{font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;color:rgba(255,255,255,.6);margin-bottom:20px}
.sw-prize-code{background:#1a1815;border:2px dashed #d4b05e;border-radius:12px;padding:12px 20px;font-family:monospace;font-size:20px;font-weight:700;color:#d4b05e;letter-spacing:2px;cursor:pointer;transition:all .2s;position:relative}
.sw-prize-code:hover{background:#292118}
.sw-prize-code .sw-copied{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#1a1815;border-radius:10px;color:#4ade80;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;letter-spacing:0;opacity:0;transition:opacity .2s}
.sw-prize-code .sw-copied.show{opacity:1}
.sw-prize-exp{font-size:11px;color:rgba(255,255,255,.4);margin-top:10px}
.sw-prize-close{margin-top:16px;padding:10px 32px;border-radius:20px;border:1px solid rgba(255,255,255,.15);background:transparent;color:rgba(255,255,255,.7);font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;cursor:pointer;transition:all .2s}
.sw-prize-close:hover{background:rgba(255,255,255,.05);color:#fff}

.sw-msg{font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;color:rgba(255,255,255,.5);margin-top:10px;text-align:center;min-height:18px}
.sw-msg.err{color:#f87171}

.sw-confetti{position:fixed;inset:0;pointer-events:none;z-index:1000002}

@media(max-width:640px){
  .sw-trigger{bottom:72px;right:16px;width:46px;height:46px}
  .sw-trigger svg{width:22px;height:22px}
  .sw-wheel-wrap{width:88vw;height:88vw}
  .sw-spin-btn{padding:12px 36px;font-size:14px}
  .sw-close{top:12px;right:12px}
  .sw-title{font-size:11px;margin-bottom:10px}
}
`;

// ============= DOM =============
function injectCSS(){
  if(document.getElementById('sw-css'))return;
  var s=document.createElement('style');s.id='sw-css';s.textContent=css;
  document.head.appendChild(s);
}

function createDOM(){
  // Trigger button
  var btn=document.createElement('button');
  btn.className='sw-trigger';
  btn.id='sw-trigger';
  btn.setAttribute('aria-label','Çark Çevir');
  btn.innerHTML='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/><circle cx="12" cy="12" r="2" fill="#fff"/></svg>';
  btn.onclick=function(e){e.stopPropagation();openWheel()};
  document.body.appendChild(btn);

  // Overlay
  var ov=document.createElement('div');
  ov.className='sw-overlay';
  ov.id='sw-overlay';
  ov.onclick=function(e){if(e.target===ov)closeWheel()};

  ov.innerHTML=
    '<button class="sw-close" onclick="event.stopPropagation();window._swClose()">✕</button>'+
    '<div class="sw-main" onclick="event.stopPropagation()">'+
      '<div class="sw-title">✦ ŞANSINI DENE ✦</div>'+
      '<div class="sw-wheel-wrap" id="sw-wheel-wrap">'+
        '<svg class="sw-pointer" width="32" height="32" viewBox="0 0 32 32"><path d="M16 28L6 4h20z" fill="#d4b05e" stroke="#fff" stroke-width="1"/></svg>'+
        '<div class="sw-wheel-container" id="sw-wheel-container">'+
          '<canvas class="sw-canvas" id="sw-canvas" width="840" height="840"></canvas>'+
        '</div>'+
      '</div>'+
      '<button class="sw-spin-btn" id="sw-spin-btn" onclick="event.stopPropagation();window._swSpin()">ÇEVİR!</button>'+
      '<div class="sw-email-wrap" id="sw-email-wrap" style="display:none">'+
        '<input type="email" class="sw-email-input" id="sw-email-input" placeholder="E-posta adresiniz">'+
      '</div>'+
      '<div class="sw-msg" id="sw-msg"></div>'+
    '</div>'+
    '<div class="sw-prize" id="sw-prize" onclick="event.stopPropagation()">'+
      '<div class="sw-prize-card">'+
        '<div class="sw-prize-emoji" id="sw-prize-emoji">🎉</div>'+
        '<div class="sw-prize-title" id="sw-prize-title"></div>'+
        '<div class="sw-prize-sub" id="sw-prize-sub"></div>'+
        '<div class="sw-prize-code" id="sw-prize-code" onclick="event.stopPropagation();window._swCopy()" style="display:none"><span id="sw-prize-code-text"></span><div class="sw-copied" id="sw-copied">Kopyalandı!</div></div>'+
        '<div class="sw-prize-exp" id="sw-prize-exp"></div>'+
        '<button class="sw-prize-close" onclick="event.stopPropagation();window._swClose()">Kapat</button>'+
      '</div>'+
    '</div>';

  document.body.appendChild(ov);
  
  // Confetti canvas
  var cc=document.createElement('canvas');
  cc.className='sw-confetti';
  cc.id='sw-confetti';
  document.body.appendChild(cc);
}

// ============= CANVAS ÇARK =============
function drawWheel(){
  var canvas=document.getElementById('sw-canvas');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var W=canvas.width,H=canvas.height;
  var cx=W/2,cy=H/2;
  var outerR=W/2-8;
  var innerR=outerR-30;
  var segR=innerR-4;
  var centerR=55;

  ctx.clearRect(0,0,W,H);

  // Dış altın halka
  var grad=ctx.createLinearGradient(0,0,W,H);
  grad.addColorStop(0,'#d4b05e');
  grad.addColorStop(0.3,'#f5e6c8');
  grad.addColorStop(0.5,'#d4b05e');
  grad.addColorStop(0.7,'#af8c3e');
  grad.addColorStop(1,'#d4b05e');
  ctx.beginPath();
  ctx.arc(cx,cy,outerR,0,Math.PI*2);
  ctx.fillStyle=grad;
  ctx.fill();

  // İç koyu alan
  ctx.beginPath();
  ctx.arc(cx,cy,innerR,0,Math.PI*2);
  ctx.fillStyle='#1a1714';
  ctx.fill();

  // Segmentler
  for(var i=0;i<SEG_COUNT;i++){
    var startA=-Math.PI/2+i*(Math.PI*2/SEG_COUNT);
    var endA=startA+(Math.PI*2/SEG_COUNT);
    var seg=SEGS[i];

    // Segment arka plan
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,segR,startA,endA);
    ctx.closePath();
    
    if(seg.grand){
      var grd=ctx.createRadialGradient(cx,cy,centerR,cx,cy,segR);
      grd.addColorStop(0,'#7f1d1d');
      grd.addColorStop(1,'#5c1018');
      ctx.fillStyle=grd;
    }else{
      ctx.fillStyle=seg.color;
    }
    ctx.fill();

    // Segment ayırıcı çizgi
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    var ex=cx+Math.cos(startA)*segR;
    var ey=cy+Math.sin(startA)*segR;
    ctx.lineTo(ex,ey);
    ctx.strokeStyle='rgba(212,176,94,.25)';
    ctx.lineWidth=2;
    ctx.stroke();

    // Segment metni
    var midA=startA+(Math.PI/SEG_COUNT);
    ctx.save();
    ctx.translate(cx,cy);
    ctx.rotate(midA);

    // Alt yarıdaki dilimler için metni çevir (okunabilir kalsın)
    var normA=((midA%(Math.PI*2))+(Math.PI*2))%(Math.PI*2);
    var flipped=(normA>Math.PI/2&&normA<Math.PI*3/2);
    
    ctx.fillStyle=seg.text;
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    
    if(flipped){
      ctx.rotate(Math.PI);
      var textR=-segR*0.52;
    }else{
      var textR=segR*0.52;
    }
    
    if(seg.grand){
      ctx.font='bold 42px "Plus Jakarta Sans",-apple-system,sans-serif';
      ctx.fillText(seg.label,textR,0);
      ctx.font='600 18px "Plus Jakarta Sans",-apple-system,sans-serif';
      ctx.fillText(seg.sub,textR,flipped?-24:24);
    }else{
      ctx.font='bold 48px "Plus Jakarta Sans",-apple-system,sans-serif';
      ctx.fillText(seg.label,textR,seg.sub?-12:0);
      if(seg.sub){
        ctx.font='600 16px "Plus Jakarta Sans",-apple-system,sans-serif';
        ctx.globalAlpha=0.7;
        ctx.fillText(seg.sub,textR,flipped?-32:18);
        ctx.globalAlpha=1;
      }
    }
    ctx.restore();
  }

  // Son çizgi (segment 0 başlangıcı)
  var lastA=-Math.PI/2;
  ctx.beginPath();
  ctx.moveTo(cx,cy);
  ctx.lineTo(cx+Math.cos(lastA)*segR,cy+Math.sin(lastA)*segR);
  ctx.strokeStyle='rgba(212,176,94,.25)';
  ctx.lineWidth=2;
  ctx.stroke();

  // Merkez daire — altın gradient
  var cGrad=ctx.createRadialGradient(cx-10,cy-10,5,cx,cy,centerR);
  cGrad.addColorStop(0,'#f5e6c8');
  cGrad.addColorStop(0.5,'#d4b05e');
  cGrad.addColorStop(1,'#af8c3e');
  ctx.beginPath();
  ctx.arc(cx,cy,centerR,0,Math.PI*2);
  ctx.fillStyle=cGrad;
  ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.2)';
  ctx.lineWidth=2;
  ctx.stroke();

  // Merkez "M" harfi
  ctx.fillStyle='#1a1714';
  ctx.font='bold 44px "Plus Jakarta Sans",-apple-system,sans-serif';
  ctx.textAlign='center';
  ctx.textBaseline='middle';
  ctx.fillText('M',cx,cy+2);
}

// ============= ANİMASYON =============
var _spinning=false;

function spinTo(segment,angleOffset,duration){
  return new Promise(function(resolve){
    var container=document.getElementById('sw-wheel-container');
    // Hedef açı: segment merkezini pointer'a (üst) getir
    var targetBase=segment*SEG_ANGLE+SEG_ANGLE/2;
    var target=targetBase+(angleOffset||0);
    // 6-8 tam tur + hedef
    var fullRotations=(6+Math.floor(Math.random()*3))*360;
    var totalAngle=fullRotations+target;
    
    var dur=duration||6000;
    container.style.transition='transform '+dur+'ms cubic-bezier(.17,.67,.12,.99)';
    container.classList.add('spinning');
    
    // Mevcut dönüşü sıfırla (anında)
    container.style.transition='none';
    container.style.transform='rotate(0deg)';
    
    // Force reflow
    container.offsetHeight;
    
    // Animasyonu başlat
    container.style.transition='transform '+dur+'ms cubic-bezier(.17,.67,.12,.99)';
    container.style.transform='rotate('+totalAngle+'deg)';
    
    setTimeout(function(){
      container.classList.remove('spinning');
      resolve();
    },dur+100);
  });
}

// ============= CONFETTİ =============
function showConfetti(){
  var canvas=document.getElementById('sw-confetti');
  if(!canvas)return;
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  var ctx=canvas.getContext('2d');
  
  var particles=[];
  var colors=['#d4b05e','#f5e6c8','#af8c3e','#fff','#ffd700','#ff8674','#4ade80'];
  
  for(var i=0;i<120;i++){
    particles.push({
      x:canvas.width/2+(Math.random()-.5)*200,
      y:canvas.height/2-100,
      vx:(Math.random()-.5)*16,
      vy:-(Math.random()*14+6),
      size:Math.random()*8+3,
      color:colors[Math.floor(Math.random()*colors.length)],
      rotation:Math.random()*360,
      rotSpeed:(Math.random()-.5)*12,
      life:1,
      decay:Math.random()*.008+.006,
      shape:Math.random()>.5?'rect':'circle'
    });
  }
  
  var anim;
  function frame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var alive=false;
    
    for(var i=0;i<particles.length;i++){
      var p=particles[i];
      if(p.life<=0)continue;
      alive=true;
      
      p.x+=p.vx;
      p.vy+=.35; // gravity
      p.y+=p.vy;
      p.vx*=.99;
      p.rotation+=p.rotSpeed;
      p.life-=p.decay;
      
      ctx.save();
      ctx.globalAlpha=Math.max(0,p.life);
      ctx.translate(p.x,p.y);
      ctx.rotate(p.rotation*Math.PI/180);
      ctx.fillStyle=p.color;
      
      if(p.shape==='rect'){
        ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*.6);
      }else{
        ctx.beginPath();
        ctx.arc(0,0,p.size/2,0,Math.PI*2);
        ctx.fill();
      }
      ctx.restore();
    }
    
    if(alive){
      anim=requestAnimationFrame(frame);
    }else{
      ctx.clearRect(0,0,canvas.width,canvas.height);
    }
  }
  
  frame();
  
  // 4 saniye sonra temizle
  setTimeout(function(){
    if(anim)cancelAnimationFrame(anim);
    ctx.clearRect(0,0,canvas.width,canvas.height);
  },4000);
}

// ============= API =============
function getEmail(){
  // widget.js'ten _mlCache varsa kullan
  if(window._mlCache&&window._mlCache.email&&window._mlCache.loggedIn){
    return window._mlCache.email;
  }
  // Input'tan
  var input=document.getElementById('sw-email-input');
  return input?input.value.trim():'';
}

function setMsg(text,isErr){
  var el=document.getElementById('sw-msg');
  if(el){el.textContent=text;el.className='sw-msg'+(isErr?' err':'');}
}

async function doSpin(){
  if(_spinning)return;
  
  var email=getEmail();
  if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    // Email yoksa input göster
    var wrap=document.getElementById('sw-email-wrap');
    if(wrap.style.display==='none'){
      wrap.style.display='flex';
      setMsg('Çevirmek için e-postanızı girin');
      document.getElementById('sw-email-input').focus();
      return;
    }
    setMsg('Geçerli bir e-posta girin',true);
    return;
  }
  
  _spinning=true;
  var btn=document.getElementById('sw-spin-btn');
  btn.disabled=true;
  btn.textContent='Çevriliyor...';
  setMsg('');
  
  try{
    var url=GAS_URL+'?action=spin&email='+encodeURIComponent(email);
    var resp=await fetch(url);
    var data=await resp.json();
    
    if(!data.ok){
      if(data.error==='already_spun'){
        setMsg(data.message||'Bu hafta zaten çevirdiniz!');
        // Önceki ödülü göster
        if(data.couponCode){
          showPrizeCard({
            prize:data.prize,
            couponCode:data.couponCode,
            type:'repeat'
          });
        }
      }else{
        setMsg(data.error||'Bir hata oluştu',true);
      }
      btn.disabled=false;
      btn.textContent='ÇEVİR!';
      _spinning=false;
      return;
    }
    
    // Çarkı çevir
    await spinTo(data.segment,data.angleOffset||0,6500);
    
    // Kısa bekleme — gerilim
    await new Promise(function(r){setTimeout(r,600)});
    
    // Ödülü göster
    showConfetti();
    showPrizeCard(data);
    
  }catch(err){
    setMsg('Bağlantı hatası, tekrar deneyin',true);
  }
  
  btn.disabled=false;
  btn.textContent='ÇEVİR!';
  _spinning=false;
}

// ============= ÖDÜL KARTI =============
function showPrizeCard(data){
  var prize=document.getElementById('sw-prize');
  var emoji=document.getElementById('sw-prize-emoji');
  var title=document.getElementById('sw-prize-title');
  var sub=document.getElementById('sw-prize-sub');
  var codeEl=document.getElementById('sw-prize-code');
  var codeText=document.getElementById('sw-prize-code-text');
  var expEl=document.getElementById('sw-prize-exp');
  
  if(data.type==='none'){
    emoji.textContent='🍀';
    title.textContent='Tekrar Dene!';
    sub.textContent='Bu sefer olmadı ama haftaya şansın açılabilir!';
    codeEl.style.display='none';
    expEl.textContent='';
  }else if(data.type==='repeat'){
    emoji.textContent='🎟️';
    title.textContent='Bu Haftaki Ödülünüz';
    sub.textContent=data.prize;
    if(data.couponCode){
      codeEl.style.display='block';
      codeText.textContent=data.couponCode;
    }else{
      codeEl.style.display='none';
    }
    expEl.textContent='';
  }else if(data.type==='shipping'){
    emoji.textContent='📦';
    title.textContent='Ücretsiz Kargo!';
    sub.textContent='Bir sonraki siparişinizde kargo bizden!';
    codeEl.style.display='block';
    codeText.textContent=data.couponCode;
    expEl.textContent=data.expiry?'Son kullanma: '+data.expiry:'';
  }else if(data.type==='percent'){
    emoji.textContent='🎉';
    title.textContent='%'+data.discount+' İndirim!';
    sub.textContent='Tebrikler! Kupon kodunuz hazır.';
    codeEl.style.display='block';
    codeText.textContent=data.couponCode;
    expEl.textContent=data.expiry?'Son kullanma: '+data.expiry:'';
  }
  
  prize.classList.add('show');
}

// ============= OVERLAY =============
function openWheel(){
  var ov=document.getElementById('sw-overlay');
  ov.classList.add('open');
  document.getElementById('sw-prize').classList.remove('show');
  
  // Email kontrolü
  if(window._mlCache&&window._mlCache.email&&window._mlCache.loggedIn){
    document.getElementById('sw-email-wrap').style.display='none';
    setMsg('');
  }else{
    document.getElementById('sw-email-wrap').style.display='flex';
    setMsg('Çevirmek için e-postanızı girin');
  }
  
  // Spin butonunu resetle
  var btn=document.getElementById('sw-spin-btn');
  btn.disabled=false;
  btn.textContent='ÇEVİR!';
}

function closeWheel(){
  document.getElementById('sw-overlay').classList.remove('open');
  document.getElementById('sw-prize').classList.remove('show');
}

// ============= KOPYALAMA =============
function copyCode(){
  var codeText=document.getElementById('sw-prize-code-text');
  if(!codeText)return;
  var code=codeText.textContent;
  if(!code)return;
  
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(code);
  }else{
    var ta=document.createElement('textarea');
    ta.value=code;ta.style.position='fixed';ta.style.opacity='0';
    document.body.appendChild(ta);ta.select();
    try{document.execCommand('copy')}catch(e){}
    document.body.removeChild(ta);
  }
  
  var copied=document.getElementById('sw-copied');
  copied.classList.add('show');
  setTimeout(function(){copied.classList.remove('show')},1500);
}

// ============= GLOBAL =============
window._swSpin=doSpin;
window._swClose=closeWheel;
window._swCopy=copyCode;

// ============= INIT =============
function init(){
  injectCSS();
  createDOM();
  drawWheel();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init);
}else{
  init();
}

})();
