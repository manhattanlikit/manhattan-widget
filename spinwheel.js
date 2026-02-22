// spinwheel.js — Manhattan Likit Çark Çevir Widget v2
// Deploy: GitHub Pages → manhattandan.com embed
(function(){
'use strict';

var GAS_URL='https://script.google.com/macros/s/AKfycbxJKzibWzYOmapPvghMPxbt9u5vjGQyxCXZae4FKfUEsjCMIWEqkyI2CM_CovOGrzTbXQ/exec';

// ====== SEGMENT GÖRSEL (ödül mantığı GAS'ta) ======
var SEGS=[
  {label:'%3',   sub:'İNDİRİM',        bg:'#1e1a14',text:'#d4b05e'},
  {label:'HEDİYE',sub:'Manhattan Likit',bg:'#5c1018',text:'#ffd700',grand:true},
  {label:'%2',   sub:'İNDİRİM',        bg:'#141820',text:'#7eb8da'},
  {label:'KARGO',sub:'ÜCRETSİZ',       bg:'#0f1f1a',text:'#5ec4a0'},
  {label:'%5',   sub:'İNDİRİM',        bg:'#221a10',text:'#e8c36a'},
  {label:'—',    sub:'TEKRAR DENE',     bg:'#161616',text:'#666'},
  {label:'%10',  sub:'İNDİRİM',        bg:'#1e1510',text:'#ffc857'},
  {label:'%3',   sub:'İNDİRİM',        bg:'#181420',text:'#b08ed4'}
];
var N=8,SA=360/N,SAR=Math.PI*2/N;

// ====== DURUM ======
var _spinning=false,_spunSession=false,_rotation=0,_audioCtx=null,_muted=false;

// ====== SVG İKONLAR (emoji yasak) ======
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
.sw-trigger{position:fixed;bottom:80px;right:24px;width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#af8c3e,#d4b05e);border:2px solid rgba(255,255,255,.15);cursor:pointer;z-index:999998;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(175,140,62,.4);transition:all .3s ease;animation:sw-glow 2.5s ease-in-out infinite}
.sw-trigger:hover{transform:scale(1.1)}
.sw-trigger:hover .sw-tip{opacity:1;transform:translateX(-100%) translateY(-50%) scale(1)}
.sw-trigger svg{width:28px;height:28px}
.sw-tip{position:absolute;right:62px;top:50%;transform:translateX(-100%) translateY(-50%) scale(.9);background:#1a1714;color:#d4b05e;font:600 12px 'Plus Jakarta Sans',sans-serif;padding:6px 12px;border-radius:8px;white-space:nowrap;pointer-events:none;opacity:0;transition:all .2s;border:1px solid rgba(212,176,94,.3)}
@keyframes sw-glow{0%,100%{box-shadow:0 4px 20px rgba(175,140,62,.4),0 0 0 0 rgba(212,176,94,.3)}50%{box-shadow:0 4px 20px rgba(175,140,62,.4),0 0 0 12px rgba(212,176,94,0)}}

.sw-ov{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);z-index:1000001;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:all .3s;padding:16px;overflow:hidden}
.sw-ov.open{opacity:1;visibility:visible}
.sw-ov.open .sw-main{transform:scale(1) translateY(0)}
.sw-main{transform:scale(.9) translateY(20px);transition:transform .5s cubic-bezier(.34,1.56,.64,1);display:flex;flex-direction:column;align-items:center;max-width:500px;width:100%}

.sw-x{position:fixed;top:16px;right:16px;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);color:#fff;font-size:22px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;transition:all .2s;font-family:sans-serif}
.sw-x:hover{background:rgba(255,255,255,.15)}

.sw-badge{font:700 11px 'Plus Jakarta Sans',sans-serif;color:#d4b05e;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:14px;text-shadow:0 2px 12px rgba(0,0,0,.6);display:flex;align-items:center;gap:8px}
.sw-badge::before,.sw-badge::after{content:'';width:28px;height:1px;background:linear-gradient(90deg,transparent,#d4b05e,transparent)}

.sw-snd{position:fixed;top:16px;left:16px;display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:20px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);font:500 11px 'Plus Jakarta Sans',sans-serif;cursor:pointer;z-index:10;transition:all .2s}
.sw-snd:hover{background:rgba(255,255,255,.15);color:#fff}
.sw-snd.off{color:rgba(255,255,255,.35)}

.sw-wheel-box{position:relative;width:min(82vw,400px);height:min(82vw,400px);margin:0 auto;touch-action:none;user-select:none;-webkit-user-select:none}
.sw-pointer{position:absolute;top:-6px;left:50%;transform:translateX(-50%);z-index:5;filter:drop-shadow(0 4px 8px rgba(0,0,0,.6))}
.sw-ring{width:100%;height:100%;border-radius:50%;padding:6px;background:linear-gradient(135deg,#f5e6c8,#d4b05e,#af8c3e,#d4b05e,#f5e6c8);box-shadow:0 0 80px rgba(175,140,62,.2),0 0 0 1px rgba(0,0,0,.3)}
.sw-inner{width:100%;height:100%;border-radius:50%;overflow:hidden;position:relative}
.sw-canvas{width:100%;height:100%;display:block}

.sw-btn{margin-top:18px;padding:15px 52px;border-radius:30px;border:none;background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff;font:700 17px 'Plus Jakarta Sans',sans-serif;letter-spacing:1.5px;cursor:pointer;text-transform:uppercase;box-shadow:0 4px 24px rgba(175,140,62,.4);transition:all .25s}
.sw-btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(175,140,62,.5)}
.sw-btn:disabled{opacity:.4;cursor:not-allowed;transform:none}

.sw-login-gate{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);border-radius:50%;z-index:6}
.sw-login-btn{padding:12px 28px;border-radius:24px;border:2px solid #d4b05e;background:transparent;color:#d4b05e;font:700 14px 'Plus Jakarta Sans',sans-serif;cursor:pointer;transition:all .2s;text-decoration:none}
.sw-login-btn:hover{background:#d4b05e;color:#1a1714}
.sw-login-msg{color:rgba(255,255,255,.7);font:500 13px 'Plus Jakarta Sans',sans-serif;margin-bottom:14px;text-align:center;padding:0 20px}

.sw-msg{font:500 13px 'Plus Jakarta Sans',sans-serif;color:rgba(255,255,255,.5);margin-top:12px;text-align:center;min-height:20px;transition:all .3s}
.sw-msg.err{color:#f87171}
.sw-msg.hot{color:#fbbf24;font-weight:700}

.sw-prize{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:all .4s;z-index:20}
.sw-prize.show{opacity:1;visibility:visible}
.sw-prize-card{background:linear-gradient(150deg,#1c1917,#292524);border:2px solid #d4b05e;border-radius:28px;padding:36px 28px;text-align:center;max-width:360px;width:92%;box-shadow:0 24px 80px rgba(0,0,0,.6);animation:sw-cardIn .5s ease}
@keyframes sw-cardIn{from{transform:scale(.7) translateY(30px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
.sw-prize-ico{font-size:52px;margin-bottom:10px;animation:sw-bounce .6s ease}
@keyframes sw-bounce{0%{transform:scale(0)}50%{transform:scale(1.3)}100%{transform:scale(1)}}
.sw-prize-t{font:800 24px 'Plus Jakarta Sans',sans-serif;color:#d4b05e;margin-bottom:4px}
.sw-prize-s{font:500 13px 'Plus Jakarta Sans',sans-serif;color:rgba(255,255,255,.55);margin-bottom:20px;line-height:1.5}
.sw-prize-code{background:#151310;border:2px dashed #d4b05e;border-radius:14px;padding:14px 24px;font:700 22px monospace;color:#d4b05e;letter-spacing:3px;cursor:pointer;transition:all .2s;position:relative;display:inline-block}
.sw-prize-code:hover{background:#1e1a14;transform:scale(1.03)}
.sw-prize-code .sw-cop{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#151310;border-radius:12px;color:#4ade80;font:600 14px 'Plus Jakarta Sans',sans-serif;letter-spacing:0;opacity:0;transition:opacity .2s}
.sw-prize-code .sw-cop.show{opacity:1}
.sw-prize-exp{font:400 11px 'Plus Jakarta Sans',sans-serif;color:rgba(255,255,255,.35);margin-top:12px}
.sw-prize-cd{font:600 13px 'Plus Jakarta Sans',sans-serif;color:#d4b05e;margin-top:8px;opacity:.8}
.sw-prize-close{margin-top:18px;padding:10px 36px;border-radius:22px;border:1px solid rgba(255,255,255,.12);background:transparent;color:rgba(255,255,255,.6);font:500 13px 'Plus Jakarta Sans',sans-serif;cursor:pointer;transition:all .2s}
.sw-prize-close:hover{background:rgba(255,255,255,.06);color:#fff}

.sw-toast{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);background:linear-gradient(135deg,#1a1714,#292118);border:2px solid #d4b05e;border-radius:20px;padding:20px 32px;text-align:center;z-index:1000010;transition:all .4s cubic-bezier(.34,1.56,.64,1);box-shadow:0 20px 60px rgba(0,0,0,.5)}
.sw-toast.show{transform:translate(-50%,-50%) scale(1)}
.sw-toast-t{font:700 18px 'Plus Jakarta Sans',sans-serif;color:#fbbf24;margin-bottom:4px}
.sw-toast-s{font:500 13px 'Plus Jakarta Sans',sans-serif;color:rgba(255,255,255,.6)}

.sw-confetti{position:fixed;inset:0;pointer-events:none;z-index:1000003}

.sw-shake{animation:sw-shk .5s ease}
@keyframes sw-shk{0%,100%{transform:translateX(0)}15%{transform:translateX(-6px)}30%{transform:translateX(6px)}45%{transform:translateX(-4px)}60%{transform:translateX(4px)}75%{transform:translateX(-2px)}90%{transform:translateX(2px)}}

@media(max-width:640px){
  .sw-trigger{bottom:68px;right:16px;width:48px;height:48px}
  .sw-trigger svg{width:24px;height:24px}
  .sw-tip{display:none}
  .sw-wheel-box{width:90vw;height:90vw}
  .sw-btn{padding:13px 40px;font-size:15px}
  .sw-x{top:10px;right:10px;width:36px;height:36px;font-size:18px}
  .sw-badge{font-size:10px}
  .sw-prize-card{padding:28px 20px}
  .sw-prize-t{font-size:20px}
  .sw-prize-code{font-size:18px;padding:12px 18px}
}
`;

// ====== DOM ======
function build(){
  if(!document.getElementById('sw-font')){var lk=document.createElement('link');lk.id='sw-font';lk.rel='stylesheet';lk.href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';document.head.appendChild(lk)}
  var s=document.createElement('style');s.id='sw-css';s.textContent=css;document.head.appendChild(s);

  // Trigger
  var btn=document.createElement('button');btn.className='sw-trigger';btn.id='sw-trigger';
  btn.setAttribute('aria-label','Çark Çevir');
  btn.innerHTML='<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#fff" opacity=".9"/><line x1="12" y1="2" x2="12" y2="5" stroke="#fff" stroke-width="1.5"/><line x1="12" y1="19" x2="12" y2="22" stroke="#fff" stroke-width="1.5"/><line x1="2" y1="12" x2="5" y2="12" stroke="#fff" stroke-width="1.5"/><line x1="19" y1="12" x2="22" y2="12" stroke="#fff" stroke-width="1.5"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34" stroke="#fff" stroke-width="1.2"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07" stroke="#fff" stroke-width="1.2"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66" stroke="#fff" stroke-width="1.2"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93" stroke="#fff" stroke-width="1.2"/></svg><span class="sw-tip">Çark Çevir</span>';
  btn.onclick=function(e){e.stopPropagation();openOverlay()};
  document.body.appendChild(btn);

  // Overlay
  var ov=document.createElement('div');ov.className='sw-ov';ov.id='sw-ov';
  ov.innerHTML=
    '<button class="sw-x" id="sw-x" onclick="event.stopPropagation();swClose()">✕</button>'+
    '<button class="sw-snd" id="sw-snd" onclick="event.stopPropagation();swToggleSound()">'+ICO.sndOn+' <span id="sw-snd-txt">Ses Açık</span></button>'+
    '<div class="sw-main" onclick="event.stopPropagation()">'+
      '<div class="sw-badge">ŞANSINI DENE</div>'+
      '<div class="sw-wheel-box" id="sw-box">'+
        '<svg class="sw-pointer" width="28" height="22" viewBox="0 0 28 22"><path d="M14 22L2 0h24z" fill="#d4b05e" stroke="#1a1714" stroke-width="1.5"/></svg>'+
        '<div class="sw-ring"><div class="sw-inner"><canvas class="sw-canvas" id="sw-cv" width="800" height="800"></canvas></div></div>'+
        '<div class="sw-login-gate" id="sw-gate" style="display:none">'+
          '<div class="sw-login-msg">Çarkı çevirmek için<br>giriş yapmalısınız</div>'+
          '<a class="sw-login-btn" href="/account">Giriş Yap</a>'+
        '</div>'+
      '</div>'+
      '<button class="sw-btn" id="sw-btn" onclick="event.stopPropagation();swSpin()">ÇEVİR!</button>'+
      '<div class="sw-msg" id="sw-msg"></div>'+
    '</div>'+
    '<div class="sw-prize" id="sw-prize" onclick="event.stopPropagation()">'+
      '<div class="sw-prize-card" id="sw-prize-card">'+
        '<div class="sw-prize-ico" id="sw-pico"></div>'+
        '<div class="sw-prize-t" id="sw-pt"></div>'+
        '<div class="sw-prize-s" id="sw-ps"></div>'+
        '<div class="sw-prize-code" id="sw-pc" onclick="event.stopPropagation();swCopy()" style="display:none"><span id="sw-pct"></span><div class="sw-cop" id="sw-cop">Kopyalandı!</div></div>'+
        '<div class="sw-prize-exp" id="sw-pex"></div>'+
        '<div class="sw-prize-cd" id="sw-pcd"></div>'+
        '<button class="sw-prize-close" onclick="event.stopPropagation();swClose()">Kapat</button>'+
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

  // Backdrop — spinning sırasında kapatma engeli
  ov.addEventListener('click',function(e){
    if(e.target===ov&&!_spinning)swClose();
  });
}

// ====== CANVAS ÇARK ======
function drawWheel(){
  var cv=document.getElementById('sw-cv');if(!cv)return;
  var c=cv.getContext('2d'),W=cv.width,H=cv.height,cx=W/2,cy=H/2;
  var R=W/2-4;
  var CR=48;

  c.clearRect(0,0,W,H);

  for(var i=0;i<N;i++){
    var a0=-Math.PI/2+i*SAR,a1=a0+SAR,mid=a0+SAR/2;
    var seg=SEGS[i];

    // Segment arka plan
    c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,R,a0,a1);c.closePath();
    if(seg.grand){
      var g=c.createRadialGradient(cx,cy,CR,cx,cy,R);
      g.addColorStop(0,'#8b1a2a');g.addColorStop(1,'#4a0d14');
      c.fillStyle=g;
    }else{
      c.fillStyle=seg.bg;
    }
    c.fill();

    // Sınır çizgisi
    c.beginPath();c.moveTo(cx,cy);
    c.lineTo(cx+Math.cos(a0)*R,cy+Math.sin(a0)*R);
    c.strokeStyle='rgba(212,176,94,.2)';c.lineWidth=1.5;c.stroke();

    // ===== METİN (radyal — her zaman okunabilir) =====
    c.save();
    c.translate(cx,cy);
    c.rotate(mid);

    var norm=((mid%(Math.PI*2))+(Math.PI*2))%(Math.PI*2);
    var flip=norm>Math.PI/2&&norm<Math.PI*3/2;
    if(flip)c.rotate(Math.PI);

    var tr=flip?-R*0.56:R*0.56;
    c.textAlign='center';c.textBaseline='middle';c.fillStyle=seg.text;

    if(seg.grand){
      c.font='800 32px "Plus Jakarta Sans",sans-serif';
      c.fillText(seg.label,tr,-10);
      c.font='600 14px "Plus Jakarta Sans",sans-serif';
      c.fillText(seg.sub,tr,flip?-30:14);
      // Yıldız (SVG path olarak çiz)
      var starR=flip?-R*0.82:R*0.82;
      c.fillStyle='#ffd700';c.globalAlpha=.4;
      c.beginPath();
      for(var si=0;si<5;si++){
        var sa=-Math.PI/2+si*Math.PI*2/5;
        var sx=starR+Math.cos(sa)*10,sy=Math.sin(sa)*10;
        if(si===0)c.moveTo(sx,sy);else c.lineTo(sx,sy);
        var ib=sa+Math.PI/5;
        c.lineTo(starR+Math.cos(ib)*4,Math.sin(ib)*4);
      }
      c.closePath();c.fill();c.globalAlpha=1;
    }else{
      c.font='800 36px "Plus Jakarta Sans",sans-serif';
      c.fillText(seg.label,tr,seg.sub?-10:0);
      if(seg.sub){
        c.globalAlpha=.6;
        c.font='600 13px "Plus Jakarta Sans",sans-serif';
        c.fillText(seg.sub,tr,flip?-30:16);
        c.globalAlpha=1;
      }
    }
    c.restore();
  }

  // Son segment çizgisi
  var la=-Math.PI/2;
  c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(la)*R,cy+Math.sin(la)*R);
  c.strokeStyle='rgba(212,176,94,.2)';c.lineWidth=1.5;c.stroke();

  // Pin noktaları
  for(var i=0;i<N;i++){
    var pa=-Math.PI/2+i*SAR;
    var px=cx+Math.cos(pa)*(R-8),py=cy+Math.sin(pa)*(R-8);
    c.beginPath();c.arc(px,py,4,0,Math.PI*2);
    c.fillStyle='#d4b05e';c.fill();
    c.strokeStyle='rgba(0,0,0,.3)';c.lineWidth=1;c.stroke();
  }

  // Merkez daire
  var cg=c.createRadialGradient(cx-8,cy-8,4,cx,cy,CR);
  cg.addColorStop(0,'#f5e6c8');cg.addColorStop(.5,'#d4b05e');cg.addColorStop(1,'#8a6e2f');
  c.beginPath();c.arc(cx,cy,CR,0,Math.PI*2);
  c.fillStyle=cg;c.fill();
  c.strokeStyle='rgba(255,255,255,.15)';c.lineWidth=2;c.stroke();

  // Merkez "M"
  c.fillStyle='#1a1714';
  c.font='800 38px "Plus Jakarta Sans",sans-serif';
  c.textAlign='center';c.textBaseline='middle';
  c.fillText('M',cx,cy+1);
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
    o.frequency.value=1200;o.type='sine';
    g.gain.setValueAtTime(.08,_audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,_audioCtx.currentTime+.04);
    o.start();o.stop(_audioCtx.currentTime+.04);
  }catch(e){}
}

function winSound(){
  if(!_audioCtx||_muted)return;
  try{
    [523,659,784,1047].forEach(function(f,i){
      setTimeout(function(){
        var o=_audioCtx.createOscillator(),g=_audioCtx.createGain();
        o.connect(g);g.connect(_audioCtx.destination);
        o.frequency.value=f;o.type='sine';
        g.gain.setValueAtTime(.12,_audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(.001,_audioCtx.currentTime+.25);
        o.start();o.stop(_audioCtx.currentTime+.25);
      },i*120);
    });
  }catch(e){}
}

// ====== DRAG / SWIPE ======
var _dragStart=null,_dragVel=0,_lastDragTime=0,_lastDragAngle=0;

function initDrag(){
  var box=document.getElementById('sw-box');if(!box)return;
  var cv=box.querySelector('.sw-canvas');

  function getAngle(e){
    var r=cv.getBoundingClientRect();
    var ccx=r.left+r.width/2,ccy=r.top+r.height/2;
    var pt=e.touches?e.touches[0]:e;
    return Math.atan2(pt.clientY-ccy,pt.clientX-ccx)*180/Math.PI;
  }

  function onStart(e){
    if(_spinning||!isLoggedIn())return;
    e.preventDefault();
    _dragStart=getAngle(e);_dragVel=0;_lastDragTime=Date.now();_lastDragAngle=_dragStart;
  }

  function onMove(e){
    if(_dragStart===null||_spinning)return;
    e.preventDefault();
    var now=Date.now(),a=getAngle(e);
    var delta=a-_dragStart;
    _rotation+=delta;
    cv.style.transform='rotate('+_rotation+'deg)';
    _dragVel=(a-_lastDragAngle)/(now-_lastDragTime+1)*16;
    _lastDragAngle=a;_lastDragTime=now;
    _dragStart=a;
  }

  function onEnd(){
    if(_dragStart===null)return;
    _dragStart=null;
    if(Math.abs(_dragVel)>3)swSpin();
  }

  cv.addEventListener('mousedown',onStart);
  cv.addEventListener('mousemove',onMove);
  cv.addEventListener('mouseup',onEnd);
  cv.addEventListener('mouseleave',function(){_dragStart=null});
  cv.addEventListener('touchstart',onStart,{passive:false});
  cv.addEventListener('touchmove',onMove,{passive:false});
  cv.addEventListener('touchend',onEnd);
}

// ====== ANİMASYON ======
function animateTo(segment,angleOffset,dur){
  return new Promise(function(resolve){
    var cv=document.getElementById('sw-cv');if(!cv)return resolve();

    var target=360-segment*SA-SA/2+(angleOffset||0);
    var fullSpins=(5+Math.floor(Math.random()*3))*360;
    var startRot=_rotation;
    var end=startRot+fullSpins+target-((startRot%360+360)%360);
    if(end-startRot<1800)end+=360*3;

    var duration=dur||7000;
    var startTime=null;
    var lastSeg=-1;

    function frame(ts){
      if(!startTime)startTime=ts;
      var t=Math.min((ts-startTime)/duration,1);
      var ease=1-Math.pow(1-t,3.5);

      _rotation=startRot+(end-startRot)*ease;
      cv.style.transform='rotate('+_rotation+'deg)';

      var curSeg=Math.floor(((_rotation%360+360)%360)/SA)%N;
      if(curSeg!==lastSeg){tick();lastSeg=curSeg}

      if(t<1)requestAnimationFrame(frame);
      else{_rotation=end;cv.style.transform='rotate('+_rotation+'deg)';resolve()}
    }
    requestAnimationFrame(frame);
  });
}

// ====== CONFETTİ ======
function confetti(){
  var cv=document.getElementById('sw-confetti');if(!cv)return;
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  var c=cv.getContext('2d');
  var cols=['#d4b05e','#f5e6c8','#ffd700','#fff','#ff8674','#4ade80','#7eb8da','#b08ed4'];
  var P=[];
  for(var i=0;i<150;i++){
    P.push({x:cv.width/2+(Math.random()-.5)*100,y:cv.height*.45,
      vx:(Math.random()-.5)*18,vy:-(Math.random()*16+8),
      sz:Math.random()*7+3,col:cols[Math.floor(Math.random()*cols.length)],
      rot:Math.random()*360,rs:(Math.random()-.5)*14,
      life:1,d:Math.random()*.006+.005,sh:Math.random()>.4?0:1});
  }
  var aid;
  function draw(){
    c.clearRect(0,0,cv.width,cv.height);var alive=false;
    for(var i=0;i<P.length;i++){
      var p=P[i];if(p.life<=0)continue;alive=true;
      p.x+=p.vx;p.vy+=.4;p.y+=p.vy;p.vx*=.98;p.rot+=p.rs;p.life-=p.d;
      c.save();c.globalAlpha=Math.max(0,p.life);
      c.translate(p.x,p.y);c.rotate(p.rot*Math.PI/180);c.fillStyle=p.col;
      if(p.sh){c.beginPath();c.arc(0,0,p.sz/2,0,Math.PI*2);c.fill()}
      else{c.fillRect(-p.sz/2,-p.sz*.3,p.sz,p.sz*.6)}
      c.restore();
    }
    if(alive)aid=requestAnimationFrame(draw);
    else c.clearRect(0,0,cv.width,cv.height);
  }
  draw();
  setTimeout(function(){if(aid)cancelAnimationFrame(aid);c.clearRect(0,0,cv.width,cv.height)},5000);
}

// ====== TOAST ======
function showToast(title,sub,dur){
  var t=document.getElementById('sw-toast');
  document.getElementById('sw-toast-t').innerHTML=title;
  document.getElementById('sw-toast-s').textContent=sub;
  t.classList.add('show');
  setTimeout(function(){t.classList.remove('show')},dur||2500);
}

// ====== GİRİŞ (GAS kontrol — localStorage yok) ======
function getEmail(){
  if(window._mlCache&&window._mlCache.email&&window._mlCache.loggedIn)return window._mlCache.email;
  return null;
}
function isLoggedIn(){return!!getEmail()}

function msg(text,cls){
  var el=document.getElementById('sw-msg');
  el.textContent=text;el.className='sw-msg'+(cls?' '+cls:'');
}

// ====== OVERLAY ======
function openOverlay(){
  initAudio();
  var ov=document.getElementById('sw-ov');
  ov.classList.add('open');
  document.getElementById('sw-prize').classList.remove('show');

  var gate=document.getElementById('sw-gate');
  var btn=document.getElementById('sw-btn');
  if(!isLoggedIn()){
    gate.style.display='flex';btn.style.display='none';msg('');
  }else{
    gate.style.display='none';btn.style.display='';
    btn.disabled=_spunSession;
    btn.textContent=_spunSession?'ÇEVRİLDİ':'ÇEVİR!';
    msg(_spunSession?getCountdownText():'Çarkı çevir veya sürükle!');
  }
}

function swClose(){
  if(_spinning)return;
  document.getElementById('sw-ov').classList.remove('open');
  document.getElementById('sw-prize').classList.remove('show');
}

// ====== ANA ÇARK LOGİĞİ (GAS kontrol) ======
async function swSpin(){
  if(_spinning||_spunSession)return;
  if(!isLoggedIn()){openOverlay();return}

  _spinning=true;
  var btn=document.getElementById('sw-btn');
  btn.disabled=true;btn.textContent='Çevriliyor...';msg('');
  document.getElementById('sw-x').style.display='none';

  try{
    var email=getEmail();
    var resp=await fetch(GAS_URL+'?action=spin&email='+encodeURIComponent(email));
    var data=await resp.json();

    if(!data.ok){
      if(data.error==='already_spun'){
        _spunSession=true;
        msg(data.message||'Bu hafta zaten çevirdiniz!');
        if(data.couponCode)showPrize({prize:data.prize,couponCode:data.couponCode,type:'repeat'});
        else{msg(getCountdownText())}
      }else{
        msg(data.error||'Bir hata oluştu','err');
      }
      btn.disabled=_spunSession;btn.textContent=_spunSession?'ÇEVRİLDİ':'ÇEVİR!';
      document.getElementById('sw-x').style.display='';
      _spinning=false;return;
    }

    // Çarkı çevir (7sn)
    await animateTo(data.segment,data.angleOffset||0,7000);
    await new Promise(function(r){setTimeout(r,500)});

    var isNearMiss=(data.segment===0||data.segment===2);

    if(data.type==='none'){
      showToast('Tekrar Dene!','Haftaya şansınız açılabilir',2500);
    }else{
      winSound();confetti();
      var card=document.getElementById('sw-prize-card');
      card.classList.add('sw-shake');
      setTimeout(function(){card.classList.remove('sw-shake')},600);
    }

    showPrize(data);
    _spunSession=true;

    if(isNearMiss&&data.type!=='none'){
      setTimeout(function(){
        showToast(ICO.fire+'Çok yaklaştınız!','Büyük ödüle az kaldı... Haftaya tekrar deneyin!',3000);
      },2500);
    }

  }catch(err){
    msg('Bağlantı hatası, tekrar deneyin','err');
  }

  btn.disabled=_spunSession;btn.textContent=_spunSession?'ÇEVRİLDİ':'ÇEVİR!';
  document.getElementById('sw-x').style.display='';
  _spinning=false;
}

// ====== ÖDÜL KARTI ======
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
    s.textContent='Bu sefer olmadı ama haftaya şansın açılabilir!';
    pc.style.display='none';pex.textContent='';
  }else if(data.type==='repeat'){
    ico.innerHTML=ICO.ticket;t.textContent='Bu Haftaki Ödülünüz';
    s.textContent=data.prize||'';
    if(data.couponCode){pc.style.display='inline-block';pct.textContent=data.couponCode}
    else{pc.style.display='none'}
    pex.textContent='';
  }else if(data.type==='shipping'){
    ico.innerHTML=ICO.ship;t.textContent='Ücretsiz Kargo!';
    s.textContent='Bir sonraki siparişinizde kargo bizden!';
    pc.style.display='inline-block';pct.textContent=data.couponCode;
    pex.textContent=data.expiry?'Son kullanma: '+data.expiry:'';
  }else if(data.type==='percent'){
    ico.innerHTML=data.discount>=10?ICO.trophy:ICO.win;
    t.textContent='%'+data.discount+' İndirim Kazandınız!';
    s.textContent='Tebrikler! Kupon kodunuz hazır.';
    pc.style.display='inline-block';pct.textContent=data.couponCode;
    pex.textContent=data.expiry?'Son kullanma: '+data.expiry:'';
  }

  pcd.textContent=getCountdownText();
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
function getCountdownText(){
  var now=new Date();
  var next=new Date(now);
  var d=next.getDay(),diff=d===0?1:(8-d);
  next.setDate(next.getDate()+diff);next.setHours(0,0,0,0);
  var ms=next-now;if(ms<=0)return'Hemen tekrar çevirebilirsiniz!';
  var days=Math.floor(ms/86400000);
  var hrs=Math.floor((ms%86400000)/3600000);
  return'Sonraki hak: '+days+' gün '+hrs+' saat';
}

// ====== SES TOGGLE ======
function swToggleSound(){
  _muted=!_muted;
  var btn=document.getElementById('sw-snd');
  var txt=document.getElementById('sw-snd-txt');
  if(_muted){
    btn.innerHTML=ICO.sndOff+' <span id="sw-snd-txt">Ses Kapalı</span>';
    btn.classList.add('off');
  }else{
    btn.innerHTML=ICO.sndOn+' <span id="sw-snd-txt">Ses Açık</span>';
    btn.classList.remove('off');
  }
}

// ====== GLOBAL ======
window.swSpin=swSpin;window.swClose=swClose;window.swCopy=swCopy;window.swToggleSound=swToggleSound;

// ====== INIT ======
function init(){build();drawWheel();initDrag()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();

})();
