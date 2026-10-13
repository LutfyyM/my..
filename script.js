/* =========================================================
   ZOOM LOCK — cegah pinch zoom & double-tap zoom di HP
   ========================================================= */
(function lockZoom(){
  document.addEventListener("touchstart", (e) => {
    if (e.touches.length > 1) e.preventDefault();
  }, { passive: false });

  let lastTouchEnd = 0;
  document.addEventListener("touchend", (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
  }, { passive: false });

  document.addEventListener("gesturestart", e => e.preventDefault());
  document.addEventListener("gesturechange", e => e.preventDefault());
  document.addEventListener("gestureend", e => e.preventDefault());

  document.addEventListener("wheel", (e) => {
    if (e.ctrlKey) e.preventDefault();
  }, { passive: false });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && ["+","-","=","0"].includes(e.key)) {
      e.preventDefault();
    }
  });
})();

/* =========================================================
   EDIT KONTEN WEBSITE DI BAGIAN CONFIG DI BAWAH INI.
   Foto: taruh di assets/photos/ dengan nama sesuai config.
   Musik/pesan suara: taruh file MP3 di assets/music/.
   ========================================================= */
const CONFIG = {
  brand: "For naela",
  recipientName: "Nayku",
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

const nayMemoryVideo = $("nayMemoryVideo");
if (nayMemoryVideo) {
  nayMemoryVideo.muted = true;
  nayMemoryVideo.defaultMuted = true;
  nayMemoryVideo.volume = 0;
  nayMemoryVideo.addEventListener("volumechange", () => {
    if (!nayMemoryVideo.muted || nayMemoryVideo.volume !== 0) {
      nayMemoryVideo.muted = true;
      nayMemoryVideo.volume = 0;
    }
  });
}

const bgMusic = new Audio(CONFIG.backgroundMusic);
bgMusic.loop = true;
bgMusic.volume = 1.0;
let musicPlaying = false;
let backgroundWasPlaying = true;

function syncMusicButton(playing) {
  musicPlaying = playing;
  const icon = $("musicIcon");
  const label = $("musicLabel");
  const btn = $("musicToggle");
  if (icon) icon.textContent = playing ? "Ⅱ" : "♫";
  if (label) label.textContent = playing ? "Jeda musik" : "Putar musik";
  if (btn) btn.setAttribute("aria-label", playing ? "Jeda musik" : "Putar musik");
}
async function playBackgroundMusic() {
  try { await bgMusic.play(); syncMusicButton(true); return true; }
  catch { syncMusicButton(false); return false; }
}
function pauseBackgroundMusic() {
  bgMusic.pause(); syncMusicButton(false);
}
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

/* ---------- Envelope & Letter Modal ---------- */
const envelope = $("envelopeButton");
const modal = $("letterModal");

envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  $("envelopeHint").textContent = "SURAT TERBUKA ♡";
  window.setTimeout(() => {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("letter-reading");
    window.scrollTo({ top: 0, behavior: "auto" });
    modal.scrollTop = 0;
    const letterCard = modal.querySelector(".letter-full");
    if (letterCard) letterCard.scrollTop = 0;
  }, 450);
});

function closeLetterSafe(){
  if (!modal.classList.contains("show")) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("letter-reading");
  modal.scrollTop = 0;
  const letterCard = modal.querySelector(".letter-full");
  if (letterCard) letterCard.scrollTop = 0;
  envelope.classList.remove("open");
  const hint = $("envelopeHint");
  if (hint) hint.textContent = "KETUK UNTUK MEMBUKA";
}

let letterTouchStartY = 0;
let letterTouchStartTime = 0;
let letterTouchMoved = false;

modal.addEventListener("touchstart", (e) => {
  if (!modal.classList.contains("show")) return;
  letterTouchStartY = e.touches[0].clientY;
  letterTouchStartTime = Date.now();
  letterTouchMoved = false;
}, { passive: true });

modal.addEventListener("touchmove", (e) => {
  if (!modal.classList.contains("show")) return;
  const dy = Math.abs(e.touches[0].clientY - letterTouchStartY);
  if (dy > 10) letterTouchMoved = true;
}, { passive: true });

modal.addEventListener("touchend", (e) => {
  if (!modal.classList.contains("show")) return;
  const elapsed = Date.now() - letterTouchStartTime;
  const endY = e.changedTouches[0] ? e.changedTouches[0].clientY : letterTouchStartY;
  const dy = Math.abs(endY - letterTouchStartY);
  if (!letterTouchMoved && elapsed < 300 && dy < 10) {
    closeLetterSafe();
  }
}, { passive: true });

modal.addEventListener("click", () => {
  if (!modal.classList.contains("show")) return;
  const selection = window.getSelection && window.getSelection();
  if (selection && selection.toString().length > 0) return;
  closeLetterSafe();
});

document.addEventListener("keydown", e => {
  if ((e.key === "Escape" || e.key === "Backspace") && modal.classList.contains("show")) {
    e.preventDefault();
    closeLetterSafe();
  }
});

$("startButton").addEventListener("click", () => window.showGiftPage?.(1));
$("replayButton").addEventListener("click", () => window.showGiftPage?.(0));
$("closingNextButton").addEventListener("click", () => window.showGiftPage?.(document.querySelectorAll("main > section").length - 1));

const voiceAudio = $("voiceAudio");
if (voiceAudio) {
  voiceAudio.src = CONFIG.voiceMessage;
  voiceAudio.volume = 0.8;
  voiceAudio.addEventListener("play", () => {
    backgroundWasPlaying = backgroundWasPlaying || musicPlaying || !bgMusic.paused;
    pauseBackgroundMusic();
  });
  voiceAudio.addEventListener("ended", () => {
    if (!document.body.classList.contains("video-page-active") && backgroundWasPlaying) {
      playBackgroundMusic();
    }
  });
}

/* ---------- Mode Halaman ---------- */
(function setupPageNavigation(){
  const pageIds = ["home","little-things","letter","memories","voice","closing","videos"];
  const pages = pageIds.map(id => document.getElementById(id)).filter(Boolean);
  if (!pages.length) return;
  document.body.classList.add("paged-mode");
  let currentPage = 0;

  pages.forEach((page, index) => {
    page.classList.toggle("active-page", index === 0);
    page.setAttribute("aria-hidden", index === 0 ? "false" : "true");
    if (page.id === "videos") return;

    const nav = document.createElement("nav");
    nav.className = "page-navigation";
    nav.setAttribute("aria-label", "Navigasi halaman");

    const back = document.createElement("button");
    back.className = "page-back";
    back.type = "button";
    back.textContent = "<";
    back.disabled = index === 0;
    if (index === 0) back.style.visibility = "hidden";

    const counter = document.createElement("span");
    counter.className = "page-counter";
    counter.textContent = String(index + 1).padStart(2,"0") + " / " + String(pages.length).padStart(2,"0");

    const next = document.createElement("button");
    next.className = "page-next";
    next.type = "button";
    next.textContent = ">";

    back.addEventListener("click", () => showPage(index - 1));
    next.addEventListener("click", () => showPage(index === pages.length - 1 ? 0 : index + 1));

    if (page.id === "closing" || page.id === "videos") {
      nav.append(back, counter);
    } else {
      nav.append(back, counter, next);
    }
    nav.dataset.pageId = page.id;
    nav.hidden = index !== 0;
    document.body.appendChild(nav);
  });

  window.showGiftPage = showPage;

  function showPage(index) {
    currentPage = Math.max(0, Math.min(index, pages.length - 1));
    pages.forEach((page, i) => {
      page.classList.toggle("active-page", i === currentPage);
      page.setAttribute("aria-hidden", i === currentPage ? "false" : "true");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });

    const active = pages[currentPage];
    document.querySelectorAll(".page-navigation").forEach(nav => {
      nav.hidden = nav.dataset.pageId !== active.id;
    });

    if (voiceAudio && !voiceAudio.paused) {
      voiceAudio.pause();
      voiceAudio.currentTime = 0;
    }

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

  let touchStartX = 0, touchStartY = 0, touchStartAt = 0;
  document.addEventListener("touchstart", event => {
    if (!event.touches || event.touches.length !== 1) return;
    if (document.body.classList.contains("letter-reading")) return;
    if (event.target.closest("button, a, input, textarea, select, audio, video, .memory-book, #shortsFeed")) return;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    touchStartAt = Date.now();
  }, { passive: true });
  document.addEventListener("touchend", event => {
    if (!touchStartAt || !event.changedTouches || document.body.classList.contains("letter-reading")) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    const dy = event.changedTouches[0].clientY - touchStartY;
    const elapsed = Date.now() - touchStartAt;
    touchStartAt = 0;
    if (Math.abs(dx) < 65 || Math.abs(dx) < Math.abs(dy) * 1.25 || elapsed > 900) return;
    if (dx < 0) showPage(currentPage === pages.length - 1 ? 0 : currentPage + 1);
    else if (currentPage > 0) showPage(currentPage - 1);
  }, { passive: true });
})();

/* ---------- Buku Kenangan ---------- */
(function setupMemoryBook(){
  const memories = [
    {left:"assets/photos/kenangan-1.jpg", right:"assets/photos/kenangan-2.jpg", leftText:"senyummu yang begitu manis", rightText:"Pipimu yang begitu lucu"},
    {left:"assets/photos/kenangan-3.jpg", right:"assets/photos/kenangan-4.jpg", leftText:"matamu yang begitu indah", rightText:"parasmu membuatku terpana"},
    {left:"assets/photos/kenangan-5.jpg", right:"assets/photos/kenangan-6.jpg", leftText:"tatapanmu membuatku tersenyum", rightText:"kamu indah dari segalanya"}
  ];
  let spread = -1;
  const book = $("memoryBook");
  const cover = $("bookCover");
  const spreadEl = $("bookSpread");
  const prev = $("bookPrev");
  const next = $("bookNext");

  function setImage(imgId, src) {
    const img = $(imgId);
    if (!img) return;
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
    next.textContent = ">";
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
      spread = -1;
      cover.classList.remove("cover-open");
      book.classList.remove("book-open");
      prev.disabled = true; next.disabled = true;
      next.textContent = ">"; $("bookCounter").textContent = "Sampul buku";
      return;
    }
    spreadEl.classList.add("turning");
    window.setTimeout(() => {
      spread += 1;
      renderSpread();
      spreadEl.classList.remove("turning");
    }, 280);
  });
  prev.addEventListener("click", () => {
    if (spread <= 0) return;
    spreadEl.classList.add("turning-back");
    window.setTimeout(() => {
      spread -= 1;
      renderSpread();
      spreadEl.classList.remove("turning-back");
    }, 280);
  });
})();

/* ---------- Video Diary ---------- */
(function setupVideoDiary(){
  const feed = $("shortsFeed");
  if (!feed) return;
  const cards = [...document.querySelectorAll(".short-video")];
  const audio = $("videoMusic");
  if (audio) {
    audio.src = CONFIG.videoMusic;
    audio.volume = 0.55;
  }
  let audioStarted = false;
  async function startSeparateAudio() {
    if (!audio) return;
    try { await audio.play(); audioStarted = true; } catch { /* butuh gesture user */ }
  }
  function stopSeparateAudio() {
    if (!audio) return;
    audio.pause(); audio.currentTime = 0; audioStarted = false;
  }
  window.startVideoDiaryAudio = startSeparateAudio;
  window.stopVideoDiaryAudio = stopSeparateAudio;

  feed.addEventListener("click", startSeparateAudio);

  cards.forEach((card) => {
    const video = card.querySelector("video");
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.addEventListener("loadeddata", () => card.classList.add("video-loaded"));
    video.addEventListener("canplay", () => card.classList.add("video-loaded"));
    video.addEventListener("error", () => card.classList.remove("video-loaded"));
    card.querySelectorAll(".like-button, .comment-button, .share-button").forEach(button => {
      button.setAttribute("aria-disabled", "true");
      button.setAttribute("tabindex", "-1");
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target.querySelector("video");
        if (entry.isIntersecting && entry.intersectionRatio > .55) {
          if (video && video.readyState >= 2) video.play().catch(()=>{});
        } else if (video) {
          video.pause();
        }
      });
    }, { root: feed, threshold: [0, .55, .8] });
    cards.forEach(card => observer.observe(card));
  }

  const backBtn = $("videoBackButton");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      stopSeparateAudio();
      cards.forEach(card => { const v = card.querySelector("video"); if (v) v.pause(); });
      window.showGiftPage?.(5);
    });
  }
})();

/* ---------- Proteksi aset sederhana ---------- */
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

/* ---------- Pembuka Surprise (gosok 2 kali) ---------- */
(function setupScratchSurprise(){
  const intro = document.getElementById('surpriseIntro');
  const canvas = document.getElementById('scratchCanvas');
  if (!intro || !canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) { intro.remove(); return; }
  let strokes = 0;
  let drawing = false;
  let moved = 0;
  let last = null;
  let completed = false;
  const dots = [document.getElementById('scratchDot1'), document.getElementById('scratchDot2')];

  function resizeCanvas(){
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * ratio);
    canvas.height = Math.round(window.innerHeight * ratio);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }
  function point(e){ return { x: e.clientX, y: e.clientY }; }
  function scratch(from, to){
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = Math.max(48, Math.min(window.innerWidth, window.innerHeight) * .13);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.restore();
  }
  function finishStroke(){
    if (!drawing) return;
    drawing = false;
    last = null;
    if (moved >= Math.max(45, Math.min(window.innerWidth, window.innerHeight) * .12)) {
      strokes = Math.min(2, strokes + 1);
      if (dots[strokes - 1]) dots[strokes - 1].classList.add('done');
      if (strokes >= 2) openWebsite();
    }
    moved = 0;
  }
  function openWebsite(){
    if (completed) return;
    completed = true;
    intro.classList.add('is-opening');
    window.setTimeout(() => {
      intro.remove();
      document.body.classList.add('surprise-opened');
    }, 820);
  }
  canvas.addEventListener('pointerdown', e => {
    if (completed) return;
    e.preventDefault();
    drawing = true;
    moved = 0;
    last = point(e);
    try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
  });
  canvas.addEventListener('pointermove', e => {
    if (!drawing || !last || completed) return;
    e.preventDefault();
    const next = point(e);
    moved += Math.hypot(next.x - last.x, next.y - last.y);
    scratch(last, next);
    last = next;
  });
  canvas.addEventListener('pointerup', finishStroke);
  canvas.addEventListener('pointercancel', finishStroke);
  window.addEventListener('resize', () => { if (!completed) resizeCanvas(); });
  resizeCanvas();
})();