// spinwheel.js — Manhattan Likit Çark Çevir Widget v3
// Deploy: GitHub Pages → manhattandan.com embed
// Trigger: widget.js sidebar'dan openOverlay() çağrılır
(function(){
'use strict';

var GAS_URL='https://script.google.com/macros/s/AKfycbxJKzibWzYOmapPvghMPxbt9u5vjGQyxCXZae4FKfUEsjCMIWEqkyI2CM_CovOGrzTbXQ/exec';


// ====== SEGMENT GÖRSEL (ödül mantığı GAS'ta) ======
// Varsayılan — spin.html config'den GAS üzerinden yönetilir
var SEGS=[
  {label:'%3',   sub:'İNDİRİM',   bg:'#1e1a14',text:'#d4b05e',glow:'rgba(212,176,94,.15)'},
  {label:'HEDİYE',sub:'Manhattan', bg:'#3d0a12',text:'#ffd700',grand:true,glow:'rgba(255,215,0,.12)'},
  {label:'%2',   sub:'İNDİRİM',   bg:'#141820',text:'#7eb8da',glow:'rgba(126,184,218,.12)'},
  {label:'KARGO',sub:'ÜCRETSİZ',  bg:'#0f1f1a',text:'#5ec4a0',glow:'rgba(94,196,160,.12)'},
  {label:'%5',   sub:'İNDİRİM',   bg:'#221a10',text:'#e8c36a',glow:'rgba(232,195,106,.12)'},
  {label:'TEKRAR',sub:'DENE',     bg:'#1a1a1a',text:'#888',glow:'rgba(136,136,136,.08)'},
  {label:'%10',  sub:'İNDİRİM',   bg:'#1e1510',text:'#ffc857',glow:'rgba(255,200,87,.12)'},
  {label:'%3',   sub:'İNDİRİM',   bg:'#181420',text:'#b08ed4',glow:'rgba(176,142,212,.12)'}
];
var N=8,SA=360/N,SAR=Math.PI*2/N;

// Font ölçek — spin.html'den ayarlanabilir (0.5 — 2.0)
var _fontScale=1.0;
var _fontFamily='Plus Jakarta Sans';
var _labelGap=6;

// Dış erişim: segment güncelleme + font ölçek
window._swSetSegments=function(segs,scale){
  if(segs&&Array.isArray(segs)&&segs.length>=2){
    SEGS=segs;N=SEGS.length;SA=360/N;SAR=Math.PI*2/N;
  }
  if(typeof scale==='number')_fontScale=Math.max(0.5,Math.min(2.0,scale));
  drawWheel(_rotation);
};

// ====== DURUM ======
var _spinning=false,_spunSession=false,_rotation=0,_audioCtx=null,_muted=false;
var _TEST_MODE=false;

function _applyTestMode(tm){
  _TEST_MODE=!!tm;
  if(_TEST_MODE)_spunSession=false;
  syncUI();
}
function _fetchTestMode(){
  fetch(GAS_URL+'?action=spin-check').then(function(r){return r.json()}).then(function(d){
    if(d.ok&&d.testMode!==undefined)_applyTestMode(d.testMode);
    if(d.tickSound)_tickPreset=d.tickSound;
    if(d.celebSound)_celebPreset=d.celebSound;
    if(d.voovSound)_voovPreset=d.voovSound;
    // Segment metinlerini GAS config'den güncelle
    if(d.segTexts&&Array.isArray(d.segTexts)){
      for(var i=0;i<Math.min(d.segTexts.length,SEGS.length);i++){
        if(d.segTexts[i].label)SEGS[i].label=d.segTexts[i].label;
        if(d.segTexts[i].sub!==undefined)SEGS[i].sub=d.segTexts[i].sub;
      }
    }
    if(typeof d.fontScale==='number')_fontScale=Math.max(0.5,Math.min(2.0,d.fontScale));
    if(d.fontFamily)_fontFamily=d.fontFamily;
    if(typeof d.labelGap==='number')_labelGap=Math.max(0,Math.min(30,d.labelGap));
    drawWheel(_rotation);
  }).catch(function(e){console.warn('[SW] spin-check fetch error:',e)});
}

// ====== SVG İKONLAR ======
var ICO={
  win:'<svg viewBox="0 0 24 24" fill="none" stroke="#d4b05e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px"><path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4l-6.4 4.8L8 14l-6-4.8h7.6z"/></svg>',
  retry:'<svg viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 105.64-11.36L1 10"/></svg>',
  ticket:'<svg viewBox="0 0 24 24" fill="none" stroke="#d4b05e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px"><path d="M2 9a3 3 0 010-6h20a3 3 0 010 6"/><path d="M2 15a3 3 0 000 6h20a3 3 0 000-6"/><path d="M2 9v6"/><path d="M22 9v6"/><line x1="9" y1="3" x2="9" y2="21" stroke-dasharray="2 2"/></svg>',
  ship:'<svg viewBox="0 0 24 24" fill="none" stroke="#5ec4a0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px"><path d="M16 16h6l-3-8h-5"/><path d="M2 16h14V4H4a2 2 0 00-2 2v10z"/><circle cx="6.5" cy="18.5" r="2.5"/><circle cx="16.5" cy="18.5" r="2.5"/></svg>',
  trophy:'<svg viewBox="0 0 24 24" fill="none" stroke="#ffc857" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px"><path d="M6 2h12v6a6 6 0 01-12 0V2z"/><path d="M6 4H4a2 2 0 00-2 2v1a4 4 0 004 4"/><path d="M18 4h2a2 2 0 012 2v1a4 4 0 01-4 4"/><path d="M12 14v4"/><path d="M8 22h8"/><path d="M8 22a4 4 0 010-4h8a4 4 0 010 4"/></svg>',
  fire:'<svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:22px;height:22px;vertical-align:middle;margin-right:4px"><path d="M12 23c-4.97 0-9-2.69-9-6 0-2 .5-3 2-5 .5 2.5 2 3.5 2 3.5C7 12 9 7 13 3c0 3 1.5 5 3 6.5 1 1 2 2.17 2 4.5 0 3.31-4.03 6-9 6z"/><path d="M12 23c-1.66 0-3-1.12-3-2.5S10.34 18 12 18s3 1.12 3 2.5S13.66 23 12 23z"/></svg>',
  sndOn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/></svg>',
  sndOff:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'
};

// ====== CSS ======
var css=`
.sw-ov{position:fixed;inset:0;background:rgba(8,7,6,.88);backdrop-filter:blur(24px) saturate(150%);-webkit-backdrop-filter:blur(24px) saturate(150%);z-index:1000001;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:all .35s cubic-bezier(.4,0,.2,1);padding:16px;overflow:hidden}
.sw-ov.open{opacity:1;visibility:visible}
.sw-ov.open .sw-main{transform:scale(1) translateY(0);opacity:1}
.sw-main{transform:scale(.92) translateY(20px);opacity:0;transition:all .5s cubic-bezier(.34,1.56,.64,1);display:flex;flex-direction:column;align-items:center;max-width:520px;width:100%;position:relative}

.sw-x{position:fixed;top:16px;right:16px;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:rgba(255,255,255,.7);font-size:22px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;transition:all .2s;font-family:sans-serif}
.sw-x:hover{background:rgba(255,255,255,.12);color:#fff}

.sw-badge{font:700 11px 'Plus Jakarta Sans',sans-serif;color:#d4b05e;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;text-shadow:0 2px 12px rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;gap:10px;width:100%}
.sw-badge::before,.sw-badge::after{content:'';flex:1;max-width:40px;height:1px;background:linear-gradient(90deg,transparent,rgba(212,176,94,.5),transparent)}

.sw-snd{display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border-radius:16px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:rgba(255,255,255,.45);font:500 11px 'Plus Jakarta Sans',sans-serif;cursor:pointer;transition:all .2s;vertical-align:middle}
.sw-snd:hover{background:rgba(255,255,255,.08);color:rgba(255,255,255,.7)}
.sw-snd.off{color:rgba(255,255,255,.2);border-color:rgba(255,255,255,.04)}

.sw-wheel-container{position:relative;width:min(74vw,74vh,480px);height:min(74vw,74vh,480px);margin:0 auto;touch-action:none;user-select:none;-webkit-user-select:none}
.sw-glow{position:absolute;inset:-20px;border-radius:50%;background:radial-gradient(circle,rgba(212,176,94,.08) 0%,transparent 70%);pointer-events:none;animation:sw-glow-pulse 3s ease-in-out infinite}
@keyframes sw-glow-pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.02)}}
.sw-pointer{position:absolute;top:-8px;left:50%;transform:translateX(-50%);z-index:5;filter:drop-shadow(0 4px 12px rgba(0,0,0,.7))}
.sw-ring{width:100%;height:100%;border-radius:50%;padding:5px;background:conic-gradient(from 0deg,#f5e6c8,#d4b05e,#af8c3e,#8a6e2f,#af8c3e,#d4b05e,#f5e6c8);box-shadow:0 0 60px rgba(175,140,62,.15),0 0 0 1px rgba(0,0,0,.4),inset 0 0 0 1px rgba(255,255,255,.1);animation:sw-ring-shimmer 4s linear infinite}
@keyframes sw-ring-shimmer{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}
.sw-inner{width:100%;height:100%;border-radius:50%;overflow:hidden;position:relative;box-shadow:inset 0 0 30px rgba(0,0,0,.4)}
.sw-canvas{width:100%;height:100%;display:block;touch-action:none;cursor:grab}
.sw-canvas:active{cursor:grabbing}

.sw-login-gate{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);border-radius:50%;z-index:6}
.sw-login-btn{padding:12px 28px;border-radius:24px;border:2px solid #d4b05e;background:transparent;color:#d4b05e;font:700 14px 'Plus Jakarta Sans',sans-serif;cursor:pointer;transition:all .2s;text-decoration:none}
.sw-login-btn:hover{background:#d4b05e;color:#1a1714}
.sw-login-msg{color:rgba(255,255,255,.7);font:500 13px 'Plus Jakarta Sans',sans-serif;margin-bottom:14px;text-align:center;padding:0 20px}

.sw-controls{display:flex;flex-direction:column;align-items:center;gap:16px;margin-top:24px}
.sw-btn{padding:15px 52px;border-radius:30px;border:none;background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff;font:700 16px 'Plus Jakarta Sans',sans-serif;letter-spacing:1.5px;cursor:pointer;text-transform:uppercase;box-shadow:0 4px 24px rgba(175,140,62,.35),0 0 0 1px rgba(255,255,255,.08) inset;transition:all .25s}
.sw-btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(175,140,62,.45)}
.sw-btn:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none}
.sw-msg{font:500 13px 'Plus Jakarta Sans',sans-serif;color:rgba(255,255,255,.45);text-align:center;min-height:18px;transition:all .3s;margin-top:2px}
.sw-msg.err{color:#f87171}
.sw-msg.hot{color:#fbbf24;font-weight:700}

/* ─── Prize Card (çark konteynerı içinde) ─── */
.sw-prize-wrap{position:absolute;inset:2.5%;display:flex;align-items:center;justify-content:center;z-index:20;opacity:0;visibility:hidden;transition:opacity .6s ease,visibility .6s ease;border-radius:50%;overflow:hidden;pointer-events:none}
.sw-prize-wrap.show{opacity:1;visibility:visible;pointer-events:auto}
.sw-prize-bg{position:absolute;inset:0;background:radial-gradient(circle,rgba(26,23,20,.97) 40%,rgba(26,23,20,.94) 70%,rgba(26,23,20,.88));backdrop-filter:blur(16px)}
.sw-prize-card{position:relative;z-index:2;text-align:center;padding:20px 16px;max-width:92%;animation:sw-prizeIn .5s cubic-bezier(.34,1.56,.64,1)}
@keyframes sw-prizeIn{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes sw-hintIn{from{transform:translate(-50%,-50%) scale(.5);opacity:0}to{transform:translate(-50%,-50%) scale(1);opacity:1}}
.sw-prize-ico{margin-bottom:10px;animation:sw-bounce .6s ease}
.sw-prize-ico svg{width:48px;height:48px}
@keyframes sw-bounce{0%{transform:scale(0)}50%{transform:scale(1.25)}100%{transform:scale(1)}}
.sw-prize-t{font:800 40px 'Plus Jakarta Sans',sans-serif;color:#d4b05e;margin-bottom:6px;text-shadow:0 2px 12px rgba(212,176,94,.3)}
.sw-prize-s{font:500 22px 'Plus Jakarta Sans',sans-serif;color:rgba(255,255,255,.55);margin-bottom:14px;line-height:1.5}
.sw-prize-code{background:rgba(212,176,94,.1);border:2px dashed rgba(212,176,94,.45);border-radius:14px;padding:14px 24px;font:700 30px monospace;color:#d4b05e;letter-spacing:3px;cursor:pointer;transition:all .2s;position:relative;display:inline-block}
.sw-prize-code:hover{background:rgba(212,176,94,.16);transform:scale(1.03)}
.sw-prize-code .sw-cop{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(26,23,20,.95);border-radius:12px;color:#4ade80;font:600 15px 'Plus Jakarta Sans',sans-serif;letter-spacing:0;opacity:0;transition:opacity .2s}
.sw-prize-code .sw-cop.show{opacity:1}
.sw-prize-exp{font:400 20px 'Plus Jakarta Sans',sans-serif;color:rgba(255,255,255,.35);margin-top:10px}
.sw-prize-cd{font:600 21px 'Plus Jakarta Sans',sans-serif;color:rgba(212,176,94,.7);margin-top:8px}
.sw-prize-close{margin-top:12px;padding:12px 36px;border-radius:24px;border:1px solid rgba(255,255,255,.12);background:transparent;color:rgba(255,255,255,.55);font:600 18px 'Plus Jakarta Sans',sans-serif;cursor:pointer;transition:all .2s}
.sw-prize-close:hover{background:rgba(255,255,255,.08);color:#fff}

/* ─── Toast ─── */
.sw-toast{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);background:linear-gradient(150deg,#1c1917,#292118);border:2px solid #d4b05e;border-radius:20px;padding:20px 32px;text-align:center;z-index:1000010;transition:all .4s cubic-bezier(.34,1.56,.64,1);box-shadow:0 20px 60px rgba(0,0,0,.5)}
.sw-toast.show{transform:translate(-50%,-50%) scale(1)}
.sw-toast-t{font:700 18px 'Plus Jakarta Sans',sans-serif;color:#fbbf24;margin-bottom:4px}
.sw-toast-s{font:500 13px 'Plus Jakarta Sans',sans-serif;color:rgba(255,255,255,.6)}

/* ─── Confetti & Effects ─── */
.sw-confetti{position:fixed;inset:0;pointer-events:none;z-index:1000003}
.sw-sparkles{position:absolute;inset:0;pointer-events:none;z-index:3;border-radius:50%;overflow:hidden}

.sw-shake{animation:sw-shk .5s ease}
@keyframes sw-shk{0%,100%{transform:translateX(0)}15%{transform:translateX(-6px)}30%{transform:translateX(6px)}45%{transform:translateX(-4px)}60%{transform:translateX(4px)}75%{transform:translateX(-2px)}90%{transform:translateX(2px)}}

.sw-flash{animation:sw-fl .6s ease}
@keyframes sw-fl{0%{box-shadow:0 0 0 0 rgba(212,176,94,.6)}50%{box-shadow:0 0 60px 20px rgba(212,176,94,.3)}100%{box-shadow:0 0 0 0 rgba(212,176,94,0)}}

@media(max-width:640px){
  .sw-wheel-container{width:88vw;height:88vw}
  .sw-btn{padding:13px 40px;font-size:15px}
  .sw-x{top:10px;right:10px;width:36px;height:36px;font-size:18px}
  .sw-badge{font-size:10px}
  .sw-prize-t{font-size:44px}
  .sw-prize-code{font-size:34px;padding:16px 28px}
  .sw-prize-s{font-size:24px}
}
`;

// ====== DOM ======
function build(){
  if(!document.getElementById('sw-font')){var lk=document.createElement('link');lk.id='sw-font';lk.rel='stylesheet';lk.href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';document.head.appendChild(lk)}
  var s=document.createElement('style');s.id='sw-css';s.textContent=css;document.head.appendChild(s);

  // NO trigger button — sidebar'dan çağrılır

  // Overlay
  var ov=document.createElement('div');ov.className='sw-ov';ov.id='sw-ov';
  ov.innerHTML=
    '<button class="sw-x" id="sw-x" onclick="event.stopPropagation();swClose()">✕</button>'+
    '<div class="sw-main" onclick="event.stopPropagation()">'+
      '<div class="sw-badge">MANHATTAN LİKİT</div>'+
      '<div class="sw-wheel-container" id="sw-box">'+
        '<div class="sw-glow"></div>'+
        '<svg class="sw-pointer" width="30" height="24" viewBox="0 0 30 24"><defs><linearGradient id="sw-ptr-g" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#f5e6c8"/><stop offset="100%" stop-color="#af8c3e"/></linearGradient><filter id="sw-ptr-s"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,.5)"/></filter></defs><path d="M15 24L1 0h28z" fill="url(#sw-ptr-g)" stroke="#8a6e2f" stroke-width="1" filter="url(#sw-ptr-s)"/></svg>'+
        '<div class="sw-ring"><div class="sw-inner"><canvas class="sw-canvas" id="sw-cv" width="900" height="900"></canvas></div></div>'+
        '<div class="sw-sparkles" id="sw-sparkles"></div>'+
        '<div class="sw-login-gate" id="sw-gate" style="display:none">'+
          '<div class="sw-login-msg">Çarkı çevirmek için<br>giriş yapmalısınız</div>'+
          '<a class="sw-login-btn" href="/account">Giriş Yap</a>'+
        '</div>'+
        '<div class="sw-prize-wrap" id="sw-prize">'+
          '<div class="sw-prize-bg"></div>'+
          '<div class="sw-prize-card" id="sw-prize-card">'+
            '<div class="sw-prize-ico" id="sw-pico"></div>'+
            '<div class="sw-prize-t" id="sw-pt"></div>'+
            '<div class="sw-prize-s" id="sw-ps"></div>'+
            '<div class="sw-prize-code" id="sw-pc" onclick="event.stopPropagation();swCopy()" style="display:none"><span id="sw-pct"></span><div class="sw-cop" id="sw-cop">Kopyalandı!</div></div>'+
            '<div class="sw-prize-exp" id="sw-pex"></div>'+
            '<div class="sw-prize-cd" id="sw-pcd"></div>'+
            '<button class="sw-prize-close" onclick="event.stopPropagation();swClosePrize()">Tamam</button>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="sw-controls">'+
        '<button class="sw-btn" id="sw-btn" onclick="event.stopPropagation();swSpin()">ÇEVİR!</button>'+
        '<div style="display:flex;gap:12px;align-items:center">'+
          '<button class="sw-snd" id="sw-snd" onclick="event.stopPropagation();swToggleSound()">'+ICO.sndOn+' <span id="sw-snd-txt">Ses</span></button>'+
        '</div>'+
        '<div class="sw-msg" id="sw-msg"></div>'+
      '</div>'+
    '</div>';
  document.body.appendChild(ov);

  // Toast
  var toast=document.createElement('div');toast.className='sw-toast';toast.id='sw-toast';
  toast.innerHTML='<div class="sw-toast-t" id="sw-toast-t"></div><div class="sw-toast-s" id="sw-toast-s"></div>';
  document.body.appendChild(toast);

  // Confetti canvas
  var cc=document.createElement('canvas');cc.className='sw-confetti';cc.id='sw-confetti';
  document.body.appendChild(cc);

  // Backdrop kapatma — prize açıkken engelle
  ov.addEventListener('click',function(e){
    if(e.target===ov&&!_spinning){
      var prize=document.getElementById('sw-prize');
      if(prize&&prize.classList.contains('show'))return; // Kupon kodu görünürken kapatma
      swClose();
    }
  });

  // Ambient sparkles
  initSparkles();
}

// ====== AMBIENT SPARKLES ======
var _sparkleId=null;
function initSparkles(){
  var el=document.getElementById('sw-sparkles');if(!el)return;
  var cvs=document.createElement('canvas');cvs.width=500;cvs.height=500;
  cvs.style.cssText='width:100%;height:100%;position:absolute;inset:0';
  el.appendChild(cvs);
  var ctx=cvs.getContext('2d');
  var particles=[];
  for(var i=0;i<20;i++){
    particles.push({
      x:Math.random()*500,y:Math.random()*500,
      r:Math.random()*1.5+.5,
      speed:Math.random()*.3+.1,
      angle:Math.random()*Math.PI*2,
      alpha:Math.random()*.4+.1,
      pulse:Math.random()*Math.PI*2
    });
  }
  function draw(){
    ctx.clearRect(0,0,500,500);
    // Only draw when overlay is visible
    var ov=document.getElementById('sw-ov');
    if(!ov||!ov.classList.contains('open')){_sparkleId=requestAnimationFrame(draw);return}
    for(var i=0;i<particles.length;i++){
      var p=particles[i];
      p.x+=Math.cos(p.angle)*p.speed;
      p.y+=Math.sin(p.angle)*p.speed;
      p.pulse+=.03;
      var cx=250,cy=250,dist=Math.sqrt((p.x-cx)*(p.x-cx)+(p.y-cy)*(p.y-cy));
      if(dist>230||p.x<0||p.x>500||p.y<0||p.y>500){
        p.x=250+Math.cos(p.angle+Math.PI)*200;
        p.y=250+Math.sin(p.angle+Math.PI)*200;
      }
      var a=p.alpha*(0.5+0.5*Math.sin(p.pulse));
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(212,176,94,'+a+')';ctx.fill();
    }
    _sparkleId=requestAnimationFrame(draw);
  }
  draw();
}

// ====== CANVAS ÇARK (Premium) ======
function drawWheel(rotDeg){
  var cv=document.getElementById('sw-cv');if(!cv)return;
  var c=cv.getContext('2d'),W=cv.width,H=cv.height,cx=W/2,cy=H/2;
  var R=W/2-6,CR=56;
  var rot=(rotDeg||0)*Math.PI/180;

  c.clearRect(0,0,W,H);

  // Outer shadow ring
  c.beginPath();c.arc(cx,cy,R+2,0,Math.PI*2);
  c.fillStyle='rgba(0,0,0,.15)';c.fill();

  for(var i=0;i<N;i++){
    var a0=-Math.PI/2+i*SAR+rot,a1=a0+SAR,mid=a0+SAR/2;
    var seg=SEGS[i];

    // Segment background
    c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,R,a0,a1);c.closePath();
    if(seg.grand){
      var g=c.createRadialGradient(cx,cy,CR,cx,cy,R);
      g.addColorStop(0,'#6b1a2a');g.addColorStop(.5,'#4a0d14');g.addColorStop(1,'#2d0810');
      c.fillStyle=g;
    }else{
      var g=c.createRadialGradient(cx,cy,CR,cx,cy,R);
      g.addColorStop(0,lighten(seg.bg,.08));g.addColorStop(1,seg.bg);
      c.fillStyle=g;
    }
    c.fill();

    // Segment border (subtle)
    c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,R,a0,a1);c.closePath();
    c.strokeStyle='rgba(212,176,94,.12)';c.lineWidth=1.5;c.stroke();

    // Divider lines
    c.beginPath();c.moveTo(cx+CR*Math.cos(a0),cy+CR*Math.sin(a0));
    c.lineTo(cx+R*Math.cos(a0),cy+R*Math.sin(a0));
    c.strokeStyle='rgba(212,176,94,.2)';c.lineWidth=1;c.stroke();

    // Text — _fontScale, _fontFamily, _labelGap ile ayarlanabilir
    c.save();c.translate(cx,cy);c.rotate(mid);
    var textR=R*.66;
    var gOff=W*_labelGap/500;
    c.fillStyle=seg.text;
    c.font='800 '+Math.round(W*.042*_fontScale)+'px "'+_fontFamily+'",sans-serif';
    c.textAlign='center';c.textBaseline='middle';
    c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=6;c.shadowOffsetY=2;
    c.fillText(seg.label,textR,-gOff);
    c.shadowBlur=0;c.shadowOffsetY=0;
    c.font='600 '+Math.round(W*.022*_fontScale)+'px "'+_fontFamily+'",sans-serif';
    c.fillStyle=seg.text;c.globalAlpha=.6;
    c.fillText(seg.sub,textR,gOff*2);
    c.globalAlpha=1;
    c.restore();
  }

  // Inner circle shadow
  c.beginPath();c.arc(cx,cy,CR+4,0,Math.PI*2);
  c.fillStyle='rgba(0,0,0,.2)';c.fill();

  // Center hub — gold gradient
  var cg=c.createRadialGradient(cx-6,cy-6,4,cx,cy,CR);
  cg.addColorStop(0,'#f5e6c8');cg.addColorStop(.4,'#d4b05e');cg.addColorStop(.8,'#af8c3e');cg.addColorStop(1,'#8a6e2f');
  c.beginPath();c.arc(cx,cy,CR,0,Math.PI*2);
  c.fillStyle=cg;c.fill();

  // Center ring
  c.beginPath();c.arc(cx,cy,CR,0,Math.PI*2);
  c.strokeStyle='rgba(255,255,255,.15)';c.lineWidth=2;c.stroke();
  c.beginPath();c.arc(cx,cy,CR-3,0,Math.PI*2);
  c.strokeStyle='rgba(0,0,0,.15)';c.lineWidth=1;c.stroke();

  // "M" logo
  c.fillStyle='#1a1714';
  c.font='800 '+Math.round(CR*0.9)+'px "Plus Jakarta Sans",sans-serif';
  c.textAlign='center';c.textBaseline='middle';
  c.shadowColor='rgba(0,0,0,.3)';c.shadowBlur=4;
  c.fillText('M',cx,cy+2);
  c.shadowBlur=0;
}

function lighten(hex,amt){
  var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  r=Math.min(255,r+Math.round(255*amt));g=Math.min(255,g+Math.round(255*amt));b=Math.min(255,b+Math.round(255*amt));
  return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}

// ====== SES ======
function initAudio(){
  if(_audioCtx)return;
  try{_audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}
}

// ── Ses Preset Tanımları ──
var _TICK_MAP={
  soft:{freq:1200,type:'sine',dur:0.05,gain:0.04},
  wood:{freq:400,type:'sine',dur:0.06,gain:0.1},
  velvet:{freq:800,type:'sine',dur:0.065,gain:0.05,freq2:1600},
  bamboo:{freq:340,type:'triangle',dur:0.045,gain:0.09,freq2:680},
  leather:{freq:180,type:'sine',dur:0.03,gain:0.12,freq2:520},
  walnut:{freq:280,type:'sine',dur:0.055,gain:0.1,freq2:560},
  silk:{freq:2200,type:'sine',dur:0.07,gain:0.03,freq2:3300},
  mahogany:{freq:200,type:'triangle',dur:0.06,gain:0.11,freq2:400}
};
var _CELEB_MAP={
  sparkle:{notes:[1047,1319,1568,1319,1568,2093],dur:0.15,type:'sine'},
  royal:{notes:[330,392,494,659,784,1047],dur:0.28,type:'triangle'},
  arcade:{notes:[523,659,784,523,659,784,1047],dur:0.1,type:'square'},
  golden:{notes:[440,554,659,880,1047,1319,1568],dur:0.2,type:'sine'},
  majestic:{notes:[262,330,392,523,659,784,1047,1319],dur:0.22,type:'sine'},
  luxe:{notes:[1568,1319,1568,2093,1568,2093,2637],dur:0.18,type:'sine'},
  victory:{notes:[392,392,523,659,784,784,1047],dur:0.16,type:'triangle'},
  bliss:{notes:[659,784,988,1319,988,1319,1568],dur:0.25,type:'sine'}
};
// ── Voov Presets (kalabalık tepki) ──
var _VOOV_MAP={
  studio1:{pitch:0.8,crowd:12,dur:0.9,rise:0.3},
  studio2:{pitch:1.0,crowd:16,dur:1.1,rise:0.4},
  studio3:{pitch:0.7,crowd:20,dur:1.0,rise:0.25},
  talkshow:{pitch:0.9,crowd:24,dur:1.2,rise:0.35},
  sitcom1:{pitch:1.1,crowd:10,dur:0.8,rise:0.2},
  sitcom2:{pitch:0.85,crowd:14,dur:1.0,rise:0.3},
  arena:{pitch:0.6,crowd:30,dur:1.4,rise:0.5},
  gasp:{pitch:1.2,crowd:8,dur:0.7,rise:0.15},
  cheer:{pitch:0.75,crowd:22,dur:1.3,rise:0.4},
  wow:{pitch:0.95,crowd:18,dur:1.1,rise:0.35}
};
var _tickPreset='wood';
var _celebPreset='sparkle';
var _voovPreset='studio2';

function tick(){
  if(!_audioCtx||_muted)return;
  try{
    var p=_TICK_MAP[_tickPreset]||_TICK_MAP.wood;
    var t=_audioCtx.currentTime;
    var o=_audioCtx.createOscillator(),g=_audioCtx.createGain();
    o.connect(g);g.connect(_audioCtx.destination);
    o.frequency.value=p.freq+Math.random()*80;o.type=p.type;
    g.gain.setValueAtTime(p.gain,t);
    g.gain.exponentialRampToValueAtTime(.001,t+p.dur);
    o.start();o.stop(t+p.dur);
    // Dual oscillator — harmonik katman
    if(p.freq2){
      var o2=_audioCtx.createOscillator(),g2=_audioCtx.createGain();
      o2.connect(g2);g2.connect(_audioCtx.destination);
      o2.frequency.value=p.freq2+Math.random()*60;o2.type='sine';
      g2.gain.setValueAtTime(p.gain*0.3,t);
      g2.gain.exponentialRampToValueAtTime(.001,t+p.dur*0.8);
      o2.start();o2.stop(t+p.dur);
    }
  }catch(e){}
}

function winSound(){
  if(!_audioCtx||_muted)return;
  try{
    var p=_CELEB_MAP[_celebPreset]||_CELEB_MAP.sparkle;
    p.notes.forEach(function(f,i){
      setTimeout(function(){
        var o=_audioCtx.createOscillator(),g=_audioCtx.createGain();
        o.connect(g);g.connect(_audioCtx.destination);
        o.frequency.value=f;o.type=p.type;
        g.gain.setValueAtTime(.1,_audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(.001,_audioCtx.currentTime+p.dur);
        o.start();o.stop(_audioCtx.currentTime+p.dur);
      },i*(p.dur*1000*0.7));
    });
  }catch(e){}
}

// ── Voov: Kalabalık Tepki Sentezi ──
function voovSound(){
  if(!_audioCtx||_muted)return;
  try{
    var p=_VOOV_MAP[_voovPreset]||_VOOV_MAP.studio2;
    var t=_audioCtx.currentTime;
    var voices=p.crowd||16;
    // Noise buffer — kalabalık sesi temeli
    var bufLen=_audioCtx.sampleRate*p.dur;
    var buf=_audioCtx.createBuffer(1,bufLen,_audioCtx.sampleRate);
    var data=buf.getChannelData(0);
    for(var i=0;i<bufLen;i++) data[i]=(Math.random()*2-1);

    for(var v=0;v<Math.min(voices,6);v++){
      var src=_audioCtx.createBufferSource();
      src.buffer=buf;
      src.playbackRate.value=p.pitch+(Math.random()-.5)*.3;
      // Bandpass — insan sesi formant (~400-800Hz)
      var bp=_audioCtx.createBiquadFilter();
      bp.type='bandpass';
      bp.frequency.value=400+v*80+Math.random()*200;
      bp.Q.value=2+Math.random()*3;
      // İkinci formant — "oo" → "aah" geçişi
      var bp2=_audioCtx.createBiquadFilter();
      bp2.type='bandpass';
      bp2.frequency.value=800+v*60+Math.random()*300;
      bp2.Q.value=1.5+Math.random()*2;
      // Envelope
      var env=_audioCtx.createGain();
      var vGain=0.04+Math.random()*0.02;
      env.gain.setValueAtTime(0,t);
      env.gain.linearRampToValueAtTime(vGain,t+p.rise);
      env.gain.setValueAtTime(vGain,t+p.rise+0.1);
      env.gain.exponentialRampToValueAtTime(0.001,t+p.dur);
      src.connect(bp);bp.connect(bp2);bp2.connect(env);env.connect(_audioCtx.destination);
      src.start(t+Math.random()*0.08);
      src.stop(t+p.dur+0.1);
    }
    // Tonal "ooo" katmanı — birkaç sine osc
    for(var j=0;j<3;j++){
      var osc=_audioCtx.createOscillator();
      var og=_audioCtx.createGain();
      osc.type='sine';
      osc.frequency.setValueAtTime(150+j*50+Math.random()*40,t);
      osc.frequency.linearRampToValueAtTime(250+j*60+Math.random()*50,t+p.rise);
      osc.frequency.linearRampToValueAtTime(180+j*40,t+p.dur);
      og.gain.setValueAtTime(0,t);
      og.gain.linearRampToValueAtTime(0.025,t+p.rise);
      og.gain.exponentialRampToValueAtTime(0.001,t+p.dur);
      osc.connect(og);og.connect(_audioCtx.destination);
      osc.start(t);osc.stop(t+p.dur+0.05);
    }
  }catch(e){console.warn('[SW] voov error:',e)}
}


// ======================================================================
// DRAG / SPIN — CrazyTim/spin-wheel v5.0.2 Mekaniği (MIT Lisans)
// Kaynak: https://github.com/CrazyTim/spin-wheel
// Constants: rotationResistance=-100, rotationSpeedMax=500, dragCapturePeriod=250ms
// ======================================================================

var _dragging=false,_dragEvents=[],_freeSpinId=null;
var RESISTANCE=100,SPEED_MAX=900,DRAG_PERIOD=250;
var _lastTickSeg=-1;
var _lastTickTime=0;

// ── CrazyTim util.getAngle (birebir) ──
function _ctAngle(ox,oy,tx,ty){
  var dx=ox-tx,dy=oy-ty;
  var theta=Math.atan2(-dy,-dx)*180/Math.PI;
  if(theta<0) theta+=360;
  return theta;
}

// ── CrazyTim util.addAngle (birebir) ──
function _ctAdd(a,b){
  var s=a+b;
  var r=s>0?s%360:360+(s%360);
  if(r===360)r=0;
  return r;
}

// ── CrazyTim util.diffAngle (birebir) ──
function _ctDiff(a,b){
  var off=180-b;
  var aOff=_ctAdd(a,off);
  return 180-aOff;
}

// Segment geçişinde tek tick (50ms debounce — geri sürüklemede buzzing engeli)
function _tickSeg(){
  var s=Math.floor(((_rotation%360+360)%360)/SA)%N;
  if(s!==_lastTickSeg){
    _lastTickSeg=s;
    var now=performance.now();
    if(now-_lastTickTime>50){_lastTickTime=now;tick()}
  }
}

// Serbest animasyonu durdur
function _stopSpin(){
  if(_freeSpinId){cancelAnimationFrame(_freeSpinId);_freeSpinId=null}
}

function initDrag(){
  var box=document.getElementById('sw-box');if(!box)return;
  var cv=box.querySelector('.sw-canvas');if(!cv)return;

  // ── dragStart (CrazyTim birebir) ──
  function onStart(e){
    if(_spinning)return;
    if(_spunSession&&!_TEST_MODE)return;
    if(!_TEST_MODE&&!isLoggedIn())return;
    e.preventDefault();
    initAudio();
    _stopSpin();
    _dragging=true;
    var pt=e.touches?e.touches[0]:e;
    _dragEvents=[{distance:0,x:pt.clientX,y:pt.clientY,now:performance.now()}];
  }

  // ── dragMove (CrazyTim birebir) ──
  function onMove(e){
    if(!_dragging||_spinning)return;
    e.preventDefault();
    var pt=e.touches?e.touches[0]:e;
    var r=cv.getBoundingClientRect();
    var cx=r.left+r.width/2,cy=r.top+r.height/2;

    var a=_ctAngle(cx,cy,pt.clientX,pt.clientY);
    var last=_dragEvents[0];
    var la=_ctAngle(cx,cy,last.x,last.y);
    var delta=_ctDiff(la,a); // İşaretli fark: + saat yönü, - ters

    _dragEvents.unshift({distance:delta,x:pt.clientX,y:pt.clientY,now:performance.now()});
    if(_dragEvents.length>=40)_dragEvents.pop();

    // Parmak takip — delta hangi yöndeyse o yöne döner
    _rotation+=delta;
    drawWheel(_rotation);
    _tickSeg();
  }

  // ── dragEnd (CrazyTim birebir) ──
  function onEnd(){
    if(!_dragging)return;
    _dragging=false;

    // Son DRAG_PERIOD ms içindeki toplam açısal mesafe
    var dragDist=0,now=performance.now();
    for(var i=0;i<_dragEvents.length;i++){
      if(now-_dragEvents[i].now>DRAG_PERIOD)break;
      dragDist+=_dragEvents[i].distance;
    }
    if(dragDist===0)return;

    // CrazyTim: speed = dragDistance * (1000 / dragCapturePeriod) → deg/sn
    var speed=dragDist*(1000/DRAG_PERIOD)*2.5; // 2.5x çarpan — daha duyarlı çark
    speed=Math.max(-SPEED_MAX,Math.min(SPEED_MAX,speed));

    // Yeterli ileri hız → API spin tetikle | geri veya yavaş → serbest yavaşlama
    if(speed>400){
      _momentumSpin(speed);
    }else if(speed>5){
      _freeSpin(speed);
    }else if(speed<-5){
      _reverseNudge(speed); // Geri: kısa geri + ileri çevir uyarısı
    }
  }

  cv.addEventListener('mousedown',onStart);
  window.addEventListener('mousemove',onMove);
  window.addEventListener('mouseup',onEnd);
  cv.addEventListener('touchstart',onStart,{passive:false});
  window.addEventListener('touchmove',onMove,{passive:false});
  window.addEventListener('touchend',onEnd);
}

// ====== SERBEST DÖNÜŞ — CrazyTim spin() + getRotationSpeedPlusDrag() ======
// Lineer sürtünme, her iki yön desteklenir, hız sıfıra inince durur
function _freeSpin(speed){
  if(Math.abs(speed)<1)return;
  var dir=speed>=0?1:-1;
  var spd=speed;
  var lastT=performance.now();

  function frame(){
    var now=performance.now();
    var dt=now-lastT; // ms
    if(dt<=0){_freeSpinId=requestAnimationFrame(frame);return}
    lastT=now;

    // CrazyTim animateRotation: rotation += (delta/1000) * rotationSpeed
    _rotation+=(dt/1000)*spd;

    // CrazyTim getRotationSpeedPlusDrag: lineer sürtünme
    var next=spd+((RESISTANCE*(dt/1000))*dir*-1);

    // Sıfırı geçerse dur — ters yöne gitmeyi engelle
    if((dir===1&&next<0)||(dir===-1&&next>=0)){
      _freeSpinId=null;
      drawWheel(_rotation);_tickSeg();
      return;
    }
    spd=next;
    drawWheel(_rotation);_tickSeg();
    _freeSpinId=requestAnimationFrame(frame);
  }
  _freeSpinId=requestAnimationFrame(frame);
}

// ====== GERİ ÇEVİRME — Kısa fren + ileri yönlendir popup ======
function _reverseNudge(speed){
  // Yüksek sürtünme ile kısa geri dönüş
  var spd=speed;
  var lastT=performance.now();
  var HIGH_RESIST=400; // Hızlı dur

  function frame(){
    var now=performance.now();
    var dt=now-lastT;
    if(dt<=0){requestAnimationFrame(frame);return}
    lastT=now;
    _rotation+=(dt/1000)*spd;
    spd+=HIGH_RESIST*(dt/1000); // Geri giderken pozitif sürtünme → yavaşlatır
    drawWheel(_rotation);_tickSeg();
    if(spd>=0){
      drawWheel(_rotation);
      _showForwardHint();
      return;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function _showForwardHint(){
  if(document.getElementById('sw-fwd-hint'))return;
  var h=document.createElement('div');
  h.id='sw-fwd-hint';
  h.style.cssText='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:25;text-align:center;animation:sw-hintIn .4s cubic-bezier(.34,1.56,.64,1)';
  h.innerHTML=
    '<div style="background:rgba(26,23,20,.95);border:1px solid rgba(212,176,94,.25);border-radius:22px;padding:24px 36px;backdrop-filter:blur(18px);box-shadow:0 16px 56px rgba(0,0,0,.55)">'+
      '<svg width="80" height="44" viewBox="0 0 80 44" fill="none" style="display:block;margin:0 auto 10px">'+
        '<g>'+
          '<path d="M10 26c0-3 1.8-5.5 4.5-7l20-2c2.8 0 5 1.3 6.5 3.5l7.5 1c2.3.3 4 1.8 4.5 4 .3 1.4-.2 2.8-1 3.6l-2.8 2.8c-1.8 1.8-4.5 2.8-7.2 2.8H22c-3.6 0-7.2-1.8-10-4.5l-1.8-2.2c-.8-1-.7-2.5.2-3.4" fill="rgba(212,176,94,.1)" stroke="#d4b05e" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>'+
          '<path d="M40 20l16-1c2.3 0 4 1.3 4.5 3.4.3 1.4-.4 2.8-1.8 3.5l-19 1" fill="none" stroke="#d4b05e" stroke-width="1.6" stroke-linecap="round"/>'+
          '<path d="M54 16l7 5-7 5" fill="none" stroke="#f5e6c8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'+
          '<animateTransform attributeName="transform" type="translate" values="-8,0;12,0;-8,0" dur="1.5s" repeatCount="indefinite"/>'+
        '</g>'+
      '</svg>'+
      '<div style="color:#f5e6c8;font:700 13px Plus Jakarta Sans,sans-serif;letter-spacing:.5px">Saat Yönünde Fırlat</div>'+
      '<div style="color:rgba(255,255,255,.28);font:400 11px Plus Jakarta Sans,sans-serif;margin-top:3px">Sürükleyip bırakın</div>'+
    '</div>';
  var box=document.getElementById('sw-box');
  if(box){box.style.position='relative';box.appendChild(h)}
  setTimeout(function(){if(h.parentNode){h.style.transition='opacity .5s';h.style.opacity='0';setTimeout(function(){if(h.parentNode)h.parentNode.removeChild(h)},500)}},3500);
}

// ====== MOMENTUM → API → HEDEF ANİMASYON ======
async function _momentumSpin(speed){
  if(_spinning)return;
  _spinning=true;
  var btn=document.getElementById('sw-btn');
  btn.disabled=true;btn.textContent='Çevriliyor...';msg('');
  document.getElementById('sw-x').style.display='none';

  // İleri yön momentum, API cevabı gelene kadar dönmeye devam
  var mSpd=Math.min(Math.abs(speed),SPEED_MAX);
  var active=true;
  var lastM=performance.now();

  function mFrame(){
    if(!active)return;
    var now=performance.now();
    var dt=now-lastM;
    if(dt<=0){requestAnimationFrame(mFrame);return}
    lastM=now;
    // CrazyTim lineer sürtünme — RESISTANCE * dt, doğal yavaşlama
    mSpd-=RESISTANCE*(dt/1000);
    if(mSpd<40)mSpd=40; // Minimal döngü — API beklerken çark durmasın
    _rotation+=mSpd*(dt/1000);
    drawWheel(_rotation);_tickSeg();
    requestAnimationFrame(mFrame);
  }
  requestAnimationFrame(mFrame);

  try{
    var email=getEmail();
    var url=GAS_URL+'?action=spin&email='+encodeURIComponent(email)+(_TEST_MODE?'&test=1':'');
    var ctrl=new AbortController();
    var tout=setTimeout(function(){ctrl.abort()},30000);
    var resp=await fetch(url,{signal:ctrl.signal});
    clearTimeout(tout);
    var data=await resp.json();

    var handoff=mSpd; // Handoff hızı (deg/sn)
    active=false;
    if(data.testMode!==undefined)_applyTestMode(data.testMode);
    if(!data.ok){handleSpinError(data,btn);return}

    await _spinToTarget(data.segment,data.angleOffset||0,handoff);
    await showResult(data);
  }catch(err){
    active=false;
    if(err&&err.name==='AbortError')msg('Sunucu yanıt vermiyor','err');
    else msg('Bağlantı hatası','err');
  }
  _spinning=false;syncUI();
}

// ====== BUTON İLE SPIN ======
async function swSpin(){
  if(_spinning)return;
  if(_spunSession&&!_TEST_MODE)return;
  if(!isLoggedIn()){openOverlay();return}

  initAudio();
  _spinning=true;
  var btn=document.getElementById('sw-btn');
  btn.disabled=true;btn.textContent='Çevriliyor...';msg('');
  document.getElementById('sw-x').style.display='none';

  // Time-based hızlanma: 0 → 400 deg/sn
  var rampOn=true,rSpd=0,lastR=performance.now();
  function rFrame(){
    if(!rampOn)return;
    var now=performance.now();
    var dt=now-lastR;
    if(dt<=0){requestAnimationFrame(rFrame);return}
    lastR=now;
    rSpd=Math.min(rSpd+300*(dt/1000),600);
    _rotation+=rSpd*(dt/1000);
    drawWheel(_rotation);_tickSeg();
    requestAnimationFrame(rFrame);
  }
  requestAnimationFrame(rFrame);

  try{
    var email=getEmail();
    var url=GAS_URL+'?action=spin&email='+encodeURIComponent(email)+(_TEST_MODE?'&test=1':'');
    var ctrl=new AbortController();
    var tout=setTimeout(function(){ctrl.abort()},30000);
    var resp=await fetch(url,{signal:ctrl.signal});
    clearTimeout(tout);
    var data=await resp.json();

    var handoff=rSpd;
    rampOn=false;
    if(data.testMode!==undefined)_applyTestMode(data.testMode);
    if(!data.ok){handleSpinError(data,btn);return}

    await _spinToTarget(data.segment,data.angleOffset||0,handoff);
    await showResult(data);
  }catch(err){
    rampOn=false;
    if(err&&err.name==='AbortError')msg('Sunucu yanıt vermiyor','err');
    else msg('Bağlantı hatası','err');
  }
  _spinning=false;syncUI();
}

// ====== HEDEF ANİMASYON — Fizik tabanlı sürtünme (freeSpin hissi) ======
function _spinToTarget(seg,offset,handoff){
  return new Promise(function(resolve){
    handoff=Math.abs(handoff||0);
    if(handoff<60)handoff=60; // Çok yavaşsa minimum animasyon hızı

    // Hedef açı: segment merkezi + GAS offset
    var target=360-seg*SA-SA/2+(offset||0);
    var start=_rotation;
    var cur=(start%360+360)%360;
    var end=start+((target-cur+360)%360);

    // CrazyTim spinToItem: numberOfRevolutions=4
    while(end-start<1440)end+=360;
    var dist=end-start;

    // CrazyTim physics: v²=v₀²-2*a*d → friction = v₀²/(2*d)
    // Handoff hızından başla, tam hedefe ulaşınca sıfıra in — hız sürekliliği korunur
    var v0=handoff;
    var friction=v0*v0/(2*dist);
    if(friction<3)friction=3; // Aşırı uzun dönüşü engelle
    var spd=v0;
    var pos=start;
    var lastT=performance.now();

    function frame(){
      var now=performance.now();
      var dt=now-lastT;
      if(dt<=0||dt>100){lastT=now;requestAnimationFrame(frame);return}
      lastT=now;
      var dtSec=dt/1000;

      // Lineer sürtünme — _freeSpin ile aynı model
      spd-=friction*dtSec;

      if(spd<=0){
        _rotation=end;
        drawWheel(_rotation);_tickSeg();
        resolve();
        return;
      }

      pos+=spd*dtSec;
      _rotation=pos;
      drawWheel(_rotation);_tickSeg();

      // Güvenlik: hedefe çok yakın + çok yavaş → snap
      if(pos>=end-2&&spd<10){
        _rotation=end;drawWheel(_rotation);_tickSeg();
        resolve();
        return;
      }

      requestAnimationFrame(frame);
    }
    frame();
  });
}

// ====== SONUÇ İŞLE ======
async function showResult(data){
  var isNearMiss=!!data.isNearMiss;

  if(data.type==='none'){
    await delay(600);
    showToast('Tekrar Dene!','Bir sonraki sefere!',2500);
    await delay(400);
    showPrize(data);
  }else{
    // 1. Çark durdu → kısa bekleme
    await delay(400);
    // 2. VOOV — kalabalık tepkisi
    voovSound();
    var ring=document.querySelector('.sw-ring');
    if(ring)ring.classList.add('sw-flash');
    setTimeout(function(){if(ring)ring.classList.remove('sw-flash')},600);
    // 3. Voov süresince bekleme
    await delay(900);
    // 4. Prize fade-in
    showPrize(data);
    // 5. Kupon göründükten sonra — kutlama sesi + confetti patlaması
    await delay(500);
    winSound();confetti();
    await delay(600);
    confetti();
  }

  if(!_TEST_MODE)_spunSession=true;
  if(data.cooldownHours) setCooldown(data.cooldownHours*3600000);
  syncUI();

  if(isNearMiss&&data.type!=='none'){
    setTimeout(function(){
      showToast(ICO.fire+'Az Kaldı!','Büyük ödüle çok yaklaştınız!',3000);
    },2200);
  }
}

function handleSpinError(data,btn){
  if(data.error==='already_spun'){
    if(!_TEST_MODE)_spunSession=true;
    if(data.remainMs) setCooldown(data.remainMs);
    msg(data.message||getCountdownText());
    if(data.couponCode)showPrize({prize:data.prize,couponCode:data.couponCode,type:'repeat'});
  }else{
    msg(data.error||'Bir hata oluştu','err');
  }
  _spinning=false;syncUI();
}

function delay(ms){return new Promise(function(r){setTimeout(r,ms)})}

// ====== CONFETTİ (Premium) ======
function confetti(){
  var cv=document.getElementById('sw-confetti');if(!cv)return;
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  var c=cv.getContext('2d');
  var cols=['#d4b05e','#f5e6c8','#ffd700','#fff','#af8c3e','#e8c36a','#b08ed4','#5ec4a0'];
  var P=[];
  for(var i=0;i<200;i++){
    P.push({
      x:cv.width/2+(Math.random()-.5)*120,
      y:cv.height*.45,
      vx:(Math.random()-.5)*22,
      vy:-(Math.random()*18+10),
      sz:Math.random()*6+2,
      col:cols[Math.floor(Math.random()*cols.length)],
      rot:Math.random()*360,
      rs:(Math.random()-.5)*16,
      life:1,
      d:Math.random()*.004+.004,
      shape:Math.random()>.5?0:Math.random()>.5?1:2 // 0=rect, 1=circle, 2=star
    });
  }
  var aid;
  function draw(){
    c.clearRect(0,0,cv.width,cv.height);var alive=false;
    for(var i=0;i<P.length;i++){
      var p=P[i];if(p.life<=0)continue;alive=true;
      p.x+=p.vx;p.vy+=.35;p.y+=p.vy;p.vx*=.985;p.rot+=p.rs;p.life-=p.d;
      c.save();c.globalAlpha=Math.max(0,p.life);
      c.translate(p.x,p.y);c.rotate(p.rot*Math.PI/180);c.fillStyle=p.col;
      if(p.shape===1){c.beginPath();c.arc(0,0,p.sz/2,0,Math.PI*2);c.fill()}
      else if(p.shape===2){drawStar(c,0,0,p.sz*.4,p.sz*.2,5);c.fill()}
      else{c.fillRect(-p.sz/2,-p.sz*.3,p.sz,p.sz*.6)}
      c.restore();
    }
    if(alive)aid=requestAnimationFrame(draw);
    else c.clearRect(0,0,cv.width,cv.height);
  }
  draw();
  setTimeout(function(){if(aid)cancelAnimationFrame(aid);c.clearRect(0,0,cv.width,cv.height)},5500);
}

function drawStar(c,cx,cy,or,ir,pts){
  c.beginPath();
  for(var i=0;i<pts*2;i++){
    var r=i%2===0?or:ir;
    var a=Math.PI/2*3+i*Math.PI/pts;
    if(i===0)c.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);
    else c.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);
  }
  c.closePath();
}

// ====== TOAST ======
function showToast(title,sub,dur){
  var t=document.getElementById('sw-toast');
  document.getElementById('sw-toast-t').innerHTML=title;
  document.getElementById('sw-toast-s').textContent=sub;
  t.classList.add('show');
  setTimeout(function(){t.classList.remove('show')},dur||2500);
}

// ====== GİRİŞ KONTROL ======
function getEmail(){
  if(window._mlCache&&window._mlCache.email&&window._mlCache.loggedIn)return window._mlCache.email;
  return null;
}
function isLoggedIn(){return!!getEmail()}

function msg(text,cls){
  var el=document.getElementById('sw-msg');
  if(el){el.textContent=text;el.className='sw-msg'+(cls?' '+cls:'');}
}

// ====== OVERLAY ======
function showReady(){
  var gate=document.getElementById('sw-gate');
  var btn=document.getElementById('sw-btn');
  gate.style.display='none';btn.style.display='';
  var blocked=_spunSession&&!_TEST_MODE;
  btn.disabled=false;
  if(blocked){
    btn.textContent='Kapat';
    btn.onclick=function(e){e.stopPropagation();swClose()};
    msg(getCountdownText());
  }else{
    btn.onclick=function(e){e.stopPropagation();swSpin()};
    btn.textContent=_TEST_MODE?'TEST ÇEVİR':'ÇEVİR!';
    if(_TEST_MODE){msg('Test modu aktif — sınırsız çevirme')}
    else{msg('Fırlat veya ÇEVİR butonuna bas!')}
  }
}

function showGate(){
  document.getElementById('sw-gate').style.display='flex';
  document.getElementById('sw-btn').style.display='none';msg('');
}

function openOverlay(){
  initAudio();
  var ov=document.getElementById('sw-ov');
  ov.classList.add('open');
  _hidePrize();

  // Test mode config fetch (non-blocking)
  _fetchTestMode();

  if(isLoggedIn()){showReady();return}

  if(typeof Ecwid!=='undefined'&&Ecwid.Customer){
    try{
      Ecwid.Customer.get(function(c){
        if(c&&c.email){
          if(!window._mlCache||!window._mlCache.loggedIn){
            window._mlCache={email:c.email,loggedIn:true,tier:'Starter',spend:0,orders:0,name:c.name||'',fullName:c.name||''};
          }
          showReady();
        }else{showGate()}
      });
    }catch(e){showGate()}
    document.getElementById('sw-gate').style.display='none';
    document.getElementById('sw-btn').style.display='';
    document.getElementById('sw-btn').disabled=true;
    document.getElementById('sw-btn').textContent='Yükleniyor...';
    msg('');
    return;
  }
  showGate();
}

function swClose(){
  if(_spinning)return;
  document.getElementById('sw-ov').classList.remove('open');
  _hidePrize();
}

function _hidePrize(){
  var p=document.getElementById('sw-prize');
  if(!p)return;
  p.classList.remove('show');
}

function swClosePrize(){
  _hidePrize();
}

// ====== ÖDÜL KARTI (çark içinde) ======
function showPrize(data){
  var el=document.getElementById('sw-prize');
  if(!el){console.warn('[SW] sw-prize NOT FOUND in DOM');return}
  var card=document.getElementById('sw-prize-card');
  // Elementleri card içinden ara — global ID çakışma koruması
  var ico=card?card.querySelector('#sw-pico'):document.getElementById('sw-pico');
  var t=card?card.querySelector('#sw-pt'):document.getElementById('sw-pt');
  var s=card?card.querySelector('#sw-ps'):document.getElementById('sw-ps');
  var pc=card?card.querySelector('#sw-pc'):document.getElementById('sw-pc');
  var pct=card?card.querySelector('#sw-pct'):document.getElementById('sw-pct');
  var pex=card?card.querySelector('#sw-pex'):document.getElementById('sw-pex');
  var pcd=card?card.querySelector('#sw-pcd'):document.getElementById('sw-pcd');

  try{
  if(data.type==='none'){
    if(ico)ico.innerHTML=ICO.retry;if(t)t.textContent='Tekrar Dene!';
    if(s)s.textContent='Bu sefer olmadı — tekrar dene!';
    if(pc)pc.style.display='none';if(pex)pex.textContent='';
  }else if(data.type==='repeat'){
    if(ico)ico.innerHTML=ICO.ticket;if(t)t.textContent='Mevcut Ödülünüz';
    if(s)s.textContent=data.prize||'';
    if(data.couponCode){if(pc)pc.style.display='inline-block';if(pct)pct.textContent=data.couponCode}
    else{if(pc)pc.style.display='none'}
    if(pex)pex.textContent='';
  }else if(data.type==='shipping'){
    if(ico)ico.innerHTML=ICO.ship;if(t)t.textContent='Ücretsiz Kargo!';
    if(s)s.textContent='Siparişinizde kargo bedava!';
    if(data.couponCode){if(pc)pc.style.display='inline-block';if(pct)pct.textContent=data.couponCode}else{if(pc)pc.style.display='none'}
    if(pex)pex.textContent=data.expiry?'Geçerlilik: '+data.expiry:'';
  }else if(data.type==='grand'){
    if(ico)ico.innerHTML=ICO.trophy;if(t)t.textContent=data.discount?data.discount+' TL Hediye!':'Tebrikler!';
    if(s)s.textContent=data.prize||'Manhattan Likit HEDİYE!';
    if(data.couponCode){if(pc)pc.style.display='inline-block';if(pct)pct.textContent=data.couponCode}else{if(pc)pc.style.display='none'}
    if(pex)pex.textContent=data.expiry?'Geçerlilik: '+data.expiry:'';
  }else if(data.type==='absolute'){
    if(ico)ico.innerHTML=data.discount>=50?ICO.trophy:ICO.win;
    if(t)t.textContent=(data.discount||0)+' TL İndirim!';
    if(s)s.textContent=data.couponCode?'Tebrikler! Kuponunuz hazır.':'Ödülünüz kaydedildi.';
    if(data.couponCode){if(pc)pc.style.display='inline-block';if(pct)pct.textContent=data.couponCode}else{if(pc)pc.style.display='none'}
    if(pex)pex.textContent=data.expiry?'Geçerlilik: '+data.expiry:'';
  }else{
    if(ico)ico.innerHTML=data.discount>=10?ICO.trophy:ICO.win;
    if(t)t.textContent='%'+(data.discount||0)+' İndirim!';
    if(s)s.textContent=data.couponCode?'Tebrikler! Kuponunuz hazır.':'Ödülünüz kaydedildi.';
    if(data.couponCode){if(pc)pc.style.display='inline-block';if(pct)pct.textContent=data.couponCode}else{if(pc)pc.style.display='none'}
    if(pex)pex.textContent=data.expiry?'Geçerlilik: '+data.expiry:'';
  }
  if(pcd)pcd.textContent=getCountdownText();
  if(pex)pex.style.color='';
  if(data.couponError&&pex){
    pex.textContent='Kupon oluşturulamadı — destek@manhattanlikit.com';
    pex.style.color='#f87171';
  }
  }catch(err){console.error('[SW] showPrize error:',err)}

  // CSS transition ile smooth fade-in — inline style yok
  el.classList.add('show');
}

// ====== KOPYALA ======
function swCopy(){
  var code=document.getElementById('sw-pct').textContent;if(!code)return;
  if(navigator.clipboard)navigator.clipboard.writeText(code);
  else{var ta=document.createElement('textarea');ta.value=code;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(e){}document.body.removeChild(ta)}
  var c=document.getElementById('sw-cop');c.classList.add('show');
  setTimeout(function(){c.classList.remove('show')},1500);
}

// ====== GERİ SAYIM ======
var _cooldownEnd=null;
// localStorage'dan geri yükle
try{var _cdStored=localStorage.getItem('sw_cooldown');if(_cdStored){var _cdVal=parseInt(_cdStored);if(_cdVal>Date.now()){_cooldownEnd=_cdVal;_spunSession=true}else{localStorage.removeItem('sw_cooldown')}}}catch(e){}

function setCooldown(remainMs){
  if(remainMs>0){
    _cooldownEnd=Date.now()+remainMs;
    try{localStorage.setItem('sw_cooldown',String(_cooldownEnd))}catch(e){}
    if(typeof window._mlUpdateSpinCooldown==='function')window._mlUpdateSpinCooldown();
  }
}
function getCountdownText(){
  if(!_cooldownEnd) return'Tekrar çevirebilirsiniz!';
  var ms=_cooldownEnd-Date.now();
  if(ms<=0){_cooldownEnd=null;_spunSession=false;try{localStorage.removeItem('sw_cooldown')}catch(e){}return'Tekrar çevirebilirsiniz!';}
  var hrs=Math.floor(ms/3600000);
  var mins=Math.floor((ms%3600000)/60000);
  if(hrs>0) return'Sonraki hak: '+hrs+'s '+mins+'dk';
  return'Sonraki hak: '+mins+'dk';
}
// Sidebar erişimi
function getCooldownEnd(){return _cooldownEnd}
function isSpunSession(){return _spunSession}

// ====== SES TOGGLE ======
function swToggleSound(){
  _muted=!_muted;
  var btn=document.getElementById('sw-snd');
  if(_muted){
    btn.innerHTML=ICO.sndOff+' <span id="sw-snd-txt">Ses</span>';
    btn.classList.add('off');
  }else{
    btn.innerHTML=ICO.sndOn+' <span id="sw-snd-txt">Ses</span>';
    btn.classList.remove('off');
  }
}

// ====== GLOBAL ======
// ====== UI STATE SENKRON (tek kaynak) ======
function syncUI(){
  var btn=document.getElementById('sw-btn');
  var x=document.getElementById('sw-x');
  if(btn){
    var blocked=_spunSession&&!_TEST_MODE;
    if(_spinning){
      btn.disabled=true;btn.textContent='Çevriliyor...';
    }else if(blocked){
      btn.disabled=false;btn.textContent='Kapat';
      btn.onclick=function(e){e.stopPropagation();swClose()};
    }else{
      btn.disabled=false;
      btn.onclick=function(e){e.stopPropagation();swSpin()};
      btn.textContent=_TEST_MODE?'TEST ÇEVİR':'ÇEVİR!';
    }
  }
  if(x) x.style.display=_spinning?'none':'';
  if(!_spinning){
    var b2=_spunSession&&!_TEST_MODE;
    if(b2){msg(getCountdownText()||'Çevrildi')}
    else if(_TEST_MODE){msg('Test modu aktif — sınırsız çevirme')}
  }
  if(window._mlUpdateSpinCooldown) window._mlUpdateSpinCooldown();
}

window.swSpin=swSpin;window.swClose=swClose;window.swCopy=swCopy;window.swToggleSound=swToggleSound;
window.openOverlay=openOverlay;window.swClosePrize=swClosePrize;
window._swGetCooldownEnd=getCooldownEnd;
window._swIsSpunSession=isSpunSession;
window._swGetCountdownText=getCountdownText;
window._swSyncUI=syncUI;

// ====== INIT ======
function init(){build();drawWheel(0);initDrag();
  // GAS config'i hemen çek — overlay açılmadan yazılar/fontScale hazır olur
  _fetchTestMode();
  if(_cooldownEnd&&_cooldownEnd>Date.now()){
    setTimeout(function(){if(window._mlUpdateSpinCooldown)window._mlUpdateSpinCooldown()},500);
  }
  setInterval(function(){
    if(window._mlUpdateSpinCooldown)window._mlUpdateSpinCooldown();
    if(_cooldownEnd&&Date.now()>=_cooldownEnd){
      _cooldownEnd=null;_spunSession=false;
      try{localStorage.removeItem('sw_cooldown')}catch(e){}
      syncUI();
    }
  },15000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();

})();
