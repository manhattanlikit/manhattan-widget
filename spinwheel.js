// spinwheel.js — Manhattan Likit Çark Çevir Widget v3
// Deploy: GitHub Pages → manhattandan.com embed
// Trigger: widget.js sidebar'dan openOverlay() çağrılır
(function(){
'use strict';

var GAS_URL='https://script.google.com/macros/s/AKfycbxJKzibWzYOmapPvghMPxbt9u5vjGQyxCXZae4FKfUEsjCMIWEqkyI2CM_CovOGrzTbXQ/exec';

// ====== SEGMENT GÖRSEL (ödül mantığı GAS'ta) ======
var SEGS=[
  {label:'%3',   sub:'İNDİRİM',        bg:'#1e1a14',text:'#d4b05e',glow:'rgba(212,176,94,.15)'},
  {label:'HEDİYE',sub:'Manhattan',      bg:'#3d0a12',text:'#ffd700',grand:true,glow:'rgba(255,215,0,.12)'},
  {label:'%2',   sub:'İNDİRİM',        bg:'#141820',text:'#7eb8da',glow:'rgba(126,184,218,.12)'},
  {label:'KARGO',sub:'ÜCRETSİZ',       bg:'#0f1f1a',text:'#5ec4a0',glow:'rgba(94,196,160,.12)'},
  {label:'%5',   sub:'İNDİRİM',        bg:'#221a10',text:'#e8c36a',glow:'rgba(232,195,106,.12)'},
  {label:'TEKRAR',sub:'DENE',          bg:'#1a1a1a',text:'#888',glow:'rgba(136,136,136,.08)'},
  {label:'%10',  sub:'İNDİRİM',        bg:'#1e1510',text:'#ffc857',glow:'rgba(255,200,87,.12)'},
  {label:'%3',   sub:'İNDİRİM',        bg:'#181420',text:'#b08ed4',glow:'rgba(176,142,212,.12)'}
];
var N=8,SA=360/N,SAR=Math.PI*2/N;

// ====== DURUM ======
var _spinning=false,_spunSession=false,_rotation=0,_audioCtx=null,_muted=false;
var _TEST_MODE=false;

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

.sw-controls{display:flex;flex-direction:column;align-items:center;gap:10px;margin-top:18px}
.sw-btn{padding:15px 52px;border-radius:30px;border:none;background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff;font:700 16px 'Plus Jakarta Sans',sans-serif;letter-spacing:1.5px;cursor:pointer;text-transform:uppercase;box-shadow:0 4px 24px rgba(175,140,62,.35),0 0 0 1px rgba(255,255,255,.08) inset;transition:all .25s}
.sw-btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(175,140,62,.45)}
.sw-btn:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none}
.sw-msg{font:500 13px 'Plus Jakarta Sans',sans-serif;color:rgba(255,255,255,.45);text-align:center;min-height:18px;transition:all .3s}
.sw-msg.err{color:#f87171}
.sw-msg.hot{color:#fbbf24;font-weight:700}

/* ─── Prize Card (çark konteynerı içinde) ─── */
.sw-prize-wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:20;opacity:0;visibility:hidden;transition:all .35s;border-radius:50%;overflow:hidden;pointer-events:none}
.sw-prize-wrap.show{opacity:1;visibility:visible;pointer-events:auto}
.sw-prize-bg{position:absolute;inset:0;background:radial-gradient(circle,rgba(26,23,20,.97) 40%,rgba(26,23,20,.92) 70%,rgba(26,23,20,.85));backdrop-filter:blur(16px)}
.sw-prize-card{position:relative;z-index:2;text-align:center;padding:24px 20px;max-width:88%;animation:sw-prizeIn .5s cubic-bezier(.34,1.56,.64,1)}
@keyframes sw-prizeIn{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}
.sw-prize-ico{margin-bottom:8px;animation:sw-bounce .6s ease}
@keyframes sw-bounce{0%{transform:scale(0)}50%{transform:scale(1.25)}100%{transform:scale(1)}}
.sw-prize-t{font:800 20px 'Plus Jakarta Sans',sans-serif;color:#d4b05e;margin-bottom:4px;text-shadow:0 2px 12px rgba(212,176,94,.3)}
.sw-prize-s{font:500 12px 'Plus Jakarta Sans',sans-serif;color:rgba(255,255,255,.5);margin-bottom:16px;line-height:1.5}
.sw-prize-code{background:rgba(212,176,94,.08);border:2px dashed rgba(212,176,94,.4);border-radius:12px;padding:12px 20px;font:700 20px monospace;color:#d4b05e;letter-spacing:3px;cursor:pointer;transition:all .2s;position:relative;display:inline-block}
.sw-prize-code:hover{background:rgba(212,176,94,.14);transform:scale(1.03)}
.sw-prize-code .sw-cop{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(26,23,20,.95);border-radius:10px;color:#4ade80;font:600 13px 'Plus Jakarta Sans',sans-serif;letter-spacing:0;opacity:0;transition:opacity .2s}
.sw-prize-code .sw-cop.show{opacity:1}
.sw-prize-exp{font:400 11px 'Plus Jakarta Sans',sans-serif;color:rgba(255,255,255,.3);margin-top:10px}
.sw-prize-cd{font:600 12px 'Plus Jakarta Sans',sans-serif;color:rgba(212,176,94,.7);margin-top:6px}
.sw-prize-close{margin-top:14px;padding:9px 32px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:transparent;color:rgba(255,255,255,.5);font:500 12px 'Plus Jakarta Sans',sans-serif;cursor:pointer;transition:all .2s}
.sw-prize-close:hover{background:rgba(255,255,255,.06);color:#fff}

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
  .sw-prize-t{font-size:17px}
  .sw-prize-code{font-size:16px;padding:10px 16px}
  .sw-prize-s{font-size:11px}
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
      '</div>'+
      '<div class="sw-msg" id="sw-msg"></div>'+
    '</div>';
  document.body.appendChild(ov);

  // Toast
  var toast=document.createElement('div');toast.className='sw-toast';toast.id='sw-toast';
  toast.innerHTML='<div class="sw-toast-t" id="sw-toast-t"></div><div class="sw-toast-s" id="sw-toast-s"></div>';
  document.body.appendChild(toast);

  // Confetti canvas
  var cc=document.createElement('canvas');cc.className='sw-confetti';cc.id='sw-confetti';
  document.body.appendChild(cc);

  // Backdrop kapatma
  ov.addEventListener('click',function(e){
    if(e.target===ov&&!_spinning)swClose();
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

    // Text
    c.save();c.translate(cx,cy);c.rotate(mid);
    var textR=R*.66;
    c.fillStyle=seg.text;
    c.font='800 '+Math.round(W*.042)+'px "Plus Jakarta Sans",sans-serif';
    c.textAlign='center';c.textBaseline='middle';

    // Shadow for text
    c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=6;c.shadowOffsetY=2;
    c.fillText(seg.label,textR,-(W*.012));
    c.shadowBlur=0;c.shadowOffsetY=0;

    // Sub text
    c.font='600 '+Math.round(W*.022)+'px "Plus Jakarta Sans",sans-serif';
    c.fillStyle=seg.text;c.globalAlpha=.6;
    c.fillText(seg.sub,textR,W*.024);
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

function tick(){
  if(!_audioCtx||_muted)return;
  try{
    var o=_audioCtx.createOscillator(),g=_audioCtx.createGain();
    o.connect(g);g.connect(_audioCtx.destination);
    o.frequency.value=1200+Math.random()*200;o.type='sine';
    g.gain.setValueAtTime(.06,_audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,_audioCtx.currentTime+.035);
    o.start();o.stop(_audioCtx.currentTime+.035);
  }catch(e){}
}

function winSound(){
  if(!_audioCtx||_muted)return;
  try{
    [523,659,784,1047,1318].forEach(function(f,i){
      setTimeout(function(){
        var o=_audioCtx.createOscillator(),g=_audioCtx.createGain();
        o.connect(g);g.connect(_audioCtx.destination);
        o.frequency.value=f;o.type='sine';
        g.gain.setValueAtTime(.1,_audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(.001,_audioCtx.currentTime+.3);
        o.start();o.stop(_audioCtx.currentTime+.3);
      },i*100);
    });
  }catch(e){}
}

// ====== DRAG / SWIPE — Fizik Tabanlı ======
var _dragging=false,_dragAngle=0,_angularVel=0,_lastAngle=0,_lastTime=0;
var _velSamples=[],_freeSpinId=null;

function initDrag(){
  var box=document.getElementById('sw-box');if(!box)return;
  var cv=box.querySelector('.sw-canvas');if(!cv)return;

  function getAngle(e){
    var r=cv.getBoundingClientRect();
    var ccx=r.left+r.width/2,ccy=r.top+r.height/2;
    var pt=e.touches?e.touches[0]:e;
    return Math.atan2(pt.clientY-ccy,pt.clientX-ccx)*180/Math.PI;
  }

  function normDelta(d){
    while(d>180)d-=360;
    while(d<-180)d+=360;
    return d;
  }

  function onStart(e){
    if(_spinning)return;
    if(_spunSession&&!_TEST_MODE)return;
    if(!_TEST_MODE&&!isLoggedIn())return;
    e.preventDefault();
    initAudio();
    // Stop any free spin
    if(_freeSpinId){cancelAnimationFrame(_freeSpinId);_freeSpinId=null}
    _dragging=true;
    _dragAngle=getAngle(e);
    _lastAngle=_dragAngle;
    _lastTime=performance.now();
    _velSamples=[];
    _angularVel=0;
  }

  function onMove(e){
    if(!_dragging||_spinning)return;
    e.preventDefault();
    var now=performance.now();
    var a=getAngle(e);
    var delta=normDelta(a-_dragAngle);

    // Doğrudan çarkı döndür
    _rotation+=delta;
    drawWheel(_rotation);

    // Hız hesapla (derece/ms)
    var dt=now-_lastTime;
    if(dt>0){
      var vel=normDelta(a-_lastAngle)/dt;
      _velSamples.push({v:vel,t:now});
      // Son 80ms'lik örnekleri tut
      while(_velSamples.length>0&&now-_velSamples[0].t>80) _velSamples.shift();
    }

    // Tick ses — sadece ileri yönde segment geçişlerinde
    var segBefore=Math.floor((((_rotation-delta)%360+360)%360)/SA)%N;
    var segAfter=Math.floor(((_rotation%360+360)%360)/SA)%N;
    if(segBefore!==segAfter&&delta>0)tick();

    _lastAngle=a;_lastTime=now;
    _dragAngle=a;
  }

  function onEnd(e){
    if(!_dragging)return;
    _dragging=false;

    // Ağırlıklı ortalama hız
    if(_velSamples.length<2){return}
    var totalW=0,totalV=0,now=performance.now();
    for(var i=0;i<_velSamples.length;i++){
      var age=now-_velSamples[i].t;
      var w=Math.max(0,1-age/100); // Yeni örneklere daha çok ağırlık
      totalV+=_velSamples[i].v*w;
      totalW+=w;
    }
    var avgVel=totalW>0?totalV/totalW:0;

    // Minimum hız eşiği — sert bir fırlatma gerekli
    if(Math.abs(avgVel)>0.25){
      // Hız yeterli → GAS'a spin isteği gönder
      // Serbest dönüşü hızla başlat, API cevabı gelince hedefe yönlendir
      startMomentumThenSpin(avgVel);
    }else{
      // Yavaş bırakıldı → serbest yavaşlama
      startFreeSpin(avgVel);
    }
  }

  cv.addEventListener('mousedown',onStart);
  window.addEventListener('mousemove',onMove);
  window.addEventListener('mouseup',onEnd);
  cv.addEventListener('touchstart',onStart,{passive:false});
  window.addEventListener('touchmove',onMove,{passive:false});
  window.addEventListener('touchend',onEnd);
}

// ====== SERBEST DÖNÜŞ (spin tetiklemedi) ======
function startFreeSpin(vel){
  if(Math.abs(vel)<0.01)return;
  var v=Math.abs(vel)*16; // Forward-only, frame-based velocity
  function frame(){
    v*=0.96; // Sürtünme
    _rotation+=v;
    drawWheel(_rotation);
    if(v>0.3)tick();
    if(v>0.15){
      _freeSpinId=requestAnimationFrame(frame);
    }else{
      _freeSpinId=null;
    }
  }
  _freeSpinId=requestAnimationFrame(frame);
}

// ====== MOMENTUM → API → HEDEF ANİMASYON ======
async function startMomentumThenSpin(vel){
  if(_spinning)return;
  _spinning=true;
  var btn=document.getElementById('sw-btn');
  btn.disabled=true;btn.textContent='Çevriliyor...';msg('');
  document.getElementById('sw-x').style.display='none';

  // Forward-only: hız her zaman pozitif
  var momentumVel=Math.abs(vel)*16;
  var momentumActive=true;
  function momentumFrame(){
    if(!momentumActive)return;
    _rotation+=momentumVel;
    momentumVel*=0.995;
    if(momentumVel<1.5) momentumVel=1.5; // Sabit minimum — sawtooth yok
    drawWheel(_rotation);
    tick();
    if(momentumActive) requestAnimationFrame(momentumFrame);
  }
  requestAnimationFrame(momentumFrame);

  try{
    var email=getEmail();
    var url=GAS_URL+'?action=spin&email='+encodeURIComponent(email)+(_TEST_MODE?'&test=1':'');
    var ctrl=new AbortController();
    var tout=setTimeout(function(){ctrl.abort()},30000);
    var resp=await fetch(url,{signal:ctrl.signal});
    clearTimeout(tout);
    var data=await resp.json();

    // Handoff: mevcut hızı yakala, momentum durdur
    var handoffDegPerMs=momentumVel/16;
    momentumActive=false;

    // Test mode senkron
    if(data.testMode!==undefined) _applyTestMode(data.testMode);

    if(!data.ok){
      handleSpinError(data,btn);
      return;
    }

    // Hızı devret — duraksamasız geçiş
    await animateToTarget(data.segment,data.angleOffset||0,handoffDegPerMs);
    await showResult(data);

  }catch(err){
    momentumActive=false;
    if(err&&err.name==='AbortError') msg('Sunucu yanıt vermiyor','err');
    else msg('Bağlantı hatası','err');
  }

  syncUI();
  _spinning=false;
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

  // Hızlanma animasyonu başlat (API beklerken)
  var rampActive=true;
  var rampSpeed=0;
  function rampFrame(){
    if(!rampActive)return;
    rampSpeed=Math.min(rampSpeed+0.3,12);
    _rotation+=rampSpeed;
    drawWheel(_rotation);
    tick();
    requestAnimationFrame(rampFrame);
  }
  requestAnimationFrame(rampFrame);

  try{
    var email=getEmail();
    var url=GAS_URL+'?action=spin&email='+encodeURIComponent(email)+(_TEST_MODE?'&test=1':'');
    var ctrl=new AbortController();
    var tout=setTimeout(function(){ctrl.abort()},30000);
    var resp=await fetch(url,{signal:ctrl.signal});
    clearTimeout(tout);
    var data=await resp.json();

    // Handoff: ramp hızını yakala, durdur
    var handoffDegPerMs=rampSpeed/16;
    rampActive=false;

    // Test mode senkron
    if(data.testMode!==undefined) _applyTestMode(data.testMode);

    if(!data.ok){
      handleSpinError(data,btn);
      return;
    }

    await animateToTarget(data.segment,data.angleOffset||0,handoffDegPerMs);
    await showResult(data);

  }catch(err){
    rampActive=false;
    if(err&&err.name==='AbortError') msg('Sunucu yanıt vermiyor','err');
    else msg('Bağlantı hatası','err');
  }

  syncUI();
  _spinning=false;
}

// ====== DOĞAL HEDEF ANİMASYON (handoff-aware) ======
function animateToTarget(segment,angleOffset,handoffVel){
  return new Promise(function(resolve){
    var cv=document.getElementById('sw-cv');if(!cv)return resolve();

    // handoffVel: deg/ms at handoff. Always forward.
    handoffVel=Math.abs(handoffVel||0);

    // Hedef açıyı hesapla
    var target=360-segment*SA-SA/2+(angleOffset||0);
    var startRot=_rotation;
    var currentAngle=(startRot%360+360)%360;
    var end=startRot+((target-currentAngle+360)%360);

    // Forward-only: en az 4 tur ekle
    while(end-startRot<1440)end+=360;

    var totalDist=end-startRot;

    // Süre: hızlı handoff → daha uzun coast; buton → 5-7sn
    var duration;
    if(handoffVel>0.01){
      duration=Math.max(4000,Math.min(9000,totalDist/(handoffVel*60)));
    }else{
      duration=5000+Math.random()*2000;
    }

    // Normalized handoff velocity: v0 = handoffVel * duration / totalDist
    var v0=handoffVel>0?(handoffVel*duration/totalDist):0;

    // Monotonluk garantisi: v0 ≤ 3 (cubic Hermite sınırı)
    // Gerekirse mesafe artır
    while(v0>2.8&&totalDist<36000){
      end+=360;totalDist=end-startRot;
      v0=handoffVel*duration/totalDist;
    }
    v0=Math.min(v0,2.8);

    var startTime=null;
    var lastSeg=-1;

    function frame(ts){
      if(!startTime)startTime=ts;
      var t=Math.min((ts-startTime)/duration,1);

      // Cubic Hermite: h(0)=0, h(1)=1, h'(0)=v0, h'(1)=0
      // h(t) = v0*t + (3-2*v0)*t² + (v0-2)*t³
      var ease;
      if(v0>0.1){
        ease=v0*t+(3-2*v0)*t*t+(v0-2)*t*t*t;
      }else{
        // Buton spin — standart ease-out
        ease=1-Math.pow(1-t,3.8);
      }

      // Son %8: hafif titreme (doğal duruş)
      var wobble=0;
      if(t>0.92){
        var wt=(t-0.92)/0.08;
        wobble=Math.sin(wt*Math.PI*3)*1.2*(1-wt);
      }

      _rotation=startRot+totalDist*ease+wobble;
      drawWheel(_rotation);

      // Tick ses
      var curSeg=Math.floor(((_rotation%360+360)%360)/SA)%N;
      if(curSeg!==lastSeg){tick();lastSeg=curSeg}

      if(t<1)requestAnimationFrame(frame);
      else{_rotation=end;drawWheel(_rotation);resolve()}
    }
    frame(performance.now()); // Senkron ilk frame — handoff boşluğu yok
  });
}

// ====== SONUÇ İŞLE ======
async function showResult(data){
  var isNearMiss=!!data.isNearMiss;

  if(data.type==='none'){
    await delay(400);
    showToast('Tekrar Dene!','Bir sonraki sefere!',2500);
    showPrize(data);
  }else{
    // Flash efekti
    var ring=document.querySelector('.sw-ring');
    if(ring)ring.classList.add('sw-flash');
    setTimeout(function(){if(ring)ring.classList.remove('sw-flash')},600);

    winSound();confetti();
    await delay(700);
    showPrize(data);
    await delay(500);
    confetti();
  }

  if(!_TEST_MODE)_spunSession=true;
  if(data.cooldownHours) setCooldown(data.cooldownHours*3600000);

  // Tüm UI state senkron
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
  syncUI();
  _spinning=false;
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
  btn.disabled=blocked;
  btn.textContent=blocked?'ÇEVRİLDİ':_TEST_MODE?'TEST ÇEVİR':'ÇEVİR!';
  if(blocked){msg(getCountdownText())}
  else if(_TEST_MODE){msg('Test modu aktif — sınırsız çevirme')}
  else{msg('Fırlat veya ÇEVİR butonuna bas!')}
}

function showGate(){
  document.getElementById('sw-gate').style.display='flex';
  document.getElementById('sw-btn').style.display='none';msg('');
}

function openOverlay(){
  initAudio();
  var ov=document.getElementById('sw-ov');
  ov.classList.add('open');
  document.getElementById('sw-prize').classList.remove('show');

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
  document.getElementById('sw-prize').classList.remove('show');
}

function swClosePrize(){
  document.getElementById('sw-prize').classList.remove('show');
}

// ====== ÖDÜL KARTI (çark içinde) ======
function showPrize(data){
  var el=document.getElementById('sw-prize');
  var ico=document.getElementById('sw-pico');
  var t=document.getElementById('sw-pt');
  var s=document.getElementById('sw-ps');
  var pc=document.getElementById('sw-pc');
  var pct=document.getElementById('sw-pct');
  var pex=document.getElementById('sw-pex');
  var pcd=document.getElementById('sw-pcd');

  if(data.type==='none'){
    ico.innerHTML=ICO.retry;t.textContent='Tekrar Dene!';
    s.textContent='Bu sefer olmadı — tekrar dene!';
    pc.style.display='none';pex.textContent='';
  }else if(data.type==='repeat'){
    ico.innerHTML=ICO.ticket;t.textContent='Mevcut Ödülünüz';
    s.textContent=data.prize||'';
    if(data.couponCode){pc.style.display='inline-block';pct.textContent=data.couponCode}
    else{pc.style.display='none'}
    pex.textContent='';
  }else if(data.type==='shipping'){
    ico.innerHTML=ICO.ship;t.textContent='Ücretsiz Kargo!';
    s.textContent='Siparişinizde kargo bedava!';
    if(data.couponCode){pc.style.display='inline-block';pct.textContent=data.couponCode}else{pc.style.display='none'}
    pex.textContent=data.expiry?'Geçerlilik: '+data.expiry:'';
  }else if(data.type==='percent'){
    ico.innerHTML=data.discount>=10?ICO.trophy:ICO.win;
    t.textContent='%'+data.discount+' İndirim!';
    s.textContent=data.couponCode?'Tebrikler! Kuponunuz hazır.':'Ödülünüz kaydedildi.';
    if(data.couponCode){pc.style.display='inline-block';pct.textContent=data.couponCode}else{pc.style.display='none'}
    pex.textContent=data.expiry?'Geçerlilik: '+data.expiry:'';
  }

  pcd.textContent=getCountdownText();
  pex.style.color='';
  if(data.couponError){
    pex.textContent='Kupon oluşturulamadı — destek@manhattanlikit.com';
    pex.style.color='#f87171';
  }
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
function setCooldown(remainMs){
  if(remainMs>0) _cooldownEnd=Date.now()+remainMs;
}
function getCountdownText(){
  if(!_cooldownEnd) return'';
  var ms=_cooldownEnd-Date.now();
  if(ms<=0){_cooldownEnd=null;return'';}
  var hrs=Math.floor(ms/3600000);
  var mins=Math.floor((ms%3600000)/60000);
  if(hrs>0) return'Sonraki hak: '+hrs+'s '+mins+'dk';
  return'Sonraki hak: '+mins+'dk';
}
function getCooldownEnd(){return _cooldownEnd}
function isSpunSession(){return _spunSession}

// ====== TEST MODE ======
function _applyTestMode(on){
  _TEST_MODE=!!on;
  if(_TEST_MODE) _spunSession=false; // test modda blok yok
}

function _fetchTestMode(){
  try{
    fetch(GAS_URL+'?action=spin-check').then(function(r){return r.json()}).then(function(d){
      if(d&&d.ok) _applyTestMode(d.testMode);
      syncUI();
    }).catch(function(){});
  }catch(e){}
}

// ====== UI STATE SENKRON (tek kaynak) ======
function syncUI(){
  var btn=document.getElementById('sw-btn');
  var x=document.getElementById('sw-x');
  if(btn){
    var blocked=_spunSession&&!_TEST_MODE;
    btn.disabled=blocked||_spinning;
    if(_spinning){btn.textContent='Çevriliyor...'}
    else if(blocked){btn.textContent='ÇEVRİLDİ'}
    else if(_TEST_MODE){btn.textContent='TEST ÇEVİR'}
    else{btn.textContent='ÇEVİR!'}
  }
  if(x) x.style.display=_spinning?'none':'';

  // Overlay mesaj
  if(!_spinning){
    var blocked2=_spunSession&&!_TEST_MODE;
    if(blocked2){msg(getCountdownText()||'Çevrildi')}
    else if(_TEST_MODE){msg('Test modu aktif — sınırsız çevirme')}
  }

  // Sidebar countdown güncelle
  if(window._mlUpdateSpinCooldown) window._mlUpdateSpinCooldown();
}

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
window.swSpin=swSpin;window.swClose=swClose;window.swCopy=swCopy;window.swToggleSound=swToggleSound;
window.openOverlay=openOverlay;window.swClosePrize=swClosePrize;
window._swGetCooldownEnd=getCooldownEnd;
window._swIsSpunSession=isSpunSession;
window._swGetCountdownText=getCountdownText;
window._swSyncUI=syncUI;

// ====== INIT ======
function init(){build();drawWheel(0);initDrag();
  // Sidebar countdown: 30sn aralıkla canlı güncelleme
  setInterval(function(){
    if(window._mlUpdateSpinCooldown) window._mlUpdateSpinCooldown();
    // Cooldown bitince otomatik sıfırla
    if(_cooldownEnd&&Date.now()>=_cooldownEnd){
      _cooldownEnd=null;
      if(!_TEST_MODE){}else{_spunSession=false}
      syncUI();
    }
  },30000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();

})();
