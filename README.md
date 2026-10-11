# Untuk Orang Tersayang — versi per halaman

Website hadiah personal yang responsif untuk HP, tablet, dan desktop. Proyek ini adalah rekonstruksi mandiri, bukan source code asli situs referensi.

## Cara menjalankan
1. Ekstrak ZIP.
2. Buka `index.html` di browser untuk tes lokal.
3. Untuk membagikan ke orang lain, unggah seluruh folder proyek ke hosting statis seperti Vercel. Tidak ada fitur/form upload di website; aset ditaruh ke folder proyek terlebih dahulu.
4. Edit `script.js` untuk mengganti nama, isi surat, caption, dan teks.

## Urutan halaman
1. Pembuka.
2. Hal-hal kecil yang membuat seseorang berarti.
3. Surat interaktif.
4. Memory Wall berbentuk buku: tekan **Buka buku**, lalu gunakan tombol halaman berikutnya/sebelumnya untuk membalik lembar.
5. Pesan suara.
6. Penutup dengan tombol **Lihat lagi dari awal** dan **Lanjut ke video**.
7. Video Diary bergaya feed vertikal seperti aplikasi video pendek, dengan tombol Kembali, caption, profil, Like, Comment, dan Share. Feed bisa digeser/scroll ke atas-bawah.

## Nama file aset — taruh dengan nama yang sama
### Foto: `assets/photos/`
- `foto-utama.jpg` — foto utama halaman pembuka.
- `kenangan-1.jpg`
- `kenangan-2.jpg`
- `kenangan-3.jpg`
- `kenangan-4.jpg`
- `kenangan-5.jpg`
- `kenangan-6.jpg` — enam foto untuk halaman-halaman buku Memory Wall.
- `video-cover-1.jpg`
- `video-cover-2.jpg`
- `video-cover-3.jpg`
- `video-cover-4.jpg`
- `video-cover-5.jpg` — poster opsional untuk lima video.

### Video: `assets/videos/`
- `video-1.mp4`
- `video-2.mp4`
- `video-3.mp4`
- `video-4.mp4`
- `video-5.mp4`

Gunakan video vertikal 9:16 agar cocok di layar HP. Jika file belum ada, halaman akan menampilkan placeholder berisi nama file yang perlu ditambahkan.

### Audio: `assets/music/`
- `musik-latar.mp3` — musik tombol di header.
- `pesan-suara.mp3` — audio pada halaman pesan suara.
- `audio-video.mp3` — musik terpisah untuk halaman video diary.

**Audio video OFF secara default.** Kelima elemen video menggunakan `muted` dan tidak menyalakan suara videonya. Tombol **Audio off** mengontrol file MP3 terpisah `audio-video.mp3`, dan audio itu baru menyala setelah tombol ditekan.

## Cara edit konten
Buka `script.js`, lalu ubah objek `CONFIG` di bagian atas. Nama penerima ada di `recipientName`, surat di `letterTitle`, `letterPreview`, `letterBody`, dan `letterSignoff`, serta musik di `backgroundMusic`, `voiceMessage`, dan `videoMusic`.

Caption setiap video dapat diedit langsung di `index.html`, pada elemen `<p>` di dalam `.short-caption`. Tombol Like berfungsi untuk mengubah status suka; Comment membuka prompt untuk menulis komentar; Share menggunakan menu berbagi perangkat jika didukung.

## Struktur folder
- `index.html` — isi semua halaman dan markup.
- `style.css` — desain, animasi buka buku, feed video, dan responsivitas.
- `script.js` — pengaturan konten dan interaksi.
- `assets/photos/` — foto.
- `assets/videos/` — lima video.
- `assets/music/` — tiga file MP3.

Foto, video, dan MP3 tidak disertakan dalam ZIP; masukkan file milikmu dengan nama di atas. Pastikan kamu memiliki izin untuk memakai media tersebut.


## Pembaruan versi romantis
- Teks sudah diubah menjadi surat untuk mantan tersayang, berisi rasa cinta dan terima kasih atas 10 bulan bersama, tanpa menekan penerima untuk kembali.
- Halaman surat sampai penutup dibuat lebih rapat dan footer global disembunyikan agar tidak menyisakan ruang kosong.
- Halaman video tampil penuh layar: hanya video vertikal dan tombol **Kembali**. Tidak ada header, tombol audio, atau footer.
- Video tetap muted. File `assets/music/audio-video.mp3` mulai dicoba diputar setelah pengunjung mengetuk feed video; beberapa browser mungkin memerlukan ketukan tambahan.
- Lima video tetap memakai nama `assets/videos/video-1.mp4` sampai `video-5.mp4`.


## Pembaruan musik dan perlindungan aset
- Musik latar sekarang dicoba autoplay saat website dibuka, tombol di header tetap dapat menjeda/memutar musik. Jika browser memblokir autoplay audio, musik akan dicoba kembali setelah interaksi pertama pengguna.
- Saat halaman Video Diary dibuka, musik latar dihentikan dan `audio-video.mp3` dicoba diputar. Saat kembali, audio-video dihentikan dan musik latar dicoba diputar lagi jika sebelumnya memang aktif.
- Menu klik-kanan dan drag pada media serta beberapa pintasan simpan/sumber diblokir sebagai penghalang ringan. **Ini tidak bisa menjamin aset tidak dapat diunduh**: foto, video, dan audio yang dikirim ke browser dapat disalin melalui Developer Tools, cache, atau permintaan jaringan. Untuk perlindungan lebih kuat, jangan publikasikan file sensitif; gunakan autentikasi/akses terbatas dan URL bertanda tangan atau streaming dengan kontrol akses di server.
