// Manhattan Likit — Dark Mode v1.0
// Standalone file — widget.js'e dokunmaz, ayrı yüklenir
// Toggle: sağ üst sabit buton (ay/güneş)
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
var IMG_BG='#f0ece4';   // ürün görseli container — açık krem (sırıtmaz)

// ─── CSS ───
var css=`
/* ══════════════════════════════════════
   MANHATTAN DARK MODE — Warm Premium
   ══════════════════════════════════════ */

/* ── GEÇİŞ ANİMASYONU ── */
body.ml-dm-t,body.ml-dm-t *,body.ml-dm-t *::before,body.ml-dm-t *::after{
  transition:background-color .45s cubic-bezier(.4,0,.2,1),
             color .45s cubic-bezier(.4,0,.2,1),
             border-color .45s cubic-bezier(.4,0,.2,1),
             box-shadow .45s cubic-bezier(.4,0,.2,1)!important;
}

/* ── TOGGLE BUTON ── */
.ml-dm-btn{
  position:fixed;top:14px;right:16px;z-index:999999;
  width:36px;height:36px;border-radius:50%;
  border:1px solid rgba(0,0,0,.08);
  background:rgba(255,255,255,.85);
  backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
  color:#1b1a17;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;
  box-shadow:0 1px 6px rgba(0,0,0,.08);
  transition:all .3s ease;
  padding:0;
}
.ml-dm-btn:hover{
  transform:scale(1.1);
  box-shadow:0 2px 12px rgba(0,0,0,.12);
}
.ml-dm-btn svg{width:18px;height:18px;transition:transform .4s ease}
.ml-dm-btn:active svg{transform:rotate(30deg)}

body.ml-dark .ml-dm-btn{
  background:rgba(35,34,30,.85);
  border-color:${BD};
  color:${GOLD};
  box-shadow:0 1px 8px rgba(0,0,0,.3);
}

@media(max-width:768px){
  .ml-dm-btn{top:10px;right:10px;width:32px;height:32px}
  .ml-dm-btn svg{width:16px;height:16px}
}

/* ══════════════════════════════════════
   DARK MODE ANA KURALLAR
   ══════════════════════════════════════ */

/* ── BODY & GENEL ── */
body.ml-dark{
  background:${BG1}!important;
  color:${TX1}!important;
}

/* ── TILES WRAPPER (Instant Site ana container) ── */
body.ml-dark .tiles-wrapper,
body.ml-dark .tiles,
body.ml-dark .body{
  background:${BG1}!important;
}
/* ── SİTE SECTION BLOKLARI ── */
body.ml-dark .menu,
body.ml-dark .container,
body.ml-dark .caption,
body.ml-dark .whyus,
body.ml-dark .contacts,
body.ml-dark .owner,
body.ml-dark .store,
body.ml-dark .dynamic-product-browser{
  background:${BG1}!important;
  color:${TX1}!important;
}
body.ml-dark .footer,
body.ml-dark .footer-new{
  background:${BGnav}!important;
  color:${TX3}!important;
  border-top:1px solid ${BD2}!important;
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
body.ml-dark .search-panel{
  background:${BGnav}!important;
  border-color:${BD2}!important;
}
body.ml-dark .search-panel input{
  background:${BG2}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
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
body.ml-dark .grid-product__wrap,
body.ml-dark .grid-product__wrap-inner{
  background:${BG2}!important;
  border-radius:12px!important;
  border:1px solid ${BD2}!important;
  box-shadow:${CARD_SHADOW}!important;
  overflow:hidden;
}
body.ml-dark .grid-product__wrap:hover{
  border-color:${BD}!important;
  box-shadow:0 4px 24px rgba(0,0,0,.45)!important;
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
body.ml-dark .grid-product__bg{
  background:${IMG_BG}!important;
  border-radius:10px 10px 0 0!important;
}
body.ml-dark .grid-product__image img,
body.ml-dark .grid-product__picture img,
body.ml-dark .grid-product__picture-wrapper img{
  background:transparent!important;
}

/* ── ÜRÜN DETAY SAYFASI ── */
body.ml-dark .product-details__product-title{color:${TX1}!important}
body.ml-dark .product-details__product-price .ec-price-item{color:${GOLD}!important}
body.ml-dark .product-details__product-description{color:${TX2}!important}
body.ml-dark .product-details{color:${TX2}!important}

/* Ürün detay görseli */
body.ml-dark .product-details__gallery,
body.ml-dark .product-details-module__gallery,
body.ml-dark .details-gallery,
body.ml-dark .details-gallery__main-image-wrapper{
  background:${IMG_BG}!important;
  border-radius:10px;
}
body.ml-dark .product-details__gallery img,
body.ml-dark .product-details-module__gallery img,
body.ml-dark .details-gallery img{
  background:transparent!important;
}
/* Thumbnail backgrounds */
body.ml-dark .details-gallery__thumb-bg{
  background:${IMG_BG}!important;
}

/* Ürün seçenekleri */
body.ml-dark .product-details__product-options .form-control__label,
body.ml-dark .product-details__product-options label{
  color:${TX2}!important;
}

/* ── KATEGORİ & SAYFA BAŞLIKLARI ── */
body.ml-dark .ec-page-title{color:${TX1}!important}
body.ml-dark .ec-breadcrumbs a{color:${TX3}!important}
body.ml-dark .ec-breadcrumbs a:hover{color:${GOLD}!important}

/* ── BUTONLAR ── */
body.ml-dark .form-control__button,
body.ml-dark .form-control__button--primary,
body.ml-dark button.button{
  background:${GOLDDIM}!important;
  color:${BG1}!important;
  border-color:${GOLDDIM}!important;
}
body.ml-dark .form-control__button:hover,
body.ml-dark button.button:hover{
  background:${GOLD}!important;
}

/* Cover butonlar */
body.ml-dark .cover__button,
body.ml-dark .cover-button{
  background:${GOLDDIM}!important;
  color:${BG1}!important;
}

/* ── FORM / INPUT ── */
body.ml-dark input:not([type="checkbox"]):not([type="radio"]),
body.ml-dark textarea,
body.ml-dark select{
  background:${BG3}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
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

/* ── SEPET ── */
body.ml-dark .ec-cart,
body.ml-dark .ec-cart__body,
body.ml-dark .ec-cart-item{
  background:${BG2}!important;
  color:${TX1}!important;
}
body.ml-dark .ec-cart-item__title{color:${TX1}!important}
body.ml-dark .ec-cart-item__price{color:${GOLD}!important}
body.ml-dark .ec-cart-item__sku{color:${TX3}!important}
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
  background:${BGnav}!important;
  color:${TX3}!important;
  border-top:1px solid ${BD2}!important;
}
body.ml-dark .ec-footer a{color:${TX3}!important}
body.ml-dark .ec-footer a:hover{color:${GOLD}!important}
body.ml-dark .ec-footer__row{border-color:${BD2}!important}

/* ── HELPFULCROWD REVIEW KARTLARI ── */
body.ml-dark .hc-widget-card,
body.ml-dark .hc-comment,
body.ml-dark .hc-review-form-wrapper,
body.ml-dark .hc-review-form__submit__wrapper{
  background:${BG2}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
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

/* ── SOSYAL PAYLAŞIM ── */
body.ml-dark .ec-likely__widget{
  background:${BG3}!important;
  color:${TX2}!important;
  border-color:${BD}!important;
}

/* ── CHECKBOX / OPSİYON BUTONLARI ── */
body.ml-dark .form-control--checkbox-button label,
body.ml-dark .details-product-option label,
body.ml-dark .form-control--checkbox-button .form-control__inline-label{
  background:${BG3}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
}
body.ml-dark .form-control--checkbox-button input:checked+label,
body.ml-dark .form-control--checkbox-button .form-control__radio--checked+label{
  background:${GOLDDIM}!important;
  color:${BG1}!important;
  border-color:${GOLDDIM}!important;
}

/* ── MİKTAR INPUT ── */
body.ml-dark .details-product-purchase__qty,
body.ml-dark .form-control--flexible{
  background:${BG3}!important;
  color:${TX1}!important;
  border-color:${BD}!important;
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
body.ml-dark .search-panel svg{
  color:${TX2}!important;
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
  --mltp:${TX1};
  --mlts:${TX2};
  --mltt:${TX3};
  --mlbg:${BG2};
  --mlbg2:${BG3};
  --mlbgh:#3a3930;
  --mlbd:${BD};
  --mlgl:rgba(175,140,62,.08);
}
body.ml-dark .ml-trigger{
  background:linear-gradient(135deg,${BG2},${BG3})!important;
  border:1px solid ${BD}!important;
  color:${GOLD}!important;
}
body.ml-dark .ml-trigger:hover{
  border-color:${GOLDDIM}!important;
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
`;

// ─── STYLE ENJEKSİYONU ───
var styleEl=document.createElement('style');
styleEl.id='ml-dark-mode';
styleEl.textContent=css;
document.head.appendChild(styleEl);

// ─── SVG İKONLARI ───
var moonIco='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>';
var sunIco='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

// ─── TOGGLE BUTON OLUŞTUR ───
var btn=document.createElement('button');
btn.className='ml-dm-btn';
btn.setAttribute('aria-label','Karanlık mod');
btn.setAttribute('title','Karanlık / Aydınlık Mod');
btn.innerHTML=moonIco;

// ─── TOGGLE FONKSİYONU ───
function toggle(){
  document.body.classList.add('ml-dm-t');
  document.body.classList.toggle('ml-dark');
  var dark=document.body.classList.contains('ml-dark');
  btn.innerHTML=dark?sunIco:moonIco;
  try{localStorage.setItem('ml-dark',dark?'1':'0');}catch(e){}
  setTimeout(function(){document.body.classList.remove('ml-dm-t');},500);
}

btn.addEventListener('click',function(e){
  e.stopPropagation();
  e.preventDefault();
  toggle();
});

// ─── SAYFA HAZIR OLUNCA EKLE ───
function init(){
  document.body.appendChild(btn);
  // Kayıtlı tercihi yükle
  try{
    if(localStorage.getItem('ml-dark')==='1'){
      document.body.classList.add('ml-dark');
      btn.innerHTML=sunIco;
    }
  }catch(e){}
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init);
}else{
  init();
}

})();
