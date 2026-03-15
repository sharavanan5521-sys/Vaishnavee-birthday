import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ── 21 personal notes, one per candle ─────────────────────────
const NOTES = [
  "for your contagious laugh 😄",
  "for always showing up 🤍",
  "for your kind heart 💗",
  "for being unapologetically you ✨",
  "for every late night chat 🌙",
  "for making every moment fun 🎉",
  "for your strength & courage 💪",
  "for the songs we shared 🎵",
  "for your infectious smile 😊",
  "for always keeping it real 💯",
  "for being my person 🩷",
  "for every memory we made 📸",
  "for your beautiful soul 🌸",
  "for the inside jokes 😂",
  "for your big dreams ⭐",
  "for never giving up 🌟",
  "for all the moments we shared 💖",
  "for your wisdom beyond years 🦋",
  "for being irreplaceable 💎",
  "for growing into this amazing person 🌺",
  "for simply being Vaishnavee 👑",
];

const CONFETTI_COLORS = [
  "#f472b6", "#ec4899", "#fbbf24", "#fb7185", "#e879f9",
  "#fda4af", "#f9a8d4", "#fcd34d", "#a78bfa", "#34d399",
];

const CONFETTI = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  size: 6 + Math.random() * 8,
  duration: `${1.8 + Math.random() * 2.2}s`,
  delay: `${Math.random() * 1.8}s`,
  rotate: Math.random() * 360,
  isCircle: Math.random() > 0.5,
}));

// ── Single Candle component ────────────────────────────────────
const Candle = ({ index, isBlown, onClick }) => (
  <div
    className={`candle${isBlown ? " blown" : ""}`}
    onClick={() => !isBlown && onClick(index)}
    title={`Candle ${index + 1}`}
  >
    {!isBlown && (
      <div className="flame-wrap-sm">
        <div className="f-out-sm" />
        <div className="f-mid-sm" />
        <div className="f-core-sm" />
      </div>
    )}
    <div className="wick-sm" />
    <div className="candle-body-sm" />
    {isBlown && <div className="smoke" />}
  </div>
);

// ── Main component ─────────────────────────────────────────────
export default function Cake() {
  const navigate = useNavigate();
  const [blown, setBlown] = useState(new Array(21).fill(false));
  const [activeNote, setActiveNote] = useState(null);
  const [showWish, setShowWish] = useState(false);
  const [wishStep, setWishStep] = useState(0);
  const [micReady, setMicReady] = useState(false);
  const [micDenied, setMicDenied] = useState(false);

  const blownRef = useRef(blown);
  const noteTimer = useRef(null);
  blownRef.current = blown;

  const blownCount = blown.filter(Boolean).length;

  // ── blow out one candle ──────────────────────────────────────
  const blowCandle = useCallback((index) => {
    setBlown(prev => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;

      // show note toast
      clearTimeout(noteTimer.current);
      setActiveNote({ index, note: NOTES[index] });
      noteTimer.current = setTimeout(() => setActiveNote(null), 2400);

      // all done?
      if (next.every(Boolean)) {
        setTimeout(() => setShowWish(true), 700);
      }
      return next;
    });
  }, []);

  // mic blows out the NEXT unblown candle
  const blowNext = useCallback(() => {
    const next = blownRef.current.findIndex(b => !b);
    if (next !== -1) blowCandle(next);
  }, [blowCandle]);

  // ── mic setup ───────────────────────────────────────────────
  useEffect(() => {
    let stream;
    let animFrame;

    const setup = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        source.connect(analyser);

        const data = new Uint8Array(analyser.frequencyBinCount);
        let blowStart = null;
        let lastBlow = 0;

        const detect = () => {
          analyser.getByteFrequencyData(data);
          const avg = data.reduce((a, b) => a + b, 0) / data.length;
          const now = Date.now();

          if (avg > 46) {
            if (!blowStart) blowStart = now;
            if ((now - blowStart) > 140 && (now - lastBlow) > 900) {
              lastBlow = now;
              blowStart = null;
              blowNext();
            }
          } else {
            blowStart = null;
          }
          animFrame = requestAnimationFrame(detect);
        };

        animFrame = requestAnimationFrame(detect);
        setMicReady(true);
      } catch {
        setMicDenied(true);
      }
    };

    setup();
    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [blowNext]);

  // ── wish step sequence ───────────────────────────────────────
  useEffect(() => {
    if (!showWish) return;
    const t1 = setTimeout(() => setWishStep(1), 1400);
    const t2 = setTimeout(() => setWishStep(2), 3200);
    const t3 = setTimeout(() => setWishStep(3), 5800);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [showWish]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Great+Vibes&family=Quicksand:wght@300;400;500&display=swap');

        .cake-page {
          width:100vw; min-height:100vh;
          background:linear-gradient(160deg,#fff0f5 0%,#ffe4ef 45%,#ffd6e8 100%);
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          font-family:'Quicksand',sans-serif;
          position:relative; overflow:hidden;
          padding:24px 20px 40px; user-select:none;
        }
        .cake-page::before {
          content:''; position:fixed; inset:0; pointer-events:none;
          background-image:radial-gradient(circle,rgba(244,114,182,.15) 1.5px,transparent 1.5px);
          background-size:28px 28px;
        }

        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

        /* ── header ── */
        .cake-header { text-align:center; margin-bottom:18px; animation:fadeUp .8s ease .2s both; }
        .cake-title {
          font-family:'Bubblegum Sans',cursive;
          font-size:clamp(24px,5vw,40px); color:#ec4899;
          text-shadow:2px 2px 0 rgba(251,113,133,.22);
        }
        .cake-counter {
          font-size:13px; letter-spacing:.06em;
          color:rgba(190,24,93,.58); margin-top:5px;
        }

        /* ── mic badge ── */
        .mic-badge {
          display:flex; align-items:center; gap:7px;
          font-size:11.5px; color:rgba(190,24,93,.52);
          margin-bottom:18px; animation:fadeUp .8s ease .4s both;
        }
        .mic-dot {
          width:8px; height:8px; border-radius:50%; background:#f472b6;
          animation:micPulse 1.4s ease-in-out infinite;
          flex-shrink:0;
        }
        .mic-dot.off { background:#fca5a5; animation:none; }
        @keyframes micPulse { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.15)} }

        /* ── cake scene ── */
        .cake-scene { animation:fadeUp .8s ease .5s both; display:flex; flex-direction:column; align-items:center; }

        /* ── candle rows ── */
        .candles-area { display:flex; flex-direction:column; align-items:center; gap:5px; }
        .candles-row  { display:flex; gap:7px; align-items:flex-end; }

        /* ── single candle ── */
        .candle {
          display:flex; flex-direction:column; align-items:center;
          cursor:pointer; position:relative;
          transition:transform .18s;
        }
        .candle:hover:not(.blown) { transform:scale(1.12); }
        .candle:active            { transform:scale(.9); }

        /* flame pieces */
        .flame-wrap-sm { width:14px; height:28px; position:relative; display:flex; align-items:flex-end; justify-content:center; }
        .f-out-sm  { position:absolute;bottom:0;width:10px;height:18px;background:linear-gradient(to top,#FFA020,#FF5500 55%,rgba(255,60,0,0));border-radius:50% 50% 32% 32%/52% 52% 48% 48%;transform-origin:50% 100%;animation:fl1 .44s ease-in-out infinite alternate; }
        .f-mid-sm  { position:absolute;bottom:0;width:7px;height:13px;background:linear-gradient(to top,#FFF0A0,#FFCC00 48%,rgba(255,140,0,0));border-radius:50% 50% 32% 32%/52% 52% 48% 48%;transform-origin:50% 100%;animation:fl2 .38s ease-in-out infinite alternate; }
        .f-core-sm { position:absolute;bottom:1px;width:3px;height:8px;background:linear-gradient(to top,#fff,rgba(255,255,255,.2));border-radius:50%;transform-origin:50% 100%;animation:fl3 .32s ease-in-out infinite alternate; }
        @keyframes fl1 { 0%{transform:scaleX(1) scaleY(1) rotate(-4deg)} 100%{transform:scaleX(.86) scaleY(1.1) rotate(4deg)} }
        @keyframes fl2 { 0%{transform:scaleX(1) scaleY(1) rotate(3deg)}  100%{transform:scaleX(.9) scaleY(1.07) rotate(-3deg)} }
        @keyframes fl3 { 0%{transform:scaleX(1) translateX(-1px)} 100%{transform:scaleX(.84) translateX(1px)} }

        .wick-sm { width:1.5px; height:5px; background:#5c2e1a; border-radius:1px; }

        .candle-body-sm {
          width:14px; height:44px;
          background:linear-gradient(to right,#fbb6d4 0%,#ffffff 30%,#fce7f3 60%,#f9a8d4 100%);
          border-radius:2px 2px 3px 3px;
          box-shadow:inset -2px 0 4px rgba(244,114,182,.15),inset 2px 0 3px rgba(255,255,255,.5);
          position:relative; overflow:hidden;
        }
        .candle-body-sm::before {
          content:''; position:absolute; inset:0;
          background:repeating-linear-gradient(180deg,transparent 0,transparent 6px,rgba(244,114,182,.12) 6px,rgba(244,114,182,.12) 7.5px);
        }

        /* blown state */
        .candle.blown .candle-body-sm { opacity:.5; filter:grayscale(.5); }
        .candle.blown .wick-sm        { background:#bbb; }
        .smoke {
          position:absolute; top:-16px; left:50%;
          transform:translateX(-50%);
          width:3px; height:14px;
          background:linear-gradient(to top,rgba(160,160,160,.5),transparent);
          border-radius:2px;
          animation:smokeRise 1s ease-out forwards;
        }
        @keyframes smokeRise {
          0%   { opacity:.7; transform:translateX(-50%) scaleX(1) translateY(0); }
          100% { opacity:0;  transform:translateX(-50%) scaleX(2.5) translateY(-14px); }
        }

        /* ── CAKE CSS ── */
        .cake-body { display:flex; flex-direction:column; align-items:center; }

        .cake-top-plate {
          width:260px; height:14px;
          background:linear-gradient(to bottom,#fce7f3,#f9a8d4);
          border-radius:50%;
          box-shadow:0 4px 10px rgba(244,114,182,.22);
          z-index:4; margin-top:-2px;
        }
        .cake-tier1 {
          width:240px; height:70px;
          background:linear-gradient(to bottom,#fff0f5,#fce7f3 45%,#fda4af);
          border-radius:4px;
          position:relative; overflow:hidden;
          box-shadow:0 5px 18px rgba(244,114,182,.18);
        }
        .cake-tier1::before {
          content:''; position:absolute; top:14px; left:0; right:0; height:4px;
          background:repeating-linear-gradient(90deg,#f9a8d4 0,#f9a8d4 14px,#fff 14px,#fff 22px);
          opacity:.5;
        }
        .frosting-row {
          position:absolute; top:-5px; left:0; right:0; height:16px;
          display:flex; justify-content:space-around; align-items:flex-end;
          padding:0 6px;
        }
        .frost-blob {
          width:20px; height:16px;
          background:white; border-radius:50% 50% 0 0;
          box-shadow:0 2px 4px rgba(244,114,182,.12);
        }
        .cake-hearts { position:absolute; bottom:10px; left:0; right:0; display:flex; justify-content:space-evenly; }
        .cake-heart  { font-size:14px; animation:hbeat 2s ease-in-out infinite; }
        .cake-heart:nth-child(2) { animation-delay:.35s; }
        .cake-heart:nth-child(3) { animation-delay:.7s; }
        @keyframes hbeat { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }

        .cake-tier2 {
          width:200px; height:52px;
          background:linear-gradient(to bottom,#fce7f3,#fbcfe8 45%,#f9a8d4);
          position:relative; overflow:hidden;
        }
        .cake-tier2::before {
          content:''; position:absolute; top:11px; left:0; right:0; height:3.5px;
          background:repeating-linear-gradient(90deg,#f472b6 0,#f472b6 10px,#fff 10px,#fff 18px);
          opacity:.38;
        }
        .cake-base-plate {
          width:280px; height:16px;
          background:linear-gradient(to bottom,#fda4af,#fbb6d4);
          border-radius:0 0 50% 50%;
          box-shadow:0 6px 16px rgba(244,114,182,.2);
        }

        /* ── note toast ── */
        .note-toast {
          position:fixed; bottom:100px; left:50%;
          background:rgba(255,255,255,.96);
          border:2px solid rgba(244,114,182,.3);
          border-radius:100px; padding:10px 24px;
          font-family:'Bubblegum Sans',cursive; font-size:15px; color:#be185d;
          box-shadow:0 8px 28px rgba(244,114,182,.2);
          z-index:80; white-space:nowrap;
          animation:toastIn .4s cubic-bezier(.34,1.56,.64,1) forwards;
        }
        @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(18px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }

        /* ── make a wish overlay ── */
        .wish-overlay {
          position:fixed; inset:0; z-index:200;
          background:linear-gradient(160deg,rgba(255,240,245,.97),rgba(255,220,235,.97));
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          animation:overlayIn .7s ease forwards;
        }
        @keyframes overlayIn { from{opacity:0} to{opacity:1} }

        .wish-step  { text-align:center; animation:wishPop .8s cubic-bezier(.34,1.56,.64,1) forwards; }
        @keyframes wishPop { from{opacity:0;transform:scale(.88)} to{opacity:1;transform:scale(1)} }

        .wish-emoji {
          display:block; font-size:74px; margin-bottom:18px;
          animation:emojiFloat 1.4s ease-in-out infinite;
        }
        @keyframes emojiFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }

        .wish-headline {
          font-family:'Great Vibes',cursive;
          font-size:clamp(38px,7vw,66px); color:#ec4899; line-height:1.2;
        }
        .wish-subtext {
          font-size:14px; color:rgba(190,24,93,.58);
          margin-top:10px; letter-spacing:.04em;
        }
        .back-hub-btn {
          margin-top:34px; padding:13px 48px;
          background:linear-gradient(135deg,#f472b6,#ec4899);
          border:none; border-radius:100px; color:#fff;
          font-family:'Bubblegum Sans',cursive; font-size:16px;
          cursor:pointer; box-shadow:0 6px 20px rgba(244,114,182,.4);
          animation:fadeUp .8s ease .3s both;
          transition:transform .2s, box-shadow .2s;
        }
        .back-hub-btn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(244,114,182,.55); }

        /* ── confetti ── */
        .cf { position:fixed; top:-12px; pointer-events:none; animation:cfFall linear forwards; }
        @keyframes cfFall { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(740deg);opacity:0} }
      `}</style>

      <div className="cake-page">

        {/* Header */}
        <div className="cake-header">
          <h1 className="cake-title">make a wish, Vaishnavee! 🎂</h1>
          <p className="cake-counter">
            {blownCount === 21
              ? "all 21 wishes sent into the universe 🌟"
              : `${blownCount} / 21 candles blown out`}
          </p>
        </div>

        {/* Mic badge */}
        <div className="mic-badge">
          <div className={`mic-dot${micDenied ? " off" : ""}`} />
          {micDenied
            ? "mic blocked — just click the candles 🖱️"
            : micReady
              ? "mic ready — blow or click to extinguish 🎤"
              : "requesting mic permission..."}
        </div>

        {/* Cake scene */}
        <div className="cake-scene">

          {/* 21 candles — 3 rows of 7 */}
          <div className="candles-area">
            {[0, 1, 2].map(row => (
              <div className="candles-row" key={row}>
                {Array.from({ length: 7 }, (_, col) => {
                  const idx = row * 7 + col;
                  return (
                    <Candle
                      key={idx}
                      index={idx}
                      isBlown={blown[idx]}
                      onClick={blowCandle}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Cake */}
          <div className="cake-body">
            <div className="cake-top-plate" />
            <div className="cake-tier1">
              <div className="frosting-row">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div className="frost-blob" key={i} />
                ))}
              </div>
              <div className="cake-hearts">
                <span className="cake-heart">🩷</span>
                <span className="cake-heart">💗</span>
                <span className="cake-heart">🩷</span>
              </div>
            </div>
            <div className="cake-tier2" />
            <div className="cake-base-plate" />
          </div>

        </div>

        {/* Note toast */}
        {activeNote && (
          <div className="note-toast">
            🕯️ {activeNote.note}
          </div>
        )}

        {/* Make a wish overlay */}
        {showWish && (
          <div className="wish-overlay">

            {/* confetti rain */}
            {CONFETTI.map(c => (
              <div key={c.id} className="cf" style={{
                left: c.left,
                width: `${c.size}px`,
                height: c.isCircle ? `${c.size}px` : `${c.size * 1.6}px`,
                background: c.color,
                borderRadius: c.isCircle ? "50%" : "2px",
                transform: `rotate(${c.rotate}deg)`,
                animationDuration: c.duration,
                animationDelay: c.delay,
              }} />
            ))}

            {wishStep === 0 && (
              <div className="wish-step">
                <span className="wish-emoji">🎉</span>
                <p className="wish-headline">you did it!!</p>
                <p className="wish-subtext">all 21 candles are out ✨</p>
              </div>
            )}

            {wishStep === 1 && (
              <div className="wish-step">
                <span className="wish-emoji">🤫</span>
                <p className="wish-headline">close your eyes...</p>
                <p className="wish-subtext">this is your moment 🌙</p>
              </div>
            )}

            {wishStep >= 2 && (
              <div className="wish-step">
                <span className="wish-emoji">🌟</span>
                <p className="wish-headline">make a wish!</p>
                <p className="wish-subtext">the universe is listening 💫</p>
                {wishStep === 3 && (
                  <button className="back-hub-btn" onClick={() => navigate("/hub")}>
                    back to your gifts 🎀
                  </button>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </>
  );
}