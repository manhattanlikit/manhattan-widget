# HANDOFF — Çark Çevir — Spin Wheel
> spinwheel.js + spin.html domain handoff. CrazyTim fizik, segment haritası, olasılık sistemi.
> Kritik kurallar System Instruction'da. Brace tablosu → `project_knowledge_search("brace tablosu")`

## ⚠️ Bakım Talimatı
1. Bu dosyada değişiklik yaptıysan → buraya changelog ekle
2. Master'daki brace tablosunu güncelle
3. Başka domain'i etkilediysen → o handoff'a da not ekle
4. Master'ı buraya kopyalama — master zaten okunmuş olacak

---

## Test Checklist

### Çark Çevir — manhattandan.com
- [ ] Sidebar'dan "Çarkı Çevir" ile açılıyor mu? (trigger butonu kaldırıldı, sidebar'dan açılıyor)
- [ ] Giriş yapılmamışken → çark bulanık + "Giriş Yap" butonu var mı?
- [ ] Giriş yapılıyken → ÇEVİR butonu direkt aktif mi? (email sormuyor)
- [ ] Sayfa yenilendikten hemen sonra çark tıklansa bile giriş algılanıyor mu? (Ecwid fallback)
- [ ] Mouse drag / touch swipe ile çark dönüyor mu?
- [ ] Hızlı fırlatma → otomatik spin tetikleniyor mu?
- [ ] Dönüş sırasında tık-tık sesi var mı?
- [ ] ÇEVİR butonunun altında "Ses Açık" butonu görünüyor mu?
- [ ] Ses Açık → tıkla → "Ses Kapalı" + ikon değişti mi?
- [ ] TEST: Birden fazla çevirme yapılabiliyor mu? (_TEST_MODE=true)
- [ ] Ses kapalıyken çevirince sessiz mi?
- [ ] Dönüş sırasında ✕ ve backdrop kapatma devre dışı mı?
- [ ] Ödül kartı + confetti + ekran sarsma efekti var mı?
- [ ] Kazanma sesi (artan notalar) çalıyor mu?
- [ ] Near-miss (segment 0/2) → "🔥 Çok yaklaştınız!" toast çıkıyor mu?
- [ ] Kupon kodu tıklanınca "Kopyalandı!" yazıyor mu?
- [ ] Çark durduğunda pointer'ın gösterdiği dilim, ödül kartındaki ödülle eşleşiyor mu?
- [ ] Geri sayım gösteriliyor mu? "Sonraki hak: X gün Y saat"
- [ ] Tekrar ÇEVİR → buton "ÇEVRİLDİ" + disabled mı?
- [ ] Sayfayı yenile → tekrar çevir → GAS "already_spun" dönüyor mu?
- [ ] SpinWheel sheet'te kayıt var mı?
- [ ] Ecwid Admin → Discount Coupons → SPIN-xxx kodu oluşmuş mu?
- [ ] %10 ödül nadiren mi çıkıyor? (weight: 1)

---


## SpinWheel Sheet Yapısı

### SpinWheel Sheet Yapısı
| Sütun | İçerik |
|-------|--------|
| A | email |
| B | week_key (Pazartesi tarihi: yyyy-MM-dd) |
| C | segment (0-7) |
| D | prize (dilim adı) |
| E | coupon_code (SPIN-XXXXXXXX) |
| F | created_at (ISO) |


## Changelog

### [2026-02-22] — Çark Çevir Widget v2

#### Yeni Dosya: spinwheel.js (GitHub Pages)
- Canvas tabanlı 8 dilimli çark, Manhattan gold tema, her dilim farklı renk
- **Canvas redraw** — CSS transform yerine her frame'de canvas yeniden çizilir (metin yönü her açıda doğru)
- Ecwid'ten email algılama: önce window._mlCache (widget.js), yoksa Ecwid.Customer.get fallback
- Giriş yoksa çark bulanık + "Giriş Yap" butonu → /account
- Email input YOK — giriş zorunlu, e-posta sormuyor
- requestAnimationFrame animasyon (7sn, ease-out deceleration)
- Tık-tık sesi (Web Audio API, dilim geçişlerinde)
- Kazanma sesi (artan nota dizisi)
- Ses toggle butonu (ÇEVİR altında): SVG hoparlör ikonu + "Ses Açık/Kapalı" yazısı, varsayılan açık
- Mouse drag + touch swipe ile çevirme (momentum → otomatik spin)
- Confetti particle efekti kazanma anında + ekran sarsma
- Near-miss toast: "🔥 Çok yaklaştınız!" (segment 0 veya 2'de)
- Haftalık geri sayım: "Sonraki hak: X saat Y dk" (24 saat limit)
- Spinning sırasında kapatma engeli (✕ gizlenir, backdrop tıklama devre dışı)
- Kupon kodu kopyalama (clipboard)
- Haftalık 1 hak — GAS'ta week_key kontrolü (localStorage YOK)
- Session flag (_spunSession) ile çift çevirme engeli (test modda devre dışı)
- Trigger butonu: pill "Çark Çevir" → 2.5sn sonra daireye küçülme (widget.js paterni), koyu altın tema
- Ses toggle: ÇEVİR butonunun yanında (aynı satır), "Ses Açık/Kapalı" SVG hoparlör ikon
- Çark boyutu: min(72vh, 72vw, 520px) desktop, 88vw mobile
- **TEST MODU:** spinwheel.js'te `_TEST_MODE=true` + GAS'ta `test=1` param → sınırsız çevirme
  - Canlıya geçerken: `_TEST_MODE=false` yap, GAS deploy güncelle
- Limit: 24 saatte 1 çevirme (canlıda). Countdown: "Sonraki hak: X saat Y dk"

#### Embed Yöntemi
Ecwid Admin → Ayarlar → Header meta tags and site verification:
```html
<script defer src="https://manhattanlikit.github.io/manhattan-widget/widget.js"></script>
<script defer src="https://manhattanlikit.github.io/manhattan-widget/spinwheel.js"></script>
```

#### GAS Eklemeleri
- **CONFIG:** SPIN_COUPON_VALIDITY_DAYS, SPIN_SEGMENTS (8 dilim + ağırlıklar), SPIN_NEAR_MISS_CHANCE (0.40), SPIN_NEAR_MISS_SEGMENTS
- **Route:** doGet → `action=spin&email=xxx`
- **handleSpin(email):** SpinWheel sheet kontrolü → _pickSpinPrize() → Ecwid kupon oluştur → sonuç döndür
- **_pickSpinPrize():** Ağırlıklı rastgele + %40 near-miss (büyük ödül yanı)
- **SpinWheel sheet:** email, week_key, segment, prize, coupon_code, created_at

> Çark dilimleri, ağırlıklar ve olasılıklar için → aşağıda "Olasılık Sistemi" tablosuna bak

#### Near-miss Psikolojisi
- %40 ihtimalle çark büyük ödülün hemen yanında (dilim 0 veya 2) durur
- angleOffset ile sınıra yakın konumlandırma (+14°..+22° veya -14°..-22°)
- Müşteri "az kaldı!" hissi yaşar → haftaya tekrar gelir
- Açı formülü: `target = 360 - segment*SA - SA/2` (CSS rotate saat yönü, canvas CCW)


### [2026-02-28] — Spin Admin Panel: Yeni Tasarım + Şablon Kaldırma

**spin.html tam yeniden tasarlandı (önceki oturumda):**
- PIN auth korundu, dark premium tema
- Master toggle satırı: Kupon Oluşturma ON/OFF, Test Modu ON/OFF
- Segment tablo: Ad (editable), Tip (dropdown), İndirim (number), Ağırlık (number), Olasılık (auto-calc), Aktif (toggle)
- Donut chart SVG görselleştirme
- Ayarlar: Cooldown (30dk–14 gün), Kupon Geçerlilik (1–30 gün), Near-Miss (0–80% slider)
- İstatistikler: Toplam spin, Son 7/30 gün, Son spinler listesi
- Sticky action bar: Kaydet/Sıfırla + kaydedilmemiş değişiklik uyarısı

**Bu oturumda:** Cömert/Dengeli/Tutucu şablonları tamamen kaldırıldı (CSS + HTML + JS applyPreset fonksiyonu + PRESETS objesi). Artık tüm oranlar elle ayarlanıyor.

### [2026-02-28] — Çark Çevir: Premium Redesign + Fizik Motoru + Sidebar Entegrasyonu

**spinwheel.js tamamen yeniden yazıldı (v3):**

**1. Trigger butonu kaldırıldı:**
- Sağ alttaki yuvarlak `.sw-trigger` buton tamamen silindi
- Çark sadece sidebar'daki "Çarkı Çevir" butonundan açılıyor (`openOverlay()`)

**2. Fizik tabanlı drag/swipe (yeni motor):**
- Önceki: Sürükle → eşik aşılırsa `swSpin()` çağır (mekanik, yapay hissedilir)
- Şimdi: Parmak/mouse açısal hızı 80ms pencerede örneklenir → ağırlıklı ortalama
  - `avgVel > 0.25` → `startMomentumThenSpin()`: momentum animasyonu + eşzamanlı API çağrısı
  - `avgVel < 0.25` → `startFreeSpin()`: serbest yavaşlama (sürtünme 0.96), spin tetiklenmez
  - API cevabı gelene kadar çark gerçek momentum ile dönmeye devam eder
  - Geçiş: momentum → hedef animasyona doğal (hile hissedilmez)

**3. Doğal hedef animasyonu:**
- Çoklu aşama easing: ilk %15 sabit hız → %85 üstel azalma (power 3.8)
- Son %8'de hafif titreme (wobble) — doğal duruş hissi
- Süre: 5–8sn rastgele (her spin farklı)
- Minimum 4 tur garanti

**4. Premium görsel tasarım:**
- Segment: radyal gradient bg + gold divider çizgileri + text shadow
- Merkez hub: 4 durak gold gradient + çift ring
- Altın çerçeve: `conic-gradient` ring + shimmer animasyonu
- Ambient sparkle: 20 parçacık canvas, `sw-glow-pulse` 3sn
- Confetti: 200 parçacık, 3 şekil (kare/daire/yıldız), ikinci dalga
- Win flash efekti: `.sw-flash` ring glow animasyonu

**5. Ödül kartı çark içinde:**
- Önceki: `sw-prize` ekran ortasında ayrı overlay
- Şimdi: `sw-prize-wrap` absolute inset:0 çark container'ı içinde, border-radius:50%
- Radyal blur background + card animasyonu

**6. Segment görsel haritası:**
| # | Label | Sub | BG | Text |
|---|-------|-----|-----|------|
| 0 | %3 | İNDİRİM | #1e1a14 | #d4b05e |
| 1 | HEDİYE | Manhattan | #3d0a12 | #ffd700 (grand) |
| 2 | %2 | İNDİRİM | #141820 | #7eb8da |
| 3 | KARGO | ÜCRETSİZ | #0f1f1a | #5ec4a0 |
| 4 | %5 | İNDİRİM | #221a10 | #e8c36a |
| 5 | TEKRAR | DENE | #1a1a1a | #888 |
| 6 | %10 | İNDİRİM | #1e1510 | #ffc857 |
| 7 | %3 | İNDİRİM | #181420 | #b08ed4 |

**widget.js + widgetwix.js — Sidebar spin bölümü eklendi:**
- CSS: `.ml-spin-sec`, `.ml-spin-btn`, `.ml-spin-badge`, `.ml-spin-cd`
- HTML: Doğum günü accordion'u altına, "Alışverişe Devam Et" butonunun üstüne
- "Çarkı Çevir" butonu → `openOverlay()` (spinwheel.js global fonksiyonu)
- Geri sayım timer: `_mlUpdateSpinCooldown()` → `_swGetCooldownEnd()` bridge
- Her iki dosya senkron

**Dosyalar:**
- widget.js
- widgetwix.js

**GAS yaması (önceki oturumda hazırlandı, deploy bekliyor):**
1. `handleSpin` ~satır 3161: `if (cfg.testMode !== true) {` — cooldown bypass (testMode açıkken)
2. `handleSpin` ~satır 3198: `cfg.couponCreationEnabled !== false &&` — kupon toggle
3. GAS brace güncellendi (yeni if bloğu eklendi)

**Kritik global fonksiyonlar (spinwheel.js → window):**
| Fonksiyon | Çağıran | Ne yapar |
|-----------|---------|----------|
| `openOverlay()` | widget.js sidebar butonu | Çark overlay'ini açar |
| `swClose()` | X butonu, backdrop click | Overlay'i kapatır |
| `swSpin()` | ÇEVİR butonu | Buton ile spin (API ramp animasyonu) |
| `_swGetCooldownEnd()` | widget.js cooldown timer | Cooldown bitiş timestamp'i döner |
| `_swIsSpunSession()` | widget.js | Bu session'da çevrildi mi? |
| `_swGetCountdownText()` | widget.js | Geri sayım metni |
| `_mlUpdateSpinCooldown()` | spinwheel.js result sonrası | Sidebar geri sayımını günceller |

### [2026-02-28] — Çark Çevir: CrazyTim Fizik Entegrasyonu + Widget Kaldırma

#### Değişen dosyalar
- `spinwheel.js` (914→940 satır) — Tüm fizik motoru yeniden yazıldı
- `widget.js` — `spinHtml` devre dışı (sidebar'da çark butonu kaldırıldı)
- `widgetwix.js` — `spinHtml` devre dışı (aynı)

#### spinwheel.js — CrazyTim/spin-wheel Entegrasyonu

**Kaldırılan eski mekanikler:**
- `vel*=0.995` exponential decay → sawtooth, frame-dependent
- `vel*16` frame-based velocity → 60fps/120fps fark ederdi
- `Math.abs(vel)` direction loss → geri sürükleyince ileri giderdi
- `rampSpeed+=0.3, max 12` frame-based ramp → dt bağımlı
- `tick()` her frame → buzzing ses
- Cubic Hermite easing + wobble → karmaşık, titreme riski

**Eklenen CrazyTim mekanikleri (MIT, v5.0.2 workout theme):**
- `_ctAngle()/_ctDiff()/_ctAdd()` — CrazyTim util fonksiyonları (birebir)
- `RESISTANCE=100` deg/sn² lineer sürtünme (exponential yerine)
- `SPEED_MAX=500` deg/sn hız sınırı
- `DRAG_PERIOD=250` ms (son 250ms mesafe → hız)
- `_startFreeSpin()` — bidirectional, sıfırda durur (ters yöne geçmez)
- `_easeSinOut(t) = sin(t*π/2)` — CrazyTim'in spinToItem easing'i
- Time-based fizik: `dt = (now-last)/1000` → frame rate bağımsız
- `dt<=0` guard: tüm animasyon döngülerinde
- `_tickSeg()` — sadece segment değiştiğinde ses (frame başına değil)

**Yeni dinamik segment desteği:**
- `window._swSetSegments(segs, fontScale)` — dışarıdan segment güncelleme
- `_fontScale` (0.5–2.0) — çark üzerindeki yazı boyutu çarpanı
- `_recalcSegments()` — N, SA, SAR otomatik yeniden hesap

#### Olasılık Sistemi (GAS tarafı, JS'yi ETKİLEMEZ)
Olasılıklar tamamen GAS `_pickSpinPrize()` fonksiyonunda hesaplanır. JS sadece GAS'ın döndüğü segment numarasına animasyon yapar. 8 dilim CrazyTim için idealdir.

> ⚠️ Aşağıdaki değerler `_SPIN_DEFAULT_CONFIG` varsayılanlarıdır. Canlı değerler PropertiesService'ten gelir (spin.html admin panelinden düzenlenebilir).

| Dilim | Weight | Gerçek olasılık |
|-------|--------|----------------|
| %3 İndirim | 25 | %26 |
| HEDİYE | 0 | %0 (nearMiss %40) |
| %2 İndirim | 25 | %26 |
| Ücretsiz Kargo | 15 | %15.6 |
| %5 İndirim | 15 | %15.6 |
| Tekrar Dene | 10 | %10.4 |
| %10 İndirim | 1 | %1 |
| %3 İndirim (mor) | 5 | %5.2 |

**nearMiss:** %40 şansla segment 0 veya 2'ye düşürür (HEDİYE'nin yanları) — "az kaldı" hissi verir.

#### Sidebar Çark Butonu — AKTİF

**widget.js + widgetwix.js:** `spinHtml` restore edildi. CSS, `_mlUpdateSpinCooldown` ve localStorage bridge çalışır durumda.

Cooldown timer: `ml-spin-cd` elementinde "Xs Ydk" formatında gösterilir. spinwheel.js yüklenmemişse localStorage'dan direkt okunur.
- `testMode` açıkken cooldown atlanır ama kupon oluşmaz (couponCreationEnabled ayrı kontrol)
- Kupon kodu ekranda çıkması için: couponCreationEnabled=ON + GAS Ecwid API erişimi aktif



### [2026-02-28] — Session 1–4: Fizik Motoru, Sesler, Chrome Fix, Admin, Auto-Deploy

#### 4 Oturum Özeti (20 commit)
Bu gün 4 ardışık oturumda çark sistemi büyük revizyondan geçti. Tüm değişiklikler aşağıda.

---

#### A. Fizik Motoru — Easing → Gerçek Fizik

**Sorun:** İleri çevirme "tak diye" duruyordu, geri çevirme doğal hissediyordu.
**Kök neden:** `_spinToTarget` easing curve (power 3.2) kullanıyordu, `_freeSpin` ise lineer sürtünme.
**Çözüm:** İleri çevirme de aynı fizik modeline geçti:

```
v² = v0² - 2ad
friction = v0² / (2 * distance)
her frame: speed -= friction * dt
```

- Handoff hızı (v0) momentum fazından alınır
- Mesafe: minimum 4 tam tur + hedef açı
- Sürtünme katsayısı otomatik hesaplanır → hedefe tam iner
- Min friction 5 deg/s² (sonsuz süre engeli)
- Güvenlik snap: hedef-2° içinde + hız < 10 → snap

**Dosya:** spinwheel.js `_spinToTarget()` ~satır 750-810

---

#### B. Geri Çevirme Popup — Premium Glass Card

**Sorun:** Geri çevirince siyah simsiyah ekran, popup görünmüyor.
**Çözüm:** `_showForwardHint()` → `_reverseNudge()` yeniden yazıldı:

- Yüksek direnç (400 deg/s²) ile hızlı fren
- Glass-card popup: `rgba(26,23,20,.92)` bg + `rgba(212,176,94,.3)` border
- Animated SVG el simgesi: saat yönünde sürükleme animasyonu
- "İleri Fırlat" + "Çevirmek için saat yönünde fırlat" alt metin
- 2.5sn sonra fade-out
- `border-radius:16px`, `backdrop-filter:blur(12px)`

**Dosya:** spinwheel.js `_showForwardHint()` ~satır 860-890

---

#### C. Yazı Flip Kaldırıldı

**Sorun:** Yazılar dönerken titreşiyor — flip logic her frame'de yön hesaplıyor.
**Çözüm:** `normA > π/2 && normA < π*1.5` flip koşulu tamamen kaldırıldı. Yazılar segmente sabit, dönerken yer değiştirmiyor. Sağ yarıdaki gibi tüm yazılar aynı yönde.

**Dosya:** spinwheel.js `drawWheel()` ~satır 298-310

---

#### D. Prize Card Daire İçine Sığdırma

**Sorun:** Ödül kartı daireden taşıyor, ring glow görünmüyor.
**Çözüm:**
- `.sw-prize-wrap`: `inset:0` → `inset:8%`, `border-radius:50%`, `overflow:hidden`
- Font küçültme: başlık 20→16px, alt 12→10px, kupon 20→14px
- Padding sıkıştırma: card 24→16px, code 12→8px, close 14→8px
- `.sw-prize-bg`: radyal gradient 88%→94% opasite

**Dosya:** spinwheel.js CSS ~satır 104-125

---

#### E. Cooldown localStorage Kalıcılığı

**Sorun:** Sayfa yenileyince cooldown sıfırlanıyor, tekrar çevirilebiliyor.
**Çözüm:**
- `setCooldown()`: `localStorage.setItem('sw_cooldown', timestamp)` kaydeder
- Sayfa yüklendiğinde: `localStorage.getItem('sw_cooldown')` → `_cooldownEnd` + `_spunSession=true` restore
- Süre dolunca: `localStorage.removeItem('sw_cooldown')` + `_spunSession=false`
- Sidebar bridge: spinwheel.js yüklenmemiş olsa bile `localStorage`'dan direkt okur

**Dosya:** spinwheel.js ~satır 1040-1060, widget.js ~satır 884-903

---

#### F. Chrome Kupon Görünmeme — Inline Style Force

**Sorun:** Chrome desktop'ta kupon kodu görünmüyor (Safari/iPhone'da çalışıyor).
**Kök neden:** CSS transition `visibility:hidden → visible` Chrome'da bazı durumlarda tetiklenmiyor.
**Çözüm:** Class yanı sıra inline style force:
```js
el.classList.add('show');
el.style.opacity='1';
el.style.visibility='visible';
el.style.pointerEvents='auto';
```
- `_hidePrize()` helper: classList.remove + inline style temizleme
- `openOverlay()`, `swClose()`, `swClosePrize()` → `_hidePrize()` kullanır

**Debug logları:** 9 adet `[SW]` prefix'li console.log var (production öncesi temizlenecek)

**Dosya:** spinwheel.js `showPrize()` ~satır 1010-1020, `_hidePrize()` ~satır 978

---

#### G. Ses Sistemi — 16 Tick + 8 Kutlama Preset

**Tick presets (16 adet):**
original, classic, soft, deep, mechanic, casino, roulette, wood, crystal, bell, marble, click, pop, chime, retro, glass

**Celebration presets (8 adet):**
fanfare, confetti, jackpot, elegant, triumph, sparkle, royal, arcade

Tümü Web Audio API oscillator tabanlı — harici dosya yok.

**Config akışı:**
1. spin.html → ses kartı seç → CFG.tickSound/celebSound güncelle
2. Kaydet → GAS spinSaveConfig → PropertiesService
3. Çark açılışta → spin-check → tickSound/celebSound döner
4. spinwheel.js → `_tickPreset`/`_celebPreset` günceller

**Dosya:** spinwheel.js `TICK_PRESETS`/`CELEB_PRESETS` ~satır 30-35, spin.html "Ses Ayarları" section

---

#### H. spin.html Geliştirmeleri

**Açık/Karanlık Mod:**
- `:root` = açık mod (varsayılan)
- `[data-theme="dark"]` = karanlık mod
- Header'da ay/güneş SVG toggle butonu
- `localStorage('spin-theme')` kalıcılık

**Segment Alt Metin Düzenleme:**
- Dilim tablosunda `seg-sub-input` eklendi (label altında)
- `readAllFromUI()` → `seg.sub` değerini okur
- GAS config'e kaydedilir → spinwheel.js'e yansır

**Yazı Boyutu Slider:**
- 0.5x – 2.0x aralığı, `fs-slider` range input
- `CFG.fontScale` → GAS kaydedilir → `spin-check` ile döner
- spinwheel.js `_fontScale` ile çark üzerinde uygulanır

**Test Modu Banner:**
- Kırmızı pulse animasyonlu uyarı banner: "TEST MODU AKTİF — Cooldown devre dışı, kuponlar test amaçlıdır"
- Test toggle açıkken görünür, kapatılınca gizlenir
- `renderToggles()` + `toggleMaster('test')` ile senkron

**Settings Grid:**
- Desktop 4 sütun, tablet 2, mobil 1

---

#### I. Dinamik Segment Metinleri (GAS → spinwheel.js)

**Akış:**
1. spin.html'de label + sub düzenle → Kaydet
2. GAS `spinSaveConfig` → config.segments[].label/sub kaydedilir
3. spinwheel.js açılışta `_fetchTestMode()` → `spin-check` çağırır
4. GAS `segTexts` + `fontScale` döner
5. spinwheel.js SEGS[].label/sub günceller + `drawWheel()` yeniden çizer

**GAS spin-check response:**
```json
{
  "ok": true,
  "testMode": false,
  "tickSound": "original",
  "celebSound": "fanfare",
  "segTexts": [{"label":"%3","sub":"İNDİRİM"}, ...],
  "fontScale": 1.0
}
```

**Dosya:** GAS ~satır 898, spinwheel.js `_fetchTestMode()` ~satır 870

---

#### J. GAS Auto-Deploy (GitHub Actions)

**Sorun:** GAS güncellemeleri manuel kopyala-yapıştır gerektiriyordu.
**Çözüm:** GitHub Actions + clasp:

1. `.github/workflows/gas-deploy.yml` → `MANHATTAN_LIKIT_FINAL.gs` değişince tetiklenir
2. `npm install -g @google/clasp` → clasp kurulur
3. `CLASPRC` GitHub Secret'tan `~/.clasprc.json` oluşturulur
4. `clasp push --force` → Apps Script güncellenir

**Gereksinimler:**
- GitHub Secret `CLASPRC`: clasp OAuth token JSON
- `appsscript.json`: GAS manifest (repo kökünde)
- Apps Script API: https://script.google.com/home/usersettings → Açık
- Script ID: `1eY5Rh8AYTroa1QB3gqHLeXSo7yenQFMjPcawbfC0bLMjH9LGBD65cah3`

**Mac yedek:**
- `~/gas-manhattan/` dizini: `clasp clone` ile oluştu
- Alias: `gaspush` → curl + clasp push
- Crontab (opsiyonel): Her 2dk kontrol

---

#### K. Kontrol Akışı + Buton/Mesaj Aralıkları

- `.sw-controls`: `gap:14px`, `margin-top:22px` (önceki: 10px, 18px)
- Buton, ses toggle ve mesaj alanı iç içe geçme sorunu çözüldü

---

#### Commit Zinciri (bu oturum)
| Commit | Açıklama |
|--------|----------|
| `a2fadc1` | 4 kritik bug: tanımsız fonksiyonlar, tick buzzing, geri spin, hız süreksizliği |
| `8a36c24` | Buton kilitleme, ters yazılar, minimum fırlatma, grand type, NaN guard |
| `f74224a` | Sidebar çark accordion + çapraz kapatma |
| `dc38224` | Fırlatma hızı + Kapat butonu + SPEED_MAX |
| `5612a14` | Orijinal dur formülü geri, Chrome kupon null guard |
| `7f6d77e` | Chrome kupon kodu + doğal durma wobble |
| `5ce7f9b` | Doğal yavaşlama easing + Chrome kupon try-catch |
| `d897cdc` | spin.html açık/karanlık mod + ses seçici |
| `8a85d8f` | Fizik tabanlı duruş + geri çevir popup + 16 tick/8 kutlama + kupon debug |
| `55bb609` | Yazı flip + prize daire içi + cooldown localStorage + sub edit |
| `3f1bb1b` | Dinamik yazılar + font slider + test badge |
| `f4fbde6` | Chrome kupon inline style force + _hidePrize helper |
| `c2bfe93` | GAS dosyası repo'ya eklendi |
| `642ecc4` | GitHub Actions GAS auto-deploy |
| `8951420` | appsscript.json + workflow düzeltme |

#### Güncel Dosya Durumları
| Dosya | Satır | Brace |
|-------|-------|-------|
| spinwheel.js | 1139 | 323/323 |
| spin.html | 932 | 280/280 |
| MANHATTAN_LIKIT_FINAL.gs | 3488 | 700/700 |

#### Kalan İşler
| # | İş | Öncelik |
|---|-----|---------|
| 1 | Wix versiyonu (widgetwix.js'e spinwheel entegrasyonu) | Gelecek |

#### Test Checklist (Güncellenmiş)
- [ ] İleri çevirme: fizik tabanlı doğal yavaşlama (geri ile aynı his)
- [ ] Geri çevirme: kısa fren + glass-card "İleri Fırlat" popup + el animasyonu
- [ ] Yazılar dönerken sabit (titreşim yok)
- [ ] Prize card daire içinde, ring glow görünüyor
- [ ] Chrome desktop: kupon kodu görünüyor
- [ ] Safari/iPhone: kupon kodu görünüyor
- [ ] Sayfa yenile → cooldown devam ediyor (localStorage)
- [ ] spin.html: dilim alt metin düzenleme çalışıyor
- [ ] spin.html: yazı boyutu slider → çarkta yansıyor (GAS deploy sonrası)
- [ ] spin.html: test modu aç → kırmızı banner
- [ ] spin.html: açık/karanlık mod toggle
- [ ] spin.html: 16 tick ses preview + seçim
- [ ] spin.html: 8 kutlama ses preview + seçim
- [ ] GAS auto-deploy: GitHub push → Actions yeşil tik
- [ ] Sidebar countdown: cooldown süresi görünüyor
