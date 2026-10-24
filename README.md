# Form Nama Telegram (Vercel)

## File
- `index.html`: halaman form yang mengirim nama ke endpoint `/api/send-report`.
- `api/send-report.js`: endpoint server Vercel yang mengirim pesan ke Telegram.

## Konfigurasi Vercel (token jangan ditaruh di HTML/GitHub)
Di Vercel → proyek → Settings → Environment Variables, tambahkan:
- `TELEGRAM_BOT_TOKEN` = token bot dari BotFather
- `TELEGRAM_CHAT_ID` = ID chat tujuan (akun pribadi atau grup yang menerima pesan)

Pilih environment Production (tambahkan Preview juga bila diperlukan), simpan, lalu lakukan Redeploy.

## Mendapatkan chat ID
1. Buka bot Telegram Anda dan tekan Start, atau tambahkan bot ke grup tujuan.
2. Kirim pesan ke bot/grup.
3. Gunakan metode tepercaya untuk melihat update bot dan menemukan `message.chat.id`. Jangan kirim token kepada siapa pun.

## Catatan
- Username bot seperti `@nama_bot` bukanlah token dan tidak cukup untuk autentikasi API.
- Jangan pernah memasukkan token ke file HTML atau membagikannya di chat.
- Form ini mengirim nama depan dan nama belakang yang pengguna masukkan ke chat Telegram yang dikonfigurasi.
