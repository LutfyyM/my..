/* =========================================================
   EDIT KONTEN WEBSITE DI BAGIAN CONFIG DI BAWAH INI.
   Foto: taruh di assets/photos/ dengan nama sesuai config.
   Musik/pesan suara: taruh file MP3 di assets/music/.
   ========================================================= */
const CONFIG = {
  brand: "untuk Nayku,",
  recipientName: "Nayku,",
  heroMessage: "Sepuluh bulan bersamamu mengajarkanku banyak hal tentang bahagia, sabar, dan mencintai. Apa pun yang terjadi sekarang, aku tidak menyesal pernah memilihmu.",
  heroPhoto: "assets/photos/foto-utama.jpg",
  letterTitle: "Untuk Nayku.",
  letterPreview: "Kaka bingung mau banyak bicara apa ke kamu, tapi percaya lah, kaka sayang banget sama kamu...",
  letterBody: `Hai, Naela.

Kaka bingung mau banyak bicara apa ke kamu, tapi percaya lah, kaka sayang banget sama kamu.

kaka sangat mencintaimu. bahkan ketika keadaan tidak lagi sama seperti dulu, perasaan itu tidak bisa begitu saja kuanggap tidak pernah ada. Kamu pernah menjadi orang yang kucari saat ada kabar baik, orang yang ingin kuceritakan hal-hal kecil, dan seseorang yang kehadirannya bisa membuat hariku terasa lebih lengkap.

kaka kangen banyak hal tentang kita. bukan hanya momen bahagia, tetapi juga perjalanan yang membuat kita belajar saling mengenal. Kalau selama bersama ada kata atau sikapku yang menyakitimu, kaka minta maaf ya. kaka tahu cinta tidak selalu cukup untuk membuat semuanya berjalan seperti yang kita harapkan, tetapi cinta kaka kepada kamu tetap nyata.

kaka tidak menulis ini untuk memaksamu kembali atau meminta apa pun darimu. Aku hanya ingin kamu tahu betapa tulusnya rasa sayangku, dan betapa berarti sepuluh bulan itu bagiku. terima kasih ya de pernah menjadi bagian dari hidupku, pernah menggenggam hari-hariku, dan pernah membuatku merasa begitu beruntung.

di mana pun kamu berada dan bagaimana pun cerita kita berlanjut, kaka berharap kamu bahagia, sehat, dan selalu dikelilingi kebaikan. Jika suatu hari kamu mengingat kita, semoga yang tersisa bukan hanya sedih, tetapi juga senyum kecil karena kita pernah memiliki sesuatu yang indah.

kaka cinta banget sama kamu. Dan sepuluh bulan itu akan selalu menjadi bagian cerita yang kaka dengan penuh rasa syukur.

Have a nice day, nayku..`,
  letterSignoff: "♡",
  closingMessage: "Nayku, aku sangat mencintaimu. Terima kasih telah menemaniku selama sepuluh bulan yang begitu berarti. Jika kini kita berjalan di arah berbeda, aku tetap mendoakan yang terbaik untukmu. Kamu pernah menjadi bagian indah dalam hidupku, dan kenangan itu akan selalu kujaga.",
  backgroundMusic: "assets/music/musik-latar.mp3",
  voiceMessage: "assets/music/pesan-suara.mp3",
  videoUrl: "",
  videoMusic: "assets/music/audio-video.mp3",
  reasons: [
    { title: "Caramu hadir", text: "Kadang, kehadiranmu saja sudah cukup membuat hari terasa lebih ringan.", icon: "☼" },
    { title: "Tawa kecilmu", text: "Ada hal sederhana dari tawamu yang mudah sekali membuatku ikut bahagia.", icon: "✿" },
    { title: "Menjadi dirimu", text: "Kamu tidak harus menjadi sempurna untuk menjadi seseorang yang berharga.", icon: "♡" }
  ]
};

const $ = (id) => document.getElementById(id);
$("brandName").textContent = CONFIG.brand;
$("recipientName").textContent = CONFIG.recipientName;
$("heroMessage").textContent = CONFIG.heroMessage;
$("heroPhoto").src = CONFIG.heroPhoto;
$("letterTitle").textContent = CONFIG.letterTitle;
$("letterPreview").textContent = CONFIG.letterPreview;
$("letterBody").textContent = CONFIG.letterBody.replace(/\\n/g, "\n");
$("letterSignoff").textContent = CONFIG.letterSignoff;
$("closingMessage").textContent = CONFIG.closingMessage;
$("year").textContent = new Date().getFullYear();

const bgMusic = new Audio(CONFIG.backgroundMusic);
bgMusic.loop = true;
bgMusic.volume = 0.35;
let musicPlaying = false;
let backgroundWasPlaying = true;
function syncMusicButton(playing) {
  musicPlaying = playing;
  $("musicIcon").textContent = playing ? "Ⅱ" : "♫";
  $("musicLabel").textContent = playing ? "Jeda musik" : "Putar musik";
  $("musicToggle").setAttribute("aria-label", playing ? "Jeda musik" : "Putar musik");
}
async function playBackgroundMusic() {
  try { await bgMusic.play(); syncMusicButton(true); return true; }
  catch { syncMusicButton(false); return false; }
}
function pauseBackgroundMusic() {
  bgMusic.pause(); syncMusicButton(false);
}
// Coba autoplay saat halaman dibuka. Browser yang memblokir autoplay audio
// akan memulai musik setelah interaksi pertama pengguna.
playBackgroundMusic();
["pointerdown", "keydown", "touchstart"].forEach(type => {
  document.addEventListener(type, () => {
    if (!document.body.classList.contains("video-page-active") && bgMusic.paused && backgroundWasPlaying) playBackgroundMusic();
  }, { once: true, passive: true });
});
$("musicToggle").addEventListener("click", async () => {
  if (musicPlaying && !bgMusic.paused) {
    backgroundWasPlaying = false;
    pauseBackgroundMusic();
  } else {
    backgroundWasPlaying = true;
    await playBackgroundMusic();
  }
});

const envelope = $("envelopeButton");
const modal = $("letterModal");
envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  $("envelopeHint").textContent = "SURAT TERBUKA ♡";
  window.setTimeout(() => { modal.classList.add("show"); modal.setAttribute("aria-hidden", "false"); }, 450);
});
function closeLetter() {
  modal.classList.remove("show"); modal.setAttribute("aria-hidden", "true");
}
document.querySelectorAll("[data-close-letter]").forEach(el => el.addEventListener("click", closeLetter));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLetter(); });
$("startButton").addEventListener("click", () => window.showGiftPage?.(1));
$("replayButton").addEventListener("click", () => window.showGiftPage?.(0));
$("closingNextButton").addEventListener("click", () => window.showGiftPage?.(6));
$("voiceAudio").src = CONFIG.voiceMessage;



/* MODE HALAMAN: setiap bagian tampil sendiri dengan tombol Selanjutnya */
(function setupPageNavigation(){
  const pageIds = ["home","little-things","letter","memories","voice","closing","videos"];
  const pages = pageIds.map(id => document.getElementById(id)).filter(Boolean);
  if (!pages.length) return;
  document.body.classList.add("paged-mode");
  let currentPage = 0;

  pages.forEach((page, index) => {
    page.classList.toggle("active-page", index === 0);
    if (page.id === "videos") return;
    const nav = document.createElement("nav");
    nav.className = "page-navigation";
    nav.setAttribute("aria-label", "Navigasi halaman");
    const back = document.createElement("button");
    back.className = "page-back";
    back.type = "button";
    back.textContent = index === 0 ? "♡ Dari awal" : "← Sebelumnya";
    back.disabled = index === 0;
    if (index === 0) back.style.visibility = "hidden";
    const counter = document.createElement("span");
    counter.className = "page-counter";
    counter.textContent = String(index + 1).padStart(2,"0") + " / " + String(pages.length).padStart(2,"0");
    const next = document.createElement("button");
    next.className = "page-next";
    next.type = "button";
    next.textContent = index === 5 ? "Lanjut ke video →" : (index === pages.length - 1 ? "Ulangi dari awal ↻" : "Selanjutnya →");
    back.addEventListener("click", () => showPage(index - 1));
    next.addEventListener("click", () => showPage(index === pages.length - 1 ? 0 : index + 1));
    if (index === 5) nav.append(back, counter);
    else nav.append(back, counter, next);
    page.appendChild(nav);
  });

  window.showGiftPage = showPage;
  function showPage(index) {
    currentPage = Math.max(0, Math.min(index, pages.length - 1));
    pages.forEach((page, i) => {
      page.classList.toggle("active-page", i === currentPage);
      page.setAttribute("aria-hidden", i === currentPage ? "false" : "true");
    });
    window.scrollTo({top: 0, behavior: "smooth"});
    const active = pages[currentPage];
    const heading = active.querySelector("h1,h2");
    if (heading) heading.setAttribute("tabindex","-1");
    if (active.id === "videos") {
      document.body.classList.add("video-page-active");
      backgroundWasPlaying = backgroundWasPlaying || musicPlaying || !bgMusic.paused;
      pauseBackgroundMusic();
      window.startVideoDiaryAudio?.();
      const firstVideo = document.querySelector("#shortsFeed .short-video video");
      if (firstVideo) {
        firstVideo.muted = true;
        if (firstVideo.readyState === 0) firstVideo.load();
        firstVideo.play().catch(() => {});
      }
    } else {
      document.body.classList.remove("video-page-active");
      document.querySelectorAll("#shortsFeed video").forEach(video => video.pause());
      window.stopVideoDiaryAudio?.();
      if (backgroundWasPlaying) playBackgroundMusic();
    }
  }
})();


/* BUKU KENANGAN: sampul terbuka, halaman dapat dibalik. */
(function setupMemoryBook(){
  const memories = [
    {left:"assets/photos/kenangan-1.jpg", right:"assets/photos/kenangan-2.jpg", leftText:"Hari yang ingin kuingat", rightText:"Sesederhana itu, seberarti itu"},
    {left:"assets/photos/kenangan-3.jpg", right:"assets/photos/kenangan-4.jpg", leftText:"Tawa yang tersimpan", rightText:"Momen kecil favoritku"},
    {left:"assets/photos/kenangan-5.jpg", right:"assets/photos/kenangan-6.jpg", leftText:"Cerita yang terus tumbuh", rightText:"Semoga ada banyak halaman lagi"}
  ];
  let spread = -1;
  const book = $("memoryBook");
  const cover = $("bookCover");
  const spreadEl = $("bookSpread");
  const prev = $("bookPrev");
  const next = $("bookNext");
  function setImage(imgId, src) {
    const img = $(imgId);
    img.src = src;
    img.style.display = "block";
    img.parentElement.classList.remove("no-photo");
    img.onerror = () => { img.style.display = "none"; img.parentElement.classList.add("no-photo"); };
  }
  function renderSpread() {
    const item = memories[spread];
    if (!item) return;
    setImage("leftMemoryPhoto", item.left);
    setImage("rightMemoryPhoto", item.right);
    $("leftMemoryCaption").textContent = item.leftText;
    $("rightMemoryCaption").textContent = item.rightText;
    $("leftPageNumber").textContent = String(spread * 2 + 1).padStart(2,"0");
    $("rightPageNumber").textContent = String(spread * 2 + 2).padStart(2,"0");
    $("bookCounter").textContent = `Halaman ${spread * 2 + 1}–${spread * 2 + 2} dari 06`;
    prev.disabled = spread <= 0;
    next.disabled = false;
    next.textContent = spread === memories.length - 1 ? "Tutup buku ↻" : "Halaman berikutnya →";
  }
  $("openBookButton").addEventListener("click", () => {
    if (spread === -1) {
      spread = 0;
      cover.classList.add("cover-open");
      book.classList.add("book-open");
      renderSpread();
    }
  });
  next.addEventListener("click", () => {
    if (spread === -1) return;
    if (spread >= memories.length - 1) {
      spread = -1; cover.classList.remove("cover-open"); book.classList.remove("book-open");
      prev.disabled = true; next.disabled = true; next.textContent = "Halaman berikutnya →"; $("bookCounter").textContent = "Sampul buku";
      return;
    }
    spreadEl.classList.add("turning");
    window.setTimeout(() => { spread += 1; renderSpread(); spreadEl.classList.remove("turning"); }, 280);
  });
  prev.addEventListener("click", () => {
    if (spread <= 0) return;
    spreadEl.classList.add("turning-back");
    window.setTimeout(() => { spread -= 1; renderSpread(); spreadEl.classList.remove("turning-back"); }, 280);
  });
})();

/* VIDEO DIARY: semua video mute secara default, audio MP3 terpisah dan off. */
(function setupVideoDiary(){
  const feed = $("shortsFeed");
  const cards = [...document.querySelectorAll(".short-video")];
  const audio = $("videoMusic");
  audio.src = CONFIG.videoMusic;
  audio.volume = 0.55;
  let audioStarted = false;
  async function startSeparateAudio() {
    try { await audio.play(); audioStarted = true; } catch { /* Browser may require a user gesture. */ }
  }
  function stopSeparateAudio() { audio.pause(); audio.currentTime = 0; audioStarted = false; }
  window.startVideoDiaryAudio = startSeparateAudio;
  window.stopVideoDiaryAudio = stopSeparateAudio;
  // Audio-video otomatis dicoba saat halaman video dibuka; video tetap muted.
  feed.addEventListener("click", startSeparateAudio);
  cards.forEach((card, i) => {
    const video = card.querySelector("video");
    video.muted = true;
    video.defaultMuted = true;
    video.addEventListener("loadeddata", () => card.classList.add("video-loaded"));
    video.addEventListener("canplay", () => card.classList.add("video-loaded"));
    video.addEventListener("error", () => card.classList.remove("video-loaded"));
    card.querySelector(".like-button").addEventListener("click", (e) => {
      const btn = e.currentTarget;
      const liked = btn.classList.toggle("liked");
      btn.querySelector("span").textContent = liked ? "♥" : "♡";
      btn.querySelector(".like-count").textContent = liked ? "Liked" : "Like";
    });
    card.querySelector(".comment-button").addEventListener("click", () => {
      const comment = window.prompt("Tulis komentar untuk video ini:");
      if (comment && comment.trim()) alert("Komentar kamu: “" + comment.trim() + "”");
    });
    card.querySelector(".share-button").addEventListener("click", async () => {
      const shareData = {title:"Video kenangan", text:card.querySelector(".short-caption p").textContent, url:window.location.href + "#videos"};
      try {
        if (navigator.share) await navigator.share(shareData);
        else if (navigator.clipboard) { await navigator.clipboard.writeText(shareData.url); alert("Link halaman video disalin."); }
        else alert("Salin link halaman ini untuk membagikannya.");
      } catch {}
    });
  });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target.querySelector("video");
        if (entry.isIntersecting && entry.intersectionRatio > .55) {
          if (video && video.readyState >= 2) video.play().catch(()=>{});
        } else if (video) video.pause();
      });
    }, {root:feed, threshold:[0,.55,.8]});
    cards.forEach(card => observer.observe(card));
  }
  $("videoBackButton").addEventListener("click", () => {
    stopSeparateAudio();
    cards.forEach(card => { const v = card.querySelector("video"); if (v) v.pause(); });
    window.showGiftPage?.(5);
  });
})();


/* Penghalang sederhana untuk menyulitkan penyimpanan aset dari antarmuka.
   Ini bukan perlindungan mutlak: aset publik tetap dapat diambil dari browser/server. */
document.addEventListener("contextmenu", event => {
  if (event.target.closest("img, video, audio")) event.preventDefault();
});
document.addEventListener("dragstart", event => {
  if (event.target.closest("img, video, audio")) event.preventDefault();
});
document.addEventListener("keydown", event => {
  const key = event.key.toLowerCase();
  if ((event.ctrlKey || event.metaKey) && ["s", "u"].includes(key)) event.preventDefault();
});
document.querySelectorAll("img, video").forEach(el => {
  el.setAttribute("draggable", "false");
  el.addEventListener("contextmenu", e => e.preventDefault());
});
