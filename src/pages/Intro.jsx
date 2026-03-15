import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Flork SVGs ────────────────────────────────────────────────
const FlorkLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 135" width="88"
    className="flork"
    style={{ left: "3%", bottom: "8%", "--r": "-8deg", animationDelay: "0.9s, 0.9s" }}>
    <ellipse cx="45" cy="93" rx="20" ry="27" fill="white" stroke="#f472b6" strokeWidth="2.5" />
    <circle cx="45" cy="55" r="18" fill="white" stroke="#f472b6" strokeWidth="2.5" />
    <ellipse cx="38" cy="52" rx="3" ry="3.5" fill="#be185d" />
    <ellipse cx="52" cy="52" rx="3" ry="3.5" fill="#be185d" />
    <path d="M37 60 Q45 68 53 60" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="32" cy="58" rx="5" ry="3" fill="rgba(251,113,133,.28)" />
    <ellipse cx="58" cy="58" rx="5" ry="3" fill="rgba(251,113,133,.28)" />
    <polygon points="45,20 29,47 61,47" fill="#fbbf24" stroke="#f472b6" strokeWidth="1.5" />
    <circle cx="45" cy="20" r="3.5" fill="#f472b6" />
    <line x1="35" y1="40" x2="38" y2="30" stroke="#f472b6" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="45" y1="43" x2="47" y2="32" stroke="#f472b6" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="26" y1="83" x2="11" y2="103" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="64" y1="79" x2="80" y2="60" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M80 60 Q81 48 80 40" fill="none" stroke="#f472b6" strokeWidth="1.3" strokeDasharray="3,2" />
    <ellipse cx="80" cy="33" rx="9" ry="11" fill="#fda4af" stroke="#f472b6" strokeWidth="1.5" />
    <line x1="38" y1="118" x2="28" y2="133" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="52" y1="118" x2="60" y2="133" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="52" y="5" width="38" height="22" rx="8" fill="white" stroke="#f472b6" strokeWidth="1.5" />
    <polygon points="58,26 53,35 66,26" fill="white" stroke="#f472b6" strokeWidth="1.3" />
    <text x="71" y="19" textAnchor="middle" fontFamily="Bubblegum Sans, cursive" fontSize="9.5" fill="#ec4899">yayy!</text>
  </svg>
);

const FlorkRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 145" width="90"
    className="flork"
    style={{ right: "3%", bottom: "6%", "--r": "7deg", animationDelay: "1.3s, 1.3s" }}>
    <ellipse cx="50" cy="99" rx="20" ry="27" fill="white" stroke="#f472b6" strokeWidth="2.5" />
    <circle cx="50" cy="59" r="18" fill="white" stroke="#f472b6" strokeWidth="2.5" />
    <text x="35" y="59" fontSize="14" fill="#f59e0b">★</text>
    <text x="49" y="59" fontSize="14" fill="#f59e0b">★</text>
    <ellipse cx="50" cy="68" rx="5.5" ry="5.5" fill="#be185d" />
    <ellipse cx="50" cy="68" rx="3" ry="3" fill="white" />
    <ellipse cx="36" cy="65" rx="5" ry="3" fill="rgba(251,113,133,.3)" />
    <ellipse cx="64" cy="65" rx="5" ry="3" fill="rgba(251,113,133,.3)" />
    <line x1="31" y1="88" x2="13" y2="74" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="69" y1="88" x2="88" y2="74" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="5" y="64" width="24" height="13" rx="3" fill="#fce7f3" stroke="#f472b6" strokeWidth="1.5" />
    <rect x="10" y="57" width="14" height="9" rx="2" fill="#fce7f3" stroke="#f472b6" strokeWidth="1.5" />
    <line x1="17" y1="51" x2="17" y2="58" stroke="#f472b6" strokeWidth="1.5" />
    <ellipse cx="17" cy="49" rx="3" ry="3.5" fill="#fbbf24" />
    <line x1="42" y1="125" x2="33" y2="140" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="58" y1="125" x2="65" y2="140" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="60" y="14" width="40" height="28" rx="8" fill="white" stroke="#f472b6" strokeWidth="1.5" />
    <polygon points="68,41 62,50 76,41" fill="white" stroke="#f472b6" strokeWidth="1.3" />
    <text x="80" y="27" textAnchor="middle" fontFamily="Bubblegum Sans, cursive" fontSize="9" fill="#ec4899">OMG</text>
    <text x="80" y="38" textAnchor="middle" fontFamily="Bubblegum Sans, cursive" fontSize="9" fill="#ec4899">she&apos;s 21!!</text>
  </svg>
);

const FlorkTop = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 72" width="160"
    className="flork"
    style={{ right: "8%", top: "5%", "--r": "-5deg", animationDelay: "2.1s, 2.1s" }}>
    <circle cx="28" cy="22" r="13" fill="white" stroke="#f472b6" strokeWidth="2" />
    <circle cx="23" cy="19" r="2.2" fill="#be185d" />
    <circle cx="33" cy="19" r="2.2" fill="#be185d" />
    <path d="M22 27 Q28 32 34 27" fill="none" stroke="#be185d" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="28" y1="35" x2="28" y2="56" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="41" x2="12" y2="32" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="41" x2="60" y2="32" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="56" x2="20" y2="70" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="56" x2="36" y2="70" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
    <rect x="58" y="18" width="116" height="30" rx="6" fill="white" stroke="#f472b6" strokeWidth="1.8" />
    <polygon points="58,22 66,22 66,30" fill="#fce7f3" />
    <polygon points="174,22 166,22 166,30" fill="#fce7f3" />
    <text x="116" y="38" textAnchor="middle" fontFamily="Bubblegum Sans, cursive" fontSize="14" fill="#ec4899">she&apos;s finally 21!! 🎉</text>
  </svg>
);

const FlorkBottom = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 58" width="115"
    className="flork"
    style={{ left: "50%", bottom: "1%", transform: "translateX(-50%)", "--r": "2deg", animationDelay: "1.6s, 1.6s" }}>
    <ellipse cx="65" cy="42" rx="38" ry="14" fill="white" stroke="#f472b6" strokeWidth="2" />
    <circle cx="22" cy="30" r="16" fill="white" stroke="#f472b6" strokeWidth="2" />
    <text x="14" y="28" fontSize="10" fill="#be185d" fontFamily="Bubblegum Sans, cursive">x</text>
    <text x="24" y="28" fontSize="10" fill="#be185d" fontFamily="Bubblegum Sans, cursive">x</text>
    <path d="M15 34 Q22 40 29 34" fill="none" stroke="#be185d" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="44" y1="34" x2="36" y2="17" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
    <line x1="86" y1="32" x2="96" y2="16" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
    <text x="65" y="14" textAnchor="middle" fontFamily="Bubblegum Sans, cursive" fontSize="11" fill="#ec4899">i can&apos;t even 😭💗</text>
  </svg>
);

// ── Candle ─────────────────────────────────────────────────────
const Candle = ({ visible, haloVisible }) => (
  <div className={`candle-wrap ${visible ? "opacity-100" : "opacity-0"}`}
    style={{ transition: "opacity 1.6s ease" }}>
    <div className="candle-halo" style={{ opacity: haloVisible ? 1 : 0, transition: "opacity 2s ease 0.5s" }} />
    <div className="flame-wrap">
      <div className="f-out" />
      <div className="f-mid" />
      <div className="f-core" />
    </div>
    <div className="wick" />
    <div className="candle-body" />
  </div>
);

// ── Falling Petals & Hearts ─────────────────────────────────────
const PETAL_COLORS = ["#fda4af", "#f9a8d4", "#fbcfe8", "#fce7f3", "#f472b6", "#e879f9"];
const HEARTS = ["🩷", "💗", "💖", "💝", "🌸"];

const petals = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  color: PETAL_COLORS[i % PETAL_COLORS.length],
  size: 7 + Math.random() * 9,
  duration: `${6 + Math.random() * 10}s`,
  delay: `${Math.random() * 14}s`,
}));

const hearts = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  emoji: HEARTS[i % HEARTS.length],
  size: `${10 + Math.random() * 14}px`,
  duration: `${5 + Math.random() * 8}s`,
  delay: `${Math.random() * 16}s`,
}));

// ── Main Component ──────────────────────────────────────────────
export default function Intro() {
  const navigate = useNavigate();

  const [show, setShow] = useState({
    candle: false,
    halo: false,
    sub: false,
    nameCard: false,
    bday: false,
    badge: false,
    btn: false,
  });

  useEffect(() => {
    const timers = [
      setTimeout(() => setShow(s => ({ ...s, candle: true })), 400),
      setTimeout(() => setShow(s => ({ ...s, halo: true })), 1800),
      setTimeout(() => setShow(s => ({ ...s, sub: true })), 2800),
      setTimeout(() => setShow(s => ({ ...s, nameCard: true })), 4000),
      setTimeout(() => setShow(s => ({ ...s, bday: true })), 5600),
      setTimeout(() => setShow(s => ({ ...s, badge: true })), 6600),
      setTimeout(() => setShow(s => ({ ...s, btn: true })), 7600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      {/* ── Global styles injected once ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Great+Vibes&family=Quicksand:wght@300;400;500&display=swap');

        .intro-page {
          width: 100vw; height: 100vh; overflow: hidden;
          background: linear-gradient(160deg, #fff0f5 0%, #ffe4ef 45%, #ffd6e8 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          font-family: 'Quicksand', sans-serif;
          position: relative; user-select: none;
        }
        .intro-page::before {
          content: ''; position: fixed; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(244,114,182,.18) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
        }

        /* flork */
        .flork {
          position: fixed; pointer-events: none; opacity: 0;
          animation: floatIn .8s ease forwards, floatBob ease-in-out infinite;
        }
        @keyframes floatIn {
          from { opacity:0; transform: translateY(14px) rotate(var(--r,0deg)); }
          to   { opacity:1; transform: translateY(0)    rotate(var(--r,0deg)); }
        }
        @keyframes floatBob {
          0%,100% { transform: translateY(0)    rotate(var(--r,0deg)); }
          50%     { transform: translateY(-7px) rotate(var(--r,0deg)); }
        }

        /* candle */
        .candle-wrap {
          position: relative; display: flex;
          flex-direction: column; align-items: center;
          margin-bottom: 30px; z-index: 10;
        }
        .candle-halo {
          position: absolute; bottom: -6px;
          width: 90px; height: 18px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(245,158,11,.45), transparent 72%);
          filter: blur(5px);
        }
        .flame-wrap { width:24px; height:46px; position:relative; display:flex; align-items:flex-end; justify-content:center; }
        .f-out  { position:absolute; bottom:0; width:18px; height:32px; background:linear-gradient(to top,#FFA020,#FF5500 55%,rgba(255,60,0,0)); border-radius:50% 50% 32% 32%/52% 52% 48% 48%; transform-origin:50% 100%; animation:fl1 .44s ease-in-out infinite alternate; }
        .f-mid  { position:absolute; bottom:0; width:12px; height:24px; background:linear-gradient(to top,#FFF0A0,#FFCC00 48%,rgba(255,140,0,0)); border-radius:50% 50% 32% 32%/52% 52% 48% 48%; transform-origin:50% 100%; animation:fl2 .38s ease-in-out infinite alternate; }
        .f-core { position:absolute; bottom:2px; width:6px; height:13px; background:linear-gradient(to top,#fff,rgba(255,255,255,.15)); border-radius:50%; transform-origin:50% 100%; animation:fl3 .32s ease-in-out infinite alternate; }
        @keyframes fl1 { 0%{transform:scaleX(1) scaleY(1) rotate(-4deg)} 100%{transform:scaleX(.86) scaleY(1.1) rotate(4deg)} }
        @keyframes fl2 { 0%{transform:scaleX(1) scaleY(1) rotate(3deg)}  100%{transform:scaleX(.9) scaleY(1.07) rotate(-3deg)} }
        @keyframes fl3 { 0%{transform:scaleX(1) translateX(-1px)}        100%{transform:scaleX(.84) translateX(1px)} }
        .wick { width:2px; height:8px; background:#5c2e1a; border-radius:1px; }
        .candle-body {
          width:28px; height:88px;
          background:linear-gradient(to right,#fbb6d4 0%,#ffffff 30%,#fce7f3 60%,#f9a8d4 100%);
          border-radius:3px 3px 5px 5px;
          box-shadow:inset -4px 0 8px rgba(244,114,182,.15),inset 3px 0 5px rgba(255,255,255,.5);
          position:relative; overflow:hidden;
        }
        .candle-body::after  { content:''; position:absolute; top:8px; left:6px; width:5px; height:22px; background:rgba(255,255,255,.7); border-radius:0 0 3px 3px; }
        .candle-body::before { content:''; position:absolute; inset:0; background:repeating-linear-gradient(180deg,transparent 0px,transparent 10px,rgba(244,114,182,.12) 10px,rgba(244,114,182,.12) 12px); }

        /* name card */
        .name-card {
          background:rgba(255,255,255,.78);
          border:2px solid rgba(244,114,182,.25);
          border-radius:22px; padding:14px 42px 16px;
          margin-bottom:16px;
          box-shadow:0 6px 32px rgba(244,114,182,.18),0 1px 4px rgba(0,0,0,.04);
          backdrop-filter:blur(6px);
          transition: opacity 1.4s ease, transform 1.4s cubic-bezier(.34,1.56,.64,1);
        }
        .name-text {
          font-family:'Bubblegum Sans',cursive;
          font-size: clamp(44px, 8vw, 90px);
          letter-spacing:.04em; line-height:1; color:#ec4899;
          text-shadow:3px 3px 0 rgba(251,113,133,.28),5px 5px 0 rgba(244,114,182,.12);
        }
        .bday-text {
          font-family:'Great Vibes',cursive;
          font-size:clamp(30px,4.5vw,52px);
          color:#be185d;
          transition: opacity 1.6s ease, transform 1.6s ease;
        }

        /* meme badge */
        .meme-badge {
          position:absolute; top:-28px; right:-74px;
          background:#fbbf24; color:#78350f;
          font-family:'Bubblegum Sans',cursive; font-size:12px;
          padding:4px 10px; border-radius:100px;
          box-shadow:2px 2px 0 rgba(0,0,0,.08); white-space:nowrap;
          animation: badgePop .5s cubic-bezier(.34,1.56,.64,1) forwards;
        }
        @keyframes badgePop {
          from { opacity:0; transform:rotate(12deg) scale(0); }
          to   { opacity:1; transform:rotate(12deg) scale(1); }
        }

        /* button */
        .enter-btn {
          margin-top:44px; padding:14px 52px;
          background:linear-gradient(135deg,#f472b6,#ec4899);
          border:none; border-radius:100px; color:#fff;
          font-family:'Bubblegum Sans',cursive; font-size:17px;
          letter-spacing:.06em; cursor:pointer; outline:none;
          box-shadow:0 6px 24px rgba(244,114,182,.45);
          position:relative; overflow:hidden; z-index:10;
          transition: box-shadow .3s, transform .3s;
          animation: btnBounce 3s ease-in-out infinite 2s;
        }
        .enter-btn:hover { box-shadow:0 10px 36px rgba(244,114,182,.62); transform:translateY(-2px) scale(1.02); }
        .enter-btn::after { content:''; position:absolute; top:0; left:-100%; width:55%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent); transform:skewX(-20deg); animation:shimmer 4s ease-in-out infinite 4s; }
        @keyframes btnBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes shimmer   { 0%,100%{left:-100%} 50%{left:140%} }

        /* petals */
        .petal { position:fixed; top:-20px; border-radius:50% 0 50% 0; opacity:0; pointer-events:none; animation:petalFall linear infinite; }
        @keyframes petalFall {
          0%  { transform:translateY(0) rotate(0deg) translateX(0); opacity:0; }
          8%  { opacity:.7; }
          88% { opacity:.4; }
          100%{ transform:translateY(112vh) rotate(640deg) translateX(45px); opacity:0; }
        }

        /* hearts */
        .heart { position:fixed; pointer-events:none; opacity:0; animation:heartFloat linear infinite; }
        @keyframes heartFloat {
          0%  { opacity:0; transform:translateY(0) scale(.5); }
          12% { opacity:.8; }
          90% { opacity:.2; }
          100%{ transform:translateY(-110vh) scale(1.2); opacity:0; }
        }
      `}</style>

      <div className="intro-page">

        {/* Flork doodles */}
        <FlorkLeft />
        <FlorkRight />
        <FlorkTop />
        <FlorkBottom />

        {/* Falling petals */}
        {petals.map(p => (
          <div key={p.id} className="petal" style={{
            left: p.left, background: p.color,
            width: `${p.size}px`, height: `${p.size * 1.5}px`,
            animationDuration: p.duration, animationDelay: p.delay,
          }} />
        ))}

        {/* Floating hearts */}
        {hearts.map(h => (
          <div key={h.id} className="heart" style={{
            left: h.left, bottom: "-10px", fontSize: h.size,
            animationDuration: h.duration, animationDelay: h.delay,
          }}>{h.emoji}</div>
        ))}

        {/* Candle */}
        <Candle visible={show.candle} haloVisible={show.halo} />

        {/* Text block */}
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Sub */}
          <p style={{
            fontFamily: "'Quicksand', sans-serif", fontWeight: 400,
            fontSize: "12px", letterSpacing: ".32em", textTransform: "uppercase",
            color: "rgba(236,72,153,.45)", marginBottom: "14px",
            opacity: show.sub ? 1 : 0,
            transform: show.sub ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
          }}>✨ a little something for ✨</p>

          {/* Name card */}
          <div className="name-card" style={{
            opacity: show.nameCard ? 1 : 0,
            transform: show.nameCard ? "scale(1)" : "scale(0.88)",
          }}>
            <div className="name-text">Vaishnaveeee</div>
          </div>

          {/* Birthday text + badge */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <p className="bday-text" style={{
              opacity: show.bday ? 1 : 0,
              transform: show.bday ? "translateY(0)" : "translateY(14px)",
            }}>Happy 21st Birthday</p>
            {show.badge && (
              <span className="meme-badge">no way she&apos;s 21!! 😭</span>
            )}
          </div>

          {/* Enter button */}
          {show.btn && (
            <button className="enter-btn" onClick={() => navigate("/hub")}>
              open your gift 🎀
            </button>
          )}
        </div>

      </div>
    </>
  );
}