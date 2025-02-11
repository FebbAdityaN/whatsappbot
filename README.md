# WhatsApp Bot dengan Lib dari @mengkodingan/ckptw

> **Catatan:** Skrip ini mungkin tidak akan terlalu sering di-update, karena tergantung mood hehe.

## Deskripsi

`whatsappbot` adalah Bot WhatsApp yang menggunakan library dari [@mengkodingan/ckptw](https://github.com/mengkodingan/ckptw). Fitur yang tersedia Sticker, Eval dan Game Hangman.

## Cara Install

Ikuti langkah-langkah berikut untuk menginstall `whatsappbot`:

```bash
apt install ffmpeg
git clone https://github.com/FebbAdityaN/whatsappbot
cd whatsappbot
npm i
```
### Konfigurasi

Dilanjutkan dengan Konfigurasi.
Atur `config.js` lalu sesuaikan konfigurasi seperti Nomor Bot, Nomor Owner, dll.
```javascript
global.config = {
	ownerNumber: "",
	botNumber: "",
	ownerName: "",
	botName: "",
	stickerPack: "",
	stickerAuthor: "",
	usePairingCode: true
}
```

## Menjalankan Bot

Setelah konfigurasi selesai, Anda dapat menjalankan bot dengan cara berikut:

```bash
npm start
```

## Autentikasi WhatsApp

- Setelah bot dijalankan, kode pairing akan ditampilkan di terminal.
- Buka aplikasi WhatsApp di ponsel, pilih menu **Perangkat Tertaut**, lalu ketuk **Tautkan Perangkat**.
- Masukkan kode pairing yang ditampilkan di terminal untuk menautkan akun WhatsApp dengan bot.

Setelah proses autentikasi berhasil, bot siap untuk digunakan.

### Dokumentasi Lengkap

Untuk informasi lebih lanjut mengenai penggunaan library `@mengkodingan/ckptw`, kunjungi [dokumentasi ckptw](https://ckptw.mengkodingan.my.id/).

## Kontribusi

Jika kamu menemukan Error atau ingin menambahkan fitur baru, jangan ragu untuk membuka Issue atau mengirimkan Pull Request.

### Best Regards

> Skrip ini terinspirasi dari [JastinXyz/cukuftawu](https://github.com/JastinXyz/cukuftawu). Skrip ini adalah versi JavaScript nya, tetapi Command disini saya buat menggunakan `Switch Case`

## Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE).