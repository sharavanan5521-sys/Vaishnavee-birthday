import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   PHOTOS
───────────────────────────────────────────── */
const PHOTOS = [
  { src: "/photos/photo1.jpg",  caption: "she just glows ✨" },
  { src: "/photos/photo2.jpg",  caption: "the prettiest soul 🌸" },
  { src: "/photos/photo3.jpg",  caption: "iconic, literally 👑" },
  { src: "/photos/photo4.jpg",  caption: "her smile 😭💗" },
  { src: "/photos/photo5.jpg",  caption: "so effortlessly her 🌺" },
  { src: "/photos/photo6.jpg",  caption: "vaishu being vaishu 🩷" },
  { src: "/photos/photo7.jpg",  caption: "the main character ⭐" },
  { src: "/photos/photo8.jpg",  caption: "radiant as always 🌙" },
  { src: "/photos/photo9.jpg",  caption: "this look tho 😍" },
  { src: "/photos/photo10.jpg", caption: "absolutely glowing 💖" },
  { src: "/photos/photo11.jpg", caption: "she really ate 🎀" },
  { src: "/photos/photo12.jpg", caption: "too cute for words 🥹" },
  { src: "/photos/photo13.jpg", caption: "my fav person 💝" },
  { src: "/photos/photo14.jpg", caption: "forever stunning 🌷" },
  { src: "/photos/photo15.jpg", caption: "just her being her 💗" },
  { src: "/photos/photo16.jpg", caption: "21 & thriving 🎉" },
  { src: "/photos/photo17.jpg", caption: "that's the birthday girl 🎂👑" },
];

/* ─────────────────────────────────────────────
   HEART POSITIONS — fixed 640×600 coordinate space
   cx=320 cy=300 scale=17  → fits nicely in 640px wide
───────────────────────────────────────────── */
const HEART_W = 640;
const HEART_H = 600;
const HEART_CX = 320;
const HEART_CY = 300;
const HEART_SC = 17;
const THUMB = 90; // polaroid width in px

const HEART_POS = PHOTOS.map((_, i) => {
  const t = (i / PHOTOS.length) * 2 * Math.PI - Math.PI / 2;
  const hx = 16 * Math.pow(Math.sin(t), 3);
  const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  return {
    x: HEART_CX + hx * HEART_SC - THUMB / 2,
    y: HEART_CY + hy * HEART_SC - THUMB / 2,
  };
});

/* ─────────────────────────────────────────────
   SPARK DOTS — pre-generated to avoid Math.random() in render
───────────────────────────────────────────── */
const SPARK_DATA = [
  [5,8],[15,22],[88,12],[95,30],[3,55],[92,60],[8,82],[90,78],[48,5],[50,95],
  [25,90],[72,88],[30,15],[65,18],[20,45],[78,50],
].map(([l, t], i) => ({
  l, t,
  w: 2 + (i * 137 % 4) + 1,
  h: 2 + (i * 97  % 4) + 1,
  dur: `${1.4 + (i * 0.163 % 2.6).toFixed(2)}s`,
  del: `${(i * 0.22 % 3.5).toFixed(2)}s`,
  color: ["#f472b6","#fda4af","#fbbf24","#e879f9","#fbcfe8"][i % 5],
}));

/* ─────────────────────────────────────────────
   CONFETTI
───────────────────────────────────────────── */
const CONFETTI_COLORS = ["#f472b6","#ec4899","#fbbf24","#fb7185","#e879f9","#fda4af","#f9a8d4","#a78bfa"];
const CONFETTI = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  size: 6 + Math.random() * 7,
  dur: `${2 + Math.random() * 2}s`,
  delay: `${Math.random() * 1.4}s`,
  rot: Math.random() * 360,
  circle: Math.random() > 0.5,
}));

/* ─────────────────────────────────────────────
   FLORKS
───────────────────────────────────────────── */
const FlorkLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 120" width="72">
    <ellipse cx="45" cy="88" rx="18" ry="24" fill="white" stroke="#f472b6" strokeWidth="2.2"/>
    <circle cx="45" cy="52" r="16" fill="white" stroke="#f472b6" strokeWidth="2.2"/>
    <text x="37" y="50" fontSize="10" fill="#f59e0b" fontFamily="Bubblegum Sans,cursive">★</text>
    <text x="48" y="50" fontSize="10" fill="#f59e0b" fontFamily="Bubblegum Sans,cursive">★</text>
    <ellipse cx="45" cy="59" rx="4.5" ry="4.5" fill="#be185d"/>
    <ellipse cx="45" cy="59" rx="2.5" ry="2.5" fill="white"/>
    <ellipse cx="33" cy="56" rx="4" ry="2.5" fill="rgba(251,113,133,.3)"/>
    <ellipse cx="57" cy="56" rx="4" ry="2.5" fill="rgba(251,113,133,.3)"/>
    <polygon points="45,18 31,42 59,42" fill="#fbbf24" stroke="#f472b6" strokeWidth="1.4"/>
    <circle cx="45" cy="18" r="3" fill="#f472b6"/>
    <line x1="27" y1="78" x2="12" y2="96" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="63" y1="75" x2="78" y2="60" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="38" y1="110" x2="29" y2="120" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="52" y1="110" x2="59" y2="120" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
    <text x="45" y="10" textAnchor="middle" fontFamily="Bubblegum Sans,cursive" fontSize="9" fill="#ec4899">omg 😭</text>
  </svg>
);
const FlorkRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 52" width="98">
    <ellipse cx="62" cy="38" rx="36" ry="13" fill="white" stroke="#f472b6" strokeWidth="2"/>
    <circle cx="20" cy="28" r="15" fill="white" stroke="#f472b6" strokeWidth="2"/>
    <text x="13" y="26" fontSize="9" fill="#be185d" fontFamily="Bubblegum Sans,cursive">x</text>
    <text x="22" y="26" fontSize="9" fill="#be185d" fontFamily="Bubblegum Sans,cursive">x</text>
    <path d="M13 32 Q20 38 27 32" fill="none" stroke="#be185d" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="42" y1="32" x2="35" y2="16" stroke="#f472b6" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="82" y1="30" x2="92" y2="15" stroke="#f472b6" strokeWidth="1.8" strokeLinecap="round"/>
    <text x="62" y="12" textAnchor="middle" fontFamily="Bubblegum Sans,cursive" fontSize="10" fill="#ec4899">she&apos;s too cute 💗😭</text>
  </svg>
);

/* ─────────────────────────────────────────────
   DOWNLOAD — screenshot the heart div
───────────────────────────────────────────── */
async function downloadHeart(heartRef) {
  if (!heartRef.current) return;
  let h2c = window.html2canvas;
  if (!h2c) {
    await new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
    h2c = window.html2canvas;
  }
  const canvas = await h2c(heartRef.current, {
    backgroundColor: "#ffe4ef",
    useCORS: true,
    allowTaint: true,
    scale: 2,
    logging: false,
  });
  const a = document.createElement("a");
  a.download = "vaishnavee-heart.png";
  a.href = canvas.toDataURL("image/png");
  a.click();
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Gallery() {
  const navigate = useNavigate();

  // phases: intro → printing → zooming → book → heart → finale
  const [phase,       setPhase]       = useState("intro");
  const [cameraIn,    setCameraIn]    = useState(false);
  const [printIdx,    setPrintIdx]    = useState(0);
  const [printDone,   setPrintDone]   = useState(false);
  const [current,     setCurrent]     = useState(0);
  const [gone,        setGone]        = useState([]);
  const [heartIn,     setHeartIn]     = useState(false);
  const [downloading, setDownloading] = useState(false);

  const heartRef   = useRef(null);
  const printTimer = useRef(null);

  /* ── camera slides in, then auto-starts printing ── */
  useEffect(() => {
    if (phase !== "intro") return;
    const t1 = setTimeout(() => setCameraIn(true), 200);
    const t2 = setTimeout(() => setPhase("printing"), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phase]);

  /* ── print one photo every 340ms ── */
  useEffect(() => {
    if (phase !== "printing") return;
    if (printIdx >= PHOTOS.length) { setPrintDone(true); return; }
    printTimer.current = setTimeout(() => setPrintIdx(n => n + 1), 340);
    return () => clearTimeout(printTimer.current);
  }, [phase, printIdx]);

  /* ── open album: zoom first polaroid then switch to book ── */
  const openAlbum = useCallback((e) => {
    e.stopPropagation();
    setPhase("zooming");
    setTimeout(() => {
      setPhase("book");
      setCurrent(0);
      setGone([]);
    }, 820);
  }, []);

  /* ── single tap = flip to next ── */
  const handleFlip = useCallback(() => {
    if (phase !== "book") return;
    const next = current + 1;
    setGone(g => [...g, current]);
    if (next >= PHOTOS.length) {
      // transition to heart
      setTimeout(() => setPhase("heart"), 500);
      setTimeout(() => setHeartIn(true),  900);
    } else {
      setCurrent(next);
    }
  }, [phase, current]);

  const handleDl = async () => {
    setDownloading(true);
    await downloadHeart(heartRef);
    setDownloading(false);
  };

  const row1 = PHOTOS.slice(0, 9);
  const row2 = PHOTOS.slice(9);

  /* ── touch swipe support in book ── */
  const txRef = useRef(null);
  const onTouchStart = e => { txRef.current = e.touches[0].clientX; };
  const onTouchEnd   = e => {
    if (!txRef.current) return;
    if (txRef.current - e.changedTouches[0].clientX > 40) handleFlip();
    txRef.current = null;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Great+Vibes&family=Quicksand:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }

        /* ── page shell ── */
        .gp {
          width:100%; min-height:100vh;
          background:linear-gradient(160deg,#fff0f5 0%,#ffe4ef 50%,#ffd6e8 100%);
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          font-family:'Quicksand',sans-serif;
          position:relative; overflow-x:hidden;
          padding:24px 16px 40px; user-select:none;
        }
        .gp::before {
          content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
          background-image:radial-gradient(circle,rgba(244,114,182,.16) 1.5px,transparent 1.5px);
          background-size:28px 28px;
        }
        .gp > * { position:relative; z-index:1; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes btnBounce{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

        /* ════════════════════════════
           INTRO / PRINTING
        ════════════════════════════ */
        .intro-wrap { display:flex; flex-direction:column; align-items:center; gap:20px; width:100%; animation:fadeIn .6s ease both; }

        .intro-title {
          font-family:'Bubblegum Sans',cursive;
          font-size:clamp(22px,5vw,36px); color:#ec4899;
          text-shadow:2px 2px 0 rgba(251,113,133,.2);
        }

        /* camera */
        .cam-outer {
          transform:translateY(-150px) scale(.85); opacity:0;
          transition:transform 1s cubic-bezier(.34,1.4,.64,1), opacity .7s ease;
        }
        .cam-outer.in { transform:translateY(0) scale(1); opacity:1; }

        .cam-body {
          width:136px; height:98px;
          background:linear-gradient(135deg,#fce7f3,#fbcfe8);
          border-radius:14px; border:3px solid #f9a8d4;
          position:relative; display:flex; align-items:center; justify-content:center;
          box-shadow:0 8px 28px rgba(244,114,182,.22);
          margin:0 auto;
        }
        .cam-lens {
          width:44px; height:44px; border-radius:50%;
          background:linear-gradient(135deg,#fda4af,#f472b6);
          border:4px solid white;
          box-shadow:0 0 0 3px #f9a8d4,inset 0 0 8px rgba(0,0,0,.08);
          font-size:15px; display:flex; align-items:center; justify-content:center;
        }
        .cam-flash   { position:absolute; top:9px; right:11px; width:18px; height:11px; border-radius:3px; background:#fbbf24; border:2px solid #f59e0b; }
        .cam-shutter { position:absolute; top:7px; left:13px; width:15px; height:15px; border-radius:50%; background:#f472b6; border:2px solid #ec4899; }
        .cam-slot    { position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:84px; height:5px; border-radius:2px; background:rgba(190,24,93,.18); }

        /* clothesline */
        .lines-wrap { display:flex; flex-direction:column; gap:14px; width:100%; max-width:740px; overflow-x:hidden; }
        .line-row   { display:flex; flex-direction:column; gap:0; }

        .string {
          width:calc(100% - 20px); height:2.5px; margin:0 10px;
          background:linear-gradient(90deg,transparent,#c4956a 5%,#b8854a 50%,#c4956a 95%,transparent);
          border-radius:2px; box-shadow:0 1px 3px rgba(0,0,0,.1);
        }

        .line-photos { display:flex; justify-content:space-evenly; align-items:flex-start; padding:0 4px; margin-top:-1px; flex-wrap:nowrap; }

        .hung {
          display:flex; flex-direction:column; align-items:center;
          opacity:0; transform:translateY(-16px) rotate(var(--r,0deg));
          transition:opacity .35s ease, transform .45s cubic-bezier(.34,1.56,.64,1);
        }
        .hung.on { opacity:1; transform:translateY(0) rotate(var(--r,0deg)); }

        .clip {
          width:9px; height:15px;
          background:linear-gradient(to bottom,#c8924a,#a0712c);
          border-radius:2px 2px 1px 1px;
          box-shadow:0 1px 3px rgba(0,0,0,.16); margin-bottom:-2px; z-index:2;
        }
        .clip::after { content:''; display:block; margin:5px auto 0; width:7px; height:2px; background:rgba(0,0,0,.16); border-radius:1px; }

        .mini-pol  { background:white; padding:3px 3px 12px; box-shadow:0 3px 10px rgba(0,0,0,.12); border-radius:2px; width:clamp(40px,9vw,58px); flex-shrink:0; }
        .mini-img  { width:100%; aspect-ratio:1; background:#fce7f3; overflow:hidden; }
        .mini-img img { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
        .mini-cap  { font-family:'Bubblegum Sans',cursive; font-size:5.5px; color:#be185d; text-align:center; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

        .open-btn {
          padding:13px 48px;
          background:linear-gradient(135deg,#f472b6,#ec4899);
          border:none; border-radius:100px; color:#fff;
          font-family:'Bubblegum Sans',cursive; font-size:16px;
          cursor:pointer; box-shadow:0 6px 22px rgba(244,114,182,.42);
          animation:fadeUp .6s ease both, btnBounce 2.8s ease-in-out infinite 1s;
          transition:box-shadow .25s;
        }
        .open-btn:hover { box-shadow:0 10px 30px rgba(244,114,182,.58); }

        /* ════════════════════════════
           ZOOM TRANSITION
        ════════════════════════════ */
        .zoom-screen {
          position:fixed; inset:0; z-index:90;
          display:flex; align-items:center; justify-content:center;
          animation:zoomBg .82s ease forwards;
        }
        @keyframes zoomBg { from{background:rgba(255,240,245,0)} to{background:#fff0f5} }

        .zoom-pol {
          background:white; padding:14px 14px 52px;
          border-radius:3px; width:min(280px,88vw);
          box-shadow:0 10px 36px rgba(0,0,0,.13);
          animation:zoomPol .78s cubic-bezier(.22,.68,.36,1.2) forwards;
          transform-origin:center center;
        }
        @keyframes zoomPol {
          0%   { transform:scale(.16) rotate(4deg); opacity:.3; }
          60%  { transform:scale(1.04) rotate(-1deg); opacity:1; }
          100% { transform:scale(1) rotate(0deg); opacity:1; }
        }
        .zoom-img { width:100%; aspect-ratio:252/286; background:#fce7f3; overflow:hidden; }
        .zoom-img img { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }

        /* ════════════════════════════
           BOOK
        ════════════════════════════ */
        .book-title {
          font-family:'Bubblegum Sans',cursive;
          font-size:clamp(22px,5vw,36px); color:#ec4899;
          text-shadow:2px 2px 0 rgba(251,113,133,.2);
          text-align:center; margin-bottom:4px;
          animation:fadeUp .7s ease both;
        }
        .book-sub {
          font-size:12px; letter-spacing:.05em; color:rgba(190,24,93,.48);
          text-align:center; margin-bottom:14px;
          animation:fadeUp .7s ease .1s both;
        }

        .stage {
          position:relative; width:min(316px,90vw); height:428px;
          cursor:pointer; animation:fadeIn .5s ease both;
        }

        .pol {
          position:absolute; inset:0;
          display:flex; align-items:center; justify-content:center;
          opacity:0; pointer-events:none;
          filter:drop-shadow(0 10px 26px rgba(244,114,182,.18));
          will-change:transform,opacity;
        }
        .pol.active {
          opacity:1; pointer-events:auto; z-index:10;
          animation:polIn .55s cubic-bezier(.34,1.52,.64,1) both;
        }
        @keyframes polIn {
          from { opacity:0; transform:rotate(var(--rot,0deg)) translateY(28px) scale(.88); }
          to   { opacity:1; transform:rotate(var(--rot,0deg)) translateY(-4px) scale(1); }
        }
        .pol.gone {
          opacity:0 !important; pointer-events:none;
          transform:rotate(calc(var(--rot,0deg) + 12deg)) translateX(80px) translateY(-20px) scale(.82) !important;
          transition:transform .48s ease, opacity .38s ease;
        }

        .pol-inner {
          background:white; padding:14px 14px 52px; border-radius:3px;
          box-shadow:0 8px 32px rgba(0,0,0,.11),0 2px 8px rgba(0,0,0,.06);
          width:min(280px,86vw);
        }
        .pol-photo {
          width:100%; aspect-ratio:252/286; overflow:hidden;
          position:relative; background:#fce7f3; border-radius:2px;
        }
        .pol-photo img { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
        .pol-photo-fallback {
          width:100%; height:100%; display:flex; flex-direction:column;
          align-items:center; justify-content:center; font-size:44px; color:rgba(190,24,93,.28);
        }
        .dev-overlay {
          position:absolute; inset:0; background:rgba(255,255,255,.9); z-index:2; pointer-events:none;
          animation:devFade .9s ease .1s forwards;
        }
        @keyframes devFade { to { opacity:0; } }
        .pol-cap { text-align:center; font-family:'Bubblegum Sans',cursive; font-size:15px; color:#be185d; margin-top:12px; }

        .tap-hint {
          margin-top:12px; font-size:12px; color:rgba(190,24,93,.42);
          display:flex; align-items:center; gap:5px;
          animation:fadeUp .7s ease .15s both;
        }
        .tap-arr { display:inline-block; animation:arrBounce 1.5s ease-in-out infinite; }
        @keyframes arrBounce { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }

        .dots { display:flex; gap:6px; margin-top:10px; flex-wrap:wrap; justify-content:center; max-width:310px; animation:fadeUp .7s ease .2s both; }
        .dot  { width:7px; height:7px; border-radius:50%; background:rgba(244,114,182,.22); transition:background .35s,transform .3s; }
        .dot.done { background:#f472b6; transform:scale(1.22); }
        .dot.curr { background:#ec4899; transform:scale(1.45); }

        /* ════════════════════════════
           HEART SCENE
        ════════════════════════════ */
        .heart-page {
          position:fixed; inset:0; z-index:150;
          background:linear-gradient(160deg,#fff0f5 0%,#ffe4ef 50%,#ffd6e8 100%);
          display:flex; flex-direction:column;
          align-items:center; justify-content:flex-start;
          gap:12px; overflow:hidden; padding:20px 16px 16px;
          animation:fadeIn .7s ease both;
        }
        .heart-page::before {
          content:''; position:fixed; inset:0; pointer-events:none;
          background-image:radial-gradient(circle,rgba(244,114,182,.16) 1.5px,transparent 1.5px);
          background-size:28px 28px;
        }

        .heart-title {
          font-family:'Bubblegum Sans',cursive;
          font-size:clamp(14px,4vw,30px); color:#ec4899;
          text-shadow:2px 2px 0 rgba(251,113,133,.2);
          animation:fadeUp .7s ease .4s both; z-index:1;
          text-align:center; padding:0 12px;
        }

        /* heart scales to fit any screen */
        .heart-outer {
          flex-shrink:0;
          transform-origin:top center;
          transform:scale(var(--hs,1));
          width:640px; height:600px;
          cursor:pointer;
        }

        .heart-inner {
          position:relative; width:640px; height:600px;
        }

        /* sparkle dots */
        .spark { position:absolute; border-radius:50%; pointer-events:none; animation:sparkle ease-in-out infinite; will-change:transform,opacity; }
        @keyframes sparkle { 0%,100%{opacity:0;transform:scale(0)} 50%{opacity:.6;transform:scale(1)} }

        /* each polaroid in the heart */
        .hp {
          position:absolute; width:90px;
          opacity:0; transform:scale(0) rotate(var(--hr,0deg));
          transition:opacity 1.6s ease, transform 1.6s cubic-bezier(.34,1.5,.64,1);
          will-change:transform,opacity;
        }
        .hp.in {
          opacity:1; transform:scale(1) rotate(var(--hr,0deg));
        }
        .hp-inner {
          background:white; padding:5px 5px 18px; border-radius:2px;
          box-shadow:0 4px 16px rgba(244,114,182,.28),0 2px 6px rgba(0,0,0,.07);
        }
        .hp img {
          width:80px; height:80px; display:block; border-radius:1px;
          object-fit:cover; object-position:top center;
        }
        .hp-cap {
          font-family:'Bubblegum Sans',cursive; font-size:7px; color:#be185d;
          text-align:center; margin-top:3px;
          white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
        }

        .heart-btns {
          display:flex; gap:12px; flex-wrap:wrap; justify-content:center;
          z-index:2; animation:fadeUp .8s ease 2.8s both;
        }
        .dl-btn {
          padding:12px 26px;
          background:rgba(255,255,255,.9); border:2px solid rgba(244,114,182,.38);
          border-radius:100px; color:#ec4899;
          font-family:'Bubblegum Sans',cursive; font-size:14px;
          cursor:pointer; box-shadow:0 4px 14px rgba(244,114,182,.18);
          transition:transform .2s,box-shadow .2s;
        }
        .dl-btn:hover { transform:translateY(-2px); box-shadow:0 8px 22px rgba(244,114,182,.36); }
        .dl-btn:disabled { opacity:.55; cursor:wait; }

        /* ════════════════════════════
           FINALE
        ════════════════════════════ */
        .finale {
          position:fixed; inset:0; z-index:200;
          background:linear-gradient(160deg,rgba(255,240,245,.97),rgba(255,220,235,.97));
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          animation:fadeIn .65s ease both; padding:24px; overflow-y:auto;
        }
        .fin-heart { font-size:74px; animation:heartbeat 1.4s ease-in-out infinite; margin-bottom:4px; }
        @keyframes heartbeat { 0%,100%{transform:scale(1)} 50%{transform:scale(1.13)} }
        .fin-title { font-family:'Great Vibes',cursive; font-size:clamp(22px,7vw,56px); color:#ec4899; text-align:center; line-height:1.2; animation:fadeUp .8s ease .2s both; max-width:90vw; }
        .fin-msg   { font-family:'Quicksand',sans-serif; font-weight:500; font-size:clamp(13px,3.5vw,15px); color:rgba(190,24,93,.7); text-align:center; max-width:min(320px,90vw); line-height:1.8; margin-top:10px; animation:fadeUp .8s ease .44s both; }
        .fin-florks{ display:flex; align-items:flex-end; gap:14px; margin:14px 0 4px; animation:fadeUp .8s ease .64s both; }
        .hub-btn { margin-top:14px; padding:12px 36px; background:linear-gradient(135deg,#f472b6,#ec4899); border:none; border-radius:100px; color:#fff; font-family:'Bubblegum Sans',cursive; font-size:15px; cursor:pointer; box-shadow:0 6px 20px rgba(244,114,182,.4); animation:fadeUp .8s ease .84s both; transition:transform .2s,box-shadow .2s; }
        .hub-btn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(244,114,182,.55); }

        /* confetti */
        .cf { position:fixed; top:-14px; pointer-events:none; animation:cfFall linear forwards; }
        @keyframes cfFall { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(108vh) rotate(720deg);opacity:0} }
      `}</style>

      <div
        className="gp"
        onClick={phase === "book" ? handleFlip : undefined}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >

        {/* ════ INTRO / PRINTING ════ */}
        {(phase === "intro" || phase === "printing") && (
          <div className="intro-wrap">
            <div className="intro-title">Vaishu&apos;s Gallery 📸</div>

            {/* camera */}
            <div className={`cam-outer ${cameraIn ? "in" : ""}`}>
              <div className="cam-body">
                <div className="cam-flash"/>
                <div className="cam-shutter"/>
                <div className="cam-lens">📷</div>
                <div className="cam-slot"/>
              </div>
            </div>

            {/* clotheslines */}
            {phase === "printing" && (
              <div className="lines-wrap" onClick={e => e.stopPropagation()}>
                {/* row 1 */}
                <div className="line-row">
                  <div className="string"/>
                  <div className="line-photos">
                    {row1.map((ph, i) => (
                      <div key={i} className={`hung ${i < printIdx ? "on" : ""}`} style={{ "--r": `${((i % 5) - 2) * 2.4}deg` }}>
                        <div className="clip"/>
                        <div className="mini-pol">
                          <div className="mini-img">
                            <img src={ph.src} alt="" onError={e => { e.target.style.display = "none"; }}/>
                          </div>
                          <div className="mini-cap">{ph.caption}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* row 2 */}
                <div className="line-row">
                  <div className="string"/>
                  <div className="line-photos">
                    {row2.map((ph, i) => (
                      <div key={i + 9} className={`hung ${(i + 9) < printIdx ? "on" : ""}`} style={{ "--r": `${((i % 5) - 2) * 2.4}deg` }}>
                        <div className="clip"/>
                        <div className="mini-pol">
                          <div className="mini-img">
                            <img src={ph.src} alt="" onError={e => { e.target.style.display = "none"; }}/>
                          </div>
                          <div className="mini-cap">{ph.caption}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {printDone && (
              <button className="open-btn" onClick={openAlbum}>
                open the album 🎀
              </button>
            )}
          </div>
        )}

        {/* ════ ZOOM ════ */}
        {phase === "zooming" && (
          <div className="zoom-screen">
            <div className="zoom-pol">
              <div className="zoom-img">
                <img src={PHOTOS[0].src} alt="" onError={e => { e.target.style.background = "#fce7f3"; }}/>
              </div>
            </div>
          </div>
        )}

        {/* ════ BOOK ════ */}
        {phase === "book" && (
          <>
            <div className="book-title">Vaishu&apos;s Gallery 📸</div>
            <div className="book-sub">tap to flip through each photo</div>

            <div className="stage">
              {PHOTOS.map((ph, i) => (
                <div
                  key={i}
                  className={`pol ${i === current ? "active" : ""} ${gone.includes(i) ? "gone" : ""}`}
                  style={{ "--rot": `${((i % 7) - 3) * 1.8}deg` }}
                >
                  <div className="pol-inner">
                    <div className="pol-photo">
                      <div className="dev-overlay"/>
                      <img
                        src={ph.src} alt={ph.caption} draggable={false}
                        onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                      />
                      <div className="pol-photo-fallback" style={{ display: "none" }}>
                        <span>📸</span>
                      </div>
                    </div>
                    <p className="pol-cap">{ph.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="tap-hint">tap to flip <span className="tap-arr">→</span></div>

            <div className="dots">
              {PHOTOS.map((_, i) => (
                <div key={i} className={`dot ${gone.includes(i) ? "done" : i === current ? "curr" : ""}`}/>
              ))}
            </div>
          </>
        )}

        {/* ════ HEART ════ */}
        {phase === "heart" && (
          <div
            className="heart-page"
            onClick={() => setPhase("finale")}
            style={{ cursor: "pointer" }}
          >
            <p className="heart-title">made with love, just for you 🩷</p>

            {/* heart container — fixed 640×600 internal, scale to fit screen */}
            <div
              className="heart-outer"
              style={{ "--hs": Math.min(1, (window.innerWidth - 32) / 640) }}
            >
              <div className="heart-inner" ref={heartRef}>

                {/* pink sparkle dots */}
                {SPARK_DATA.map((s, i) => (
                  <div key={i} className="spark" style={{
                    left:`${s.l}%`, top:`${s.t}%`,
                    width:`${s.w}px`, height:`${s.h}px`,
                    background: s.color,
                    animationDuration: s.dur,
                    animationDelay: s.del,
                  }}/>
                ))}

                {/* polaroids arranged in heart */}
                {PHOTOS.map((ph, i) => (
                  <div
                    key={i}
                    className={`hp ${heartIn ? "in" : ""}`}
                    style={{
                      left: `${HEART_POS[i].x}px`,
                      top:  `${HEART_POS[i].y}px`,
                      "--hr": `${((i % 5) - 2) * 5}deg`,
                      transitionDelay: `${i * 0.065}s`,
                    }}
                  >
                    <div className="hp-inner">
                      <img
                        src={ph.src} alt={ph.caption}
                        onError={e => { e.target.style.background = "#fce7f3"; }}
                      />
                      <p className="hp-cap">{ph.caption}</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* only download button + tap hint */}
            <div className="heart-btns" onClick={e => e.stopPropagation()}>
              <button className="dl-btn" disabled={downloading} onClick={handleDl}>
                {downloading ? "saving... 🩷" : "save as wallpaper 🖼️"}
              </button>
            </div>

            <div
              className="tap-to-wish"
              style={{
                fontFamily:"'Quicksand',sans-serif", fontSize:"12px",
                letterSpacing:".05em", color:"rgba(190,24,93,.42)",
                display:"flex", alignItems:"center", gap:"5px",
                animation:"fadeUp .8s ease 3s both",
                zIndex:2,
              }}
            >
              tap anywhere to continue <span style={{ display:"inline-block", animation:"arrBounce 1.5s ease-in-out infinite" }}>→</span>
            </div>

          </div>
        )}

        {/* ════ FINALE ════ */}
        {phase === "finale" && (
          <div className="finale" onClick={e => e.stopPropagation()}>
            {CONFETTI.map(c => (
              <div key={c.id} className="cf" style={{
                left:c.left, width:`${c.size}px`,
                height:c.circle?`${c.size}px`:`${c.size*1.6}px`,
                background:c.color, borderRadius:c.circle?"50%":"2px",
                transform:`rotate(${c.rot}deg)`,
                animationDuration:c.dur, animationDelay:c.delay,
              }}/>
            ))}
            <div className="fin-heart">🩷</div>
            <h1 className="fin-title">she&apos;s one of a kind</h1>
            <p className="fin-msg">
              Vaishnavee — you didn&apos;t just grow 21 years older,
              you grew into someone truly extraordinary. every photo here
              is proof of how beautiful, radiant and irreplaceable you are.
              the world is so lucky to have you in it. 👑✨
            </p>
            <div className="fin-florks">
              <FlorkLeft/> <FlorkRight/>
            </div>
            <button className="hub-btn" onClick={() => navigate("/hub")}>
              back to gifts 🎀
            </button>
          </div>
        )}

      </div>
    </>
  );
}