# Hero Admin Process

## 1. Muc tieu

Can dua phan hero `fc02bf0` trong `bladehub/index.html` ve mo hinh co the tu quan ly bang admin, theo cach du an `C:\Users\Admin\Desktop\kenbarbershop` dang quan ly banner.

Ban muon tu sua trong admin:

- banner / anh hero
- location label
- address
- email
- phone
- cac chu trong `class="tp-tab-title"` nhu `BARBERING`
- canh banner can doi deu 2 ben

## 2. Ket qua scan `kenbarbershop`

### Admin hien co

`kenbarbershop/admin.html` hien chi quan ly:

- login admin
- upload banner
- edit alt text
- active / inactive banner
- delete banner

Du lieu banner dang doc / ghi qua:

- `kenbarbershop/admin.html`
- `kenbarbershop/static/js/supabase-config.js`
- bang Supabase `banners`

### Du lieu thong tin site hien co

`kenbarbershop/config.json` dang chua:

- `contact.email`
- `contact.phone`
- `contact.address`
- `branches[*].address`
- `branches[*].phone`
- `branches[*].mapLink`
- `branches[*].bookingLink`

### JS dang day du lieu len giao dien

`kenbarbershop/template-loader.js` dang cap nhat:

- email qua selector `a[href^="mailto:"]`
- phone qua selector `a[href^="tel:"]`
- address qua noi dung text dang match pattern
- map link / booking link

Ket luan:

- `kenbarbershop` da co luong admin cho banner
- `kenbarbershop` da co luong config cho contact info
- nhung chua co admin rieng cho cac text trong hero tab nhu `BARBERING`

## 3. Hien trang `bladehub` tai `fc02bf0`

Trong `bladehub/index.html`, section:

- `elementor-element-fc02bf0`

dang hard-code truc tiep:

- anh banner qua `data-lazyload="./images-tatabarber/banner01.jpg"`
- `data-title="BARBERING"`
- text `BARBERING`
- text `GROOMING & SHAVING`
- text `MANICURE & SPA`
- text `LOCATION`
- address
- email
- phone

Vi du cac node dang hard-code:

- `rs-slide[data-key="rs-7"]`
- `rs-slide[data-key="rs-10"]`
- `.tp-tab-title`
- `a[href^="tel:"]`
- `a[href^="mail:"]`
- `rs-layer` chua address / location text

Ket luan:

- hien tai `bladehub` chua co data model de admin sua hero
- muon sua duoc trong admin thi phai tach du lieu khoi HTML

## 4. Quy trinh can sua

### Buoc 1: Tao data model cho hero

Can them 1 cau hinh rieng cho hero, khuyen nghi dat ten:

- `heroSettings`
- `heroSlides`

Neu di theo file config:

- tao `hero-config.json`

Neu di theo Supabase:

- tao bang `hero_settings`
- tao bang `hero_slides`

De xai giong `kenbarbershop`, nen uu tien Supabase.

### Buoc 2: Dinh nghia field admin can sua

Khuyen nghi toi thieu:

#### `hero_settings`

- `location_label`
- `hero_max_width`
- `hero_padding_left`
- `hero_padding_right`
- `hero_center_mode`

#### `hero_slides`

- `sort_order`
- `active`
- `title`
- `subtitle`
- `tab_title`
- `image_url`
- `thumb_url`
- `location_title`
- `address_html`
- `email`
- `phone`

Neu ban muon tung slide co contact rieng thi de contact trong `hero_slides`.
Neu ban muon contact dung chung cho tat ca slide thi de contact trong `hero_settings`.

### Buoc 3: Mo rong admin

Can mo rong `admin.html` theo 2 nhom:

1. Banner manager
2. Hero content manager

Trong admin, can them form cho:

- title / tab title
- subtitle
- image_url
- location label
- address
- email
- phone
- sort order
- active

UI goi y:

- danh sach slide ben duoi
- form edit o modal hoac card rieng
- 1 nut `Save hero content`

### Buoc 4: Frontend binding cho `bladehub`

Can viet 1 file loader tuong tu `template-loader.js`, vi du:

- `bladehub-hero-loader.js`

Loader nay se:

1. fetch `hero_settings`
2. fetch `hero_slides`
3. map du lieu vao section `fc02bf0`
4. rebuild `rs-slide`
5. rebuild `tp-tab-title`
6. cap nhat `tel`, `mailto`, `address`, `location`

Khong nen sua text bang replace string nhu i18n dang lam.
Can target dung node slider de tranh vo layout.

### Buoc 5: Canh banner cach deu 2 ben

Hien tai slider wrap dang co:

- `max-width:1820px;`
- `margin:0px auto;`

De canh deu 2 ben, can khoa lai 3 diem:

1. wrapper center:
   `margin-left:auto; margin-right:auto;`

2. content side padding doi xung:
   left va right phai dung cung 1 bien cau hinh, vi du:
   `--hero-side-gap`

3. text layer offset doi xung:
   cac gia tri `xo:` va `x:r` trong Revolution Slider dang hard-code.
   Neu khong rebuild slider data, ban se khong admin duoc phan canh le nay.

Khuyen nghi:

- dua `side_gap_desktop`
- `side_gap_tablet`
- `side_gap_mobile`

vao `hero_settings`

## 5. Pham vi sua de dat dung yeu cau

De ban tu cau hinh duoc trong admin, can sua it nhat cac file sau:

- `bladehub/index.html`
- tao file loader moi cho hero
- tao admin page moi hoac mo rong admin hien co
- tao schema Supabase cho `hero_settings` va `hero_slides`

Neu muon muon dung lai mo hinh `kenbarbershop`, map nhu sau:

- banner image: hoc theo `banners`
- contact info: hoc theo `config.json` + `template-loader.js`
- hero text / tab title: phai them moi, vi `kenbarbershop` chua co

## 6. Ket luan ky thuat

`kenbarbershop` hien chi cho ban mo hinh de hoc:

- admin upload banner
- contact info config-driven

No chua du de ban sua truc tiep hero `fc02bf0` cua `bladehub` trong admin.
De dat dung muc tieu, can them 1 lop quan tri moi cho hero content.

## 7. De xuat implementation

Neu lam dung huong, toi de xuat:

1. Tao `hero_settings` + `hero_slides` trong Supabase
2. Mo rong `admin.html` thanh them tab `Hero`
3. Tao `bladehub-hero-loader.js`
4. Cat toan bo text hard-code trong `fc02bf0` thanh placeholder co `data-*`
5. Render lai slides + tabs tu data admin

Huong nay dung hon so voi tiep tuc hard-code trong `index.html`, vi:

- ban tu sua duoc trong admin
- co the doi banner ma khong sua code
- co the doi `location / email / phone / tp-tab-title`
- co the canh deu 2 ben bang config thay vi sua tay trong HTML

