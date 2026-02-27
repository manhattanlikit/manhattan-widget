// Manhattan Likit — Dark Mode v2.9
// Standalone file — widget.js'e dokunmaz, ayrı yüklenir
// Navbar: ☰ MANHATTAN 🌙 topbar + motto + sidebar (dinamik kategoriler)
// Tasarım: Premium warm-dark, Apple siyahı DEĞİL

(function(){
'use strict';

// ─── RENK PALETİ ───
// Sıcak koyu tonlar — saf siyah değil, hafif kahve/altın alt ton
var BG1='#1b1a17';      // ana arka plan (sıcak kömür)
var BG2='#23221e';      // kart / yüzey
var BG3='#2c2b26';      // hover / aktif yüzey
var BGnav='#16150f';    // nav & footer (en koyu)
var TX1='#ece8df';      // birincil metin (sıcak krem)
var TX2='#a09b8f';      // ikincil metin
var TX3='#706c62';      // üçüncül / ipucu
var GOLD='#d4b05e';     // Manhattan gold vurgu
var GOLDDIM='#af8c3e';  // koyu gold
var BD='rgba(175,140,62,.12)'; // kenarlık
var BD2='rgba(175,140,62,.06)';
var CARD_SHADOW='0 2px 16px rgba(0,0,0,.35)';
var IMG_BG='#2c2b26';   // ürün görseli container — koyu sıcak (kartla uyumlu)

// ─── CSS ───
var css=`
/* ══════════════════════════════════════
   MANHATTAN DARK MODE — Warm Premium
   ══════════════════════════════════════ */

/* ── GEÇİŞ: animasyon yok, anında ── */

/* ── TOGGLE BUTON ── */
.ml-dm-btn{
  z-index:999999;
  width:40px;height:40px;border-radius:10px;
  border:2px solid #a07830;
  background:transparent;
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  color:#a07830;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;
  box-shadow:0 2px 6px rgba(160,120,48,.25);
  transition:background .25s ease,border-color .25s ease,color .25s ease,box-shadow .25s ease,transform .25s ease;
  padding:0;
  pointer-events:auto;
  overflow:hidden;
}
/* Hover açık: #6 Sıcak İç Glow */
.ml-dm-btn:hover{
  border-color:#a07830;
  color:#a07830;
  background:transparent;
  box-shadow:0 2px 8px rgba(160,120,48,.3), inset 0 0 10px rgba(160,120,48,.08);
}
.ml-dm-btn svg{width:18px;height:18px;transition:color .25s ease}
.ml-dm-btn:active svg{transform:rotate(15deg) scale(.9)}

/* Dark mode base: #7 Antik + Parlak Gölge */
body.ml-dark .ml-dm-btn{
  background:rgba(35,34,30,.55);
  border-color:rgba(160,120,48,.35);
  color:${GOLD};
  box-shadow:0 2px 10px rgba(0,0,0,.2), 0 0 12px rgba(175,140,62,.06);
  overflow:hidden;
}
/* Hover dark: #7 Altın Glow Ring */
body.ml-dark .ml-dm-btn:hover{
  background:rgba(45,44,38,.85);
  border-color:${GOLD};
  color:${GOLD};
  box-shadow:0 0 0 3px rgba(212,176,94,.1), 0 2px 12px rgba(0,0,0,.25), 0 0 18px rgba(212,176,94,.08);
}

@media(max-width:768px){
  .ml-dm-btn{width:34px;height:34px;border-radius:8px}
  .ml-dm-btn svg{width:15px;height:15px}
}

/* ══════════════════════════════════════
   MANHATTAN NAVBAR SYSTEM
   ══════════════════════════════════════ */

/* Ecwid default nav → hidden when custom navbar active */
body.ml-nav .cover__menu .main-nav,
body.ml-nav .cover__menu .top-menu,
body.ml-nav .cover__menu .pushmenu-btn,
body.ml-nav .cover__menu .content{display:none!important}
body.ml-nav .cover__menu{height:0!important;overflow:hidden!important;padding:0!important;margin:0!important;min-height:0!important}
body.ml-nav .menu{padding:0!important;min-height:0!important;height:0!important;overflow:hidden!important}
body.ml-nav .float-icons{z-index:999995!important;position:fixed!important;right:0!important;top:var(--ml-nav-h,107px)!important}
body.ml-nav{padding-top:90px;background-color:#ffbd92}
html{scroll-padding-top:var(--ml-nav-h,107px)}
html{background-color:#ffbd92}
body.ml-dark{background-color:#1b1a17!important}
body.ml-nav .store.dynamic-product-browser{background:transparent!important}
body.ml-nav{background:linear-gradient(180deg,#ffbd92 0%,#fff 400px)!important}
body.ml-nav.ml-dark{background:#1b1a17!important}

/* Top Bar */
.ml-topbar{
  display:flex;align-items:center;padding:6px 14px;
  background:rgba(255,255,255,.18);
  backdrop-filter:blur(20px) saturate(120%);-webkit-backdrop-filter:blur(20px) saturate(120%);
  border-bottom:1px solid rgba(255,255,255,.25);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.5),inset 0 -1px 0 rgba(0,0,0,.04),0 1px 4px rgba(0,0,0,.06);
  gap:10px;position:fixed;top:0;left:0;right:0;z-index:999990;
  isolation:isolate;
}
/* Liquid Glass Layer 1 — specular highlight gradient */
.ml-topbar::before{
  content:'';position:absolute;top:0;left:0;right:0;bottom:0;
  background:linear-gradient(180deg,rgba(255,255,255,.4) 0%,rgba(255,255,255,.12) 40%,rgba(255,255,255,.18) 100%);
  pointer-events:none;z-index:-1;
}
/* Liquid Glass Layer 2 — SVG noise texture (frosted glass grain) */
.ml-topbar::after{
  content:'';position:absolute;top:0;left:0;right:0;bottom:0;
  background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity:.06;pointer-events:none;z-index:-1;mix-blend-mode:overlay;
}
.ml-topbar .ml-brand{
  position:absolute;left:50%;transform:translateX(-50%);
  font-size:14px;font-weight:700;letter-spacing:1.5px;color:#2c2a25;
  display:flex;align-items:center;gap:8px;cursor:pointer;
}
.ml-topbar .ml-brand:active{opacity:.7}
.ml-topbar.ml-scrolled{box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -1px 0 rgba(0,0,0,.05),0 2px 12px rgba(0,0,0,.1)}
body.ml-dark .ml-topbar.ml-scrolled{box-shadow:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -1px 0 rgba(0,0,0,.15),0 2px 16px rgba(0,0,0,.35)}
.ml-brand-logo{width:24px;height:24px;object-fit:contain}
/* Sidebar header action buttons (Back + Home) */
.ml-sb-action{
  width:30px;height:30px;border-radius:8px;border:none;
  background:rgba(175,140,62,.06);cursor:pointer;display:inline-flex;
  align-items:center;justify-content:center;flex-shrink:0;color:#af8c3e;
  padding:0;transition:background .2s ease,transform .15s ease;
  -webkit-tap-highlight-color:transparent;
}
.ml-sb-action:active{background:rgba(175,140,62,.15);transform:scale(.93)}
.ml-sb-action svg{width:15px;height:15px;stroke:currentColor;stroke-width:2;fill:none}
body.ml-dark .ml-sb-action{color:${GOLD};background:rgba(175,140,62,.08)}
body.ml-dark .ml-sb-action:active{background:rgba(175,140,62,.18)}
/* Sidebar star (İndirim Seviyem) — greeting satırında */
.ml-sb-star{
  width:32px;height:32px;border-radius:8px;border:1.5px solid rgba(175,140,62,.3);
  background:rgba(175,140,62,.04);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;
  flex-shrink:0;color:#af8c3e;padding:0;margin-left:6px;vertical-align:middle;
  transition:background .2s ease,border-color .2s ease;
}
.ml-sb-star svg{width:16px;height:16px}
.ml-sb-star:active{background:rgba(175,140,62,.15);transform:scale(.92);border-color:#af8c3e}
body.ml-dark .ml-sb-star{color:${GOLD};border-color:rgba(212,176,94,.3)}
body.ml-dark .ml-sb-star:active{background:rgba(175,140,62,.15)}
body.ml-dark .ml-topbar{background:rgba(22,21,15,.2);border-color:rgba(255,255,255,.1);backdrop-filter:blur(20px) saturate(150%);-webkit-backdrop-filter:blur(20px) saturate(150%);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -1px 0 rgba(0,0,0,.2),0 1px 6px rgba(0,0,0,.2)}
body.ml-dark .ml-topbar::before{background:linear-gradient(180deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,.02) 40%,rgba(255,255,255,.04) 100%)}
body.ml-dark .ml-topbar::after{opacity:.05;mix-blend-mode:soft-light}
body.ml-dark .ml-topbar .ml-brand{color:${GOLD}}

/* Motto Bar */
.ml-motto{
  padding:5px 14px;text-align:center;line-height:1.4;
  background:rgba(255,255,255,.14);
  backdrop-filter:blur(16px) saturate(120%);-webkit-backdrop-filter:blur(16px) saturate(120%);
  border-bottom:1px solid rgba(255,255,255,.18);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.25),inset 0 -1px 0 rgba(0,0,0,.03);
  position:fixed;top:46px;left:0;right:0;z-index:999989;
  isolation:isolate;
}
/* Motto Liquid Glass layers */
.ml-motto::before{
  content:'';position:absolute;top:0;left:0;right:0;bottom:0;
  background:linear-gradient(180deg,rgba(255,255,255,.3) 0%,rgba(255,255,255,.08) 100%);
  pointer-events:none;z-index:-1;
}
.ml-motto::after{
  content:'';position:absolute;top:0;left:0;right:0;bottom:0;
  background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity:.05;pointer-events:none;z-index:-1;mix-blend-mode:overlay;
}
.ml-motto-en{font-size:10.5px;letter-spacing:2.5px;font-weight:500;text-transform:uppercase;color:#8b7a4e}
.ml-motto-tr{font-size:9.5px;letter-spacing:.8px;font-weight:300;margin-top:1px;opacity:.4;color:#8b7a4e}
body.ml-dark .ml-motto{background:rgba(22,21,15,.15);border-color:rgba(255,255,255,.06);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);box-shadow:inset 0 1px 0 rgba(255,255,255,.06),inset 0 -1px 0 rgba(0,0,0,.12)}
body.ml-dark .ml-motto::before{background:linear-gradient(180deg,rgba(255,255,255,.06) 0%,rgba(255,255,255,.01) 100%)}
body.ml-dark .ml-motto::after{opacity:.04;mix-blend-mode:soft-light}
body.ml-dark .ml-motto-en{color:${GOLD}}
body.ml-dark .ml-motto-tr{color:${GOLD}}

/* Hamburger */
.ml-hamburger{
  width:38px;height:38px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:5px;
  cursor:pointer;flex-shrink:0;border-radius:9px;
  transition:background-color .25s;background:none;border:none;padding:0;
}
.ml-hamburger span{
  display:block;width:20px;height:2px;border-radius:2px;
  background:#2c2a25;pointer-events:none;
  transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .3s,width .3s;
  transform-origin:center;
}
.ml-hamburger:hover{background:rgba(0,0,0,.04)}
body.ml-dark .ml-hamburger span{background:${GOLD}}
body.ml-dark .ml-hamburger:hover{background:rgba(175,140,62,.1)}
.ml-hamburger.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.ml-hamburger.open span:nth-child(2){opacity:0;width:0}
.ml-hamburger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}

/* Sidebar Overlay */
.ml-sb-overlay{
  position:fixed;top:0;left:0;right:0;bottom:0;
  background:rgba(0,0,0,0);z-index:999991;
  pointer-events:none;
  transition:background .3s ease;
}
.ml-sb-overlay.open{background:rgba(27,22,15,.4);pointer-events:auto;-webkit-tap-highlight-color:transparent;touch-action:none}

/* Sidebar — Liquid Glass */
.ml-sidebar{
  position:fixed;top:0;bottom:0;left:0;
  width:84vw;max-width:320px;
  background:rgba(255,252,245,.92);
  backdrop-filter:blur(24px) saturate(140%);-webkit-backdrop-filter:blur(24px) saturate(140%);
  border-right:1px solid rgba(255,255,255,.3);
  box-shadow:4px 0 24px rgba(0,0,0,.08);
  z-index:999992;
  overflow-y:auto;overflow-x:hidden;
  overscroll-behavior:contain;-webkit-overflow-scrolling:touch;
  transform:translateX(-100%);
  opacity:0;
  transition:transform .44s cubic-bezier(.22,1,.36,1),opacity .28s ease-out;
}
.ml-sidebar.open{transform:translateX(0);opacity:1}
body.ml-dark .ml-sidebar{
  background:rgba(27,26,23,.82);
  backdrop-filter:blur(24px) saturate(120%);-webkit-backdrop-filter:blur(24px) saturate(120%);
  border-right:1px solid rgba(175,140,62,.12);
  box-shadow:4px 0 24px rgba(0,0,0,.3);
}
.ml-sidebar::-webkit-scrollbar{width:3px}
.ml-sidebar::-webkit-scrollbar-thumb{background:rgba(0,0,0,.1);border-radius:3px}
body.ml-dark .ml-sidebar::-webkit-scrollbar-thumb{background:rgba(175,140,62,.2)}

/* Sidebar Header — D-style centered */
.ml-sb-head{padding:18px 20px 14px;box-sizing:border-box;text-align:center;position:relative;border-bottom:1px solid rgba(0,0,0,.04)}
.ml-sb-head:active{background:transparent}
.ml-sb-logo{display:none}
.ml-sb-head .ml-sb-brand{font-size:13px;font-weight:700;letter-spacing:3.5px;color:#2c2a25;display:block}
.ml-sb-motto{font-size:8.5px;letter-spacing:1.8px;color:#a09078;font-weight:400;margin-top:2px}
.ml-sb-close{position:absolute;top:14px;right:14px;width:28px;height:28px;border-radius:50%;background:rgba(0,0,0,.04);border:none;color:#a09078;font-size:16px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center}
.ml-sb-close:active{background:rgba(0,0,0,.08)}
body.ml-dark .ml-sb-head{background:transparent;border-color:rgba(175,140,62,.06)}
body.ml-dark .ml-sb-head .ml-sb-brand{color:${GOLD}}
body.ml-dark .ml-sb-motto{color:${TX3}}
body.ml-dark .ml-sb-close{background:rgba(255,255,255,.06);color:${TX2}}
body.ml-dark .ml-sb-close:active{background:rgba(175,140,62,.08)}
body.ml-dark .ml-sb-logo,
body.ml-dark .ml-brand-logo{
  content:url('https://static.wixstatic.com/media/1ca398_eb2ce0b39e06419fa00da66903e58dc5~mv2.png')!important;
}

/* Nav bottom — D-style minimal footer */
.ml-sb-nav-bottom{
  margin-top:auto;padding:12px 20px 16px;
  border-top:1px solid rgba(0,0,0,.04);
  display:flex;gap:18px;
}
body.ml-dark .ml-sb-nav-bottom{border-color:rgba(175,140,62,.06)}
.ml-sb-nav-link{font-size:12px!important;color:#a09078!important;letter-spacing:.4px;cursor:pointer;transition:color .15s ease!important;padding:0!important;min-height:auto!important;border:none!important;background:none!important}
.ml-sb-nav-link:hover{color:#af8c3e!important;background:none!important}
.ml-sb-nav-link:active{color:#af8c3e!important;background:none!important}
body.ml-dark .ml-sb-nav-link{color:${TX3}!important}
body.ml-dark .ml-sb-nav-link:hover{color:${GOLD}!important;background:none!important}
body.ml-dark .ml-sb-nav-link:active{color:${GOLD}!important}

/* Section Label — iOS group header */
.ml-sb-section{
  padding:16px 20px 6px;font-size:10px;text-transform:uppercase;
  letter-spacing:1.5px;margin-top:4px;color:#a09078;
}
body.ml-dark .ml-sb-section{color:${TX3}}

/* Category list — iOS grouped container */
#ml-cat-list{
  margin:0 14px;border-radius:14px;overflow:hidden;
  background:rgba(0,0,0,.025);border:1px solid rgba(0,0,0,.04);
}
body.ml-dark #ml-cat-list{background:rgba(255,255,255,.04);border-color:rgba(175,140,62,.12)}

/* Nav Item — 42px compact touch target */
.ml-sb-item{
  padding:10px 14px;font-size:14px;cursor:pointer;
  min-height:42px;box-sizing:border-box;
  display:flex;align-items:center;
  position:relative;overflow:hidden;color:#5a4f3a;
  border-bottom:1px solid rgba(0,0,0,.03);
  transition:background .15s ease;-webkit-tap-highlight-color:transparent;
}
.ml-sb-item:last-child{border-bottom:none}
.ml-sb-item:active{color:#af8c3e;background:rgba(175,140,62,.04)}
.ml-sb-item.active{color:#af8c3e;font-weight:600}
.ml-sb-item .ml-sb-item-label{flex:1}
.ml-sb-item .ml-sb-item-chev{color:#ccc;font-size:13px;flex-shrink:0;margin-left:auto}
body.ml-dark .ml-sb-item{color:#c8c0b0}
body.ml-dark .ml-sb-item:active{color:${GOLD};background:rgba(175,140,62,.06)}
body.ml-dark .ml-sb-item.active{color:${GOLD}}
body.ml-dark .ml-sb-item .ml-sb-item-chev{color:${TX3}}

/* Category icons — letter squares + accessory SVGs */
.ml-sb-cat-icon{
  width:24px;height:24px;border-radius:6px;flex-shrink:0;margin-right:10px;
  display:inline-flex;align-items:center;justify-content:center;
}
.ml-sb-cat-icon svg{width:13px;height:13px;stroke-width:1.4;fill:none}
.ml-ci-letter{font-size:11px;font-weight:700;letter-spacing:0}
.ml-ci-freebase{background:rgba(0,128,128,.1)}
.ml-ci-freebase .ml-ci-letter{color:#008080}
.ml-ci-salt{background:rgba(220,53,69,.08)}
.ml-ci-salt .ml-ci-letter{color:#dc3545}
.ml-ci-iced{background:rgba(100,181,246,.1)}
.ml-ci-iced .ml-ci-letter{color:#64b5f6}
.ml-ci-iced-svg{background:rgba(100,181,246,.1)}
.ml-ci-iced-svg svg{stroke:#64b5f6}
.ml-ci-acc{background:rgba(140,120,90,.08)}
.ml-ci-acc svg{stroke:#8c785a}
body.ml-dark .ml-ci-freebase{background:rgba(0,128,128,.12)}
body.ml-dark .ml-ci-freebase .ml-ci-letter{color:#3aafb6}
body.ml-dark .ml-ci-salt{background:rgba(220,53,69,.1)}
body.ml-dark .ml-ci-salt .ml-ci-letter{color:#e8616c}
body.ml-dark .ml-ci-iced{background:rgba(100,181,246,.1)}
body.ml-dark .ml-ci-iced .ml-ci-letter{color:#7ec4f8}
body.ml-dark .ml-ci-iced-svg{background:rgba(100,181,246,.1)}
body.ml-dark .ml-ci-iced-svg svg{stroke:#7ec4f8}
body.ml-dark .ml-ci-acc{background:rgba(175,140,62,.08)}
body.ml-dark .ml-ci-acc svg{stroke:${GOLD}}

/* Sidebar User Section — iOS profile card */
.ml-sb-user{
  padding:12px 14px 0;
}
.ml-sb-profile{
  padding:12px 14px;background:rgba(0,0,0,.025);border-radius:14px;
  display:flex;align-items:center;gap:11px;cursor:pointer;
  border:1px solid rgba(0,0,0,.04);
  transition:background .15s ease;-webkit-tap-highlight-color:transparent;
}
.ml-sb-profile:active{background:rgba(175,140,62,.06)}
.ml-sb-avatar{
  width:38px;height:38px;border-radius:11px;flex-shrink:0;
  background:linear-gradient(135deg,rgba(175,140,62,.15),rgba(212,176,94,.08));
  border:1.5px solid rgba(175,140,62,.2);
  display:flex;align-items:center;justify-content:center;
  font-size:14px;font-weight:600;color:#af8c3e;
}
.ml-sb-profile-info{flex:1;min-width:0}
.ml-sb-profile-name{font-size:13px;font-weight:600;color:#2c2a25;line-height:1.3}
.ml-sb-tier-badge{
  display:inline-flex;align-items:center;gap:3px;margin-top:3px;
  font-size:9px;font-weight:700;color:#fff;letter-spacing:.4px;
  padding:2px 8px 2px 6px;border-radius:10px;
  background:linear-gradient(135deg,#af8c3e,#d4b05e);
  cursor:pointer;position:relative;overflow:hidden;
  text-transform:uppercase;
}
.ml-sb-tier-badge::after{
  content:'';position:absolute;top:0;left:-60%;width:40%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);
  animation:mlBadgeShimmer 2.5s ease-in-out infinite;
}
@keyframes mlBadgeShimmer{0%,100%{left:-60%}50%{left:110%}}
.ml-sb-tier-badge svg{width:10px;height:10px;flex-shrink:0}
.ml-sb-tier-dot{display:none}
.ml-sb-profile-chevron{color:#ccc;font-size:14px;flex-shrink:0}
body.ml-dark .ml-sb-profile{background:rgba(255,255,255,.04);border-color:rgba(175,140,62,.12)}
body.ml-dark .ml-sb-profile:active{background:rgba(175,140,62,.1)}
body.ml-dark .ml-sb-avatar{background:linear-gradient(135deg,rgba(175,140,62,.15),rgba(212,176,94,.06));border-color:rgba(175,140,62,.2);color:${GOLD}}
body.ml-dark .ml-sb-profile-name{color:${TX1}}
body.ml-dark .ml-sb-tier-badge{background:linear-gradient(135deg,rgba(175,140,62,.9),rgba(212,176,94,.85));color:#1b1a17}
body.ml-dark .ml-sb-profile-chevron{color:${TX3}}
/* Login form in sidebar */
.ml-sb-login-label{
  font-size:11px;color:#a09078;margin-bottom:8px;text-align:center;
}
.ml-sb-login-row{
  display:flex;gap:6px;
}
.ml-sb-login-input{
  flex:1;padding:8px 12px;border:1px solid rgba(0,0,0,.12);border-radius:8px;
  font-size:13px;font-family:inherit;background:rgba(255,255,255,.6);color:#333;
  outline:none;box-sizing:border-box;
}
.ml-sb-login-input:focus{border-color:#af8c3e;box-shadow:0 0 0 2px rgba(175,140,62,.15)}
.ml-sb-login-input::placeholder{color:#aaa}
.ml-sb-login-btn{
  padding:8px 14px;border:none;border-radius:8px;
  background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff;
  font-size:12px;font-weight:600;font-family:inherit;cursor:pointer;
  white-space:nowrap;
}
.ml-sb-login-btn:active{opacity:.8;transform:scale(.97)}
.ml-sb-login-btn:disabled{opacity:.5;cursor:not-allowed}
.ml-sb-login-msg{font-size:11px;margin-top:6px;min-height:16px;text-align:center}

/* Quick Actions — iOS grouped list */
.ml-sb-quick{
  margin:12px 14px 0;border-radius:14px;overflow:hidden;
  background:rgba(0,0,0,.025);border:1px solid rgba(0,0,0,.04);
}
.ml-sb-qa{
  display:flex;align-items:center;gap:11px;
  padding:11px 14px;cursor:pointer;
  border:none;border-bottom:1px solid rgba(0,0,0,.03);
  background:transparent;color:#5a4f3a;font-size:14px;font-weight:400;
  font-family:inherit;width:100%;text-align:left;
  transition:background .15s ease;-webkit-tap-highlight-color:transparent;
}
.ml-sb-qa:last-child{border-bottom:none}
.ml-sb-qa:active{background:rgba(175,140,62,.06)}
.ml-sb-qa svg{width:16px;height:16px;stroke:currentColor;stroke-width:1.5;fill:none;flex-shrink:0}
.ml-sb-qa-label{flex:1}
.ml-sb-qa-count{
  font-size:9px;font-weight:700;min-width:18px;height:18px;
  display:inline-flex;align-items:center;justify-content:center;
  border-radius:9px;background:linear-gradient(135deg,#af8c3e,#d4b05e);color:#fff;
}
.ml-sb-chevron{color:#ccc;font-size:13px;flex-shrink:0}
body.ml-dark .ml-sb-quick{background:rgba(255,255,255,.04);border-color:rgba(175,140,62,.12)}
body.ml-dark .ml-sb-qa{color:${TX1};border-color:rgba(255,255,255,.03)}
body.ml-dark .ml-sb-qa:active{background:rgba(175,140,62,.08)}
body.ml-dark .ml-sb-chevron{color:${TX3}}
/* Badge pulse animation */
@keyframes ml-badge-pulse{
  0%{transform:scale(1)}
  40%{transform:scale(1.3)}
  100%{transform:scale(1)}
}
.ml-sb-qa-count.pulse{animation:ml-badge-pulse .4s ease-out}
.ml-sb-qa-count{position:relative;overflow:hidden}
.ml-sb-qa-count::after{
  content:'';position:absolute;top:0;left:-60%;width:40%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);
  animation:mlTierShimmer 2.5s ease-in-out infinite;
}
@keyframes mlTierShimmer{0%,100%{left:-60%}50%{left:110%}}
/* QA icon squares — iOS colored */
.ml-sb-qa-icon{
  width:28px;height:28px;border-radius:7px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
}
.ml-sb-qa-icon svg{width:15px;height:15px;stroke-width:1.6}
.ml-sb-qa-icon.gold{background:rgba(175,140,62,.1)}
.ml-sb-qa-icon.gold svg{stroke:#af8c3e}
.ml-sb-qa-icon.coral{background:rgba(255,134,116,.08)}
.ml-sb-qa-icon.coral svg{stroke:#e87565}
.ml-sb-qa-icon.teal{background:rgba(0,140,149,.08)}
.ml-sb-qa-icon.teal svg{stroke:#3aafb6}
.ml-sb-qa-icon.slate{background:rgba(100,100,110,.08)}
.ml-sb-qa-icon.slate svg{stroke:#7a7a85}
body.ml-dark .ml-sb-qa-icon.gold{background:rgba(175,140,62,.12)}
body.ml-dark .ml-sb-qa-icon.gold svg{stroke:${GOLD}}
body.ml-dark .ml-sb-qa-icon.coral{background:rgba(255,134,116,.1)}
body.ml-dark .ml-sb-qa-icon.coral svg{stroke:#ff8674}
body.ml-dark .ml-sb-qa-icon.teal{background:rgba(0,140,149,.1)}
body.ml-dark .ml-sb-qa-icon.teal svg{stroke:#5dc8cd}
body.ml-dark .ml-sb-qa-icon.slate{background:rgba(200,200,210,.1)}
body.ml-dark .ml-sb-qa-icon.slate svg{stroke:${TX1}}
/* Son görüntülenen ürünler */
.ml-sb-recent{padding:12px 20px 8px}
.ml-sb-recent-title{font-size:9.5px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;color:#a09080;margin-bottom:10px}
.ml-sb-recent-list{display:flex;gap:10px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:4px}
.ml-sb-recent-list::-webkit-scrollbar{display:none}
.ml-sb-ritem{
  flex-shrink:0;width:72px;cursor:pointer;text-align:center;
  -webkit-tap-highlight-color:transparent;transition:transform .15s ease;
}
.ml-sb-ritem:active{transform:scale(.95)}
.ml-sb-ritem img{width:72px;height:72px;object-fit:cover;border-radius:12px;border:1px solid rgba(0,0,0,.06);background:#f5f0e8}
.ml-sb-ritem span{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:10px;color:#6b5f4f;margin-top:5px;line-height:1.3;overflow:hidden;word-break:break-word}
body.ml-dark .ml-sb-recent-title{color:${GOLD};opacity:.6}
body.ml-dark .ml-sb-ritem img{border-color:rgba(175,140,62,.12);background:${BG2}}
body.ml-dark .ml-sb-ritem span{color:${TX3}}
body.ml-dark .ml-sb-login-label{color:${TX3}}
body.ml-dark .ml-sb-login-input{background:rgba(255,255,255,.06);border-color:rgba(175,140,62,.15);color:${TX1}}
body.ml-dark .ml-sb-login-input::placeholder{color:${TX3}}
body.ml-dark .ml-sb-login-input:focus{border-color:${GOLD};box-shadow:0 0 0 2px rgba(175,140,62,.12)}

/* Sidebar Footer — account icons row */
/* Sidebar flex layout for bottom nav */
.ml-sidebar{display:flex;flex-direction:column;padding-bottom:0}
.ml-sidebar>*{flex-shrink:0}
/* Scroll indicator — bottom fade when scrollable */
.ml-sb-scroll-hint{
  position:sticky;bottom:0;left:0;right:0;height:28px;
  background:linear-gradient(to bottom,transparent,rgba(255,252,245,.95));
  pointer-events:none;flex-shrink:0;z-index:2;
  transition:opacity .3s ease;
}
body.ml-dark .ml-sb-scroll-hint{background:linear-gradient(to bottom,transparent,rgba(27,26,23,.95))}
/* Çark (spin wheel) — iOS list item */
.ml-sb-qa-cark{position:relative}
.ml-sb-qa-cark .ml-sb-qa-icon svg{animation:mlCarkSpin 8s linear infinite}
@keyframes mlCarkSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}

/* Desktop adjustments */
@media(min-width:768px){
  .ml-topbar{padding:8px 24px}
  .ml-topbar .ml-brand{font-size:17px;letter-spacing:2px}
  .ml-motto-en{font-size:11.5px;letter-spacing:3px}
  .ml-motto-tr{font-size:10px}
  .ml-sidebar{width:360px;max-width:360px}
  .ml-sb-head{padding:20px 24px 16px}
  .ml-sb-head .ml-sb-brand{font-size:14px;letter-spacing:4px}
  .ml-sb-user{padding:14px 16px 0}
  .ml-sb-quick{margin:12px 16px 0}
  .ml-sb-section{padding:16px 22px 6px}
  #ml-cat-list{margin:0 16px}
  .ml-sb-item{padding:11px 14px;font-size:14px}
  .ml-sb-nav-bottom{padding:14px 24px 18px}
  .ml-sb-nav-link{font-size:13px!important}
  .ml-sb-close{top:16px;right:16px}
  .ml-sb-login-input{font-size:14px;padding:10px 14px}
  .ml-sb-login-btn{font-size:13px;padding:10px 16px}
}

/* ══════════════════════════════════════
   DARK MODE ANA KURALLAR
   ══════════════════════════════════════ */

/* ── BODY & GENEL ── */
body.ml-dark,
html:has(body.ml-dark){
  background:${BG1}!important;
  color:${TX1}!important;
}
/* Text selection + cursor */
body.ml-dark ::selection{
  background:rgba(175,140,62,.35)!important;
  color:${TX1}!important;
}
body.ml-dark input,
body.ml-dark textarea{
  caret-color:${GOLD}!important;
}

/* ── TILES WRAPPER (Instant Site ana container) ── */
body.ml-dark .tiles-wrapper,
body.ml-dark .tiles,
body.ml-dark .body{
  background:${BG1}!important;
}
/* ── SİTE SECTION BLOKLARI ── */
body.ml-dark .container,
body.ml-dark .whyus,
body.ml-dark .contacts,
body.ml-dark .owner,
body.ml-dark .store,
body.ml-dark .dynamic-product-browser{
  background:${BG1}!important;
  color:${TX1}!important;
  overflow:visible!important;
}
body.ml-dark .caption{
  background:${BG1}!important;
  color:${TX1}!important;
  overflow:visible!important;
}
body.ml-dark .footer,
body.ml-dark .footer-new{
  background:${BGnav}!important;
  color:${TX3}!important;
  border-top:1px solid ${BD2}!important;
}

/* ── LOGO (dark/light swap) ── */

/* ── HAKKINDA / ABOUT BÖLÜMÜ — gold başlık + underline ── */
body.ml-dark .tile-about h1,
body.ml-dark .tile-about h2,
body.ml-dark .tile-about h3,
body.ml-dark .tile-about h4,
body.ml-dark .owner h1,
body.ml-dark .owner h2,
body.ml-dark .owner h3,
body.ml-dark .owner h4,
body.ml-dark .whyus h1,
body.ml-dark .whyus h2,
body.ml-dark .whyus h3,
body.ml-dark .whyus h4,
body.ml-dark .contacts h1,
body.ml-dark .contacts h2,
body.ml-dark .contacts h3,
body.ml-dark .contacts h4{
  color:${GOLD}!important;
}
body.ml-dark .tile-about a,
body.ml-dark .owner a,
body.ml-dark .whyus a,
body.ml-dark .contacts a{
  color:${GOLD}!important;
  text-decoration-color:${GOLDDIM}!important;
}
body.ml-dark .tile-about a:hover,
body.ml-dark .owner a:hover,
body.ml-dark .whyus a:hover,
body.ml-dark .contacts a:hover{
  color:${GOLD}!important;
  text-decoration-color:${GOLD}!important;
}
body.ml-dark .tile-about p,
body.ml-dark .tile-about span,
body.ml-dark .tile-about div,
body.ml-dark .owner p,
body.ml-dark .owner span,
body.ml-dark .owner div,
body.ml-dark .whyus p,
body.ml-dark .whyus span,
body.ml-dark .whyus div,
body.ml-dark .contacts p,
body.ml-dark .contacts span,
body.ml-dark .contacts div{
  color:${TX1}!important;
}
/* Hakkında underline elementleri */
body.ml-dark .tile-about u,
body.ml-dark .tile-about [style*="underline"],
body.ml-dark .owner u,
body.ml-dark .owner [style*="underline"],
body.ml-dark .whyus u,
body.ml-dark .whyus [style*="underline"]{
  color:${GOLD}!important;
  text-decoration-color:${GOLDDIM}!important;
}
/* Hakkında ikincil metin */
body.ml-dark .tile-about .tile__description,
body.ml-dark .tile-about [class*="description"],
body.ml-dark .owner [class*="description"]{
  color:${TX2}!important;
}
body.ml-dark .logo img{
  content:url('https://static.wixstatic.com/media/1ca398_eb2ce0b39e06419fa00da66903e58dc5~mv2.png')!important;
}

/* ── NAVİGASYON ── */
body.ml-dark .main-nav,
body.ml-dark .top-menu{
  background:transparent!important;
}
body.ml-dark .top-menu__item a{
  color:${TX1}!important;
  transition:color .2s;
}
body.ml-dark .top-menu__item a:hover{
  color:${GOLD}!important;
}

/* ── SEARCH PANEL ── */
body.ml-dark .search-panel,
body.ml-dark .search-panel > *,
body.ml-dark .search-panel div,
body.ml-dark [class*="search-panel"]{
  border:none!important;
  box-shadow:none!important;
  outline:none!important;
}
body.ml-dark .search-panel{
  background:transparent!important;
  background-color:transparent!important;
}
body.ml-dark .search-panel .text-field{
  border:none!important;
  background:transparent!important;
}
body.ml-dark .search-panel::before,
body.ml-dark .search-panel::after,
body.ml-dark .search-panel *::before,
body.ml-dark .search-panel *::after{
  display:none!important;
  border:none!important;
}
body.ml-dark .search-panel input,
body.ml-dark .search-panel .text-field,
body.ml-dark .search-panel input[type="text"]{
  background:${BG2}!important;
  color:#fff!important;
  border-color:${GOLDDIM}!important;
}
body.ml-dark .search-panel input::placeholder{
  color:rgba(255,255,255,.5)!important;
}
body.ml-dark .search-panel *{
  color:#fff!important;
}
body.ml-dark .search-panel svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}
/* Ecwid search widget + overlay (Instant Site) */
body.ml-dark .ecwid-search-widget,
body.ml-dark [class*="ecwid-search"],
body.ml-dark [class*="search-widget"],
body.ml-dark [id*="search"]{
  background:${BG2}!important;
}
body.ml-dark .ecwid-search-widget *,
body.ml-dark [class*="ecwid-search"] *,
body.ml-dark [class*="search-widget"] *{
  color:${TX1}!important;
}
body.ml-dark .ecwid-search-widget input,
body.ml-dark [class*="ecwid-search"] input,
body.ml-dark [class*="search-widget"] input{
  background:${BG3}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
body.ml-dark .ecwid-search-widget input::placeholder,
body.ml-dark [class*="ecwid-search"] input::placeholder,
body.ml-dark [class*="search-widget"] input::placeholder{
  color:${TX2}!important;
}
body.ml-dark .ecwid-search-widget svg,
body.ml-dark [class*="ecwid-search"] svg,
body.ml-dark [class*="search-widget"] svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}

/* ── ECWID STORE WRAPPER ── */
body.ml-dark .ec-store,
body.ml-dark .ec-wrapper,
body.ml-dark .ecwid-productBrowser,
body.ml-dark .ec-store__content-wrapper{
  background:transparent!important;
  color:${TX1}!important;
}

/* ── TİLE / SECTION BLOKLARI ── */
body.ml-dark .tile,
body.ml-dark [class*="tile-"]{
  background:${BG1}!important;
}
body.ml-dark .tile [class*="cover"],
body.ml-dark [class*="tile-"] [class*="cover"]{
  background:${BG1}!important;
}


/* Farklı arka plan tonları olan section'lar */
body.ml-dark [class*="section"],
body.ml-dark [style*="background-color: rgb(255"],
body.ml-dark [style*="background-color: rgb(254"],
body.ml-dark [style*="background-color: rgb(252"],
body.ml-dark [style*="background-color: rgb(249"],
body.ml-dark [style*="background-color: rgb(248"],
body.ml-dark [style*="background-color: rgb(246"],
body.ml-dark [style*="background-color: rgb(245"],
body.ml-dark [style*="background-color: rgb(243"],
body.ml-dark [style*="background-color: rgb(242"],
body.ml-dark [style*="background-color: rgb(240"],
body.ml-dark [style*="background-color: rgb(239"],
body.ml-dark [style*="background-color: rgb(237"],
body.ml-dark [style*="background-color: rgb(235"],
body.ml-dark [style*="background-color: rgb(233"],
body.ml-dark [style*="background-color: rgb(232"],
body.ml-dark [style*="background-color: rgb(230"]{
  background-color:${BG1}!important;
}

/* Hafif daha açık olan bölgeler (f5f5f7 / fcfaf7 gibi) */
body.ml-dark [style*="background-color: rgb(236"],
body.ml-dark [style*="background-color: rgb(222"],
body.ml-dark [style*="background-color: rgb(193"],
body.ml-dark [style*="background-color: rgb(183"],
body.ml-dark [style*="background-color: rgb(176"],
body.ml-dark [style*="background-color: rgb(150"],
body.ml-dark [style*="background-color: rgb(140"],
body.ml-dark [style*="background-color: rgb(132"],
body.ml-dark [style*="background-color: rgb(125"],
body.ml-dark [style*="background-color: rgb(113"],
body.ml-dark [style*="background-color: rgb(84"],
body.ml-dark [style*="background-color: rgb(77"],
body.ml-dark [style*="background-color: rgb(44"]{
  background-color:${BG2}!important;
}

/* ── TİPOGRAFİ ── */
body.ml-dark h1,body.ml-dark h2,body.ml-dark h3,body.ml-dark h4,body.ml-dark h5{
  color:${TX1}!important;
}
body.ml-dark p{color:${TX2}!important}
body.ml-dark a{color:${GOLD}!important}
body.ml-dark a:hover{color:${TX1}!important}
body.ml-dark small,body.ml-dark .ec-text-muted{color:${TX3}!important}

/* ── ÜRÜN KARTLARI ── */
/* Tüm grid ancestor'ları — shadow kırpılmasın */
body.ml-dark .grid__products,
body.ml-dark .grid__products--classic,
body.ml-dark [class*="grid__products"],
body.ml-dark .grid__wrap,
body.ml-dark .grid__wrap-row,
body.ml-dark [class*="grid__wrap"],
body.ml-dark .grid,
body.ml-dark .ec-grid,
body.ml-dark .grid__products-row{
  overflow:visible!important;
}
/* Kategori grid'leri */
body.ml-dark .grid-categories,
body.ml-dark [class*="grid-categories"]{
  overflow:visible!important;
}
/* Grid hücre — kart etrafında nefes alanı (shadow çakışmasını önler) */
body.ml-dark .grid-product{
  padding:4px!important;
}
body.ml-dark .grid-product__wrap{
  background:${BG2}!important;
  border-radius:14px!important;
  border:none!important;
  /* Üçlü çerçeve: iç çizgi → koyu boşluk → dış çizgi → gölge */
  box-shadow:
    inset 0 0 0 1px ${BD},
    0 0 0 2px ${BG1},
    0 0 0 3px ${BD2},
    0 2px 12px rgba(0,0,0,.3)!important;
  overflow:hidden;
  transition:box-shadow .25s ease,transform .25s ease!important;
}
body.ml-dark .grid-product__wrap-inner{
  background:${BG2}!important;
  border-radius:12px!important;
  border:none!important;
  overflow:hidden;
}
body.ml-dark .grid-product__wrap:hover{
  box-shadow:
    inset 0 0 0 1px ${GOLDDIM},
    0 0 0 2px ${BG1},
    0 0 0 3px ${GOLDDIM},
    0 4px 20px rgba(175,140,62,.15),
    0 8px 32px rgba(0,0,0,.35)!important;
  transform:translateY(-2px)!important;
  border:none!important;
  outline:none!important;
}
/* Kategori kartları */
body.ml-dark .grid-category__card,
body.ml-dark [class*="grid-category__card"]{
  background:${BG2}!important;
  border-radius:14px!important;
  border:none!important;
  box-shadow:
    inset 0 0 0 1px ${BD},
    0 0 0 2px ${BG1},
    0 0 0 3px ${BD2},
    0 2px 12px rgba(0,0,0,.3)!important;
  overflow:hidden!important;
  transition:box-shadow .25s ease,transform .25s ease!important;
}
body.ml-dark .grid-category__card:hover,
body.ml-dark [class*="grid-category__card"]:hover{
  box-shadow:
    inset 0 0 0 1px ${GOLDDIM},
    0 0 0 2px ${BG1},
    0 0 0 3px ${GOLDDIM},
    0 4px 20px rgba(175,140,62,.15),
    0 8px 32px rgba(0,0,0,.35)!important;
  transform:translateY(-2px)!important;
}
/* Kategori resim + başlık */
body.ml-dark .grid-category__card img{
  border-radius:12px 12px 0 0!important;
}
body.ml-dark .grid-category__title,
body.ml-dark [class*="grid-category__title"]{
  color:${TX1}!important;
}

/* Stokta Var label — gold (Stokta Yok hariç) */
body.ml-dark .grid-product__label:not([class*="Stokta-Yok"]):not([class*="Stokta-yok"]){
  background:${GOLDDIM}!important;
  color:${BG1}!important;
  border-radius:6px!important;
}
/* Stokta Yok — eski kural kaldırıldı, badge section sonrasına taşındı */
/* Ürün detaydaki Stokta var/yok badge — düzgün dikdörtgen */
body.ml-dark .product-details__label-container{
  display:inline-flex!important;
  width:auto!important;
  max-width:fit-content!important;
}
body.ml-dark .product-details .ec-label,
body.ml-dark .details-product-purchase__place .ec-label{
  display:inline-block!important;
  width:auto!important;
  max-width:fit-content!important;
  padding:4px 12px!important;
  border-radius:4px!important;
  box-sizing:border-box!important;
  line-height:1.4!important;
  white-space:nowrap!important;
}

/* ── ÜRÜN KART İÇERİK ── */
body.ml-dark .grid-product__title,
body.ml-dark .grid-product__title-inner{
  color:${TX1}!important;
}
body.ml-dark .grid-product__subtitle,
body.ml-dark .grid-product__sku{
  color:${TX2}!important;
}
body.ml-dark .grid-product__price .ec-price-item,
body.ml-dark .grid-product__price-value{
  color:${GOLD}!important;
}

/* ── ÜRÜN GÖRSELLERİ — Açık container, blend yok ── */
body.ml-dark .grid-product__image,
body.ml-dark .grid-product__bg,
body.ml-dark .grid-product__bg[style]{
  background:${IMG_BG}!important;
  background-color:${IMG_BG}!important;
  border-radius:12px 12px 0 0!important;
}
/* picture-additional: Ecwid hover 2. görsel — background-image'a DOKUNMA */
body.ml-dark .grid-product__picture-additional{
  border-radius:12px 12px 0 0!important;
}
body.ml-dark .grid-product__image img,
body.ml-dark .grid-product__picture img,
body.ml-dark .grid-product__picture-wrapper img{
  background:transparent!important;
}
/* ── TÜM ÜRÜN GÖRSELLERİ — yumuşak köşe ── */
body.ml-dark .grid-product__image img,
body.ml-dark .grid-product__picture img,
body.ml-dark .grid-product__picture-wrapper img,
body.ml-dark .details-gallery img,
body.ml-dark .details-gallery__thumb img,
body.ml-dark .details-gallery__thumb-bg img,
body.ml-dark .ec-cart-item img,
body.ml-dark [class*="cart-item"] img,
body.ml-dark [class*="recently"] img,
body.ml-dark [class*="related"] img,
body.ml-dark .product-details__related-products img{
  border-radius:12px!important;
}

/* ── ÜRÜN DETAY SAYFASI ── */
body.ml-dark .product-details__product-title{color:${TX1}!important}
body.ml-dark .product-details__product-price .ec-price-item{color:${GOLD}!important}
body.ml-dark .product-details__product-description{color:${TX2}!important}
body.ml-dark .product-details{color:${TX2}!important}
/* Sidebar + Options container (gerçek class: product-details__sidebar, details-product-options) */
body.ml-dark .product-details__sidebar{
  background:transparent!important;
  color:${TX1}!important;
}
body.ml-dark .details-product-options{
  background:transparent!important;
}
/* Attraction block (Stokta var + fiyat üstü alan) */
body.ml-dark .product-details__attraction-block,
body.ml-dark .product-details__product-on-sale{
  background:transparent!important;
}

/* WYSIWYG ürün açıklaması içerikleri (Koleksiyon tablosu vb.) */
body.ml-dark .product-details__product-description *,
body.ml-dark .product-details__product-description td,
body.ml-dark .product-details__product-description th,
body.ml-dark .product-details__product-description span,
body.ml-dark .product-details__product-description p,
body.ml-dark .product-details__product-description div,
body.ml-dark .product-details__product-description strong,
body.ml-dark .product-details__product-description b,
body.ml-dark .product-details__product-description li{
  color:${TX1}!important;
  background-color:transparent!important;
}
body.ml-dark .product-details__product-description table{
  border-color:${BD}!important;
}
body.ml-dark .product-details__product-description td,
body.ml-dark .product-details__product-description th{
  border-color:${BD}!important;
}

/* Ürün detay görseli */
body.ml-dark .product-details__gallery,
body.ml-dark .product-details-module__gallery,
body.ml-dark .details-gallery,
body.ml-dark .details-gallery__main-image-wrapper{
  background:${IMG_BG}!important;
  border-radius:10px;
}
/* Galeri resim ortalama — sadece img üzerinde, wrapper'a dokunma */
body.ml-dark .details-gallery__main-image-wrapper img,
body.ml-dark .product-details__gallery img,
body.ml-dark .product-details-module__gallery img,
body.ml-dark .details-gallery img{
  background:transparent!important;
  display:block!important;
  margin:0 auto!important;
}
/* Thumbnail backgrounds */
body.ml-dark .details-gallery__thumb-bg{
  background:${IMG_BG}!important;
}
/* Galeri iç wrapper (gerçek class: details-gallery__image-wrapper-inner) */
body.ml-dark .details-gallery__image-wrapper-inner{
  background:${IMG_BG}!important;
}
/* Galeri thumbnails vertical — sol kenar */
body.ml-dark .details-gallery--thumbnails-vertical{
  background:transparent!important;
}

/* Ürün seçenekleri başlıkları (gerçek Ecwid class: product-details-module__title ec-header-h6) */
body.ml-dark .product-details__product-options .form-control__label,
body.ml-dark .product-details__product-options label,
body.ml-dark .details-product-option__title,
body.ml-dark .product-details-module__title,
body.ml-dark .ec-header-h6,
body.ml-dark [class*="product-option"] [class*="title"]{
  color:${TX1}!important;
}

/* ── KATEGORİ & SAYFA BAŞLIKLARI ── */
body.ml-dark .ec-page-title{color:${TX1}!important}
body.ml-dark .ec-breadcrumbs a{color:${TX3}!important}
body.ml-dark .ec-breadcrumbs a:hover{color:${GOLD}!important}

/* ── STATİK SAYFALAR (Şartlar, Gizlilik, İade, vb.) ── */
body.ml-dark .ec-page-body,
body.ml-dark [class*="page-body"],
body.ml-dark [class*="page-content"],
body.ml-dark [class*="legal"],
body.ml-dark [class*="store-page"],
body.ml-dark [class*="ec-page"],
body.ml-dark .ec-store__content-wrapper{
  background-color:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark .ec-page-body *,
body.ml-dark [class*="page-body"] *,
body.ml-dark [class*="page-content"] *,
body.ml-dark [class*="legal"] *,
body.ml-dark [class*="ec-page"] *{
  color:${TX1}!important;
}
body.ml-dark .ec-page-body div,
body.ml-dark .ec-page-body section,
body.ml-dark .ec-page-body article{
  background-color:${BG1}!important;
}
body.ml-dark .ec-page-body h1,
body.ml-dark .ec-page-body h2,
body.ml-dark .ec-page-body h3,
body.ml-dark .ec-page-body h4{
  color:${GOLD}!important;
}
body.ml-dark .ec-page-body p,
body.ml-dark .ec-page-body li,
body.ml-dark .ec-page-body span{
  color:${TX2}!important;
}
body.ml-dark .ec-page-body strong,
body.ml-dark .ec-page-body b{
  color:${TX1}!important;
}
body.ml-dark .ec-page-body a{
  color:${GOLD}!important;
}
body.ml-dark .ec-page-body details,
body.ml-dark .ec-page-body summary,
body.ml-dark .ec-page-body [class*="accordion"],
body.ml-dark .ec-page-body [class*="collapse"]{
  background:${BG2}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
/* Statik sayfa — hover/focus/active beyaz flash önle */
body.ml-dark .ec-page-body summary:hover,
body.ml-dark .ec-page-body details summary:hover,
body.ml-dark .ec-page-body [class*="accordion"]:hover,
body.ml-dark .ec-page-body [onclick]:hover,
body.ml-dark .ec-page-body [role="button"]:hover,
body.ml-dark .ec-page-body [class*="toggle"]:hover,
body.ml-dark .ec-page-body [class*="expand"]:hover,
body.ml-dark .ec-page-body [class*="collaps"]:hover{
  background-color:${BG3}!important;
  color:${TX1}!important;
}
body.ml-dark .ec-page-body summary:focus,
body.ml-dark .ec-page-body details:focus,
body.ml-dark .ec-page-body details[open] summary{
  background-color:${BG2}!important;
  outline:none!important;
}
body.ml-dark .ec-page-body table,
body.ml-dark .ec-page-body td,
body.ml-dark .ec-page-body th,
body.ml-dark .ec-page-body tr{
  background:transparent!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
/* ── İADE / ŞARTLAR / GİZLİLİK — ml-*-wrapper dark mode ── */
body.ml-dark [class*="ml-"][class*="-wrapper"]{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] h1,
body.ml-dark [class*="ml-"][class*="-wrapper"] h3,
body.ml-dark [class*="ml-"][class*="-wrapper"] h4{
  color:${GOLD}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] p,
body.ml-dark [class*="ml-"][class*="-wrapper"] li,
body.ml-dark [class*="ml-"][class*="-wrapper"] span{
  color:${TX2}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] strong,
body.ml-dark [class*="ml-"][class*="-wrapper"] b{
  color:${TX1}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] a{
  color:${GOLD}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-card,
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-detail-box,
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-detail-content{
  background:${BG2}!important;
  border-color:${BD}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-card-header{
  border-bottom-color:${BD}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-detail-title{
  color:${TX1}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-detail-title:hover{
  background:${BG3}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-tag{
  background:${BG3}!important;
  color:${TX2}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-highlight{
  background:rgba(5,150,105,.08)!important;
  border-color:rgba(5,150,105,.25)!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-time{
  background:${BG3}!important;
  color:${TX2}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-trust{
  border-top-color:${BD}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-trust-icon{
  background:${GOLD}!important;
  color:${BG1}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-trust-item h4{
  color:${TX1}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-support{
  border-top-color:rgba(5,150,105,.2)!important;
  color:${TX3}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-footer strong{
  color:${GOLD}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-label{
  color:${TX3}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-card ul li+li{
  border-top-color:${BD}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-arrow{
  color:${TX3}!important;
}
body.ml-dark [class*="ml-"][class*="-wrapper"] .ml-detail-content{
  border-top-color:${BD}!important;
}
/* ── ÜRÜN AÇIKLAMALARI ── */
body.ml-dark .product-details__description{
  color:${TX2}!important;
  background:transparent!important;
}
body.ml-dark .product-details__description p,
body.ml-dark .product-details__description span,
body.ml-dark .product-details__description li,
body.ml-dark .product-details__description td{
  color:${TX2}!important;
}
body.ml-dark .product-details__description h1,
body.ml-dark .product-details__description h2,
body.ml-dark .product-details__description h3,
body.ml-dark .product-details__description h4,
body.ml-dark .product-details__description h5,
body.ml-dark .product-details__description strong,
body.ml-dark .product-details__description b{
  color:${GOLD}!important;
}
body.ml-dark .product-details__description a{
  color:${GOLD}!important;
}
/* ── SALT/ÜRÜN HTML .D CLASS + ÖZEL DARK MOD ── */
body.ml-dark .product-details__description .D h1,
body.ml-dark .product-details__description .D h2,
body.ml-dark .product-details__description .D h3{
  color:${GOLD}!important;
}
body.ml-dark .product-details__description .mn-link{
  color:${TX3}!important;
  border-color:rgba(175,140,62,.25)!important;
}
body.ml-dark .product-details__description .mn-link:hover{
  color:${GOLD}!important;
  border-color:rgba(175,140,62,.5)!important;
  background:rgba(175,140,62,.08)!important;
}

/* ── ÜRÜN NAVİGASYON OKLARI (< >) ── */
body.ml-dark .product-details-navigation__arrow,
body.ml-dark [class*="product-details-navigation"] a,
body.ml-dark [class*="product-details-navigation"] button,
body.ml-dark .product-details__navigation a,
body.ml-dark .product-details__navigation button{
  color:${TX2}!important;
  border-color:${BD}!important;
  background:${BG2}!important;
  transition:all .2s!important;
}
body.ml-dark .product-details-navigation__arrow:hover,
body.ml-dark [class*="product-details-navigation"] a:hover,
body.ml-dark [class*="product-details-navigation"] button:hover,
body.ml-dark .product-details__navigation a:hover,
body.ml-dark .product-details__navigation button:hover{
  color:${GOLD}!important;
  border-color:${GOLD}!important;
  background:${BG3}!important;
}
body.ml-dark .product-details-navigation__arrow svg,
body.ml-dark [class*="product-details-navigation"] svg,
body.ml-dark .product-details__navigation svg{
  color:${TX2}!important;
  fill:${TX2}!important;
  transition:all .2s!important;
}
body.ml-dark .product-details-navigation__arrow:hover svg,
body.ml-dark [class*="product-details-navigation"] a:hover svg,
body.ml-dark [class*="product-details-navigation"] button:hover svg,
body.ml-dark .product-details__navigation a:hover svg,
body.ml-dark .product-details__navigation button:hover svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}

/* ── BUTONLAR — widget.js ml-cta ile birebir ── */
/* PRIMARY butonlar (Sepete Ekle, Sepete Git, Checkout vb.) */
body.ml-dark .form-control--primary .form-control__button,
body.ml-dark .details-product-purchase__add-to-bag .form-control__button,
body.ml-dark .details-product-purchase__checkout .form-control__button{
  background:linear-gradient(135deg,#af8c3e,#d4b05e)!important;
  color:#fff!important;
  border:none!important;
  border-radius:10px!important;
  font-weight:700!important;
  letter-spacing:-.1px!important;
  cursor:pointer!important;
  position:relative!important;
  overflow:hidden!important;
  transition:all .2s!important;
}
/* Buton text span — #fff zorla */
body.ml-dark .form-control--primary .form-control__button-text,
body.ml-dark .form-control--primary .form-control__button-svg,
body.ml-dark .form-control--primary .form-control__button-svg svg,
body.ml-dark .details-product-purchase__add-to-bag .form-control__button-text{
  color:#fff!important;
  fill:#fff!important;
}
/* Sweep animasyonu — widget.js ml-cta::after birebir kopyası */
/* Wrapper'a taşındı çünkü Ecwid button::after'ı --animated ile kullanır */
body.ml-dark .details-product-purchase__add-to-bag.form-control{
  position:relative!important;
  overflow:hidden!important;
  border-radius:10px!important;
}
body.ml-dark .details-product-purchase__add-to-bag.form-control::after{
  content:''!important;
  position:absolute!important;
  top:0!important;left:-100%!important;
  width:60%!important;height:100%!important;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent)!important;
  animation:mlsweep 3s ease-in-out infinite!important;
  pointer-events:none!important;
  z-index:1!important;
}
body.ml-dark .details-product-purchase__add-to-bag.form-control:hover::after{
  animation:none!important;
}
@keyframes mlsweep{0%,100%{left:-100%}50%{left:100%}}
@keyframes mlCheckPulse{
  0%{box-shadow:0 0 0 0 rgba(175,140,62,.5)}
  70%{box-shadow:0 0 0 8px rgba(175,140,62,0)}
  100%{box-shadow:0 0 0 0 rgba(175,140,62,0)}
}
/* Agreement checkbox — unchecked dikkat çekici */
body.ml-dark .ml-agree-pulse .form-control__checkbox-view{
  animation:mlCheckPulse 1.5s ease-in-out infinite!important;
  border-color:${GOLD}!important;
}
/* Hover — koyu gold + scale, sweep durur */
body.ml-dark .form-control--primary .form-control__button:hover,
body.ml-dark .details-product-purchase__add-to-bag .form-control__button:hover{
  background:${GOLDDIM}!important;
  color:#fff!important;
  opacity:1!important;
  transform:scale(.97)!important;
  box-shadow:0 2px 12px rgba(175,140,62,.25)!important;
}
body.ml-dark .form-control--primary .form-control__button:hover .form-control__button-text{
  color:#fff!important;
}
body.ml-dark .form-control--primary .form-control__button:hover::after{
  animation:none!important;
}
/* Active — scale */
body.ml-dark .form-control--primary .form-control__button:active{
  transform:scale(.98)!important;
}
/* SECONDARY butonlar (Tekrar ekle, Favori vb.) — subtle, gold DEĞİL */
body.ml-dark .form-control--secondary .form-control__button{
  background:${BG3}!important;
  color:${TX1}!important;
  border:1.5px solid ${BD}!important;
  border-radius:10px!important;
  font-weight:600!important;
  cursor:pointer!important;
  transition:all .2s!important;
}
body.ml-dark .form-control--secondary .form-control__button-text,
body.ml-dark .form-control--secondary .form-control__button-svg,
body.ml-dark .form-control--secondary .form-control__button-svg svg{
  color:${TX1}!important;
  fill:${TX1}!important;
}
body.ml-dark .form-control--secondary .form-control__button:hover{
  background:${BG2}!important;
  border-color:${GOLDDIM}!important;
  color:${GOLD}!important;
}
body.ml-dark .form-control--secondary .form-control__button:hover .form-control__button-text{
  color:${GOLD}!important;
}

/* Cover butonlar — gold bg + beyaz yazı + yuvarlak köşe */
body.ml-dark .cover__button,
body.ml-dark .cover-button,
body.ml-dark a.cover__button,
body.ml-dark a.cover-button,
body.ml-dark button.cover__button,
body.ml-dark button.cover-button{
  background:linear-gradient(135deg,#af8c3e,#d4b05e)!important;
  background-color:#af8c3e!important;
  color:#fff!important;
  border:none!important;
  border-radius:12px!important;
  overflow:hidden!important;
  position:relative!important;
  text-decoration:none!important;
}
body.ml-dark .cover__button *:not(.ml-sweep),
body.ml-dark .cover-button *:not(.ml-sweep){
  color:#fff!important;
  background:transparent!important;
  background-color:transparent!important;
}

/* ── FORM / INPUT ── */
body.ml-dark input:not([type="checkbox"]):not([type="radio"]),
body.ml-dark textarea,
body.ml-dark select{
  background:#3d3c36!important;
  color:${TX1}!important;
  border-color:${BD}!important;
  color-scheme:dark!important;
}
/* Select dropdown container (Ecwid wrapper) — SAFE: no appearance override */
body.ml-dark .form-control--select,
body.ml-dark .details-product-option--select .form-control,
body.ml-dark [class*="product-option"] select,
body.ml-dark .details-product-option select,
body.ml-dark .product-details__product-options select{
  background:${BG3}!important;
  color:${TX1}!important;
  color-scheme:dark!important;
  border:1.5px solid ${BD}!important;
  border-radius:8px!important;
}
/* Asıl select element — .form-control__select (Ecwid gerçek class) */
body.ml-dark .form-control__select{
  background:${BG3}!important;
  color:${TX1}!important;
  color-scheme:dark!important;
  border:none!important;
}
/* Boş (seçilmemiş) select — "Lütfen seç" yazısı görünsün */
body.ml-dark .form-control--empty .form-control__select{
  color:${TX2}!important;
}
/* Select wrapper içindeki ok/svg — Ecwid kendi ekliyor */
body.ml-dark .form-control--select svg,
body.ml-dark .form-control--select::after{
  color:${GOLD}!important;
  fill:${GOLD}!important;
  opacity:1!important;
}
body.ml-dark .form-control--select:focus-within{
  border-color:${GOLDDIM}!important;
  box-shadow:0 0 0 2px rgba(175,140,62,.15)!important;
}
/* Select option text (dropdown açılınca) */
body.ml-dark select option{
  background:${BG3}!important;
  color:${TX1}!important;
}
/* product-details-module__content — select container arka plan */
body.ml-dark .product-details-module__content{
  background:transparent!important;
}
/* ── SELECT İÇ ELEMENTLER (Ecwid custom select: select opacity:0, görünen = input + placeholder + arrow) ── */
/* Seçili değer gösteren readonly input */
body.ml-dark .form-control--select input.form-control__text{
  background:transparent!important;
  color:${TX1}!important;
  border:none!important;
}
/* ── BOŞ SELECT — Ecwid doğal akış, sadece renkler ── */
body.ml-dark .form-control--empty input.form-control__text{
  color:transparent!important;
}
body.ml-dark .form-control--empty .form-control__placeholder,
body.ml-dark .form-control--empty .form-control__placeholder-inner{
  color:${TX2}!important;
  opacity:1!important;
  visibility:visible!important;
}
/* ── SEÇİLMİŞ SELECT — placeholder gizle, text göster ── */
body.ml-dark .form-control--select:not(.form-control--empty) .form-control__placeholder{
  display:none!important;
}
body.ml-dark .form-control--select:not(.form-control--empty) .form-control__text{
  color:${TX1}!important;
}
/* ── Ok simgesi — her zaman görünür ── */
body.ml-dark .form-control__arrow{
  color:${GOLD}!important;
  display:flex!important;
  align-items:center!important;
  opacity:1!important;
  visibility:visible!important;
  z-index:2!important;
  pointer-events:none!important;
}
body.ml-dark .form-control__arrow svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
  stroke:${GOLD}!important;
  opacity:1!important;
  width:auto!important;
  height:auto!important;
}
body.ml-dark .form-control__arrow svg path,
body.ml-dark .form-control__arrow svg polyline,
body.ml-dark .form-control__arrow svg line{
  fill:${GOLD}!important;
  stroke:${GOLD}!important;
}
body.ml-dark input::placeholder,
body.ml-dark textarea::placeholder{
  color:${TX3}!important;
}
body.ml-dark input:focus,
body.ml-dark textarea:focus{
  border-color:${GOLDDIM}!important;
  box-shadow:0 0 0 2px rgba(175,140,62,.15)!important;
}
/* Native radio & checkbox — gold accent */
body.ml-dark input[type="radio"],
body.ml-dark input[type="checkbox"]{
  accent-color:${GOLDDIM}!important;
}
/* Checkout radiogroup — radio gold override */
body.ml-dark .ec-radiogroup input[type="radio"],
body.ml-dark .ec-radiogroup .form-control__radio,
body.ml-dark .form-control__radio{
  accent-color:${GOLD}!important;
}
body.ml-dark .ec-radiogroup input[type="radio"]:checked,
body.ml-dark .ec-radiogroup .form-control__radio:checked,
body.ml-dark .form-control__radio:checked{
  accent-color:${GOLD}!important;
}
/* Ecwid radio wrap — Bilgi bölümü */
body.ml-dark .form-control__radio-wrap{
  background:transparent!important;
}
body.ml-dark .form-control__radio-view{
  border-color:${GOLDDIM}!important;
  border-radius:50%!important;
  width:18px!important;
  height:18px!important;
}
body.ml-dark .form-control__radio-view-inner{
  border-radius:50%!important;
  background:transparent!important;
  border-color:transparent!important;
}
body.ml-dark .form-control__radio-view::after,
body.ml-dark .ml-radio-fix::after{
  background:transparent!important;
  border-color:transparent!important;
}
body.ml-dark .form-control__radio:checked ~ .form-control__radio-view,
body.ml-dark .form-control__radio:checked + .form-control__radio-view{
  border-color:${GOLD}!important;
  background:${GOLDDIM}!important;
  border-radius:50%!important;
}
body.ml-dark .form-control__radio:checked ~ .form-control__radio-view .form-control__radio-view-inner,
body.ml-dark .form-control__radio:checked + .form-control__radio-view .form-control__radio-view-inner{
  background:#fff!important;
  border-radius:50%!important;
}
body.ml-dark .form-control__radio:checked ~ .form-control__radio-view::after,
body.ml-dark .form-control__radio:checked + .form-control__radio-view::after,
body.ml-dark .form-control__radio:checked ~ .ml-radio-fix::after,
body.ml-dark .form-control__radio:checked + .ml-radio-fix::after{
  background:#fff!important;
  border-color:#fff!important;
}
body.ml-dark .form-control__radio-view{
  border-color:${BD}!important;
}
/* Bilgi text container */
body.ml-dark .form-control--radio.form-control--flexible{
  background:${BG3}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
  border-radius:8px!important;
}
body.ml-dark .form-control--radio.form-control--flexible *{
  color:${TX1}!important;
}

/* ── SEPET ── */
body.ml-dark .ec-cart,
body.ml-dark .ec-cart__body{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark .ec-cart-item{
  background:${BG1}!important;
  color:${TX1}!important;
  border-bottom:1px solid ${BD2}!important;
}
body.ml-dark .ec-cart-item__title{color:${TX1}!important}
body.ml-dark .ec-cart-item__price{color:${GOLD}!important}
body.ml-dark .ec-cart-item__sku{color:${TX3}!important}
/* Sepet ürün seçenekleri — gri (TX3) → okunabilir (TX2/TX1) */
body.ml-dark .ec-cart-item__options,
body.ml-dark .ec-cart-item__option{
  color:${TX2}!important;
}
body.ml-dark .ec-cart-option--key{
  color:${TX2}!important;
}
body.ml-dark .ec-cart-option--value{
  color:${TX1}!important;
}
/* ── SEPET ÖZET TABLOSU (Ürünler, İndirim, Kargo, Toplam) ── */
body.ml-dark .ec-cart-summary__row{
  color:${TX2}!important;
  border-color:${BD}!important;
}
body.ml-dark .ec-cart-summary__cell--price{
  color:${TX2}!important;
}
body.ml-dark .ec-cart-summary__row--total{
  color:${TX1}!important;
  border-color:${BD2}!important;
}
body.ml-dark .ec-cart-summary__row--total .ec-cart-summary__cell--price{
  color:${GOLD}!important;
}
body.ml-dark .ec-minicart__body{
  background:${BG2}!important;
  border-color:${BD2}!important;
}

/* ── HESABIM SAYFASI ── */
body.ml-dark .ec-cart-email__input{
  background:${BG3}!important;
}
body.ml-dark .ec-cart-email__input input{
  background:transparent!important;
  color:${TX1}!important;
}

/* ── FOOTER ── */
body.ml-dark .ec-footer{
  background:${BG2}!important;
  color:${TX3}!important;
  border:1px solid ${BD}!important;
  border-radius:14px!important;
  margin:12px auto!important;
  max-width:90%!important;
  padding:8px 0!important;
}
body.ml-dark .ec-footer a{color:${GOLD}!important;background:transparent!important}
body.ml-dark .ec-footer a:hover{color:${TX1}!important}
/* Footer iç — hepsi transparent, border yok */
body.ml-dark .ec-footer *{
  border:none!important;
  background:transparent!important;
}

/* ── HELPFULCROWD REVIEW KARTLARI ── */
body.ml-dark .hc-widget-card,
body.ml-dark .hc-comment,
body.ml-dark .hc-review-form-wrapper,
body.ml-dark .hc-review-form__submit__wrapper{
  background:${BG2}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
/* HC içi tüm beyaz çizgileri kaldır */
body.ml-dark [class*="hc-"] hr{
  border:none!important;
  border-top:1px solid ${BD}!important;
  background:transparent!important;
  height:0!important;
}
body.ml-dark .hc-comment{
  border:none!important;
  border-bottom:1px solid ${BD}!important;
  margin-bottom:0!important;
}
body.ml-dark .hc-widget-card{
  border:none!important;
  background:transparent!important;
}
body.ml-dark [class*="hc-"] h1,
body.ml-dark [class*="hc-"] h2,
body.ml-dark [class*="hc-"] h3,
body.ml-dark [class*="hc-"] h4,
body.ml-dark [class*="hc-"] strong,
body.ml-dark .hc-comment__title,
body.ml-dark .hc-review-summary__title,
body.ml-dark [class*="hc-"] [class*="title"]{
  color:${TX1}!important;
}
body.ml-dark [class*="hc-"] p,
body.ml-dark [class*="hc-"] span,
body.ml-dark [class*="hc-"] div,
body.ml-dark .hc-comment__body,
body.ml-dark .hc-comment__author,
body.ml-dark [class*="hc-"] [class*="text"],
body.ml-dark [class*="hc-"] [class*="label"],
body.ml-dark [class*="hc-"] [class*="metric"],
body.ml-dark [class*="hc-"] time{
  color:${TX2}!important;
}
body.ml-dark [class*="hc-"] [class*="border"],
body.ml-dark [class*="hc-"] [class*="separator"],
body.ml-dark [class*="hc-"] [class*="divider"]{
  border-color:${BD}!important;
  background:transparent!important;
}
body.ml-dark .hc-dropdown__content,
body.ml-dark .hc-dropdown__item{
  background:${BG3}!important;
  color:${TX1}!important;
}
body.ml-dark .hc-dropdown__item:hover{
  background:${BG1}!important;
}
body.ml-dark .hc-product-tab-filters__search{
  background:${BG3}!important;
  border-color:${BD}!important;
  color:${TX1}!important;
}
body.ml-dark .hc-product-tab-filters__search input{
  color:${TX1}!important;
}
body.ml-dark .hc-rating-chart__bar-wrapper{
  background:${BG3}!important;
}
body.ml-dark .hc-recommended-metric__chart{
  background:${BG3}!important;
}
body.ml-dark .hc-tooltip__content{
  background:${BG2}!important;
  color:${TX2}!important;
}
body.ml-dark [class*="hc-"] a{
  color:${GOLD}!important;
}
body.ml-dark .hc-flag{
  background:${BG3}!important;
  color:${TX2}!important;
}
/* HelpfulCrowd butonlar */
body.ml-dark [class*="hc-"] button,
body.ml-dark .hc-review-form__submit button{
  background:${GOLDDIM}!important;
  color:${BG1}!important;
  border-color:${GOLDDIM}!important;
}
/* Müşteri medya resimleri */
body.ml-dark [class*="hc-"] img{
  border-radius:6px;
}

/* ── SOSYAL PAYLAŞIM ── */
body.ml-dark .ec-likely__widget{
  background:${BG3}!important;
  color:${TX2}!important;
  border-color:${BD}!important;
}

/* ── CHECKBOX / OPSİYON BUTONLARI ── */
/* Container div'in kendisi beyaz kalıyor — şeffaf yap */
body.ml-dark .form-control--checkbox-button,
body.ml-dark .details-product-option .form-control{
  background:transparent!important;
}
/* ══ ECWID İÇ LABEL BORDER KILL ══ */
/* Ecwid .ec-size .ec-store ile 5-class specificity kullanıyor */
/* Aynı prefix + body.ml-dark ile eziyoruz (6-class) */
body.ml-dark .ec-size .ec-store .form-control--checkbox-button .form-control__inline-label label,
body.ml-dark .ec-size .ec-store .form-control--checkbox-button .form-control__inline-label label:hover,
body.ml-dark .ec-size .ec-store .form-control--checkbox-button .form-control__inline-label label:active,
body.ml-dark .ec-size .ec-store .form-control--checkbox-button .form-control__inline-label label:focus,
body.ml-dark .ec-size .ec-store .form-control--checkbox-button .form-control__radio:checked~.form-control__inline-label label,
body.ml-dark .ec-size .ec-store .form-control--checkbox-button .form-control__radio:checked~.form-control__inline-label label:hover,
body.ml-dark .ec-size .ec-store .form-control--checkbox-button .form-control__radio:checked~.form-control__inline-label label:active,
body.ml-dark .form-control--checkbox-button .form-control__inline-label label,
body.ml-dark .form-control--checkbox-button .form-control__inline-label label:hover,
body.ml-dark .form-control--checkbox-button .form-control__inline-label label:active{
  border:none!important;
  border-color:transparent!important;
  box-shadow:none!important;
  outline:none!important;
  background:transparent!important;
}
/* ::after pseudo sweep kaldır — JS _injectSweep kullanıyoruz */
.form-control--checkbox-button .form-control__radio:checked+.form-control__inline-label::after,
body.ml-dark .form-control--checkbox-button .form-control__radio:checked+.form-control__inline-label::after{
  content:none!important;
  display:none!important;
}

/* ── MİKTAR INPUT ── */
body.ml-dark .details-product-purchase__qty{
  color:${TX1}!important;
  max-width:180px!important;
}
/* Adet input field — beyaz bg fix */
body.ml-dark .details-product-purchase__qty-field,
body.ml-dark .details-product-purchase__qty-field.form-control{
  background:${BG3}!important;
  color:${TX1}!important;
  border:1.5px solid ${BD}!important;
  border-radius:8px!important;
}
body.ml-dark .details-product-purchase__qty-field input.form-control__text{
  background:transparent!important;
  color:${TX1}!important;
}
body.ml-dark .details-product-purchase__qty-field .form-control__placeholder-inner{
  color:${TX1}!important;
}
body.ml-dark .details-product-purchase__qty-label{
  color:${TX1}!important;
}
/* Miktar iç SVG'ler */
body.ml-dark .details-product-purchase__qty svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}

/* ── SAYFALAMA (Pagination) ── */
body.ml-dark .page-link,
body.ml-dark .page-link span,
body.ml-dark .page-link a,
body.ml-dark .page-link i{
  background:${BG2}!important;
  color:${TX2}!important;
}
body.ml-dark .page-link a:hover{
  background:${BG3}!important;
  color:${GOLD}!important;
}

/* ── MİNİCART ── */
body.ml-dark .ec-minicart{
  background:transparent!important;
  border-color:${BD2}!important;
}

/* ── ALT NAVİGASYON İKONLARI (Ürünleri Ara, Hesabım vb.) ── */
body.ml-dark .footer-menu{
  background:${BG2}!important;
  border:1px solid ${BD}!important;
  border-radius:14px!important;
  margin:12px auto!important;
  max-width:90%!important;
  padding:8px 0!important;
}
/* Footer iç elementler — border YOK */
body.ml-dark .footer-menu *{
  border:none!important;
  background:transparent!important;
}
body.ml-dark .footer-menu a,
body.ml-dark .footer-menu svg,
body.ml-dark [class*="store-footer"] a,
body.ml-dark [class*="store-footer"] svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}
/* Footer nav cell — ortalanmış, eşit aralık */
body.ml-dark .ec-footer__cell{
  text-align:center!important;
  flex:1!important;
  padding:6px 2px!important;
  font-size:11px!important;
  line-height:1.2!important;
  overflow:hidden!important;
}
body.ml-dark .ec-footer__cell a{
  font-size:11px!important;
  display:flex!important;
  flex-direction:column!important;
  align-items:center!important;
  gap:2px!important;
}
body.ml-dark [class*="store-footer"] span{
  color:${TX2}!important;
}

/* ── CHECKOUT — Teslimat yöntemi kutuları ── */
body.ml-dark [class*="shipping"] [class*="radio"],
body.ml-dark [class*="delivery"] label,
body.ml-dark .ec-radiogroup label,
body.ml-dark [class*="checkout"] [class*="step"] label{
  background:${BG2}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
  box-shadow:none!important;
}
/* Ecwid high specificity override — blue box-shadow + border kill */
body.ml-dark .ec-size .ec-store .ec-radiogroup label,
body.ml-dark .ec-size .ec-store .ec-radiogroup__item label,
body.ml-dark .ec-size .ec-store .ec-radiogroup__item,
body.ml-dark .ec-size .ec-store .ec-radiogroup input:checked+label,
body.ml-dark .ec-size .ec-store .ec-radiogroup input:checked~label{
  border-color:${BD}!important;
  box-shadow:none!important;
}
body.ml-dark [class*="shipping"] [class*="radio"]:hover,
body.ml-dark .ec-radiogroup label:hover{
  border-color:${GOLDDIM}!important;
}
body.ml-dark [class*="shipping"] input:checked~label,
body.ml-dark [class*="shipping"] input:checked+label,
body.ml-dark .ec-radiogroup input:checked+label,
body.ml-dark .ec-size .ec-store .ec-radiogroup input:checked+label{
  border-color:${GOLD}!important;
  background:rgba(175,140,62,.08)!important;
  box-shadow:0 0 0 1px ${GOLD}, 0 0 0 1px ${GOLD} inset!important;
}
/* Radiogroup item arası beyaz çizgi */
body.ml-dark .ec-radiogroup__item{
  border-color:${BD2}!important;
  box-shadow:none!important;
}

/* ── FİLTRE SIDEBAR (Cümle ile ara, Stok, Marka, Fiyat) ── */
/* Aktif filtre tag/chip'leri */
body.ml-dark .ec-pill,
body.ml-dark .ec-pill--small{
  background:${BG2}!important;
  color:${TX1}!important;
  border:1px solid ${BD}!important;
  border-radius:16px!important;
}
body.ml-dark .ec-pill__text,
body.ml-dark .ec-pill__text-inner{
  color:${TX1}!important;
}
body.ml-dark .ec-pill__control,
body.ml-dark .ec-pill__control-inner{
  color:${TX2}!important;
}
body.ml-dark .ec-filters__applied,
body.ml-dark .ec-filters__applied-body,
body.ml-dark .ec-filters__applied-head{
  background:transparent!important;
  color:${TX1}!important;
}
body.ml-dark [class*="ec-filter"] [class*="tag"],
body.ml-dark [class*="ec-filter"] [class*="chip"],
body.ml-dark [class*="ec-filter"] [class*="pill"],
body.ml-dark [class*="ec-filter"] [class*="applied"],
body.ml-dark [class*="filter-applied"],
body.ml-dark [class*="applied-filter"],
body.ml-dark .ec-filter [class*="tag"],
body.ml-dark .ec-filter [class*="selected"]{
  background:${BG3}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
body.ml-dark .ec-filter,
body.ml-dark [class*="ec-filter"],
body.ml-dark .ec-filter__body{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark .ec-openable-block,
body.ml-dark .ec-filter .ec-openable-block{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark [class*="filter-section-sticky-bar"]::before,
body.ml-dark [class*="filter-section-sticky-bar"]::after,
body.ml-dark [class*="filters-sticky-bar"]::before,
body.ml-dark [class*="filters-sticky-bar"]::after{
  background:${BG1}!important;
}
body.ml-dark .ec-filter input[type="text"],
body.ml-dark .ec-filter input[type="number"],
body.ml-dark .ec-filter input[type="search"],
body.ml-dark [class*="ec-filter"] input{
  background:${BG3}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
body.ml-dark .ec-filter label,
body.ml-dark [class*="ec-filter"] label{
  color:${TX1}!important;
}
/* Checkbox gold — tüm site */
body.ml-dark input[type="checkbox"]{
  accent-color:${GOLD}!important;
}
body.ml-dark .form-control__checkbox-view{
  border:1.5px solid rgba(175,140,62,.5)!important;
  background:${BG1}!important;
  border-radius:3px!important;
}
body.ml-dark .form-control__checkbox:checked~.form-control__checkbox-view,
body.ml-dark .form-control__checkbox:checked+.form-control__checkbox-view{
  background:${GOLD}!important;
  border-color:${GOLD}!important;
}
/* Fiyat range slider — gold */
body.ml-dark .ec-filter [class*="range"],
body.ml-dark [class*="range-slider"]{
  accent-color:${GOLD}!important;
}
body.ml-dark .ec-filter [class*="range"] [class*="track"],
body.ml-dark [class*="range-slider"] [class*="track"]{
  background:${BD}!important;
}
body.ml-dark .ec-filter [class*="range"] [class*="fill"],
body.ml-dark [class*="range-slider"] [class*="fill"],
body.ml-dark .ec-filter [class*="range"] [class*="active"]{
  background:${GOLD}!important;
}
body.ml-dark .ec-filter [class*="range"] [class*="thumb"],
body.ml-dark [class*="range-slider"] [class*="thumb"],
body.ml-dark .ec-filter [class*="range"] [class*="handle"]{
  background:${TX1}!important;
  border-color:${GOLD}!important;
}
/* Filtre separator çizgiler */
body.ml-dark .ec-filter__section,
body.ml-dark [class*="ec-filter"] [class*="section"],
body.ml-dark .ec-filter hr,
body.ml-dark .ec-filter__item{
  border-color:${BD2}!important;
}
/* Fiyat range slider — Ecwid ec-range class'ları */
body.ml-dark .ec-range__slider{
  background:${GOLD}!important;
}
body.ml-dark .ec-range__runner{
  background:${GOLD}!important;
  border-color:${GOLD}!important;
  box-shadow:0 0 0 3px rgba(175,140,62,.2)!important;
}
body.ml-dark .ec-range__track-inner,
body.ml-dark .ec-range__track-line{
  background:${BD}!important;
}
/* ── PSEUDO-ELEMENT FIXLERİ ── */
/* Filtre separator çizgi */
body.ml-dark .ec-filter__items::after{
  background:${BD2}!important;
  opacity:.3!important;
}
/* Checkbox iç kare — unchecked gizle, checked tick göster */
body.ml-dark .form-control__checkbox-view::after{
  background:transparent!important;
  border-color:transparent!important;
}
body.ml-dark .form-control__checkbox:checked~.form-control__checkbox-view::after,
body.ml-dark .form-control__checkbox:checked+.form-control__checkbox-view::after{
  background:transparent!important;
  border-color:#fff!important;
}
/* Slider uç kapaklar */
body.ml-dark .ec-range__track-line::before,
body.ml-dark .ec-range__track-line::after{
  background:${BD}!important;
}
/* Sepet sayaç mavi → gold */
body.ml-dark .ec-minicart__counter::after{
  background:${GOLD}!important;
}
/* Radiogroup pseudo çizgiler */
body.ml-dark .ec-radiogroup::before,
body.ml-dark .ec-radiogroup::after,
body.ml-dark .ml-rg-fix::before,
body.ml-dark .ml-rg-fix::after{
  background:${BD2}!important;
  opacity:.2!important;
}
/* Checkout separator beyaz çizgi */
body.ml-dark .ec-cart-next__header,
body.ml-dark [class*="ec-cart-next"]{
  border-color:${BD2}!important;
}

/* ── CHECKOUT — Ödeme bildirim + Kabul kutuları (renkli arka planlar) ── */
body.ml-dark [class*="checkout"] [style*="background-color: rgb(255, 255, 224)"],
body.ml-dark [class*="checkout"] [style*="background-color: rgb(255, 255, 240)"],
body.ml-dark .ec-cart [style*="background-color: rgb(255, 255, 224)"],
body.ml-dark .ec-cart [style*="background-color: rgb(255, 255, 240)"],
body.ml-dark .ec-cart-step [style*="background-color: rgb(255, 255, 224)"],
body.ml-dark .ec-cart-step [style*="background-color: rgb(255, 255, 240)"],
body.ml-dark .ec-cart [style*="background-color: rgb(245, 212"],
body.ml-dark .ec-cart [style*="background-color: rgb(247, 205"],
body.ml-dark .ec-cart [style*="background: rgb(255"],
body.ml-dark .ec-cart [style*="background-color: rgb(255"],
body.ml-dark .ec-cart-step [style*="background-color: rgb(255"],
body.ml-dark .ec-cart-step [style*="background-color: rgb(253"],
body.ml-dark .ec-cart-step [style*="background-color: rgb(250"],
body.ml-dark .ec-cart-step [style*="background-color: rgb(248"],
body.ml-dark .ec-confirmation [style*="background-color: rgb(255"],
body.ml-dark [class*="checkout"] [style*="background-color: rgb(255, 255, 224)"],
body.ml-dark [class*="checkout"] [style*="background-color: rgb(255, 255, 240)"]{
  background-color:rgba(175,140,62,.1)!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}

/* ── SEPET SAYFA ARKA PLANI — ana bg ile aynı ── */
body.ml-dark .ec-cart-step,
body.ml-dark .ec-confirmation,
body.ml-dark [class*="checkout"]{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark .ec-cart-step__body,
body.ml-dark .ec-cart-step__section{
  background:${BG1}!important;
}

/* ── CHECKOUT FORM INPUT WRAPPER'LARI (adres, isim, telefon) ── */
body.ml-dark .form-control--flexible{
  background:#353430!important;
  border-color:${BD}!important;
  border-radius:8px!important;
}

/* ── BEYAZ BORDER TEMİZLEME — spesifik hedef (wildcard kaldırıldı) ── */
/* Sadece gerçek container/divider'lar — collapsed form elementlere dokunma */
body.ml-dark .ec-cart,
body.ml-dark .ec-cart__body,
body.ml-dark .ec-cart__products,
body.ml-dark .ec-cart-item,
body.ml-dark .ec-cart-item__wrap,
body.ml-dark .ec-cart-item__image,
body.ml-dark .ec-cart-item__options,
body.ml-dark .ec-cart-summary,
body.ml-dark .ec-cart-summary__row,
body.ml-dark .ec-cart-summary__total,
body.ml-dark .ec-cart-step,
body.ml-dark .ec-cart-step__body,
body.ml-dark .ec-cart-step__next,
body.ml-dark .ec-cart-step__section,
body.ml-dark .ec-cart-step__wrap,
body.ml-dark .ec-cart-step__block,
body.ml-dark .ec-cart-step__anchor,
body.ml-dark .ec-cart-step__title,
body.ml-dark .ec-cart-step__text,
body.ml-dark .ec-cart__cell,
body.ml-dark .ec-confirmation,
body.ml-dark .ec-confirmation__body,
body.ml-dark .ec-radiogroup,
body.ml-dark .ec-radiogroup__items,
body.ml-dark .ec-radiogroup__item,
body.ml-dark .ec-radiogroup label{
  border-color:${BD2}!important;
}
body.ml-dark .ec-minicart{
  border-color:${BD2}!important;
}
body.ml-dark .ec-cart__products{
  border-bottom-color:${BD2}!important;
}
body.ml-dark .ec-cart-step--current{
  border-top-color:${BD2}!important;
}
body.ml-dark .ec-cart-step__next{
  border-bottom-color:${BD2}!important;
}
body.ml-dark .ec-cart__steps .ec-cart-step{
  border-color:${BD2}!important;
}
body.ml-dark .store .border,
body.ml-dark .dynamic-product-browser > .border{
  border-color:${BD2}!important;
}

/* ── RADIOGROUP (teslimat/ödeme seçim kutuları) ── */
body.ml-dark .ec-radiogroup__items{
  border-color:${BD}!important;
  border-radius:10px!important;
  overflow:hidden!important;
}
body.ml-dark .ec-radiogroup__item{
  border-color:${BD}!important;
}

/* ── STEP İKON — mavi → gold ── */
body.ml-dark .ec-cart-step__icon{
  border-color:${GOLDDIM}!important;
  color:${GOLD}!important;
}
body.ml-dark .ec-cart-step__icon--done{
  border-color:${GOLDDIM}!important;
  background:rgba(175,140,62,.1)!important;
}
body.ml-dark .ec-cart-step__icon svg{
  fill:${GOLD}!important;
  color:${GOLD}!important;
}

/* ── SEPET ÜRÜN GÖRSELİ ARKA PLAN (inline override) ── */
body.ml-dark .ec-cart-item__picture{
  background-color:${IMG_BG}!important;
  border-radius:8px!important;
  overflow:hidden!important;
}

/* ── ÖNERİLEN ÜRÜNLER KAROSELİ (Bunları da Beğenebilirsiniz) ── */
body.ml-dark .product-details__related-products,
body.ml-dark [class*="related-products"],
body.ml-dark [class*="recently"]{
  overflow:visible!important;
  background:${BG1}!important;
}
/* Recently viewed / related — ürün kartları */
body.ml-dark .product-details__related-products .grid-product__wrap,
body.ml-dark [class*="related"] .grid-product__wrap,
body.ml-dark [class*="recently"] .grid-product__wrap,
body.ml-dark [class*="recently-viewed"] .grid-product__wrap,
body.ml-dark .ec-related-products .grid-product__wrap{
  background:${BG2}!important;
  border-radius:14px!important;
  border:none!important;
  box-shadow:
    inset 0 0 0 1px ${BD},
    0 0 0 2px ${BG1},
    0 0 0 3px ${BD2},
    0 2px 12px rgba(0,0,0,.3)!important;
  overflow:hidden!important;
  transition:box-shadow .25s ease,transform .25s ease!important;
}
body.ml-dark .product-details__related-products .grid-product__wrap-inner,
body.ml-dark [class*="related"] .grid-product__wrap-inner,
body.ml-dark [class*="recently"] .grid-product__wrap-inner,
body.ml-dark .ec-related-products .grid-product__wrap-inner{
  background:${BG2}!important;
  border:none!important;
}
body.ml-dark .product-details__related-products .grid-product__wrap:hover,
body.ml-dark [class*="related"] .grid-product__wrap:hover,
body.ml-dark [class*="recently"] .grid-product__wrap:hover,
body.ml-dark [class*="recently-viewed"] .grid-product__wrap:hover,
body.ml-dark .ec-related-products .grid-product__wrap:hover{
  box-shadow:
    inset 0 0 0 1px ${GOLDDIM},
    0 0 0 2px ${BG1},
    0 0 0 3px ${GOLDDIM},
    0 4px 20px rgba(175,140,62,.15),
    0 8px 32px rgba(0,0,0,.35)!important;
  transform:translateY(-2px)!important;
  border:none!important;
  outline:none!important;
}
/* Recently viewed ürün isimleri + fiyatlar */
body.ml-dark [class*="recently"] .grid-product__title,
body.ml-dark [class*="recently"] .grid-product__title-inner,
body.ml-dark .ec-related-products .grid-product__title,
body.ml-dark .ec-related-products .grid-product__title-inner{
  color:${TX1}!important;
}
/* Recently viewed ürün resim alanı — beyaz bg temizle */
body.ml-dark [class*="recently"] .grid-product__image,
body.ml-dark [class*="recently"] .grid-product__picture,
body.ml-dark [class*="recently"] .grid-product__picture-wrapper,
body.ml-dark [class*="recently"] .grid-product__image-wrap,
body.ml-dark .ec-related-products .grid-product__image,
body.ml-dark .ec-related-products .grid-product__picture,
body.ml-dark .ec-related-products .grid-product__picture-wrapper,
body.ml-dark .ec-related-products .grid-product__image-wrap{
  background:${IMG_BG}!important;
  border:none!important;
  border-radius:12px 12px 0 0!important;
}
body.ml-dark [class*="recently"] .grid-product__image img,
body.ml-dark .ec-related-products .grid-product__image img{
  border-radius:12px 12px 0 0!important;
}
body.ml-dark [class*="recently"] .grid-product__price,
body.ml-dark [class*="recently"] .grid-product__price-value,
body.ml-dark .ec-related-products .grid-product__price,
body.ml-dark .ec-related-products .grid-product__price-value{
  color:${GOLD}!important;
}
body.ml-dark [class*="recently"] .grid-product__old-price,
body.ml-dark .ec-related-products .grid-product__old-price{
  color:${TX3}!important;
}
/* Recently viewed — alt beyaz çizgi/separator yok et */
body.ml-dark [class*="recently"]::after,
body.ml-dark [class*="recently"]::before,
body.ml-dark .ec-related-products::after,
body.ml-dark .ec-related-products::before,
body.ml-dark [class*="recently"] > div:last-child{
  border:none!important;
  border-bottom:none!important;
  border-top:none!important;
  background:transparent!important;
}
/* ══ SON GÖRÜNTÜLENENLER — Gerçek DOM: .recently-viewed class ailesi ══ */
/* Beğenebilirsiniz kart tasarımı ile birebir aynı */
/* Section title */
body.ml-dark .recently-viewed-title{
  color:${TX1}!important;
  font-weight:700!important;
}
/* Kart container — grid-product__wrap ile aynı */
body.ml-dark .recently-viewed{
  background:${BG2}!important;
  border-radius:14px!important;
  border:none!important;
  margin:0 8px!important;
  padding:0!important;
  box-shadow:
    inset 0 0 0 1px ${BD},
    0 0 0 2px ${BG1},
    0 0 0 3px ${BD2},
    0 2px 12px rgba(0,0,0,.3)!important;
  overflow:visible!important;
  transition:box-shadow .3s ease,transform .3s ease!important;
}
body.ml-dark .recently-viewed:hover{
  box-shadow:
    inset 0 0 0 1px ${GOLDDIM},
    0 0 0 2px ${BG1},
    0 0 0 3px ${GOLDDIM},
    0 4px 20px rgba(175,140,62,.15),
    0 8px 32px rgba(0,0,0,.35)!important;
  transform:translateY(-2px)!important;
  border:none!important;
  outline:none!important;
}
/* Link */
body.ml-dark .recently-viewed__url{
  color:inherit!important;
  text-decoration:none!important;
  display:flex!important;
  flex-direction:column!important;
  height:100%!important;
}
/* Thumbnail — beyaz bg, sabit yükseklik, contain */
body.ml-dark .recently-viewed__thumb{
  background:#fff!important;
  border:none!important;
  border-radius:14px 14px 0 0!important;
  overflow:hidden!important;
  height:150px!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
}
body.ml-dark .recently-viewed__thumb img{
  border-radius:0!important;
  background:transparent!important;
  width:100%!important;
  height:100%!important;
  object-fit:contain!important;
}
/* Ürün adı */
body.ml-dark .recently-viewed__name{
  color:${TX1}!important;
  text-align:center!important;
  font-size:14px!important;
  padding:10px 8px 4px!important;
  line-height:1.3!important;
}
/* Fiyat */
body.ml-dark .recently-viewed__price,
body.ml-dark .recently-viewed__price .ec-price-item{
  color:${GOLD}!important;
  text-align:center!important;
  font-size:16px!important;
  font-weight:600!important;
  padding:4px 8px 12px!important;
}
body.ml-dark .recently-viewed__price .ec-price-item--old{
  color:${TX3}!important;
}

/* Karosel/scrollbar temizliği */
body.ml-dark [class*="recently"] ::-webkit-scrollbar,
body.ml-dark .ec-related-products ::-webkit-scrollbar{
  height:6px!important;
  background:${BG2}!important;
}
body.ml-dark [class*="recently"] ::-webkit-scrollbar-thumb,
body.ml-dark .ec-related-products ::-webkit-scrollbar-thumb{
  background:${BD2}!important;
  border-radius:3px!important;
}
/* Karosel scroller — overflow fix */
body.ml-dark .product-details__related-products,
body.ml-dark [class*="related-products"]{
  overflow:visible!important;
}
/* Recently viewed / Related heading */
body.ml-dark .ec-related-products__title,
body.ml-dark [class*="related-products"] h2,
body.ml-dark [class*="recently"] h2,
body.ml-dark [class*="recently-viewed"] h2,
body.ml-dark .ec-related-products h2{
  color:${TX1}!important;
  font-weight:700!important;
}
/* Recently viewed kart alt text */
body.ml-dark [class*="recently"] .grid-product__bg,
body.ml-dark .ec-related-products .grid-product__bg{
  background:${BG2}!important;
}
body.ml-dark [class*="recently"] .grid-product__spacer,
body.ml-dark .ec-related-products .grid-product__spacer{
  border:none!important;
  background:transparent!important;
}

/* ── ANASAYFA CTA BUTONU (Alışverişe Devam Et / Mağazaya Git) ── */
body.ml-dark .tile-cover .cover__button,
body.ml-dark .tile-cover .cover-button,
body.ml-dark .cover__button.cover-button,
body.ml-dark .tile-cover a.cover__button,
body.ml-dark .tile-cover a.cover-button{
  background:linear-gradient(135deg,#af8c3e,#d4b05e)!important;
  background-color:#af8c3e!important;
  color:#fff!important;
  border:none!important;
  border-radius:12px!important;
  font-weight:700!important;
  text-decoration:none!important;
  position:relative!important;
  overflow:hidden!important;
}
body.ml-dark .tile-cover .cover__button *:not(.ml-sweep),
body.ml-dark .tile-cover .cover-button *:not(.ml-sweep){
  color:#fff!important;
  background:transparent!important;
  background-color:transparent!important;
}
body.ml-dark .tile-cover .cover__button:hover,
body.ml-dark .tile-cover .cover-button:hover,
body.ml-dark .cover__button:hover,
body.ml-dark .cover-button:hover{
  background:#af8c3e!important;
  background-color:#af8c3e!important;
  border-radius:12px!important;
  overflow:hidden!important;
  transform:scale(.97)!important;
}
body.ml-dark .cover__button:hover *:not(.ml-sweep),
body.ml-dark .cover-button:hover *:not(.ml-sweep){
  background:transparent!important;
  background-color:transparent!important;
  border-radius:inherit!important;
}

/* ── ECWID İKON BAR (Ürünleri Ara, Hesabım, Siparişleri İzle, Favoriler, Sepetim) ── */
body.ml-dark .ec-store__content-wrapper a,
body.ml-dark .ec-footer a svg,
body.ml-dark .ec-store [class*="icon-bar"] a,
body.ml-dark .ec-store [class*="icon-bar"] svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}

/* ── ÜRÜN DETAY — ek düzeltmeler ── */
/* Stokta var badge genişleme düzeltme — ek güvenlik */
body.ml-dark .product-details .ec-label[class*="Stokta"],
body.ml-dark .product-details__label-container{
  display:inline-flex!important;
  width:auto!important;
  max-width:fit-content!important;
}
/* Üzeri çizili eski fiyat */
body.ml-dark .ec-price-item--old,
body.ml-dark [class*="price--old"],
body.ml-dark .grid-product__price-compare,
body.ml-dark s .ec-price-item{
  color:${TX3}!important;
}
/* Promosyon kodu linki */
body.ml-dark [class*="coupon"] a,
body.ml-dark [class*="promo"] a{
  color:${GOLD}!important;
}

/* ── PARA BİRİMİ ── */
body.ml-dark .ec-currency-converter-element select{
  background:${BG3}!important;
  color:${TX2}!important;
}

/* ── TABLAR ── */
body.ml-dark [class*="tabs__"] a,
body.ml-dark [class*="tabs__"] span{
  color:${TX2}!important;
}
body.ml-dark [class*="tabs__"] a:hover,
body.ml-dark [class*="tabs__"] a.active,
body.ml-dark [class*="tabs__"] a[aria-selected="true"]{
  color:${GOLD}!important;
}
/* Statik sayfa — iç sekmeler (Şartlar & Koşullar vb.) */
body.ml-dark .ec-page-body nav a,
body.ml-dark [class*="content-page"] nav a,
body.ml-dark [class*="legal"] nav a{
  color:${TX2}!important;
  transition:color .2s!important;
}
body.ml-dark .ec-page-body nav a:hover,
body.ml-dark [class*="content-page"] nav a:hover,
body.ml-dark .ec-page-body nav a.active{
  color:${GOLD}!important;
}
/* Statik sayfa SVG/icon'lar */
body.ml-dark .ec-page-body svg,
body.ml-dark .ec-page-body img:not([src*=".jpg"]):not([src*=".png"]):not([src*=".webp"]){
  filter:invert(1) brightness(.85)!important;
}

/* ── PUSHMENU / MOBİL MENÜ ── */
body.ml-dark .pushmenu-btn{
  color:${TX1}!important;
}

/* ── İKONLAR / SVG ── */
body.ml-dark .ec-minicart__icon,
body.ml-dark .ec-cart-widget svg{
  color:${TX1}!important;
  fill:${TX1}!important;
}
/* Sepet + Arama floating ikonları */
body.ml-dark .float-icons,
body.ml-dark .float-icons__wrap,
body.ml-dark .float-icons__icon,
body.ml-dark .float-icons__icon > div,
body.ml-dark .float-icons__wrap .ec-minicart__body,
body.ml-dark .float-icons__wrap .ec-minicart__icon{
  background:transparent!important;
  border:none!important;
  box-shadow:none!important;
}
/* Sadece yuvarlak daire (.ec-minicart, radius:40px) */
body.ml-dark .float-icons__wrap .ec-minicart{
  background:${BG2}!important;
  border:1px solid ${BD}!important;
  box-shadow:0 2px 8px rgba(0,0,0,.3)!important;
}
body.ml-dark .float-icons__wrap svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}

/* ── HR & KENARLIKLARI ── */
body.ml-dark hr{border-color:${BD2}!important}

/* ── SCROLLBAR ── */
body.ml-dark ::-webkit-scrollbar{width:8px;height:8px}
body.ml-dark ::-webkit-scrollbar-track{background:${BG1}}
body.ml-dark ::-webkit-scrollbar-thumb{background:${BG3};border-radius:4px}
body.ml-dark ::-webkit-scrollbar-thumb:hover{background:${TX3}}

/* ── BADGE / ETİKET ── */
body.ml-dark [class*="label--"],
body.ml-dark .ec-label{
  background:${GOLDDIM}!important;
  color:${BG1}!important;
}
/* Stokta Yok — koyu bordo (badge + grid-product__label kurallarını ezmek için yüksek specificity) */
body.ml-dark .grid-product__label.grid-product__label--Stokta-Yok,
body.ml-dark .grid-product__label[class*="Stokta-Yok"],
body.ml-dark .grid-product__label[class*="Stokta-yok"],
body.ml-dark [class*="label--Stokta-Yok"][class*="label--Stokta-Yok"],
body.ml-dark [class*="label--Stokta-yok"],
body.ml-dark [class*="label-container"][class*="Stokta-Yok"],
body.ml-dark [class*="label-container"][class*="Stokta-yok"],
body.ml-dark .product-details__label-container.product-details__label--Stokta-Yok,
body.ml-dark .product-details__label-container.product-details__label--Stokta-yok{
  background:#8b3a3a!important;
  color:#fff!important;
  border-radius:6px!important;
}
body.ml-dark [class*="Stokta-Yok"] .label__text,
body.ml-dark [class*="Stokta-yok"] .label__text,
body.ml-dark .grid-product__label--Stokta-Yok .label__text,
body.ml-dark .grid-product__label--Stokta-yok .label__text{
  color:#fff!important;
}
/* Stokta Yok içindeki .ec-label — badge gold kuralını ez */
body.ml-dark [class*="Stokta-Yok"] .ec-label,
body.ml-dark [class*="Stokta-yok"] .ec-label,
body.ml-dark [class*="Stokta-Yok"] [class*="label--"],
body.ml-dark [class*="Stokta-yok"] [class*="label--"],
body.ml-dark .grid-product__label--Stokta-Yok .ec-label,
body.ml-dark .grid-product__label--Stokta-yok .ec-label{
  background:#8b3a3a!important;
  background-color:#8b3a3a!important;
  color:#fff!important;
}

/* ── POPUP / OVERLAY ── */
body.ml-dark .ec-modal,
body.ml-dark [class*="popup"]{
  background:${BG2}!important;
  color:${TX1}!important;
}

/* ══════════════════════════════════════
   WIDGET DARK MODE OVERRIDE
   (widget.js CSS değişkenleri)
   ══════════════════════════════════════ */
body.ml-dark .ml-overlay .ml-card{
  --mltp:#ece8df;
  --mlts:#d4cfc4;
  --mltt:#b5ae9e;
  --mlbg:${BG2};
  --mlbg2:${BG3};
  --mlbgh:#3a3930;
  --mlbd:${BD};
  --mlgl:rgba(175,140,62,.12);
}
/* Stat kutuları — gold tınılı */
body.ml-dark .ml-overlay .ml-stat{
  background:rgba(175,140,62,.08)!important;
  border-color:rgba(175,140,62,.15)!important;
}
body.ml-dark .ml-overlay .ml-stat:hover{
  background:rgba(175,140,62,.14)!important;
  border-color:rgba(175,140,62,.25)!important;
}
body.ml-dark .ml-overlay .ml-stat-num{
  color:${GOLD}!important;
}
body.ml-dark .ml-overlay .ml-stat-lbl{
  color:#b5ae9e!important;
}
/* Tier ismi — gold (tüm tier'lar) */
body.ml-dark .ml-overlay .ml-tier-name{
  color:${GOLD}!important;
}
body.ml-dark .ml-overlay .ml-tier-sub{
  color:#d4cfc4!important;
}
/* Header ortalama */
body.ml-dark .ml-overlay .ml-head{
  text-align:center!important;
  justify-content:center!important;
}
body.ml-dark .ml-overlay .ml-head-sub,
body.ml-dark .ml-overlay .ml-head-title{
  color:#b5ae9e!important;
}
/* Progress label ve hint */
body.ml-dark .ml-overlay .ml-prog-label,
body.ml-dark .ml-overlay .ml-prog-val{
  color:#d4cfc4!important;
}
body.ml-dark .ml-overlay .ml-prog-hint{
  color:#d4cfc4!important;
}
body.ml-dark .ml-overlay .ml-prog-hint b{
  color:${GOLD}!important;
}
/* Tier tablosu */
body.ml-dark .ml-overlay .ml-tier-row.current{
  background:rgba(175,140,62,.1)!important;
  border-color:rgba(175,140,62,.2)!important;
}
body.ml-dark .ml-overlay .ml-tr-name{
  color:#d4cfc4!important;
}
body.ml-dark .ml-overlay .ml-tr-info{
  color:#b5ae9e!important;
}
body.ml-dark .ml-overlay .ml-label{
  color:#b5ae9e!important;
}
/* Savings kutusu — gold tınılı */
body.ml-dark .ml-overlay .ml-savings{
  background:linear-gradient(135deg,rgba(175,140,62,.14),rgba(175,140,62,.08))!important;
  border-color:rgba(175,140,62,.2)!important;
}
body.ml-dark .ml-overlay .ml-savings-txt{
  color:#d4cfc4!important;
}
body.ml-dark .ml-overlay .ml-savings-txt b{
  color:${GOLD}!important;
}
body.ml-dark .ml-overlay .ml-savings-orders{
  border-left-color:rgba(175,140,62,.2)!important;
}
body.ml-dark .ml-overlay .ml-savings-orders-val{
  color:${GOLD}!important;
}
body.ml-dark .ml-overlay .ml-savings-orders-lbl{
  color:#b5ae9e!important;
}
body.ml-dark .ml-overlay .ml-savings-only{
  background:rgba(175,140,62,.08)!important;
}
/* Widget içi okunabilirlik */
body.ml-dark .ml-overlay .ml-card .ml-sub,
body.ml-dark .ml-overlay .ml-card [class*="desc"],
body.ml-dark .ml-overlay .ml-card [class*="info"]{
  color:#d4cfc4!important;
}
body.ml-dark .ml-overlay .ml-card .ml-val{
  color:#ece8df!important;
}
body.ml-dark .ml-overlay{
  background:rgba(0,0,0,.6)!important;
}
body.ml-dark .ml-trigger{
  background:linear-gradient(135deg,${BG2},${BG3})!important;
  border:1px solid ${BD}!important;
  color:${GOLD}!important;
}
body.ml-dark .ml-trigger:hover{
  border-color:${GOLDDIM}!important;
}
/* Widget trigger mobile size — override widget.js 44px to 60px */
@media(max-width:1024px){
  body.ml-nav .ml-trigger{
    width:60px!important;height:60px!important;
  }
}
body.ml-dark .ml-tier-share{
  background:${BG3}!important;
  color:${TX2}!important;
}
body.ml-dark .ml-tr-ico{
  background:${BG3}!important;
}
body.ml-dark .ml-signin-input{
  background:${BG3}!important;
  border-color:${BD}!important;
  color:${TX1}!important;
}
body.ml-dark .ml-signin-input::placeholder{
  color:${TX3}!important;
}

/* ══════════════════════════════════════
   EKSİK ECWID BİLEŞENLERİ
   ══════════════════════════════════════ */

/* ── BİLDİRİM / TOAST ── */
body.ml-dark .ec-notice,
body.ml-dark [class*="ec-notice"],
body.ml-dark [class*="storefront__notification"],
body.ml-dark [class*="notification"]:not(.ml-overlay *){
  background:${BG2}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}

/* ── ARAMA SONUÇLARI ── */
body.ml-dark [class*="search-result"],
body.ml-dark [class*="search-product"],
body.ml-dark .ec-search{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark [class*="search-result"] [class*="title"],
body.ml-dark [class*="search-product"] [class*="title"]{
  color:${TX1}!important;
}
body.ml-dark [class*="search-result"] [class*="price"]{
  color:${GOLD}!important;
}

/* ── HESABIM / SİPARİŞLERİM ── */
body.ml-dark [class*="ec-my-account"],
body.ml-dark [class*="my-account"],
body.ml-dark .ec-account{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark [class*="ec-order"],
body.ml-dark [class*="order-item"],
body.ml-dark [class*="order-details"]{
  background:${BG2}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
body.ml-dark [class*="ec-order"] [class*="title"],
body.ml-dark [class*="order-item"] [class*="title"]{
  color:${TX1}!important;
}
body.ml-dark [class*="ec-order"] [class*="price"],
body.ml-dark [class*="order-item"] [class*="price"]{
  color:${GOLD}!important;
}
body.ml-dark [class*="ec-order"] [class*="status"]{
  color:${GOLD}!important;
}

/* ── FAVORİLER ── */
body.ml-dark [class*="ec-favs"],
body.ml-dark [class*="favorites"]{
  background:${BG1}!important;
  color:${TX1}!important;
}

/* ── LOADER / SPİNNER ── */
body.ml-dark .ec-loader,
body.ml-dark [class*="ec-loader"]{
  background:${BG1}!important;
}
body.ml-dark .ec-loader svg,
body.ml-dark [class*="ec-loader"] svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}
`;

// ─── STYLE ENJEKSİYONU ───
var styleEl=document.createElement('style');
styleEl.id='ml-dark-mode';
styleEl.textContent=css;
document.head.appendChild(styleEl);

// ─── SVG İKONLARI — Sadece ay: stroke (açık) / fill (kapalı) ───
var moonOff='<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>';
var moonOn='<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>';

// ─── TOGGLE BUTON OLUŞTUR ───
var btn=document.createElement('button');
btn.className='ml-dm-btn';
btn.setAttribute('aria-label','Karanlık mod');
btn.setAttribute('title','Karanlık / Aydınlık Mod');
btn.innerHTML=moonOff;

// ─── TOGGLE FONKSİYONU ───

function toggle(){
  var wasDark=document.body.classList.contains('ml-dark');
  if(wasDark){
    // ═══ DARK → LIGHT: Smooth reload (132 inline style + wildcard = temizlik imkansız) ═══
    try{localStorage.setItem('ml-dark','0');}catch(e){}
    // Fade-out → reload → sayfa light olarak yüklenir (tertemiz Ecwid)
    var fade=document.createElement('div');
    fade.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:#ffbd92;opacity:0;z-index:9999999;transition:opacity .3s ease;pointer-events:none;';
    document.body.appendChild(fade);
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      fade.style.opacity='1';
    });});
    setTimeout(function(){location.reload();},350);
    return;
  }
  // ═══ LIGHT → DARK: Anında geçiş (temizlik gereksiz) ═══
  _observer.disconnect();
  document.body.classList.add('ml-dark');
  document.documentElement.style.setProperty('background','#1b1a17','important');
  document.body.style.backgroundColor='#1b1a17';
  btn.innerHTML=moonOn;
  try{localStorage.setItem('ml-dark','1');}catch(e){}
  _lastFixTime=0;
  clearTimeout(_fixTimer);
  if(_fixRAF) cancelAnimationFrame(_fixRAF);
  _fixAllNow();
  setTimeout(function(){
    _observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
  },50);
  setTimeout(fixAll,300);
  setTimeout(fixAll,800);
  setTimeout(fixAll,2000);
}

btn.addEventListener('click',function(e){
  e.stopPropagation();
  e.preventDefault();
  toggle();
});

// ─── NAVBAR / SIDEBAR SYSTEM ───
var _sidebar,_sbOverlay,_hamburger,_catContainer;

var _savedScrollY=0;
function _toggleSidebar(){
  var isOpen=_sidebar.classList.contains('open');
  _sidebar.classList.toggle('open');
  _sbOverlay.classList.toggle('open');
  _hamburger.classList.toggle('open');
  if(isOpen){
    // Unlock
    document.body.style.position='';document.body.style.top='';document.body.style.width='';document.body.style.overflow='';
    window._mlScrollBypass=true;window.scrollTo(0,_savedScrollY);window._mlScrollBypass=false;
  } else {
    // Lock
    _savedScrollY=window.scrollY;
    document.body.style.position='fixed';document.body.style.top=(-_savedScrollY)+'px';document.body.style.width='100%';document.body.style.overflow='hidden';
  }
  try{if(navigator.vibrate)navigator.vibrate(8);}catch(e){}
}

function _closeSidebar(){
  if(!_sidebar.classList.contains('open')) return;
  _sidebar.classList.remove('open');
  _sbOverlay.classList.remove('open');
  _hamburger.classList.remove('open');
  document.body.style.position='';document.body.style.top='';document.body.style.width='';document.body.style.overflow='';
  window._mlScrollBypass=true;window.scrollTo(0,_savedScrollY);window._mlScrollBypass=false;
}

function _parseCats(){
  if(!_catContainer) return;
  if(_catContainer.querySelector('.ml-sb-item')) return;
  // Eski cache temizle (v3 öncesi)
  try{sessionStorage.removeItem('ml-cats');sessionStorage.removeItem('ml-cats-v3');}catch(e){}
  var CACHE_KEY='ml-cats-v4';
  var cats=[];
  var seen={};
  // Parse from NAV ONLY — not page content (.ec-store area has subcats)
  var navArea=document.querySelector('.cover__menu')||document.querySelector('.top-menu')||document.querySelector('.main-nav');
  if(navArea){
    navArea.querySelectorAll('.cat-name, a[href*="-c"]').forEach(function(el){
      var a=el.tagName==='A'?el:el.querySelector('a');
      if(!a) a=el.closest('a');
      var text=(el.textContent||'').trim();
      var href=a?a.getAttribute('href'):'';
      if(!text||seen[text]||!href||!/-c\d+/.test(href)) return;
      seen[text]=true;
      cats.push({name:text,href:href});
    });
  }
  // Fallback: broad search but only inside nav/menu containers
  if(cats.length<2){
    document.querySelectorAll('.menu a[href*="-c"], nav a[href*="-c"], .top-menu a[href*="-c"]').forEach(function(a){
      var href=a.getAttribute('href')||'';
      var text=(a.textContent||'').trim();
      if(!text||!/-c\d+/.test(href)||seen[text]) return;
      seen[text]=true;
      cats.push({name:text,href:href});
    });
  }
  // Fallback 2: full page scan for any category links (catches hidden/overflow cats)
  if(cats.length<8){
    document.querySelectorAll('a[href*="-c"]').forEach(function(a){
      var href=a.getAttribute('href')||'';
      var text=(a.textContent||'').trim();
      if(!text||!/-c\d+/.test(href)||seen[text]) return;
      // Skip product links and subcategories
      if(text.length>40||/\d+\s*(ml|mg|adet)/i.test(text)) return;
      if(a.closest('.ec-store__content-wrapper,.grid-product,.product-details')) return;
      seen[text]=true;
      cats.push({name:text,href:href});
    });
  }
  // Fallback 3: Ecwid API — guaranteed complete category list
  if(cats.length<8 && typeof Ecwid!=='undefined' && Ecwid.getCategories){
    try{
      Ecwid.getCategories(function(apiCats){
        if(!apiCats||!apiCats.length) return;
        var added=false;
        apiCats.forEach(function(ac){
          if(!ac.name||!ac.id||ac.parentId||seen[ac.name]) return;
          seen[ac.name]=true;
          cats.push({name:ac.name,href:'#!/~/-c'+ac.id});
          added=true;
        });
        if(added&&cats.length>=5){
          try{sessionStorage.setItem(CACHE_KEY,JSON.stringify(cats));}catch(e){}
          // Re-render
          _catContainer.innerHTML='';
          _renderCatItems(cats);
        }
      });
    }catch(e){}
  }
  // Cache ONLY if substantial set (prevents subcategory overwrite)
  if(cats.length>=5){
    try{sessionStorage.setItem(CACHE_KEY,JSON.stringify(cats));}catch(e){}
  }
  // Use cache if DOM had too few
  if(cats.length<6){
    try{
      var cached=sessionStorage.getItem(CACHE_KEY);
      if(cached){
        var parsed=JSON.parse(cached);
        if(parsed.length>=5) cats=parsed;
      }
    }catch(e){}
  }
  if(cats.length===0) return;
  // Category icon SVGs — letter squares for liquids, premium SVG for accessories
  var _catIcons={
    'pod':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="5"/><line x1="7" y1="8" x2="17" y2="8"/><circle cx="12" cy="14" r="2"/></svg>',
    'coil':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="3" width="8" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><path d="M10 12h4M10 15h4"/><circle cx="12" cy="18" r=".8" fill="currentColor"/></svg>',
    'atomizer':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="8" width="10" height="14" rx="2"/><path d="M10 8V5h4v3"/><line x1="7" y1="12" x2="17" y2="12"/><path d="M11 2h2"/><path d="M10 15h4"/></svg>',
    'iced':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 7l-5 5-5-5"/><path d="M17 17l-5-5-5 5"/><path d="M2 12h20"/></svg>'
  };
  function _getCatIcon(name){
    var n=name.toLowerCase();
    // Letter-based squares for liquid categories
    if(n.indexOf('manhattan')>-1&&n.indexOf('salt')>-1) return {type:'letter',letter:'S',cls:'salt'};
    if(n.indexOf('manhattan')>-1) return {type:'letter',letter:'M',cls:'freebase'};
    if(n.indexOf('amsterdam')>-1&&n.indexOf('salt')>-1) return {type:'letter',letter:'S',cls:'salt'};
    if(n.indexOf('amsterdam')>-1) return {type:'letter',letter:'A',cls:'freebase'};
    if(n.indexOf('iced')>-1||n.indexOf('buzlu')>-1) return {type:'svg',svg:_catIcons.iced,cls:'iced-svg'};
    // SVG icons for accessories
    if(n.indexOf('pod')>-1||n.indexOf('kit')>-1) return {type:'svg',svg:_catIcons.pod,cls:'acc'};
    if(n.indexOf('coil')>-1||n.indexOf('kartu')>-1) return {type:'svg',svg:_catIcons.coil,cls:'acc'};
    if(n.indexOf('atomizer')>-1) return {type:'svg',svg:_catIcons.atomizer,cls:'acc'};
    return null;
  }
  function _renderCatItems(list){
    list.forEach(function(cat){
      var item=document.createElement('div');
      item.className='ml-sb-item';
      var iconInfo=_getCatIcon(cat.name);
      var iconHtml='';
      if(iconInfo){
        if(iconInfo.type==='letter'){
          iconHtml='<span class="ml-sb-cat-icon ml-ci-'+iconInfo.cls+'"><span class="ml-ci-letter">'+iconInfo.letter+'</span></span>';
        } else {
          iconHtml='<span class="ml-sb-cat-icon ml-ci-'+iconInfo.cls+'">'+iconInfo.svg+'</span>';
        }
      }
      item.innerHTML=iconHtml+'<span class="ml-sb-item-label">'+cat.name+'</span><span class="ml-sb-item-chev">›</span>';
      item._catHref=cat.href;
      item.addEventListener('click',function(e){
        e.stopPropagation();
        _closeSidebar();
        setTimeout(function(){
          var h=cat.href;
          var catId=h.match(/-c(\d+)/);
          if(catId && typeof Ecwid!=='undefined' && Ecwid.openPage){
            Ecwid.openPage('category',{id:parseInt(catId[1])});
          } else if(h.indexOf('#')===0){
            window.location.hash=h;
          } else if(h.indexOf('#')>0){
            window.location.hash=h.substring(h.indexOf('#'));
          } else {
            window.location.hash='#!/'+encodeURIComponent(cat.name);
          }
        },200);
      });
      _catContainer.appendChild(item);
    });
  }
  _renderCatItems(cats);
}

function _buildNavbar(){
  // ─ Top Bar ─
  var topbar=document.createElement('div');
  topbar.className='ml-topbar';

  _hamburger=document.createElement('button');
  _hamburger.className='ml-hamburger';
  _hamburger.setAttribute('aria-label','Menü');
  _hamburger.innerHTML='<span></span><span></span><span></span>';
  _hamburger.addEventListener('click',function(e){e.stopPropagation();_toggleSidebar();});

  var brand=document.createElement('div');
  brand.className='ml-brand';
  // Logo from site
  var siteLogo2=document.querySelector('.logo img');
  var logoSrc2=siteLogo2?(siteLogo2.src||siteLogo2.currentSrc||''):'';
  brand.innerHTML=(logoSrc2?'<img class="ml-brand-logo" src="'+logoSrc2+'" alt="">':'')+'MANHATTAN';
  brand.addEventListener('click',function(e){
    e.stopPropagation();
    if(typeof Ecwid!=='undefined'&&typeof Ecwid.openPage==='function'){
      Ecwid.openPage('category');
    }
    setTimeout(function(){window.scrollTo({top:0,behavior:'smooth'});},300);
  });

  // btn = existing toggle (already created above)
  btn.style.marginLeft='';
  btn.style.display='';
  btn.style.verticalAlign='';

  topbar.appendChild(_hamburger);
  topbar.appendChild(brand);
  var spacer=document.createElement('div');spacer.style.flex='1';
  topbar.appendChild(spacer);
  topbar.appendChild(btn);

  // ─ Motto Bar ─
  var motto=document.createElement('div');
  motto.className='ml-motto';
  motto.innerHTML='<div class="ml-motto-en">DESERVE YOUR DREAM</div><div class="ml-motto-tr">Hayalini hak et</div>';

  // ─ Sidebar ─
  _sidebar=document.createElement('div');
  _sidebar.className='ml-sidebar';

  var sbHead=document.createElement('div');
  sbHead.className='ml-sb-head';
  // Home button (absolute left)
  var homeBtn=document.createElement('button');
  homeBtn.className='ml-sb-action';
  homeBtn.setAttribute('aria-label','Başa dön');
  homeBtn.style.cssText='position:absolute;top:14px;left:14px';
  homeBtn.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
  homeBtn.addEventListener('click',function(e){
    e.stopPropagation();
    try{if(navigator.vibrate)navigator.vibrate(6);}catch(e2){}
    _closeSidebar();
    setTimeout(function(){
      if(typeof Ecwid!=='undefined'&&typeof Ecwid.openPage==='function'){
        Ecwid.openPage('category');
      }
      setTimeout(function(){window.scrollTo({top:0,behavior:'smooth'});},300);
    },200);
  });
  sbHead.appendChild(homeBtn);
  // D-style centered brand + motto
  var brandEl=document.createElement('div');brandEl.className='ml-sb-brand';brandEl.textContent='MANHATTAN';
  var mottoEl=document.createElement('div');mottoEl.className='ml-sb-motto';mottoEl.textContent='DESERVE YOUR DREAM';
  sbHead.appendChild(brandEl);sbHead.appendChild(mottoEl);
  // Close button (absolute positioned via CSS)
  var closeBtn=document.createElement('span');
  closeBtn.className='ml-sb-close';
  closeBtn.setAttribute('aria-label','Kapat');
  closeBtn.innerHTML='&#10005;';
  closeBtn.addEventListener('click',function(e){
    e.stopPropagation();_closeSidebar();
  });
  sbHead.appendChild(closeBtn);

  // Anasayfa moved inside categories (_parseCats)

  // Category section
  var catSection=document.createElement('div');
  catSection.className='ml-sb-section';
  catSection.textContent='Kategoriler';

  _catContainer=document.createElement('div');
  _catContainer.id='ml-cat-list';

  // Nav links: Hakkında, Bize ulaşın
  var navSection=document.createElement('div');
  navSection.className='ml-sb-nav-bottom';
  var navLinks=[
    {text:'Hakkında',action:function(){
      _closeSidebar();
      setTimeout(function(){
        if(!_scrollToSection('.tile-about')){
          if(typeof Ecwid!=='undefined'&&typeof Ecwid.openPage==='function'){
            Ecwid.openPage('category',{callback:function(){
              setTimeout(function(){_scrollToSection('.tile-about');},800);
            }});
          }else{_goStore();}
        }
      },250);
    }},
    {text:'Bize ulaşın',action:function(){
      _closeSidebar();
      setTimeout(function(){
        if(!_scrollToSection('.tile-contactInfo')){
          if(typeof Ecwid!=='undefined'&&typeof Ecwid.openPage==='function'){
            Ecwid.openPage('category',{callback:function(){
              setTimeout(function(){_scrollToSection('.tile-contactInfo');},800);
            }});
          }else{_goStore();}
        }
      },250);
    }}
  ];
  navLinks.forEach(function(nl){
    var item=document.createElement('span');
    item.className='ml-sb-nav-link';
    item.textContent=nl.text;
    item.addEventListener('click',function(e){
      e.stopPropagation();
      nl.action();
    });
    navSection.appendChild(item);
  });

  // ─ User Section (greeting or login) ─
  var sbUser=document.createElement('div');
  sbUser.className='ml-sb-user';
  sbUser.id='ml-sb-user';
  function _updateSbUser(name,tier){
    if(name){
      var _initial=name.charAt(0).toUpperCase();
      // Time-based greeting (TR)
      var _h=new Date().getHours();
      var _greet=_h<6?'İyi geceler':_h<12?'Günaydın':_h<18?'İyi günler':'İyi akşamlar';
      // iOS profile card
      sbUser.innerHTML='<div class="ml-sb-profile">'+
        '<div class="ml-sb-avatar">'+_initial+'</div>'+
        '<div class="ml-sb-profile-info">'+
          '<div class="ml-sb-profile-name">'+_greet+', '+name+'</div>'+
          (tier?'<div class="ml-sb-tier-badge"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="10" height="10"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>'+tier+' Üye</span></div>':'')+
        '</div>'+
        '<span class="ml-sb-profile-chevron">›</span>'+
      '</div>';
      // Profile card click → widget aç
      var profCard=sbUser.querySelector('.ml-sb-profile');
      if(profCard){
        profCard.addEventListener('click',function(e){
          e.stopPropagation();
          try{if(navigator.vibrate)navigator.vibrate(6);}catch(e2){}
          _closeSidebar();
          setTimeout(function(){
            var wBtn=document.querySelector('.ml-trigger');
            if(wBtn) wBtn.click();
            else if(typeof mlOpen==='function') mlOpen();
          },200);
        });
      }
      // ─ Quick Actions — iOS grouped list ─
      var qaDiv=document.createElement('div');
      qaDiv.className='ml-sb-quick';
      var _qaItems=[
        {iconCls:'slate',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',label:'Hesabım',isCark:false,path:'/account',countSel:null},
        {iconCls:'coral',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',label:'Sepetim',isCark:false,path:'/cart',countSel:'.ec-minicart__counter'},
        {iconCls:'teal',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',label:'Favorilerim',isCark:false,path:'/account/favorites',countSel:null},
        {iconCls:'gold',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',label:'Çark Çevir',isCark:true,path:null,countSel:null}
      ];
      _qaItems.forEach(function(qa){
        var btn=document.createElement('button');
        btn.className='ml-sb-qa'+(qa.isCark?' ml-sb-qa-cark':'');
        btn.innerHTML='<span class="ml-sb-qa-icon '+qa.iconCls+'">'+qa.icon+'</span>'+
          '<span class="ml-sb-qa-label">'+qa.label+'</span>';
        if(qa.countSel){
          var cEl=document.querySelector(qa.countSel);
          if(cEl&&parseInt(cEl.textContent)>0){
            btn.innerHTML+=('<span class="ml-sb-qa-count">'+cEl.textContent.trim()+'</span>');
          }
        }
        btn.innerHTML+='<span class="ml-sb-chevron">›</span>';
        btn.addEventListener('click',function(e){
          e.stopPropagation();
          try{if(navigator.vibrate)navigator.vibrate(6);}catch(e2){}
          _closeSidebar();
          if(qa.isCark){
            setTimeout(function(){
              var swBtn=document.querySelector('.sw-trigger,#sw-trigger');
              if(swBtn){swBtn.click();}
              else if(typeof openOverlay==='function') openOverlay();
              else if(typeof window.openOverlay==='function') window.openOverlay();
            },200);
          } else {
            setTimeout(function(){_ecNav(qa.path);},200);
          }
        });
        qaDiv.appendChild(btn);
      });
      sbUser.appendChild(qaDiv);
    } else {
      sbUser.innerHTML='<div class="ml-sb-login-label">Giriş yapın</div>'+
        '<div class="ml-sb-login-row">'+
        '<input type="email" class="ml-sb-login-input" id="mlSbEmail" placeholder="E-posta adresiniz" autocomplete="email">'+
        '<button type="button" class="ml-sb-login-btn" id="mlSbLoginBtn">Gönder</button>'+
        '</div>'+
        '<div class="ml-sb-login-msg" id="mlSbLoginMsg"></div>';
      setTimeout(function(){
        var inp=document.getElementById('mlSbEmail');
        var btn=document.getElementById('mlSbLoginBtn');
        if(!inp||!btn) return;
        inp.addEventListener('click',function(e){e.stopPropagation();});
        inp.addEventListener('keydown',function(e){
          e.stopPropagation();
          if(e.key==='Enter'){e.preventDefault();_sbLogin();}
        });
        btn.addEventListener('click',function(e){e.stopPropagation();_sbLogin();});
      },50);
    }
  }
  // Login function — same mechanism as widget.js
  function _sbLogin(){
    var inp=document.getElementById('mlSbEmail');
    var btn=document.getElementById('mlSbLoginBtn');
    var msg=document.getElementById('mlSbLoginMsg');
    if(!inp||!btn) return;
    var email=inp.value.trim();
    if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      if(msg) msg.innerHTML='<span style="color:#e53e3e">Geçerli bir e-posta girin</span>';
      return;
    }
    btn.disabled=true;btn.textContent='...';if(msg) msg.innerHTML='';
    var prevPage=window.location.hash||'';
    _closeSidebar();
    if(typeof Ecwid==='undefined'||!Ecwid.openPage){
      btn.disabled=false;btn.textContent='Gönder';
      if(msg) msg.innerHTML='<span style="color:#e53e3e">Ecwid yüklenemedi</span>';
      return;
    }
    Ecwid.openPage('account');
    var attempts=0;
    var waitForForm=setInterval(function(){
      attempts++;
      var ecInp=document.querySelector('.ec-cart-email__input input');
      if(ecInp){
        clearInterval(waitForForm);
        var ns=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
        ns.call(ecInp,email);
        ecInp.dispatchEvent(new Event('input',{bubbles:true}));
        ecInp.dispatchEvent(new Event('change',{bubbles:true}));
        setTimeout(function(){
          var ecBtn=document.querySelector('button.form-control__button');
          if(ecBtn){
            ecBtn.click();
            setTimeout(function(){
              if(prevPage) window.location.hash=prevPage;
              else if(typeof Ecwid!=='undefined'&&Ecwid.openPage) Ecwid.openPage('');
              btn.disabled=false;btn.textContent='Gönder';
              if(msg) msg.innerHTML='<span style="color:#38a169">✓ Giriş bağlantısı gönderildi!</span>';
              setTimeout(function(){if(msg) msg.innerHTML='';},5000);
            },1500);
          }else{
            btn.disabled=false;btn.textContent='Gönder';
            if(msg) msg.innerHTML='<span style="color:#e53e3e">Hata. Tekrar deneyin.</span>';
          }
        },1000);
      }
      if(attempts>15){
        clearInterval(waitForForm);
        btn.disabled=false;btn.textContent='Gönder';
        if(msg) msg.innerHTML='<span style="color:#e53e3e">Bağlantı kurulamadı</span>';
      }
    },500);
  }
  _updateSbUser(); // Default: login form
  // Ecwid.Customer.get — doğrudan müşteri bilgisi çek (HEMEN + retry)
  // Gerçek yapı: c.name=undefined, c.billingPerson.name="Manhattan Likit", c.membership.name="Silver"
  // İsim önceliği: _mlCache (loyalty) → bp.firstName → c.name → bp.name (son çare, iş adı olabilir)
  function _fetchCustomer(){
    if(typeof Ecwid==='undefined'||!Ecwid.Customer) return;
    try{
      Ecwid.Customer.get(function(c){
        if(c && c.email){
          var bp=c.billingPerson||{};
          var tier=(c.membership&&c.membership.name)?c.membership.name:'';
          // İsim: widget cache > Ecwid firstName > Ecwid name > billing name
          var firstName='';
          if(window._mlCache && window._mlCache.name) firstName=window._mlCache.name.split(' ')[0];
          if(!firstName && bp.firstName) firstName=bp.firstName.split(' ')[0];
          if(!firstName && c.name) firstName=c.name.split(' ')[0];
          if(!firstName && bp.name) firstName=bp.name.split(' ')[0];
          if(!tier && window._mlCache && window._mlCache.tier) tier=window._mlCache.tier;
          if(firstName) _updateSbUser(firstName,tier);
        }
      });
    }catch(e){}
  }
  _fetchCustomer(); // Hemen dene
  setTimeout(_fetchCustomer,1500); // Ecwid geç yüklenebilir
  setTimeout(_fetchCustomer,4000); // Son deneme

  // ─ Navigation Helpers ─
  // Mağaza anasayfasına git — "Şimdi alışveriş yap" ile birebir aynı davranış
  // Cover button: .cover__cta > .content > BUTTON (onclick=YES, Ecwid native handler)
  // navH-aware scroll — scrollToTile yerine (proxy zaten navH çıkarır)
  function _scrollToSection(selector){
    var el=document.querySelector(selector);
    if(!el) return false;
    var top=el.getBoundingClientRect().top+window.scrollY;
    window.scrollTo({top:top,left:0,behavior:'smooth'});
    return true;
  }

  function _goStore(){
    // Zaten anasayfadaysa → içeriğe scroll
    var content=document.querySelector('.ec-store__content-wrapper,.grid-category,.grid-product');
    if(content){
      var top=content.getBoundingClientRect().top+window.scrollY;
      window.scrollTo({top:top,left:0,behavior:'smooth'});
      return;
    }
    // Başka sayfadaysa → navigasyon
    if(typeof Ecwid!=='undefined'&&typeof Ecwid.openPage==='function'){
      Ecwid.openPage('category');return;
    }
    var coverBtn=document.querySelector('.cover button');
    if(coverBtn){coverBtn.click();}
  }

  // Ecwid SPA navigation helper — Ecwid'in kendi <a> elementini tıklar, sayfa yenilenmez
  // Gerçek DOM: a[href="/account"] parent=ec-footer__cell, listeners=click
  function _ecNav(path){
    var link=document.querySelector('.ec-footer__cell a[href="'+path+'"], a[href="'+path+'"]');
    if(link){link.click();return;}
    // Fallback: Ecwid API
    if(path==='/cart' && typeof Ecwid!=='undefined' && Ecwid.openPage){Ecwid.openPage('cart');return;}
    // Son çare: hash (SPA-friendly)
    window.location.hash='#!/~'+path;
  }

  _sidebar.appendChild(sbHead);
  _sidebar.appendChild(sbUser);
  _sidebar.appendChild(catSection);
  _sidebar.appendChild(_catContainer);
  _sidebar.appendChild(navSection);

  // ─ Scroll indicator (bottom fade when content overflows) ─
  var scrollHint=document.createElement('div');
  scrollHint.className='ml-sb-scroll-hint';
  scrollHint.style.opacity='0';
  _sidebar.appendChild(scrollHint);
  function _checkScroll(){
    var atBottom=(_sidebar.scrollHeight-_sidebar.scrollTop-_sidebar.clientHeight)<20;
    scrollHint.style.opacity=atBottom?'0':'1';
  }
  _sidebar.addEventListener('scroll',_checkScroll,{passive:true});
  // Check on sidebar open
  // (merged observer — also used for renderRecent below)

  // ─ Overlay ─
  _sbOverlay=document.createElement('div');
  _sbOverlay.className='ml-sb-overlay';
  // Block background scroll on touch (iOS)
  _sbOverlay.addEventListener('touchmove',function(e){e.preventDefault();},{passive:false});
  _sbOverlay.addEventListener('click',function(e){
    var cx=e.clientX,cy=e.clientY;
    _closeSidebar();
    // Pass click through to element underneath (dark mode toggle etc.)
    requestAnimationFrame(function(){
      var el=document.elementFromPoint(cx,cy);
      if(el&&el!==_sbOverlay) el.click();
    });
  });

  // ─ DOM'a ekle ─
  // Topbar + Motto: body'nin en başına
  document.body.insertBefore(motto,document.body.firstChild);
  document.body.insertBefore(topbar,document.body.firstChild);
  document.body.appendChild(_sidebar);
  document.body.appendChild(_sbOverlay);

  // ─ Swipe-to-close (sola kaydır → sidebar kapanır) ─
  (function(){
    var startX=0,startY=0,swiping=false;
    _sidebar.addEventListener('touchstart',function(e){
      var t=e.touches[0];
      startX=t.clientX;startY=t.clientY;swiping=true;
    },{passive:true});
    _sidebar.addEventListener('touchmove',function(e){
      if(!swiping) return;
      var dx=e.touches[0].clientX-startX;
      var dy=Math.abs(e.touches[0].clientY-startY);
      // Yatay hareket dikey harekkten büyükse swipe
      if(dx<-20 && dy<Math.abs(dx)){
        _sidebar.style.transform='translateX('+dx+'px)';
        _sidebar.style.transition='none';
      }
    },{passive:true});
    function _endSwipe(e){
      if(!swiping) return;
      swiping=false;
      var dx=(e.changedTouches?e.changedTouches[0].clientX:0)-startX;
      _sidebar.style.transition='';
      _sidebar.style.transform='';
      if(dx<-60) _closeSidebar();
    }
    _sidebar.addEventListener('touchend',_endSwipe,{passive:true});
    _sidebar.addEventListener('touchcancel',_endSwipe,{passive:true});
  })();

  // ─ Sol kenardan swipe → sidebar aç ─
  (function(){
    var edgeX=0,edgeY=0,edgeActive=false;
    document.addEventListener('touchstart',function(e){
      if(_sidebar.classList.contains('open')) return;
      var t=e.touches[0];
      if(t.clientX<25){edgeX=t.clientX;edgeY=t.clientY;edgeActive=true;}
      else{edgeActive=false;}
    },{passive:true});
    document.addEventListener('touchmove',function(e){
      if(!edgeActive) return;
      var dx=e.touches[0].clientX-edgeX;
      var dy=Math.abs(e.touches[0].clientY-edgeY);
      if(dx>60&&dy<dx){edgeActive=false;_toggleSidebar();}
    },{passive:true});
    document.addEventListener('touchend',function(){edgeActive=false;},{passive:true});
  })();

  // ─ Son görüntülenen ürünler ─
  var _recentSection=document.createElement('div');
  _recentSection.className='ml-sb-recent';
  _recentSection.style.display='none';
  _recentSection.innerHTML='<div class="ml-sb-recent-title">Son Görüntülenen</div><div class="ml-sb-recent-list" id="ml-recent-list"></div>';
  // Kategoriler ile nav-bottom arasına ekle
  _catContainer.parentNode.insertBefore(_recentSection,navSection);

  function _trackRecentProduct(p){
    try{
      var key='ml-recent-v1';
      var list=JSON.parse(sessionStorage.getItem(key)||'[]');
      // Duplicate kaldır
      list=list.filter(function(x){return x.id!==p.id;});
      list.unshift(p);
      if(list.length>8) list=list.slice(0,8);
      sessionStorage.setItem(key,JSON.stringify(list));
    }catch(e){}
  }
  function _renderRecent(){
    try{
      var list=JSON.parse(sessionStorage.getItem('ml-recent-v1')||'[]');
      if(list.length===0){_recentSection.style.display='none';return;}
      _recentSection.style.display='';
      var container=document.getElementById('ml-recent-list');
      if(!container) return;
      container.innerHTML='';
      list.slice(0,6).forEach(function(p){
        var el=document.createElement('div');
        el.className='ml-sb-ritem';
        el.innerHTML='<img src="'+p.img+'" alt="'+p.name+'" loading="eager" decoding="async"><span>'+p.name+'</span>';
        el.addEventListener('click',function(e){
          e.stopPropagation();
          _closeSidebar();
          if(typeof Ecwid!=='undefined'&&Ecwid.openPage){
            Ecwid.openPage('product',{id:p.id});
          }
        });
        container.appendChild(el);
      });
    }catch(e){}
  }
  // Ecwid ürün sayfası açıldığında track et — OnAPILoaded wrapper for reliability
  function _setupProductTracking(){
    if(typeof Ecwid==='undefined') return;
    function _addTracker(){
      if(!Ecwid.OnPageLoaded) return;
      Ecwid.OnPageLoaded.add(function(page){
        if(page.type==='PRODUCT'&&page.productId){
          // Ecwid Cart API ile ürün bilgisi al (DOM'dan daha güvenilir, mobilde img yüklenmiyor)
          if(typeof Ecwid.Cart!=='undefined'&&Ecwid.Cart.get){
            setTimeout(function(){
              var nameEl=document.querySelector('.product-details__product-title, h1.ec-header-h3, .product-details__product-title--on-one-column');
              var pName=nameEl?(nameEl.textContent||'').trim().substring(0,30):'';
              // Önce DOM'dan img dene
              var imgEl=document.querySelector('.product-details__gallery img[src], .details-gallery__photo img[src], .product-details-module__gallery img[src]');
              var imgUrl=imgEl?(imgEl.currentSrc||imgEl.src||''):'';
              // Fallback: og:image meta tag (her zaman dolu)
              if(!imgUrl||imgUrl.indexOf('data:')===0){
                var ogImg=document.querySelector('meta[property="og:image"]');
                if(ogImg) imgUrl=ogImg.getAttribute('content')||'';
              }
              // Fallback 2: herhangi bir product-details img
              if(!imgUrl||imgUrl.indexOf('data:')===0){
                var anyImg=document.querySelector('.product-details img[src*="images-"]');
                if(anyImg) imgUrl=anyImg.currentSrc||anyImg.src||'';
              }
              if(pName&&imgUrl){
                _trackRecentProduct({id:page.productId,name:pName,img:imgUrl});
              }
            },1200);
          }
        }
      });
    }
    if(Ecwid.OnAPILoaded){
      Ecwid.OnAPILoaded.add(_addTracker);
    } else {
      _addTracker();
    }
  }
  _setupProductTracking();
  // Retry: Ecwid çok geç yüklenebilir
  setTimeout(_setupProductTracking,3000);
  setTimeout(_setupProductTracking,6000);
  // Sidebar açıldığında: son görüntülenen render + scroll hint + auto-refresh
  new MutationObserver(function(muts){
    if(_sidebar.classList.contains('open')){
      _renderRecent();
      setTimeout(_checkScroll,150);
      // Auto-refresh: greeting + cart count
      try{
        var pName=_sidebar.querySelector('.ml-sb-profile-name');
        if(pName){
          var _h2=new Date().getHours();
          var _g2=_h2<6?'İyi geceler':_h2<12?'Günaydın':_h2<18?'İyi günler':'İyi akşamlar';
          var txt=pName.textContent;
          var comma=txt.indexOf(',');
          if(comma>-1) pName.textContent=_g2+txt.substring(comma);
        }
      }catch(e3){}
      try{
        if(typeof Ecwid!=='undefined'&&Ecwid.Cart&&Ecwid.Cart.get){
          Ecwid.Cart.get(function(cart){
            var cnt=cart&&cart.items?cart.items.length:0;
            var badge=_sidebar.querySelector('.ml-sb-qa-count');
            if(badge){
              badge.textContent=cnt;
              badge.style.display=cnt>0?'inline-flex':'none';
              badge.classList.remove('pulse');
              void badge.offsetWidth;
              badge.classList.add('pulse');
            }
          });
        }
      }catch(e4){}
    }
  }).observe(_sidebar,{attributes:true,attributeFilter:['class']});

  // ─ Keyboard: Esc → close sidebar ─
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&_sidebar&&_sidebar.classList.contains('open')){
      e.preventDefault();_closeSidebar();
    }
  });

  // ─ Price modifier hide: seçeneklerdeki (+₺30) gibi ek tutar yazılarını gizle ─
  (function _hidePriceModifiers(){
    var MODIFIER_RE=/\s*\(\s*[+\-][₺$€£]\s*[\d,.]+\s*\)/g;
    var MODIFIER_RE2=/\s*[+\-]\s*₺\s*[\d,.]+/g;
    // CSS: hide known Ecwid price modifier elements
    var modCSS=document.createElement('style');
    modCSS.textContent=
      '.product-details__product-option .form-control__inline-label .details-product-option__modifier,'+
      '.product-details__product-option .details-product-option__modifier,'+
      '[class*="product-option"] [class*="modifier"],'+
      '[class*="product-option"] [class*="surcharge"],'+
      '.form-control__radio-wrap .details-product-option__modifier{'+
        'display:none!important;visibility:hidden!important;font-size:0!important'+
      '}';
    document.head.appendChild(modCSS);
    // JS: clean modifier text from select options and button labels
    function _cleanModifiers(root){
      if(!root) root=document;
      // Clean select option text
      var opts=root.querySelectorAll('[class*="product-option"] option, .details-product-option select option');
      for(var i=0;i<opts.length;i++){
        var t=opts[i].textContent;
        if(MODIFIER_RE.test(t)||MODIFIER_RE2.test(t)){
          opts[i].textContent=t.replace(MODIFIER_RE,'').replace(MODIFIER_RE2,'').trim();
        }
      }
      // Clean button/radio/size label text
      var labels=root.querySelectorAll('[class*="product-option"] label, [class*="product-option"] .form-control__inline-label, [class*="product-option"] [class*="title"]');
      for(var j=0;j<labels.length;j++){
        // Only clean text nodes, preserve child elements
        var nodes=labels[j].childNodes;
        for(var k=0;k<nodes.length;k++){
          if(nodes[k].nodeType===3){
            var nt=nodes[k].textContent;
            if(MODIFIER_RE.test(nt)||MODIFIER_RE2.test(nt)){
              nodes[k].textContent=nt.replace(MODIFIER_RE,'').replace(MODIFIER_RE2,'').trim();
            }
          }
        }
      }
    }
    // Run on page load + observe for SPA navigation
    if(typeof Ecwid!=='undefined'&&Ecwid.OnPageLoaded){
      Ecwid.OnPageLoaded.add(function(){setTimeout(_cleanModifiers,500);setTimeout(_cleanModifiers,1500);});
    }
    // MutationObserver for dynamic option rendering
    var modObs=new MutationObserver(function(muts){
      for(var m=0;m<muts.length;m++){
        if(muts[m].addedNodes.length>0){
          _cleanModifiers();return;
        }
      }
    });
    var ecStore=document.querySelector('.ecwid-productBrowser')||document.querySelector('[class*="ec-store"]');
    if(ecStore) modObs.observe(ecStore,{childList:true,subtree:true});
    else setTimeout(function(){
      ecStore=document.querySelector('.ecwid-productBrowser')||document.querySelector('[class*="ec-store"]');
      if(ecStore) modObs.observe(ecStore,{childList:true,subtree:true});
    },3000);
  })();

  // ─ Badge pulse: sepet sayısı değişince gold pulse ─
  (function(){
    var cartEl=document.querySelector('.ec-minicart__counter');
    if(!cartEl) return;
    var lastCount=cartEl.textContent.trim();
    new MutationObserver(function(){
      var c=cartEl.textContent.trim();
      if(c!==lastCount&&parseInt(c)>0){
        lastCount=c;
        // Sidebar içindeki badge'i güncelle + pulse
        var badge=_sidebar.querySelector('.ml-sb-qa-count');
        if(badge){
          badge.textContent=c;
          badge.classList.remove('pulse');
          void badge.offsetWidth; // reflow
          badge.classList.add('pulse');
        }
      }
    }).observe(cartEl,{childList:true,characterData:true,subtree:true});
  })();

  // Kategorileri parse et ÖNCE — nav gizlenmeden
  _parseCats();

  // Ecwid default nav'ı gizle
  document.body.classList.add('ml-nav');

  // Dinamik offset hesapla — hemen + rAF + retry
  function _calcOffset(){
    var tbH=topbar.offsetHeight||46;
    var mtH=motto.offsetHeight||40;
    var GAP=0; // Topbar+motto birleşik (tek cam)
    motto.style.top=(tbH+GAP)+'px';
    var total=tbH+GAP+mtH;
    document.body.style.paddingTop=total+'px';
    // CSS variable for float-icons top (CSS !important ile Ecwid override)
    document.documentElement.style.setProperty('--ml-nav-h',(total+8)+'px');
    // Light mode: body bg gradient'in peach tonuna eşitle (Liquid Glass efekti)
    if(!document.body.classList.contains('ml-dark')){
      document.body.style.backgroundColor='#ffbd92';
    }
    // Store elementinin beyaz bg'sini temizle
    document.querySelectorAll('.store.dynamic-product-browser').forEach(function(el){
      el.style.setProperty('background','transparent','important');
    });
  }
  _calcOffset(); // Hemen
  requestAnimationFrame(_calcOffset); // Paint sonrası
  setTimeout(_calcOffset,500); // Gecikmeli retry

  // Topbar scroll shadow
  var _lastScroll=0;
  window.addEventListener('scroll',function(){
    var y=window.scrollY;
    if(y>10 && _lastScroll<=10) topbar.classList.add('ml-scrolled');
    else if(y<=10 && _lastScroll>10) topbar.classList.remove('ml-scrolled');
    _lastScroll=y;
  },{passive:true});

  // Gecikmeli retry (Ecwid geç yükleyebilir)
  setTimeout(_parseCats,2000);
  setTimeout(_parseCats,5000);

  // Ecwid sayfa değişiminde: aktif kategori highlight + fade transition
  if(typeof Ecwid!=='undefined' && Ecwid.OnPageLoaded){
    Ecwid.OnPageLoaded.add(function(page){
      // Fade-in micro animation (double RAF = browser opacity:0'ı boyar sonra 1'e geçer)
      var store=document.querySelector('.ec-store,.store');
      if(store){
        store.style.opacity='0';
        store.style.transition='opacity .2s ease';
        requestAnimationFrame(function(){requestAnimationFrame(function(){store.style.opacity='1';});});
        setTimeout(function(){store.style.removeProperty('transition');store.style.removeProperty('opacity');},400);
      }
      // Aktif kategori highlight
      if(_catContainer){
        _catContainer.querySelectorAll('.ml-sb-item').forEach(function(item){
          item.classList.remove('active');
          if(page.type==='CATEGORY' && page.categoryId){
            var href=item._catHref||'';
            if(href.indexOf('-c'+page.categoryId)>-1) item.classList.add('active');
          }
        });
      }
      // Store bg enforcement (sayfa değişiminde Ecwid sıfırlayabilir)
      document.querySelectorAll('.store.dynamic-product-browser').forEach(function(el){
        el.style.setProperty('background','transparent','important');
      });
      // CATEGORY: Ecwid smooth scroll animasyonu bitmesini bekle, sonra navH offset düzelt
      if(page.type==='CATEGORY'){
        var _lastY=-1,_settled=0,_catTimer=setInterval(function(){
          var y=window.scrollY;
          if(y===_lastY){_settled++;}else{_settled=0;}
          _lastY=y;
          if(_settled>=3&&y>10){
            clearInterval(_catTimer);
            var tb=document.querySelector('.ml-topbar');
            var mt=document.querySelector('.ml-motto');
            var navH=(tb?tb.offsetHeight:0)+(mt?mt.offsetHeight:0);
            // Sadece content topbar arkasındaysa düzelt (proxy zaten çıkarmış olabilir)
            var firstContent=document.querySelector('.ec-store__content-wrapper,.grid,.ec-pager,.breadcrumbs');
            if(firstContent){
              var rect=firstContent.getBoundingClientRect();
              if(rect.top<navH-5){
                window.scrollBy({top:rect.top-navH-8,behavior:'auto'});
              }
            }
          }
          if(_settled>50)clearInterval(_catTimer);
        },100);
      }
      // PRODUCT: Ürün sayfasında başlık topbar altında kalmasın
      if(page.type==='PRODUCT'){
        var _pLastY=-1,_pSettled=0,_pTimer=setInterval(function(){
          var y=window.scrollY;
          if(y===_pLastY){_pSettled++;}else{_pSettled=0;}
          _pLastY=y;
          if(_pSettled>=3){
            clearInterval(_pTimer);
            var tb=document.querySelector('.ml-topbar');
            var mt=document.querySelector('.ml-motto');
            var navH=(tb?tb.offsetHeight:0)+(mt?mt.offsetHeight:0);
            // Ürün başlığını bul ve topbar altında kalıp kalmadığını kontrol et
            var titleEl=document.querySelector('.product-details__product-title, h1.ec-header-h3, .product-details__product-title--on-one-column');
            if(titleEl){
              var titleTop=titleEl.getBoundingClientRect().top;
              if(titleTop<navH+10){
                window._mlScrollBypass=true;
                window.scrollBy({top:titleTop-navH-16,behavior:'auto'});
                window._mlScrollBypass=false;
              }
            }
          }
          if(_pSettled>50)clearInterval(_pTimer);
        },100);
      }
    });
  }
}

// ─── SAYFA HAZIR OLUNCA EKLE ───
function init(){
  // Yeni navbar sistemi oluştur
  _buildNavbar();
  // SPA scroll fix — Ecwid scrollTo topbar yüksekliğini bilmiyor, offset çıkar
  // scrollTo(0,0) geçer, diğer tüm scroll'larda navH çıkarılır
  (function(){
    var _realScrollTo=window.scrollTo.bind(window);
    function _navH(){
      var tb=document.querySelector('.ml-topbar');
      var mt=document.querySelector('.ml-motto');
      return (tb?tb.offsetHeight:0)+(mt?mt.offsetHeight:0);
    }
    window.scrollTo=function(){
      var a=arguments,opts=a[0],x,y,beh;
      if(opts&&typeof opts==='object'){x=opts.left;y=opts.top;beh=opts.behavior;}
      else{x=a[0];y=a[1];}
      if(window._mlScrollBypass){_realScrollTo.apply(window,a);return;}
      var h=_navH();
      // y=0 veya y<=navH → en tepeye git, çıkarma (içerik zaten paddingTop ile aşağıda)
      if(typeof y==='number'&&y>h&&h>0){_realScrollTo({top:y-h,left:x||0,behavior:beh||'auto'});return;}
      _realScrollTo.apply(window,a);
    };
    window.scroll=window.scrollTo;
  })();
  // Kayıtlı tercihi yükle
  try{
    var savedPref=localStorage.getItem('ml-dark');
    if(savedPref==='1'){
      document.body.classList.add('ml-dark');
      document.documentElement.style.setProperty('background','#1b1a17','important');
      document.body.style.backgroundColor='#1b1a17';
      btn.innerHTML=moonOn;
    }else if(savedPref===null && window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches){
      // İlk ziyaret + sistem dark → otomatik aç
      document.body.classList.add('ml-dark');
      document.documentElement.style.setProperty('background','#1b1a17','important');
      document.body.style.backgroundColor='#1b1a17';
      btn.innerHTML=moonOn;
      try{localStorage.setItem('ml-dark','1');}catch(e2){}
    }else{
      document.documentElement.style.setProperty('background','#ffbd92','important');
      document.body.style.backgroundColor='#ffbd92';
    }
  }catch(e){}
  // Ecwid-proof düzeltmeleri uygula + observer başlat
  fixAll();
  setTimeout(fixAll,1000); // Ecwid geç yükleme için
  setTimeout(fixAll,3000); // Ürün sayfası geç render için
  // Observer'ı başlat
  _observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
}

// ═══════════════════════════════════════════════════════
// ECWID-PROOF JS ENFORCEMENT LAYER
// CSS'e güvenme — inline style + DOM injection
// Ecwid ne yaparsa yapsın, bu her seferinde düzeltir
// ═══════════════════════════════════════════════════════

var _fixTimer=null;
var _fixRAF=null;
var _lastFixTime=0;
function fixAll(){
  // Debounce — Ecwid çok sık DOM değiştirir
  clearTimeout(_fixTimer);
  if(_fixRAF) cancelAnimationFrame(_fixRAF);
  _fixTimer=setTimeout(function(){
    var now=Date.now();
    // fixAll kendi style yazımından tetiklenen observer'ı yoksay (150ms guard)
    if(now-_lastFixTime<150) return;
    _fixRAF=requestAnimationFrame(function(){
      _lastFixTime=Date.now();
      _fixAllNow();
    });
  },80);
}
function _fixAllNow(){
  var dark=document.body.classList.contains('ml-dark');
  fixStokYok();
  fixLabels(); // Türkçe çeviri + sepet img radius (dark guard içeride)
  if(dark){
    // Store bg şeffaf yap — Ecwid inline style override (SADECE dark mode)
    document.querySelectorAll('.store.dynamic-product-browser').forEach(function(el){
      _m(el);
      if(el.style.backgroundColor||getComputedStyle(el).backgroundColor==='rgb(255, 255, 255)'){
        el.style.setProperty('background','transparent','important');
      }
    });
    fixSelects();
    fixSweep();
    fixButtonText();
    fixBadgeRect();
    fixFloatingIcons();
  }else{
    cleanAll();
  }
}

// ─── TEMİZLİK (light mode'a dönünce) ───
function cleanAll(){
  // ═══ KATMAN 1: NÜKLEER RESTORE — marker'lı elementleri orijinale döndür ═══
  document.querySelectorAll('[data-ml-dk]').forEach(function(el){
    var orig=el.getAttribute('data-ml-dk');
    if(orig){
      el.setAttribute('style',orig);
    }else{
      el.removeAttribute('style');
    }
    el.removeAttribute('data-ml-dk');
    delete el._mlHoverActive;
  });
  cleanStokYok();

  // ═══ KATMAN 2: KAPSAMLI TARAMA — marker'sız elementlerdeki dark mode kalıntıları ═══
  // Dark mode hex imzaları (JS inline style'larda kullanılan değerler)
  var _dkSig=/1b1a17|23221e|2c2b26|2d2b27|8b3a3a|ece8df|e8e0d0|c8c0b0|b5b0a4|af8c3e|d4b05e|rgba?\(27,\s*26|rgba?\(35,\s*34|rgba?\(44,\s*43|rgba?\(45,\s*43|rgba?\(139,\s*58|rgba?\(236,\s*232|rgba?\(232,\s*224|rgba?\(200,\s*192|rgba?\(181,\s*176|rgba?\(175,\s*140|rgba?\(212,\s*176/i;
  // Temizlenecek CSS property listesi
  var _dkProps=['color','background','background-color','border-color','border-bottom-color',
    'border-left-color','border','box-shadow','outline','outline-offset','accent-color','fill'];

  // Ecwid store + cart + checkout + sayfa gövdesi + hakkında — tüm inline style'lı elementler
  // NOT: [style] selector parent'ın kendisini de yakalar (boşluksuz .class[style])
  document.querySelectorAll('[style]').forEach(function(el){
    var css=el.style.cssText;
    if(!css||!_dkSig.test(css)) return;
    // Sidebar/topbar/navbar elementlerine DOKUNMA
    var cn=typeof el.className==='string'?el.className:'';
    if(cn.indexOf('ml-sb')>-1||cn.indexOf('ml-topbar')>-1||cn.indexOf('ml-motto')>-1||cn.indexOf('ml-brand')>-1||cn.indexOf('ml-nav')>-1) return;
    // Dark mode imzası bulunan elementlerden renk property'lerini sil
    _dkProps.forEach(function(p){el.style.removeProperty(p);});
    // Style tamamen boşaldıysa attribute'u kaldır
    if(!el.style.cssText.trim()) el.removeAttribute('style');
  });

  // ═══ KATMAN 3: SPESIFIK TEMİZLİK — DOM injection + class kalıntıları ═══
  // Store bg — dark mode'un transparent override'ını kaldır
  document.querySelectorAll('.store.dynamic-product-browser').forEach(function(el){
    el.style.removeProperty('background');
  });
  // Sweep overlay'ları kaldır (DOM inject, marker'sız)
  document.querySelectorAll('.ml-sweep').forEach(function(el){el.remove();});
  // ml-rg-fix class temizle (radiogroup pseudo çizgi fix)
  document.querySelectorAll('.ml-rg-fix').forEach(function(el){el.classList.remove('ml-rg-fix');});
  // .D class kaldır (SALT ürünler)
  document.querySelectorAll('.product-details__description .D').forEach(function(d){d.classList.remove('D');});

  // ═══ KATMAN 4: GENIŞ NET — imzasız ama dark mode'dan kalan transparent bg'ler ═══
  document.querySelectorAll('.float-icons [style], .float-icons__wrap [style]').forEach(function(el){
    ['background','background-color','border','box-shadow','color','fill'].forEach(function(p){el.style.removeProperty(p);});
  });
  document.querySelectorAll('.float-icons__wrap svg[style]').forEach(function(s){
    s.style.removeProperty('color');s.style.removeProperty('fill');
  });
}

// ═══ MARKER SİSTEMİ ═══
// Dark mode bir element'e inline style koymadan önce orijinal style'ını kaydeder.
// cleanAll() marker'lı tüm elementleri orijinal haline döndürür.
function _m(el){
  if(!el||el.hasAttribute('data-ml-dk')) return;
  el.setAttribute('data-ml-dk',el.getAttribute('style')||'');
}

// ─── STOKTA YOK — INLINE STYLE TEMİZLİĞİ ───
function cleanStokYok(){
  document.querySelectorAll('[class*="Stokta-Yok"],[class*="Stokta-yok"],[class*="stokta-yok"]').forEach(function(l){
    l.style.removeProperty('background');l.style.removeProperty('background-color');l.style.removeProperty('color');
    l.querySelectorAll('.ec-label,[class*="label--"],.label__text').forEach(function(el){
      el.style.removeProperty('background');el.style.removeProperty('background-color');el.style.removeProperty('color');
    });
  });
  // Store bg cleanup (dark mode'da transparent yapılmış olabilir)
  document.querySelectorAll('.store.dynamic-product-browser').forEach(function(el){
    el.style.removeProperty('background');
  });
}

// ─── STOKTA YOK LABEL ───
function fixStokYok(){
  if(!document.body.classList.contains('ml-dark')){cleanStokYok();return;}
  document.querySelectorAll('[class*="Stokta-Yok"],[class*="Stokta-yok"],[class*="stokta-yok"]').forEach(function(l){
    _m(l);
    l.style.setProperty('background','#8b3a3a','important');
    l.style.setProperty('background-color','#8b3a3a','important');
    l.style.setProperty('color','#fff','important');
    l.querySelectorAll('.ec-label,[class*="label--"],.label__text').forEach(function(el){
      _m(el);
      el.style.setProperty('background','#8b3a3a','important');
      el.style.setProperty('background-color','#8b3a3a','important');
      el.style.setProperty('color','#fff','important');
    });
  });
}

// ─── SELECT WRAPPER POSITION ───
// CSS placeholder kuralları .form-control--empty class'ına bağlı (Ecwid otomatik toggle eder)
// JS sadece wrapper'ın position:relative olduğundan emin olur
function fixSelects(){
  if(!document.body.classList.contains('ml-dark')) return;
  // Ecwid placeholder'ı gizliyorsa zorla göster
  document.querySelectorAll('.form-control--empty .form-control__placeholder').forEach(function(el){
    _m(el);
    el.style.setProperty('opacity','1','important');
    el.style.setProperty('visibility','visible','important');
  });
}

// ─── SWEEP + HOVER — JS EVENT LISTENER ───
// Ecwid inline style koyuyor → CSS hover eziliyor
// Tek çözüm: mouseenter/mouseleave ile inline style yönet
// ═══════════════════════════════════════════════════════
// UNIVERSAL SWEEP SYSTEM
// Tek fonksiyon, tüm gold butonlara sweep + hover
// ═══════════════════════════════════════════════════════
var _sweepCSS='position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);animation:mlsweep 3s ease-in-out infinite;pointer-events:none;z-index:1;border-radius:inherit;';

function _injectSweep(el){
  if(!el||el.querySelector('.ml-sweep')) return;
  _m(el);
  el.style.setProperty('position','relative','important');
  el.style.setProperty('overflow','hidden','important');
  var sw=document.createElement('div');
  sw.className='ml-sweep';
  sw.style.cssText=_sweepCSS;
  el.appendChild(sw);
}

function _bindHover(el,sweepTarget){
  if(!el||el._mlHover) return;
  el._mlHover=true;
  var target=sweepTarget||el;
  el.addEventListener('mouseenter',function(){
    if(!document.body.classList.contains('ml-dark')) return;
    el.style.setProperty('background','#af8c3e','important');
    el.style.setProperty('transform','scale(.97)','important');
    el.style.setProperty('box-shadow','0 2px 12px rgba(175,140,62,.3)','important');
    var s=target.querySelector('.ml-sweep');if(s)s.style.animationPlayState='paused';
  });
  el.addEventListener('mouseleave',function(){
    if(!document.body.classList.contains('ml-dark')) return;
    el.style.setProperty('background','linear-gradient(135deg,#af8c3e,#d4b05e)','important');
    el.style.removeProperty('transform');
    el.style.removeProperty('box-shadow');
    var s=target.querySelector('.ml-sweep');if(s)s.style.animationPlayState='running';
  });
}

function fixSweep(){
  if(!document.body.classList.contains('ml-dark')) return;

  // ═══ 1) TÜM PRIMARY BUTONLAR (Sepete Ekle, Devam Et, Checkout, vb.) ═══
  document.querySelectorAll('.form-control--primary').forEach(function(wrapper){
    _m(wrapper);
    wrapper.style.setProperty('background','linear-gradient(135deg,#af8c3e,#d4b05e)','important');
    wrapper.style.setProperty('border-radius','10px','important');
    wrapper.style.setProperty('border','none','important');
    _injectSweep(wrapper);
    var btn=wrapper.querySelector('.form-control__button');
    if(btn){_m(btn);_bindHover(btn,wrapper);}
  });

  // ═══ 2) COVER BUTONLAR (Anasayfa CTA — "Alışverişe Devam Et") ═══
  // CSS body.ml-dark .cover__button kuralları yeterli — sadece sweep inject
  document.querySelectorAll('.cover__button,.cover-button').forEach(function(el){
    _m(el);
    _injectSweep(el);
  });

  // ═══ 3) OPSİYON BUTONLARI (Boyut, Sertlik) ═══
  document.querySelectorAll('.form-control--checkbox-button').forEach(function(cb){
    var inp=cb.querySelector('.form-control__radio');
    var lbl=cb.querySelector('.form-control__inline-label');
    if(!inp||!lbl) return;
    _m(lbl);
    // Hover aktifken DOKUNMA — observer fixAll tetiklese bile hover state korunsun
    if(lbl._mlHoverActive) return;
    var innerLbl=lbl.querySelector('label');
    if(innerLbl) _m(innerLbl);

    // Ortak — BORDER YOK, box-shadow ile çerçeve (tırtık önleme: layout shift yok)
    lbl.style.setProperty('border','none','important');
    lbl.style.setProperty('border-radius','10px','important');
    lbl.style.setProperty('transition','background .2s ease,color .2s ease,box-shadow .2s ease,transform .15s ease','important');
    lbl.style.setProperty('cursor','pointer','important');

    if(inp.checked){
      // ── SEÇİLİ — gold gradient + sweep ──
      lbl.style.setProperty('background','linear-gradient(135deg,#af8c3e,#d4b05e)','important');
      lbl.style.setProperty('color','#fff','important');
      lbl.style.setProperty('font-weight','700','important');
      lbl.style.setProperty('box-shadow','0 0 0 1.5px #af8c3e, 0 2px 8px rgba(175,140,62,.25)','important');
      lbl.style.setProperty('position','relative','important');
      lbl.style.setProperty('overflow','hidden','important');
      if(innerLbl){innerLbl.style.setProperty('color','#fff','important');innerLbl.style.setProperty('background','transparent','important');innerLbl.style.setProperty('border','none','important');}
      _injectSweep(lbl);
    }else{
      // ── SEÇİLİ DEĞİL — koyu, sweep kaldır ──
      var old=lbl.querySelector('.ml-sweep');if(old)old.remove();
      lbl.style.setProperty('background','#2c2b26','important');
      lbl.style.setProperty('color','#ece8df','important');
      lbl.style.setProperty('font-weight','600','important');
      lbl.style.setProperty('box-shadow','0 0 0 1px rgba(175,140,62,.15)','important');
      if(innerLbl){innerLbl.style.setProperty('color','#ece8df','important');innerLbl.style.setProperty('background','transparent','important');innerLbl.style.setProperty('border','none','important');}
    }

    // Hover — sadece 1 kere
    if(!lbl._mlHover){
      lbl._mlHover=true;
      lbl.addEventListener('mouseenter',function(){
        if(!document.body.classList.contains('ml-dark')) return;
        lbl._mlHoverActive=true;
        if(inp.checked){
          // Seçili hover — koyu gold, sweep duraklat
          lbl.style.setProperty('background','#af8c3e','important');
          lbl.style.setProperty('transform','scale(.97)','important');
          lbl.style.setProperty('box-shadow','0 0 0 1.5px #8a6f32, 0 1px 4px rgba(0,0,0,.3)','important');
          var sw=lbl.querySelector('.ml-sweep');if(sw)sw.style.animationPlayState='paused';
        }else{
          // Seçili değil hover — gold gradient + sweep
          lbl.style.setProperty('background','linear-gradient(135deg,#af8c3e,#d4b05e)','important');
          lbl.style.setProperty('color','#fff','important');
          lbl.style.setProperty('font-weight','700','important');
          lbl.style.setProperty('box-shadow','0 0 0 1.5px #af8c3e, 0 2px 8px rgba(175,140,62,.25)','important');
          lbl.style.setProperty('transform','translateY(-1px)','important');
          lbl.style.setProperty('position','relative','important');
          lbl.style.setProperty('overflow','hidden','important');
          if(innerLbl){innerLbl.style.setProperty('color','#fff','important');innerLbl.style.setProperty('background','transparent','important');innerLbl.style.setProperty('border','none','important');}
          _injectSweep(lbl);
        }
      });
      lbl.addEventListener('mouseleave',function(){
        if(!document.body.classList.contains('ml-dark')) return;
        lbl._mlHoverActive=false;
        lbl.style.removeProperty('transform');
        if(inp.checked){
          // Seçili leave — gradient'e dön, sweep devam
          lbl.style.setProperty('background','linear-gradient(135deg,#af8c3e,#d4b05e)','important');
          lbl.style.setProperty('color','#fff','important');
          lbl.style.setProperty('box-shadow','0 0 0 1.5px #af8c3e, 0 2px 8px rgba(175,140,62,.25)','important');
          if(innerLbl){innerLbl.style.setProperty('color','#fff','important');innerLbl.style.setProperty('border','none','important');}
          var sw=lbl.querySelector('.ml-sweep');if(sw)sw.style.animationPlayState='running';
        }else{
          // Seçili değil leave — sweep kaldır, koyu'ya dön
          var old=lbl.querySelector('.ml-sweep');if(old)old.remove();
          lbl.style.setProperty('background','#2c2b26','important');
          lbl.style.setProperty('color','#ece8df','important');
          lbl.style.setProperty('font-weight','600','important');
          lbl.style.setProperty('box-shadow','0 0 0 1px rgba(175,140,62,.15)','important');
          if(innerLbl){innerLbl.style.setProperty('color','#ece8df','important');innerLbl.style.setProperty('background','transparent','important');innerLbl.style.setProperty('border','none','important');}
        }
      });
    }
  });
}

// ─── BUTON TEXT RENKLERİ ───
// Sadece text rengi — bg inline koymak hover'ı bozar
function fixButtonText(){
  if(!document.body.classList.contains('ml-dark')) return;
  // Marker: tüm hedef elementleri işaretle
  document.querySelectorAll('.form-control--primary .form-control__button,.form-control--primary .form-control__button-text,.form-control--primary .form-control__button-svg,.form-control--primary .form-control__button-svg svg,.form-control--secondary .form-control__button-text').forEach(_m);
  // Primary buton — gold gradient bg + #fff text (Ecwid CSS'i eziyor, inline zorla)
  document.querySelectorAll('.form-control--primary .form-control__button').forEach(function(el){
    el.style.setProperty('background','linear-gradient(135deg,#af8c3e,#d4b05e)','important');
    el.style.setProperty('color','#fff','important');
    el.style.setProperty('border','none','important');
    el.style.setProperty('border-radius','10px','important');
  });
  document.querySelectorAll('.form-control--primary .form-control__button-text').forEach(function(el){
    el.style.setProperty('color','#fff','important');
  });
  document.querySelectorAll('.form-control--primary .form-control__button-svg,.form-control--primary .form-control__button-svg svg').forEach(function(el){
    el.style.setProperty('color','#fff','important');
    el.style.setProperty('fill','#fff','important');
  });
  // Secondary buton text
  document.querySelectorAll('.form-control--secondary .form-control__button-text').forEach(function(el){
    el.style.setProperty('color','#ece8df','important');
  });
}

// ─── STOKTA VAR BADGE DİKDÖRTGEN ───
// ─── TÜRKÇE ETİKETLER + SEPET GÖRSEL RADIUS ───
function fixLabels(){
  // "Recently viewed products" → "Son Görüntülenenler"
  document.querySelectorAll('.ec-related-products__title, [class*="related-products"] h2, [class*="recently"] h2, [class*="recently"] h3, [class*="recently"] [class*="title"], [class*="recently-viewed"] [class*="title"]').forEach(function(el){
    if(el.textContent.trim().match(/recently|viewed/i) && !el._mlFixed){
      el._mlFixed=true;
      el.textContent='Son Görüntülenenler';
    }
  });
  // Genel "Recently viewed" text node'ları — heading + div/span
  document.querySelectorAll('h1,h2,h3,h4,h5,h6,div,span').forEach(function(el){
    var t=el.textContent.trim();
    if((t==='Recently viewed products'||t==='Recently viewed')&& el.children.length===0){
      el.textContent='Son Görüntülenenler';
      el._mlFixed=true;
    }
  });
  // Sepet ürün görseli — border-radius + inline bg override
  if(document.body.classList.contains('ml-dark')){
    // Marker: fixLabels'ın dark modda dokunacağı tüm elementleri işaretle
    document.querySelectorAll('.ec-cart-item img,[class*="cart-item"] img,.ec-cart-item__picture,.ec-cart__products,.ec-cart-step,.ec-cart-step__next,.ec-radiogroup__items,.ec-radiogroup__item,.ec-radiogroup label,.ec-radiogroup input,.ec-filter input,.ec-filter label,.ec-minicart,.store .border,.dynamic-product-browser > .border,.ec-range__slider,.ec-range__runner,.ec-range__track-inner,.ec-range__track-line,.ec-cart-next__header,[class*="ec-cart-next"],.form-control__radio-view,.form-control__radio').forEach(_m);
    document.querySelectorAll('.ec-cart-item img, [class*="cart-item"] img').forEach(function(el){
      el.style.setProperty('border-radius','12px','important');
    });
    // Cart item picture wrapper — Ecwid inline style bg override
    document.querySelectorAll('.ec-cart-item__picture').forEach(function(el){
      el.style.setProperty('background-color','#e8e4da','important');
      el.style.setProperty('border-radius','12px','important');
      el.style.setProperty('overflow','hidden','important');
    });
    // ── CHECKOUT DUYURU KUTULARI — açık renkli inline bg'leri koyu yap ──
    document.querySelectorAll('.ec-cart-step [style*="background"], .ec-cart-step [style*="background-color"]').forEach(function(el){
      if(el.offsetHeight<20) return;
      var cs=getComputedStyle(el);
      var bg=cs.backgroundColor;
      var m=bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
      if(m && +m[1]>180 && +m[2]>180 && +m[3]>180){
        _m(el);
        // Açık renkli bg → koyu gold tint
        el.style.setProperty('background-color','rgba(175,140,62,.08)','important');
        el.style.setProperty('color','#ece8df','important');
        // Border rengini koru ama koyu versiyonuna çevir
        var blc=cs.borderLeftColor;
        var bm=blc.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
        if(bm && parseFloat(cs.borderLeftWidth)>=2){
          el.style.setProperty('border-left-color',blc,'important');
        }
        // İçerideki tüm text elementleri
        el.querySelectorAll('*').forEach(function(c){
          var ccs=getComputedStyle(c);
          var cc=ccs.color;
          var cm=cc.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
          if(cm && +cm[1]<100 && +cm[2]<100 && +cm[3]<100){
            _m(c);
            c.style.setProperty('color','#ece8df','important');
          }
        });
      }
    });
    // ── CHECKOUT DOĞRUDAN STYLE İLE RENKLENEN TÜM ELEMENTLER ──
    document.querySelectorAll('.ec-cart [style*="background-color"]').forEach(function(el){
      if(el.offsetHeight<15) return;
      _m(el);
      var cs=getComputedStyle(el);
      var bg=cs.backgroundColor;
      var m=bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
      if(m && +m[1]>200 && +m[2]>200 && +m[3]>200){
        _m(el);
        el.style.setProperty('background-color','rgba(175,140,62,.08)','important');
        el.style.setProperty('color','#ece8df','important');
      }
    });
    // ── BEYAZ BORDER TEMİZLEME (CSS yetmiyor — JS inline zorla) ──
    document.querySelectorAll('.ec-cart__products').forEach(function(el){
      el.style.setProperty('border-bottom-color','rgba(175,140,62,.06)','important');
    });
    document.querySelectorAll('.ec-cart-step').forEach(function(el){
      el.style.setProperty('border-color','rgba(175,140,62,.06)','important');
    });
    document.querySelectorAll('.ec-cart-step__next').forEach(function(el){
      el.style.setProperty('border-bottom-color','rgba(175,140,62,.06)','important');
    });
    document.querySelectorAll('.ec-radiogroup__items').forEach(function(el){
      el.style.setProperty('border-color','rgba(175,140,62,.12)','important');
    });
    // Radiogroup individual items (teslimat/ödeme arası çizgiler)
    document.querySelectorAll('.ec-radiogroup__item').forEach(function(el){
      el.style.setProperty('border-color','rgba(175,140,62,.06)','important');
    });
    // Radiogroup label borders
    document.querySelectorAll('.ec-radiogroup label').forEach(function(el){
      el.style.setProperty('border-color','rgba(175,140,62,.12)','important');
    });
    // Checked radio — blue box-shadow override
    document.querySelectorAll('.ec-radiogroup input:checked+label,.ec-radiogroup input:checked~label').forEach(function(el){
      el.style.setProperty('border-color','#af8c3e','important');
      el.style.setProperty('background','rgba(175,140,62,.08)','important');
      el.style.setProperty('box-shadow','0 0 0 1px #af8c3e, 0 0 0 1px #af8c3e inset','important');
    });
    // Unchecked radio labels — kill box-shadow
    document.querySelectorAll('.ec-radiogroup label').forEach(function(el){
      var prev=el.previousElementSibling;
      if(!prev||!prev.checked){
        el.style.setProperty('box-shadow','none','important');
      }
    });
    // Radiogroup items — kill box-shadow
    document.querySelectorAll('.ec-radiogroup__item').forEach(function(el){
      el.style.setProperty('box-shadow','none','important');
    });
    // Native radio circles — gold
    document.querySelectorAll('.ec-radiogroup input[type="radio"],.ec-radiogroup .form-control__radio,.form-control__radio').forEach(function(el){
      el.style.setProperty('accent-color','#af8c3e','important');
    });
    // Filtre sidebar — slider + checkbox + input borders
    document.querySelectorAll('.ec-filter input,.ec-filter label,[class*="ec-filter"] input').forEach(function(el){
      var t=el.type;
      if(t==='checkbox'||t==='radio') el.style.setProperty('accent-color','#af8c3e','important');
      if(t==='text'||t==='number'||t==='search') el.style.setProperty('border-color','rgba(175,140,62,.12)','important');
    });
    document.querySelectorAll('.ec-minicart').forEach(function(el){
      el.style.setProperty('border-color','rgba(175,140,62,.06)','important');
    });
    // Store .border class (3px top)
    document.querySelectorAll('.store .border, .dynamic-product-browser > .border').forEach(function(el){
      el.style.setProperty('border-color','rgba(175,140,62,.06)','important');
    });
    // Açık arka planlar — inline VE CSS-based (ürün görseli + HTML hariç)
    document.querySelectorAll('.ec-cart *, .ec-cart-step *, .ec-confirmation *, [class*="checkout"] *').forEach(function(el){
      if(el.offsetHeight<10||el.offsetWidth<10) return;
      if(el.tagName==='IMG'||el.tagName==='BUTTON') return;
      var cn=typeof el.className==='string'?el.className:'';
      if(cn.indexOf('picture')>-1||cn.indexOf('image')>-1||cn.indexOf('btn')>-1||cn.indexOf('form-control--primary')>-1||cn.indexOf('form-control__button')>-1) return;
      var bg=getComputedStyle(el).backgroundColor;
      var m=bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
      if(m && +m[1]>200 && +m[2]>200 && +m[3]>100){
        _m(el);
        // Kabul kutusu = sarımsı → dikkat çekici gold tint
        if(+m[3]<245){
          el.style.setProperty('background-color','rgba(175,140,62,.15)','important');
          el.style.setProperty('outline','1px solid rgba(175,140,62,.4)','important');
          el.style.setProperty('outline-offset','-1px','important');
          el.style.setProperty('border-radius','8px','important');
        } else {
          el.style.setProperty('background-color','rgba(175,140,62,.06)','important');
        }
        el.style.setProperty('color','#ece8df','important');
      }
    });
    // Radiogroup pseudo çizgiler — border kill
    document.querySelectorAll('.ec-radiogroup').forEach(function(rg){
      var cs=getComputedStyle(rg,'::before');
      if(cs.content!=='none'){
        rg.classList.add('ml-rg-fix');
      }
      cs=getComputedStyle(rg,'::after');
      if(cs.content!=='none'){
        rg.classList.add('ml-rg-fix');
      }
    });
    // Radio-view — force visible if hidden
    document.querySelectorAll('.form-control__radio-view').forEach(function(rv){
      if(rv.offsetWidth<5){
        // Ecwid native radio kullanıyor — accent-color ile devam
        var inp=rv.previousElementSibling||rv.parentElement.querySelector('.form-control__radio');
        if(inp) inp.style.setProperty('accent-color','#af8c3e','important');
      }
    });
    // Range slider — blue → gold
    document.querySelectorAll('.ec-range__slider,.ec-range__runner').forEach(function(el){
      el.style.setProperty('background','#af8c3e','important');
      el.style.setProperty('border-color','#af8c3e','important');
      el.style.setProperty('box-shadow','0 0 0 3px rgba(175,140,62,.2)','important');
    });
    document.querySelectorAll('.ec-range__track-inner,.ec-range__track-line').forEach(function(el){
      el.style.setProperty('background','rgba(175,140,62,.12)','important');
    });
    // Cart-next header separator
    document.querySelectorAll('.ec-cart-next__header,[class*="ec-cart-next"]').forEach(function(el){
      el.style.setProperty('border-color','rgba(175,140,62,.06)','important');
    });
    // ── STATİK SAYFA + ML-WRAPPER + ÜRÜN AÇIKLAMA — KAPSAMLI DARK FIX ──
    var _darkScopes='.ec-page-body *, [class*="ml-"][class*="-wrapper"] *, .product-details__description, .product-details__description *';
    document.querySelectorAll(_darkScopes).forEach(function(el){
      var tag=el.tagName;
      if(tag==='IMG'||tag==='VIDEO'||tag==='IFRAME') return;
      if(tag==='SVG'||tag==='svg'||tag==='path'||tag==='circle'||tag==='polyline'||tag==='line'||tag==='polygon'||tag==='rect'||tag==='ellipse') return;
      var cn=typeof el.className==='string'?el.className:'';
      // Renkli ikon container'ları koru (yeşil ✓, kırmızı ✗, step num, trust)
      if(cn.indexOf('ml-icon-')>-1||cn.indexOf('ml-step-num')>-1||cn.indexOf('ml-check')>-1||cn.indexOf('ml-trust-icon')>-1) return;
      _m(el);
      var cs=getComputedStyle(el);

      // ── ARKA PLAN TEMİZLİĞİ ──
      var bg=cs.backgroundColor;
      var m=bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
      if(m){
        var r=+m[1],g=+m[2],b=+m[3];
        if(r>240&&g>240&&b>240){
          el.style.setProperty('background-color','transparent','important');
        } else if(r>200&&g>200&&b>200){
          el.style.setProperty('background-color','#23221e','important');
        } else if(r>180&&g>180&&b>180){
          el.style.setProperty('background-color','#2c2b26','important');
        }
      }

      // ── GRADIENT TEMİZLİĞİ (backgroundImage üzerinden) ──
      var bgImg=cs.backgroundImage||'';
      if(bgImg.indexOf('linear-gradient')>-1||bgImg.indexOf('radial-gradient')>-1){
        // Gradient içindeki tüm rgb değerlerini çek
        var rgbMatches=bgImg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g);
        if(rgbMatches){
          var allLight=rgbMatches.every(function(rgb){
            var rm=rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            return rm&&+rm[1]>180&&+rm[2]>180&&+rm[3]>180;
          });
          if(allLight){
            el.style.setProperty('background','#23221e','important');
          }
        }
      }

      // ── INLINE STYLE BACKGROUND (shorthand) ──
      var inBg=el.getAttribute('style')||'';
      if(inBg.indexOf('background')>-1){
        // #ffffff, #fafafa, #f5f5f7, #fef7f7 vb.
        if(/background[^:]*:\s*#f[a-f0-9]{5}/i.test(inBg)||
           /background[^:]*:\s*#fff/i.test(inBg)||
           /background[^:]*:\s*rgb\(\s*2[3-5]\d/i.test(inBg)){
          // Gradient varsa BG2, düz renkse transparent
          if(inBg.indexOf('gradient')>-1){
            el.style.setProperty('background','#23221e','important');
          } else {
            el.style.setProperty('background','transparent','important');
          }
        }
        // Açık renkli gradient (inline hex check)
        if(inBg.indexOf('linear-gradient')>-1){
          var hexes=inBg.match(/#[0-9a-fA-F]{3,8}/g);
          if(hexes){
            var lightGrad=hexes.every(function(hex){
              var h=hex.replace('#','');
              if(h.length===3) h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
              if(h.length<6) return false;
              var ri=parseInt(h.substr(0,2),16),gi=parseInt(h.substr(2,2),16),bi=parseInt(h.substr(4,2),16);
              return ri>180&&gi>180&&bi>180;
            });
            if(lightGrad){
              el.style.setProperty('background','#23221e','important');
            }
          }
        }
      }

      // ── BOX-SHADOW TEMİZLİĞİ (beyaz gölge → dark) ──
      var bs=cs.boxShadow;
      if(bs&&bs!=='none'&&bs.indexOf('rgba(0')>-1){
        // Hafif gölgeleri dark'a uyarla — daha koyu
        el.style.setProperty('box-shadow','0 2px 8px rgba(0,0,0,0.3)','important');
      }

      // ── YAZI RENGİ TEMİZLİĞİ ──
      var c=cs.color;
      var cm=c.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
      if(cm){
        var cr=+cm[1],cg=+cm[2],cb=+cm[3];
        // Koyu text → açık (siyah, #1d1d1f, #333)
        if(cr<100&&cg<100&&cb<100){
          // h4/h3/strong → gold, p/span → TX2/TX1
          var tn=el.tagName;
          if(tn==='H1'||tn==='H2'||tn==='H3'||tn==='H4'||tn==='H5'||tn==='STRONG'||tn==='B'){
            el.style.setProperty('color','#af8c3e','important');
          } else {
            el.style.setProperty('color','#ece8df','important');
          }
        }
        // Orta gri (#666, #6e6e73, #86868b, #999) → TX2/TX3
        else if(cr>80&&cr<170&&cg>80&&cg<170&&cb>80&&cb<170){
          el.style.setProperty('color','#b5b0a4','important');
        }
      }

      // ── BORDER TEMİZLİĞİ ──
      var bcs=['borderTopColor','borderBottomColor','borderLeftColor','borderRightColor'];
      bcs.forEach(function(prop){
        var bc=cs[prop];
        if(bc){
          var bm=bc.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
          if(bm && +bm[1]>200 && +bm[2]>200 && +bm[3]>200){
            el.style.setProperty(prop.replace(/([A-Z])/g,function(m){return '-'+m.toLowerCase()}),'rgba(175,140,62,.12)','important');
          }
        }
      });
    });

    // ── SALT HTML .D CLASS AKTİFLEŞTİRME ──
    // SALT Koleksiyon HTML kendi .D class dark mode'u var
    document.querySelectorAll('.product-details__description > div').forEach(function(d){
      // Root container dark bg
      var dStyle=d.getAttribute('style')||'';
      if(dStyle.indexOf('background')>-1&&(dStyle.indexOf('#fff')>-1||dStyle.indexOf('#ffffff')>-1)){
        d.style.setProperty('background','transparent','important');
      }
      // .D class varsa aktifleştir
      var styleTag=d.querySelector('style');
      if(styleTag&&styleTag.textContent.indexOf('.D ')>-1){
        d.classList.add('D');
      }
    });

    // ml-wrapper kendisi
    document.querySelectorAll('[class*="ml-"][class*="-wrapper"]').forEach(function(w){
      w.style.setProperty('background','#1b1a17','important');
      w.style.setProperty('color','#ece8df','important');
    });

    // Radio-view::after — CSS yetmiyor, class ile zorla
    document.querySelectorAll('.form-control__radio-view').forEach(function(rv){
      rv.classList.add('ml-radio-fix');
    });
    // ── RECENTLY VIEWED / RELATED ÜRÜN KARTLARI ENFORCEMENTİ ──
    document.querySelectorAll('[class*="recently"] .grid-product__wrap, .ec-related-products .grid-product__wrap, [class*="related"] .grid-product__wrap').forEach(function(w){
      w.style.setProperty('background','#23221e','important');
      w.style.setProperty('border','none','important');
      w.style.setProperty('border-radius','14px','important');
      w.style.setProperty('overflow','hidden','important');
      w.style.setProperty('box-shadow','inset 0 0 0 1px rgba(175,140,62,.12), 0 0 0 2px #1b1a17, 0 0 0 3px rgba(175,140,62,.06), 0 2px 12px rgba(0,0,0,.3)','important');
      // wrap-inner
      var inner=w.querySelector('.grid-product__wrap-inner,[class*="wrap-inner"]');
      if(inner){
        inner.style.setProperty('background','#23221e','important');
        inner.style.setProperty('border','none','important');
      }
      // Image wrapper bg
      w.querySelectorAll('.grid-product__image,.grid-product__picture,.grid-product__picture-wrapper,[class*="image-wrap"]').forEach(function(img){
        img.style.setProperty('background','#2c2b26','important');
        img.style.setProperty('border','none','important');
      });
      // Title renk — gri kalmasın
      w.querySelectorAll('.grid-product__title,.grid-product__title-inner').forEach(function(t){
        t.style.setProperty('color','#ece8df','important');
      });
      // Subtitle/description renk
      w.querySelectorAll('.grid-product__subtitle,.grid-product__sku,.grid-product__description').forEach(function(t){
        t.style.setProperty('color','#a09b8f','important');
      });
      // Fiyat renk — gold
      w.querySelectorAll('.grid-product__price .ec-price-item,.grid-product__price-value').forEach(function(t){
        t.style.setProperty('color','#d4b05e','important');
      });
      // Eski fiyat
      w.querySelectorAll('.grid-product__old-price,.grid-product__price-old').forEach(function(t){
        t.style.setProperty('color','#706c62','important');
      });
      // Hover white border kill + dark hover style enforce
      if(!w._mlHover){
        w._mlHover=true;
        w.addEventListener('mouseenter',function(){
          if(!document.body.classList.contains('ml-dark')) return;
          this.style.setProperty('border','none','important');
          this.style.setProperty('outline','none','important');
          this.style.setProperty('background','#23221e','important');
          this.style.setProperty('box-shadow','inset 0 0 0 1px #af8c3e, 0 0 0 2px #1b1a17, 0 0 0 3px #af8c3e, 0 4px 20px rgba(175,140,62,.15), 0 8px 32px rgba(0,0,0,.35)','important');
          this.style.setProperty('transform','translateY(-2px)','important');
        });
        w.addEventListener('mouseleave',function(){
          if(!document.body.classList.contains('ml-dark')) return;
          this.style.setProperty('border','none','important');
          this.style.setProperty('outline','none','important');
          this.style.setProperty('background','#23221e','important');
          this.style.setProperty('box-shadow','inset 0 0 0 1px rgba(175,140,62,.12), 0 0 0 2px #1b1a17, 0 0 0 3px rgba(175,140,62,.06), 0 2px 12px rgba(0,0,0,.3)','important');
          this.style.setProperty('transform','none','important');
        });
      }
    });
    // Recently viewed container bg + alt çizgi temizliği
    document.querySelectorAll('[class*="recently"], .ec-related-products, [class*="related-products"]').forEach(function(sec){
      sec.style.setProperty('background','#1b1a17','important');
      sec.style.setProperty('border','none','important');
      sec.style.setProperty('border-bottom','none','important');
      // Child divs'de beyaz bg/border temizle
      var kids=sec.children;
      for(var i=0;i<kids.length;i++){
        var k=kids[i];
        if(k.tagName==='DIV'){
          var kbg=getComputedStyle(k).backgroundColor;
          var km=kbg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
          if(km&&+km[1]>180&&+km[2]>180&&+km[3]>180){
            k.style.setProperty('background','transparent','important');
          }
          k.style.setProperty('border','none','important');
          k.style.setProperty('border-bottom','none','important');
        }
      }
    });

    // ── HAKKINDA / ABOUT BÖLÜMÜ ENFORCEMENTİ ──
    document.querySelectorAll('.tile-about,.owner,.whyus,.contacts').forEach(function(sec){
      sec.style.setProperty('color','#ece8df','important');
      // Başlıklar → gold
      sec.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(function(h){
        h.style.setProperty('color','#d4b05e','important');
      });
      // Paragraflar/span → TX1
      sec.querySelectorAll('p,span,div,li').forEach(function(el){
        // Skip headings inside
        if(el.tagName.match(/^H\d$/)) return;
        var cs=getComputedStyle(el).color;
        var m=cs.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
        if(m && +m[1]<150 && +m[2]<150 && +m[3]<150){
          el.style.setProperty('color','#ece8df','important');
        }
      });
      // Linkler + underline → gold
      sec.querySelectorAll('a,u').forEach(function(el){
        el.style.setProperty('color','#d4b05e','important');
      });
    });

    // ── SON GÖRÜNTÜLENENLER — .recently-viewed class ENFORCEMENTİ ──
    // Section title
    document.querySelectorAll('.recently-viewed-title').forEach(function(el){
      el.style.setProperty('color','#ece8df','important');
    });
    // Kart container
    document.querySelectorAll('.recently-viewed[class*="recently-viewed--"]').forEach(function(card){
      card.style.setProperty('background','#23221e','important');
      card.style.setProperty('border','none','important');
      card.style.setProperty('border-radius','14px','important');
      card.style.setProperty('overflow','visible','important');
      card.style.setProperty('padding','0','important');
      card.style.setProperty('margin','0 8px','important');
      card.style.setProperty('box-shadow','inset 0 0 0 1px rgba(175,140,62,.12), 0 0 0 2px #1b1a17, 0 0 0 3px rgba(175,140,62,.06), 0 2px 12px rgba(0,0,0,.3)','important');
      // Ürün adı
      var name=card.querySelector('.recently-viewed__name');
      if(name){
        name.style.setProperty('color','#ece8df','important');
        name.style.setProperty('text-align','center','important');
        name.style.setProperty('font-size','14px','important');
        name.style.setProperty('padding','10px 8px 4px','important');
        name.style.setProperty('line-height','1.3','important');
      }
      // Fiyat
      card.querySelectorAll('.recently-viewed__price,.recently-viewed__price .ec-price-item').forEach(function(p){
        p.style.setProperty('color','#d4b05e','important');
        p.style.setProperty('text-align','center','important');
        p.style.setProperty('font-size','16px','important');
        p.style.setProperty('font-weight','600','important');
        p.style.setProperty('padding','4px 8px 12px','important');
      });
      card.querySelectorAll('.recently-viewed__price .ec-price-item--old').forEach(function(p){
        p.style.setProperty('color','#706c62','important');
      });
      // Thumbnail — beyaz bg, sabit yükseklik, contain
      var thumb=card.querySelector('.recently-viewed__thumb');
      if(thumb){
        thumb.style.setProperty('background','#fff','important');
        thumb.style.setProperty('border','none','important');
        thumb.style.setProperty('border-radius','14px 14px 0 0','important');
        thumb.style.setProperty('overflow','hidden','important');
        thumb.style.setProperty('height','150px','important');
        thumb.style.setProperty('display','flex','important');
        thumb.style.setProperty('align-items','center','important');
        thumb.style.setProperty('justify-content','center','important');
        var img=thumb.querySelector('img');
        if(img){
          img.style.setProperty('border-radius','0','important');
          img.style.setProperty('width','100%','important');
          img.style.setProperty('height','100%','important');
          img.style.setProperty('object-fit','contain','important');
        }
      }
      // Hover
      if(!card._mlRVHover){
        card._mlRVHover=true;
        card.addEventListener('mouseenter',function(){
          if(!document.body.classList.contains('ml-dark')) return;
          this.style.setProperty('box-shadow','inset 0 0 0 1px #af8c3e, 0 0 0 2px #1b1a17, 0 0 0 3px #af8c3e, 0 4px 20px rgba(175,140,62,.15), 0 8px 32px rgba(0,0,0,.35)','important');
          this.style.setProperty('transform','translateY(-2px)','important');
        });
        card.addEventListener('mouseleave',function(){
          if(!document.body.classList.contains('ml-dark')) return;
          this.style.setProperty('box-shadow','inset 0 0 0 1px rgba(175,140,62,.12), 0 0 0 2px #1b1a17, 0 0 0 3px rgba(175,140,62,.06), 0 2px 12px rgba(0,0,0,.3)','important');
          this.style.setProperty('transform','none','important');
        });
      }
    });

    // ── STATİK SAYFA ZORLA DARK BG ──
    document.querySelectorAll('.ec-page-body, [class*="ec-page"], [class*="page-body"], [class*="store-page"]').forEach(function(pg){
      pg.style.setProperty('background-color','#1b1a17','important');
      pg.style.setProperty('color','#ece8df','important');
      // İçindeki tüm div'leri dark yap + hover beyaz flash önle
      pg.querySelectorAll('div').forEach(function(d){
        var dbg=getComputedStyle(d).backgroundColor;
        var dm=dbg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
        if(dm&&+dm[1]>180&&+dm[2]>180&&+dm[3]>180){
          d.style.setProperty('background-color','#1b1a17','important');
        }
        // Tıklanabilir/hover elementlere dark hover zorla
        if(d.onclick||d.getAttribute('onclick')||d.style.cursor==='pointer'||getComputedStyle(d).cursor==='pointer'){
          if(!d._mlHoverFix){
            d._mlHoverFix=true;
            d.addEventListener('mouseenter',function(){
              this.style.setProperty('background-color','#2c2b26','important');
            });
            d.addEventListener('mouseleave',function(){
              this.style.setProperty('background-color','#23221e','important');
            });
          }
        }
      });
      // border temizliği
      pg.querySelectorAll('div,section,article').forEach(function(el){
        var bc=getComputedStyle(el).borderColor;
        if(bc){
          var bm=bc.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
          if(bm&&+bm[1]>200&&+bm[2]>200&&+bm[3]>200){
            el.style.setProperty('border-color','rgba(175,140,62,.12)','important');
          }
        }
      });
    });

    // ── CHECKBOX VİSİBİLİTY ENFORCEMENTİ ──
    document.querySelectorAll('.form-control__checkbox-view').forEach(function(cv){
      // Unchecked — görünür border zorla
      cv.style.setProperty('border','1.5px solid rgba(175,140,62,.5)','important');
      cv.style.setProperty('border-radius','3px','important');
      // Checked kontrolü
      var inp=cv.previousElementSibling;
      if(!inp) inp=cv.parentElement.querySelector('.form-control__checkbox');
      if(inp && inp.checked){
        cv.style.setProperty('background','#af8c3e','important');
        cv.style.setProperty('border-color','#af8c3e','important');
      } else {
        cv.style.setProperty('background','#1b1a17','important');
      }
    });
    // ── AGREEMENT CHECKBOX — dikkat çekici pulse ──
    document.querySelectorAll('.ec-cart-step label,.ec-cart [class*="agreement"],.ec-cart [class*="consent"]').forEach(function(lbl){
      var txt=(lbl.textContent||'').toLowerCase();
      if(txt.indexOf('kabul')>-1||txt.indexOf('accept')>-1||txt.indexOf('şartlar')>-1){
        var wrap=lbl.closest('.form-control')||lbl.closest('[class*="checkbox"]')||lbl.parentElement;
        if(wrap){
          var cb=wrap.querySelector('.form-control__checkbox');
          if(cb && !cb.checked){
            wrap.classList.add('ml-agree-pulse');
          } else {
            wrap.classList.remove('ml-agree-pulse');
          }
        }
      }
    });
  }
}

function fixBadgeRect(){
  if(!document.body.classList.contains('ml-dark')) return;
  // Marker
  document.querySelectorAll('.product-details__label-container,.product-details .ec-label,.details-product-purchase__place .ec-label').forEach(_m);
  // Container — inline-flex ile sarmalı
  document.querySelectorAll('.product-details__label-container').forEach(function(el){
    el.style.setProperty('display','inline-flex','important');
    el.style.setProperty('width','auto','important');
    el.style.setProperty('max-width','fit-content','important');
    el.style.setProperty('overflow','hidden','important');
    el.style.setProperty('border-radius','4px','important');
  });
  // İç label — temiz dikdörtgen
  document.querySelectorAll('.product-details .ec-label,.details-product-purchase__place .ec-label').forEach(function(el){
    el.style.setProperty('display','inline-block','important');
    el.style.setProperty('width','auto','important');
    el.style.setProperty('max-width','none','important');
    el.style.setProperty('padding','4px 14px','important');
    el.style.setProperty('border-radius','4px','important');
    el.style.setProperty('white-space','nowrap','important');
    el.style.setProperty('box-sizing','border-box','important');
    el.style.setProperty('line-height','1.4','important');
    el.style.setProperty('overflow','hidden','important');
    el.style.setProperty('margin','0','important');
  });
}

// ─── FLOATING İKONLAR (Sepet + Arama daireleri) ───
function fixFloatingIcons(){
  if(!document.body.classList.contains('ml-dark')) return;
  // Marker
  document.querySelectorAll('.float-icons,.float-icons__wrap,.float-icons__icon,.float-icons__icon > div,.float-icons__wrap .ec-minicart__body,.float-icons__wrap .ec-minicart__icon,.float-icons__wrap .ec-minicart,.float-icons__wrap svg').forEach(_m);
  // Kare wrapper'ları temizle
  document.querySelectorAll('.float-icons,.float-icons__wrap,.float-icons__icon,.float-icons__icon > div,.float-icons__wrap .ec-minicart__body,.float-icons__wrap .ec-minicart__icon').forEach(function(el){
    el.style.setProperty('background','transparent','important');
    el.style.setProperty('border','none','important');
    el.style.setProperty('box-shadow','none','important');
  });
  // Sadece yuvarlak ec-minicart daireler
  document.querySelectorAll('.float-icons__wrap .ec-minicart').forEach(function(el){
    el.style.setProperty('background','#23221e','important');
    el.style.setProperty('border','1px solid rgba(175,140,62,.2)','important');
    el.style.setProperty('box-shadow','0 2px 8px rgba(0,0,0,.3)','important');
  });
  document.querySelectorAll('.float-icons__wrap svg').forEach(function(svg){
    svg.style.setProperty('color','#d4b05e','important');
    svg.style.setProperty('fill','#d4b05e','important');
  });
}

// ─── OBSERVER — Ecwid her DOM değişikliğinde fixAll çağır ───
var _observer=new MutationObserver(fixAll);


if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init);
}else{
  init();
}

})();
