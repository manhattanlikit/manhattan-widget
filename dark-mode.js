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
var IMG_BG='#2c2b26';   // ürün görseli container — koyu sıcak (kartla uyumlu)

// ─── CSS ───
var css=`
/* ══════════════════════════════════════
   MANHATTAN DARK MODE — Warm Premium
   ══════════════════════════════════════ */

/* ── SHIMMER ANİMASYONU ── */
@keyframes ml-shimmer{
  0%{background-position:-200% center}
  100%{background-position:200% center}
}

/* ── GEÇİŞ ANİMASYONU ── */
body.ml-dm-t,
body.ml-dm-t .tiles,
body.ml-dm-t .menu,
body.ml-dm-t .store,
body.ml-dm-t .footer,
body.ml-dm-t .footer-new,
body.ml-dm-t .grid-product__wrap,
body.ml-dm-t .ml-dm-btn{
  transition:background-color .3s ease,color .3s ease,border-color .3s ease!important;
}

/* ── TOGGLE BUTON ── */
.ml-dm-btn{
  z-index:999999;
  width:40px;height:40px;border-radius:50%;
  border:1.5px solid rgba(175,140,62,.35);
  background:rgba(255,255,255,.92);
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  color:#af8c3e;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;
  box-shadow:0 2px 8px rgba(0,0,0,.08);
  transition:background .3s ease,border-color .3s ease,color .3s ease,box-shadow .3s ease;
  padding:0;
  pointer-events:auto;
}
.ml-dm-btn:hover{
  box-shadow:0 3px 14px rgba(175,140,62,.18);
  border-color:rgba(175,140,62,.6);
}
.ml-dm-btn svg{width:20px;height:20px;transition:transform .4s ease}
.ml-dm-btn:active svg{transform:rotate(30deg)}

body.ml-dark .ml-dm-btn{
  background:rgba(35,34,30,.92);
  border-color:rgba(175,140,62,.25);
  color:${GOLD};
  box-shadow:0 2px 10px rgba(0,0,0,.35);
}

@media(max-width:768px){
  .ml-dm-btn{width:34px;height:34px}
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
  overflow:visible!important;
}
body.ml-dark .footer,
body.ml-dark .footer-new{
  background:${BGnav}!important;
  color:${TX3}!important;
  border-top:1px solid ${BD2}!important;
}

/* ── LOGO (dark/light swap) ── */
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
/* Section başlıkları — gold (Neden ML?, Hakkımızda, vb.) */
body.ml-dark .tile h1,body.ml-dark .tile h2,body.ml-dark .tile h3,body.ml-dark .tile h4,
body.ml-dark .whyus h1,body.ml-dark .whyus h2,body.ml-dark .whyus h3,body.ml-dark .whyus h4,
body.ml-dark .owner h1,body.ml-dark .owner h2,body.ml-dark .owner h3,body.ml-dark .owner h4,
body.ml-dark .contacts h1,body.ml-dark .contacts h2,body.ml-dark .contacts h3,body.ml-dark .contacts h4,
body.ml-dark .caption h1,body.ml-dark .caption h2,body.ml-dark .caption h3,body.ml-dark .caption h4,
body.ml-dark [class*="tile-"] h1,body.ml-dark [class*="tile-"] h2,body.ml-dark [class*="tile-"] h3,body.ml-dark [class*="tile-"] h4{
  color:${GOLD}!important;
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
/* Ürün detaydaki Stokta var badge — genişleme düzeltme */
body.ml-dark .product-details__label-container,
body.ml-dark .details-product-purchase__place .ec-label,
body.ml-dark .product-details .ec-label{
  display:inline-block!important;
  width:auto!important;
  max-width:fit-content!important;
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
body.ml-dark .grid-product__image img,
body.ml-dark .grid-product__picture img,
body.ml-dark .grid-product__picture-wrapper img{
  background:transparent!important;
}

/* ── ÜRÜN DETAY SAYFASI ── */
body.ml-dark .product-details__product-title{color:${TX1}!important}
body.ml-dark .product-details__product-price .ec-price-item{color:${GOLD}!important}
body.ml-dark .product-details__product-description{color:${TX1}!important}
body.ml-dark .product-details{color:${TX1}!important}

/* WYSIWYG ürün açıklaması içerikleri (Koleksiyon tablosu vb.) */
body.ml-dark .product-details__product-description *,
body.ml-dark .product-details__product-description td,
body.ml-dark .product-details__product-description th,
body.ml-dark .product-details__product-description span,
body.ml-dark .product-details__product-description p,
body.ml-dark .product-details__product-description div,
body.ml-dark .product-details__product-description strong,
body.ml-dark .product-details__product-description b,
body.ml-dark .product-details__product-description li,
body.ml-dark .product-details__product-description em,
body.ml-dark .product-details__product-description i,
body.ml-dark .product-details__product-description a,
body.ml-dark .product-details__product-description font{
  color:${TX1}!important;
  background-color:transparent!important;
}
/* İnline style="color:..." override — WYSIWYG editör kalıntıları */
body.ml-dark .product-details__product-description [style*="color"],
body.ml-dark .product-details__product-description [style*="font"],
body.ml-dark .product-details__product-description [style*="background"]{
  color:${TX1}!important;
  background-color:transparent!important;
}
/* Açıklama içi başlıklar — gold */
body.ml-dark .product-details__product-description h1,
body.ml-dark .product-details__product-description h2,
body.ml-dark .product-details__product-description h3,
body.ml-dark .product-details__product-description h4,
body.ml-dark .product-details__product-description h5{
  color:${GOLD}!important;
}
body.ml-dark .product-details__product-description table{
  border-color:${BD}!important;
}
body.ml-dark .product-details__product-description td,
body.ml-dark .product-details__product-description th{
  border-color:${BD}!important;
}
/* Açıklama içi SVG ikonları */
body.ml-dark .product-details__product-description svg{
  fill:${GOLD}!important;
  color:${GOLD}!important;
}
/* Açıklama blockquote / alıntı */
body.ml-dark .product-details__product-description blockquote,
body.ml-dark .product-details__product-description [style*="italic"]{
  color:${TX2}!important;
  border-left-color:${GOLDDIM}!important;
}

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
  background:linear-gradient(110deg,${GOLDDIM} 0%,${GOLDDIM} 40%,${GOLD} 50%,${GOLDDIM} 60%,${GOLDDIM} 100%)!important;
  background-size:200% 100%!important;
  animation:ml-shimmer 3s ease infinite!important;
  color:#fff!important;
  border-color:${GOLD}!important;
  text-shadow:0 1px 2px rgba(0,0,0,.15)!important;
}
body.ml-dark .form-control__button:hover,
body.ml-dark button.button:hover{
  background:linear-gradient(110deg,${GOLD} 0%,${GOLD} 35%,#e8c96b 50%,${GOLD} 65%,${GOLD} 100%)!important;
  background-size:200% 100%!important;
  animation:ml-shimmer 2s ease infinite!important;
  box-shadow:0 4px 16px rgba(175,140,62,.3)!important;
}
body.ml-dark .form-control__button *,
body.ml-dark .form-control__button span,
body.ml-dark .form-control__button svg,
body.ml-dark .form-control__button-text{
  color:#fff!important;
}
/* Sepete Ekle — yüksek specificity override */
body.ml-dark .details-product-purchase__add-to-bag,
body.ml-dark .details-product-purchase__add-to-bag .form-control__button{
  background:linear-gradient(110deg,${GOLDDIM} 0%,${GOLDDIM} 40%,${GOLD} 50%,${GOLDDIM} 60%,${GOLDDIM} 100%)!important;
  background-size:200% 100%!important;
  animation:ml-shimmer 3s ease infinite!important;
  color:#fff!important;
  border-color:${GOLD}!important;
  border-radius:10px!important;
}
body.ml-dark .details-product-purchase__add-to-bag *,
body.ml-dark .details-product-purchase__add-to-bag span{
  color:#fff!important;
  background:transparent!important;
}
body.ml-dark .details-product-purchase__add-to-bag:hover,
body.ml-dark .details-product-purchase__add-to-bag:hover .form-control__button{
  background:linear-gradient(110deg,${GOLD} 0%,${GOLD} 35%,#e8c96b 50%,${GOLD} 65%,${GOLD} 100%)!important;
  background-size:200% 100%!important;
  box-shadow:0 4px 20px rgba(175,140,62,.35)!important;
}
/* ── FAVORİ BUTONU ── */
body.ml-dark .favorite-product,
body.ml-dark .favorite-product__button-add,
body.ml-dark .favorite-product__button-saved,
body.ml-dark .favorite-product__button-view{
  background:transparent!important;
  border:1.5px solid ${GOLDDIM}!important;
  border-radius:10px!important;
  color:${GOLD}!important;
}
body.ml-dark .favorite-product *,
body.ml-dark .favorite-product svg,
body.ml-dark .favorite-product__title{
  color:${GOLD}!important;
  fill:${GOLD}!important;
}
body.ml-dark .favorite-product__button-add:hover,
body.ml-dark .favorite-product__button-saved:hover,
body.ml-dark .favorite-product__button-view:hover{
  background:rgba(175,140,62,.1)!important;
  border-color:${GOLD}!important;
}
/* "Daha sonra almak üzere kaydedin" text */
body.ml-dark .favorite-product__title{
  color:${TX1}!important;
}

/* Cover butonlar — gold shimmer + beyaz yazı + yuvarlak köşe */
body.ml-dark .cover__button,
body.ml-dark .cover-button,
body.ml-dark a.cover__button,
body.ml-dark a.cover-button,
body.ml-dark button.cover__button,
body.ml-dark button.cover-button{
  background:linear-gradient(110deg,${GOLDDIM} 0%,${GOLDDIM} 40%,${GOLD} 50%,${GOLDDIM} 60%,${GOLDDIM} 100%)!important;
  background-size:200% 100%!important;
  animation:ml-shimmer 3s ease infinite!important;
  color:#fff!important;
  border:none!important;
  border-radius:12px!important;
  overflow:hidden!important;
  text-decoration:none!important;
  text-shadow:0 1px 2px rgba(0,0,0,.15)!important;
}
body.ml-dark .cover__button *,
body.ml-dark .cover-button *{
  color:#fff!important;
  background:transparent!important;
  background-color:transparent!important;
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

/* ── ÜRÜN SEÇENEKLERİ SELECT DROPDOWN (1.Seç, 2.Seç...) ── */
body.ml-dark .details-product-option select,
body.ml-dark .product-details__product-options select{
  background:${BG2}!important;
  color:#fff!important;
  border:1.5px solid ${BD}!important;
  border-radius:8px!important;
  font-weight:500!important;
  padding:8px 12px!important;
}
body.ml-dark .details-product-option select:focus{
  border-color:${GOLDDIM}!important;
  box-shadow:0 0 0 2px rgba(175,140,62,.15)!important;
}
body.ml-dark .details-product-option select option{
  background:${BG2}!important;
  color:#fff!important;
}
/* Sipariş notu textarea */
body.ml-dark .product-details__product-options textarea,
body.ml-dark .details-product-option textarea{
  background:${BG2}!important;
  color:${TX1}!important;
  border:1.5px solid ${BD}!important;
  border-radius:8px!important;
}
/* "Ürün detayları" başlığı */
body.ml-dark .product-details__general-info,
body.ml-dark .product-details__general-info *{
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
/* NORMAL DURUM — gold filled + shimmer + beyaz yazı */
body.ml-dark .form-control--checkbox-button label,
body.ml-dark .form-control__inline-label,
body.ml-dark .details-product-option label,
body.ml-dark .form-control--checkbox-button .form-control__inline-label{
  background:linear-gradient(110deg,${GOLDDIM} 0%,${GOLDDIM} 40%,${GOLD} 50%,${GOLDDIM} 60%,${GOLDDIM} 100%)!important;
  background-size:200% 100%!important;
  animation:ml-shimmer 3s ease infinite!important;
  color:#fff!important;
  border:1.5px solid ${GOLD}!important;
  border-radius:8px!important;
  font-weight:500!important;
  cursor:pointer!important;
  text-shadow:0 1px 2px rgba(0,0,0,.2)!important;
}
body.ml-dark .form-control--checkbox-button label *,
body.ml-dark .form-control__inline-label *{
  color:#fff!important;
}
/* HOVER — parlak gold */
body.ml-dark .form-control--checkbox-button label:hover,
body.ml-dark .form-control__inline-label:hover,
body.ml-dark .details-product-option label:hover{
  background:linear-gradient(110deg,${GOLD} 0%,${GOLD} 40%,#e8c96b 50%,${GOLD} 60%,${GOLD} 100%)!important;
  background-size:200% 100%!important;
  animation:ml-shimmer 2s ease infinite!important;
  border-color:#e8c96b!important;
  color:#fff!important;
  transform:translateY(-1px)!important;
  box-shadow:0 2px 8px rgba(175,140,62,.3)!important;
}
/* SEÇİLİ DURUM — en parlak gold + shimmer */
body.ml-dark .form-control--checkbox-button input:checked+label,
body.ml-dark .form-control--checkbox-button input:checked~label,
body.ml-dark .form-control--checkbox-button input:checked+.form-control__inline-label,
body.ml-dark .form-control__radio--checked .form-control__inline-label,
body.ml-dark .form-control__radio--checked label,
body.ml-dark .form-control--checkbox-button.form-control__radio--checked label,
body.ml-dark .form-control--checkbox-button.form-control__radio--checked .form-control__inline-label,
body.ml-dark .details-product-option .form-control__radio--checked,
body.ml-dark .details-product-option .form-control__radio--checked label,
body.ml-dark .details-product-option .form-control__radio--checked .form-control__inline-label{
  background:linear-gradient(110deg,${GOLD} 0%,${GOLD} 35%,#e8c96b 50%,${GOLD} 65%,${GOLD} 100%)!important;
  background-size:200% 100%!important;
  animation:ml-shimmer 2.5s ease infinite!important;
  color:#fff!important;
  border-color:#e8c96b!important;
  font-weight:600!important;
  box-shadow:0 0 12px rgba(212,176,94,.25),inset 0 1px 0 rgba(255,255,255,.15)!important;
}
/* Seçenek text'leri seçildiğinde beyaz */
body.ml-dark .form-control__radio--checked .form-control__inline-label *,
body.ml-dark .form-control--checkbox-button input:checked+label *,
body.ml-dark .form-control--checkbox-button input:checked~label *{
  color:#fff!important;
}
/* Opsiyon başlıkları — daha parlak */
body.ml-dark .details-product-option__title,
body.ml-dark .product-details__product-options .form-control__label{
  color:${TX1}!important;
  font-weight:500!important;
}

/* ── MİKTAR INPUT — radio'dan farklı, net kutu ── */
body.ml-dark .details-product-purchase__qty,
body.ml-dark .form-control--flexible{
  background:${BG2}!important;
  color:${TX1}!important;
  border:1.5px solid ${BD}!important;
  border-radius:8px!important;
}
body.ml-dark .details-product-purchase__qty input{
  color:${TX1}!important;
  font-weight:600!important;
  font-size:16px!important;
}
body.ml-dark .details-product-purchase__qty button,
body.ml-dark .details-product-purchase__qty [class*="btn"]{
  color:${GOLD}!important;
  background:transparent!important;
}
/* "Stokta Var" ve "Adet:" label — parlak */
body.ml-dark .details-product-purchase__place,
body.ml-dark .details-product-purchase__place *{
  color:${TX1}!important;
}
body.ml-dark .details-product-purchase__qty-label{
  color:${TX1}!important;
  font-weight:500!important;
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

/* ── ALT NAVİGASYON İKONLARI (Ürünleri Ara, Hesabım vb.) ── */
body.ml-dark .footer-menu,
body.ml-dark .ec-store__content-wrapper [class*="footer"]{
  background:${BG2}!important;
  border-top:1px solid ${BD}!important;
  display:flex!important;
  justify-content:center!important;
  align-items:center!important;
}
/* İkon bar iç container da ortalansın */
body.ml-dark .footer-menu ul,
body.ml-dark .footer-menu nav,
body.ml-dark .footer-menu > div{
  display:flex!important;
  justify-content:center!important;
  align-items:center!important;
  width:100%!important;
}
body.ml-dark .footer-menu li,
body.ml-dark .footer-menu > div > a,
body.ml-dark .footer-menu > div > div{
  flex:1!important;
  text-align:center!important;
}
body.ml-dark .footer-menu a,
body.ml-dark .footer-menu svg,
body.ml-dark [class*="store-footer"] a,
body.ml-dark [class*="store-footer"] svg{
  color:${GOLD}!important;
  fill:${GOLD}!important;
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
}
body.ml-dark [class*="shipping"] [class*="radio"]:hover,
body.ml-dark .ec-radiogroup label:hover{
  border-color:${GOLDDIM}!important;
}
body.ml-dark [class*="shipping"] input:checked~label,
body.ml-dark [class*="shipping"] input:checked+label,
body.ml-dark .ec-radiogroup input:checked+label{
  border-color:${GOLDDIM}!important;
  background:rgba(175,140,62,.08)!important;
}

/* ── CHECKOUT — Ödeme bildirim kutuları (renkli arka planlar) ── */
body.ml-dark [class*="checkout"] [style*="background-color: rgb(255, 255, 224)"],
body.ml-dark [class*="checkout"] [style*="background-color: rgb(255, 255, 240)"],
body.ml-dark [style*="background-color: rgb(245, 212"],
body.ml-dark [style*="background-color: rgb(247, 205"]{
  background-color:rgba(175,140,62,.1)!important;
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

/* ── ÖNERİLEN ÜRÜNLER KAROSELİ (Bunları da Beğenebilirsiniz) ── */
body.ml-dark .product-details__related-products,
body.ml-dark [class*="related-products"],
body.ml-dark [class*="recently"]{
  overflow:visible!important;
}
body.ml-dark .product-details__related-products .grid-product__wrap,
body.ml-dark [class*="related"] .grid-product__wrap,
body.ml-dark [class*="recently"] .grid-product__wrap{
  border-radius:14px!important;
  border:none!important;
  box-shadow:
    inset 0 0 0 1px ${BD},
    0 0 0 2px ${BG1},
    0 0 0 3px ${BD2},
    0 2px 12px rgba(0,0,0,.3)!important;
  overflow:hidden!important;
}
/* Karosel scroller */
body.ml-dark .product-details__related-products,
body.ml-dark [class*="related-products"]{
  overflow:visible!important;
}

/* ── ANASAYFA CTA BUTONU (Alışverişe Devam Et / Mağazaya Git) ── */
body.ml-dark .tile-cover .cover__button,
body.ml-dark .tile-cover .cover-button,
body.ml-dark .cover__button.cover-button,
body.ml-dark .tile-cover a.cover__button,
body.ml-dark .tile-cover a.cover-button{
  background:linear-gradient(110deg,${GOLDDIM} 0%,${GOLDDIM} 40%,${GOLD} 50%,${GOLDDIM} 60%,${GOLDDIM} 100%)!important;
  background-size:200% 100%!important;
  animation:ml-shimmer 3s ease infinite!important;
  color:#fff!important;
  border:none!important;
  border-radius:12px!important;
  font-weight:600!important;
  text-decoration:none!important;
  text-shadow:0 1px 2px rgba(0,0,0,.15)!important;
}
body.ml-dark .tile-cover .cover__button *,
body.ml-dark .tile-cover .cover-button *{
  color:#fff!important;
  background:transparent!important;
  background-color:transparent!important;
}
body.ml-dark .tile-cover .cover__button:hover,
body.ml-dark .tile-cover .cover-button:hover,
body.ml-dark .cover__button:hover,
body.ml-dark .cover-button:hover{
  background:linear-gradient(110deg,${GOLD} 0%,${GOLD} 35%,#e8c96b 50%,${GOLD} 65%,${GOLD} 100%)!important;
  background-size:200% 100%!important;
  animation:ml-shimmer 2s ease infinite!important;
  border-radius:12px!important;
  overflow:hidden!important;
  box-shadow:0 4px 16px rgba(175,140,62,.3)!important;
}
body.ml-dark .cover__button:hover *,
body.ml-dark .cover-button:hover *{
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
/* Stokta var badge genişleme düzeltme */
body.ml-dark .product-details .ec-label[class*="Stokta"],
body.ml-dark .product-details__label-container{
  display:inline-block!important;
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

/* ── HR & KENARLIKLARI ── */
body.ml-dark hr{border-color:${BD}!important}
/* İnline beyaz kenarlıkları yakala */
body.ml-dark [style*="border-bottom: 1px solid rgb(255"],
body.ml-dark [style*="border-top: 1px solid rgb(255"],
body.ml-dark [style*="border-bottom: 1px solid white"],
body.ml-dark [style*="border-top: 1px solid white"],
body.ml-dark [style*="border-bottom: 1px solid #fff"],
body.ml-dark [style*="border-top: 1px solid #fff"],
body.ml-dark [style*="border-bottom: 1px solid #FFF"],
body.ml-dark [style*="border: 1px solid rgb(255"],
body.ml-dark [style*="border: 1px solid #fff"],
body.ml-dark [style*="border-color: rgb(255"],
body.ml-dark [style*="border-color: white"],
body.ml-dark [style*="border-color: #fff"]{
  border-color:${BD}!important;
}
/* Ecwid store wrapper ayracları */
body.ml-dark .ec-store hr,
body.ml-dark .ec-wrapper hr,
body.ml-dark .tiles hr,
body.ml-dark .tiles-wrapper hr{
  border-color:${BD}!important;
  background:${BD}!important;
}
/* Tile/section arası çizgiler — beyaz kalmasın */
body.ml-dark .tile,
body.ml-dark [class*="tile-"]{
  border-color:${BD}!important;
  border-bottom-color:${BD}!important;
  border-top-color:${BD}!important;
}
body.ml-dark .tile::after,
body.ml-dark [class*="tile-"]::after{
  background:${BD}!important;
  background-color:${BD}!important;
}
body.ml-dark [class*="section-divider"],
body.ml-dark [class*="separator"],
body.ml-dark [class*="divider"]{
  background:${BD}!important;
  background-color:${BD}!important;
  border-color:${BD}!important;
}

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
  setTimeout(function(){document.body.classList.remove('ml-dm-t');},350);
  setTimeout(fixStokYok,100);
  setTimeout(fixWhiteBorders,100);
  setTimeout(fixProductDesc,100);
}

btn.addEventListener('click',function(e){
  e.stopPropagation();
  e.preventDefault();
  toggle();
});

// ─── SAYFA HAZIR OLUNCA EKLE ───
function init(){
  // Nav bar'da "Bize ulaşın" linkini bul, sağına ekle
  var placed=false;
  var navLinks=document.querySelectorAll('.menu a, nav a, .nav a, [class*="menu"] a');
  for(var i=0;i<navLinks.length;i++){
    if(navLinks[i].textContent.trim().indexOf('Bize')>-1){
      // Link'in parent'ına ekle
      var parent=navLinks[i].parentElement;
      btn.style.marginLeft='12px';
      btn.style.display='inline-flex';
      btn.style.verticalAlign='middle';
      if(navLinks[i].nextSibling){
        parent.insertBefore(btn,navLinks[i].nextSibling);
      }else{
        parent.appendChild(btn);
      }
      placed=true;
      break;
    }
  }
  // Fallback — nav bulunamazsa fixed wrapper
  if(!placed){
    var wrap=document.createElement('div');
    wrap.id='ml-dm-wrap';
    wrap.setAttribute('style','position:fixed!important;top:14px!important;right:16px!important;z-index:999999!important;pointer-events:auto!important;');
    wrap.appendChild(btn);
    (document.documentElement||document.body).appendChild(wrap);
  }
  // Kayıtlı tercihi yükle
  try{
    if(localStorage.getItem('ml-dark')==='1'){
      document.body.classList.add('ml-dark');
      btn.innerHTML=sunIco;
    }
  }catch(e){}
  // Stokta Yok label'larını zorla + beyaz çizgileri düzelt + ürün açıklama inline fix + observer başlat
  fixStokYok();
  fixWhiteBorders();
  fixProductDesc();
  // Observer'ları başlat
  stokObserver.observe(document.body,{childList:true,subtree:true});
}

// ─── STOKTA YOK LABEL ZORLAYICI ───
function fixStokYok(){
  if(!document.body.classList.contains('ml-dark'))return;
  var labels=document.querySelectorAll('[class*="Stokta-Yok"],[class*="Stokta-yok"],[class*="stokta-yok"]');
  labels.forEach(function(l){
    l.style.setProperty('background','#8b3a3a','important');
    l.style.setProperty('background-color','#8b3a3a','important');
    l.style.setProperty('color','#fff','important');
    // İç elementler — .ec-label, .label__text
    var inner=l.querySelectorAll('.ec-label,[class*="label--"],.label__text');
    inner.forEach(function(el){
      el.style.setProperty('background','#8b3a3a','important');
      el.style.setProperty('background-color','#8b3a3a','important');
      el.style.setProperty('color','#fff','important');
    });
  });
}
// Ecwid dinamik yükleme — yeni kartlar gelince de yakala
var stokObserver=new MutationObserver(function(){fixStokYok();fixWhiteBorders();fixProductDesc();});

// ─── BEYAZ KENARLIKLARI GOLD'A ÇEVİR ───
function fixWhiteBorders(){
  if(!document.body.classList.contains('ml-dark'))return;
  var bd='rgba(175,140,62,.12)';
  // hr elementleri
  document.querySelectorAll('hr').forEach(function(el){
    el.style.setProperty('border-color',bd,'important');
    el.style.setProperty('background',bd,'important');
  });
  // İnline beyaz border taşıyan elementler
  document.querySelectorAll('[style]').forEach(function(el){
    var s=el.getAttribute('style')||'';
    if(s.indexOf('border')>-1 && (s.indexOf('rgb(255')+s.indexOf('#fff')+s.indexOf('white'))>-3){
      el.style.setProperty('border-color',bd,'important');
    }
  });
}

// ─── ÜRÜN AÇIKLAMASI İNLINE STYLE TEMİZLEYİCİ ───
function fixProductDesc(){
  if(!document.body.classList.contains('ml-dark'))return;
  var desc=document.querySelectorAll('.product-details__product-description [style]');
  desc.forEach(function(el){
    var s=el.getAttribute('style')||'';
    // Koyu renk text'leri (#333, rgb(51..), rgb(0..) vb.) krem'e çevir
    if(s.indexOf('color')>-1){
      el.style.setProperty('color','#ece8df','important');
    }
    // Arka plan renklerini temizle
    if(s.indexOf('background')>-1){
      el.style.setProperty('background-color','transparent','important');
      el.style.setProperty('background','transparent','important');
    }
  });
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init);
}else{
  init();
}

})();
