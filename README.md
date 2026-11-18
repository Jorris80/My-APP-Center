# MY APP CENTER — PWA Wrapper (GitHub Pages)

Lima berkas ini adalah pembungkus PWA untuk portal **MY APP CENTER** yang berjalan di Google Apps Script. Dengan wrapper ini portal bisa di-*install* di HP/PC, katalog publik tetap bisa dibuka saat offline, dan tombol **Back** tidak menutup aplikasi.

| Berkas | Fungsi |
|---|---|
| `index.html` | Shell PWA: memuat Web App GAS di iframe, katalog offline, penjaga tombol Back, tombol install |
| `manifest.json` | Identitas PWA (nama, ikon, warna, mode standalone, shortcut "Katalog cepat") |
| `sw.js` | Service worker: cache shell + salinan katalog publik untuk mode offline |
| `icon.svg` | Ikon aplikasi (vektor, dipakai untuk semua ukuran) |
| `README.md` | Panduan ini |

## Cara memasang (± 5 menit)

1. Selesaikan deploy Web App GAS dulu (lihat Panduan PDF bab 3–4). Salin URL yang berakhiran **`/exec`**.
2. Buat repository baru, misalnya `gas-app-directory` (Public). Unggah kelima berkas ini ke root repository.
3. Buka `index.html` di GitHub (ikon pensil), cari baris berikut:
   ```js
   window.MAC_GAS_URL = '';
   ```
   lalu isi dengan URL `/exec` Anda dan **Commit**.
4. Buka **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save**.
5. Tunggu 1–2 menit, lalu buka `https://<username>.github.io/gas-app-directory/`.

> Kalau URL belum diisi di langkah 3, halaman akan meminta URL saat pertama dibuka. URL itu tersimpan di perangkat tersebut saja. Bisa juga lewat parameter `?gas=<URL /exec>`.

## Fitur

- **Install**: Chrome/Edge (Android, Windows, macOS) akan menampilkan tombol ⤓. Di iPhone, pakai Safari → Bagikan → *Add to Home Screen*.
- **Offline**: setiap kali dibuka saat online, katalog aplikasi berstatus *Publik* diunduh dari `…/exec?api=public` dan disimpan. Saat offline, daftar ini tetap bisa dicari dan difilter. Aplikasi GAS tujuan tetap butuh internet untuk dibuka.
- **Katalog cepat**: tombol ☰ di pojok kanan bawah, atau shortcut ikon "Katalog cepat" (`?mode=catalog`).
- **Back aman**: di halaman awal, tekan Back sekali untuk memunculkan konfirmasi. Tekan sekali lagi dalam 2 detik untuk keluar.

## Keamanan & batasan

- GitHub Pages adalah hosting **statis dan publik**. Jangan simpan token, password, atau data rahasia di repository ini.
- Hanya aplikasi dengan visibilitas **Publik** yang masuk ke katalog offline. Aplikasi *Internal* dan *Privat* tetap butuh login di portal GAS.
- Menyimpan URL tidak berarti memberi hak akses. Izin tetap mengikuti pengaturan deployment masing-masing aplikasi GAS.
- Kebijakan GitHub Pages tidak mengizinkan Pages dipakai terutama untuk transaksi komersial atau SaaS berbayar. Pakai wrapper ini sebagai peluncur portal milik organisasi Anda sendiri.

## Memperbarui

Kalau `sw.js` diubah, naikkan juga `VERSION` di baris pertama (misalnya `mac-v1.0.1`) agar cache lama diganti.

---
MY APP CENTER v1.0.0 · Google Apps Script + Google Sheets + GitHub Pages
