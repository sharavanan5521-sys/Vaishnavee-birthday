import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   PARAGRAPHS
───────────────────────────────────────────── */
const PARAGRAPHS = [
  { type: "heading",  text: "Hi Vaishnaveeee, Happy Birthday!! 🎉🎂" },
  { type: "body",     text: "It's your 21st birthday and I just wanted to give you something memorable — something that stays with you and that you can revisit anytime. So I decided to gift you this website. I just wanted to make your birthday a little more special, and I really hope I did. 🥹" },
  { type: "body",     text: "We've been talking for more than 3 months now and in that time we've talked so much, learned so much about each other — and I genuinely can't wait for the days ahead where we get to know each other even more. 🌸" },
  { type: "body",     text: "Honestly, I felt so comfortable around you that I was just completely myself. I may have annoyed you, made you angry, even scolded you sometimes — but you never said a single word that could hurt me. You were always so conscious of my feelings. Thank you for bearing with me and always being there. 🩷" },
  { type: "body",     text: "Thank you for listening to every single rant. I kept asking questions without any hesitation and you answered every one without a hint of irritation. I still can't believe we've only known each other for 3 months — because the comfort you gave me feels like 3 years. 💗" },
  { type: "body",     text: "Thank you, Vaishnavee, for all of this. 🌼" },
  { type: "emphasis", text: "Last but not least — from this birthday onwards, please take care of yourself first. I want you to be at peace and to be happy. I've told you this many times and I'll keep telling you. You have such a good heart, Vaishnavee. You are honestly one of the kindest and most genuine people I have ever met. 👑" },
  { type: "body",     text: "I think that's all from my side — I've said everything I wanted to say. I might have forgotten something but that's okay, I'll tell you when I remember. 😄" },
  { type: "closing",  text: "Once again — HAPPY BIRTHDAY VAISHNAVEEEE!! 🎂🎊  I always adore you. 💗🌸" },
];

/* ─────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────── */
const CONFETTI_COLORS = ["#f472b6","#ec4899","#fbbf24","#fb7185","#e879f9","#fda4af","#f9a8d4","#a78bfa"];

// pre-generate so no random on render
const CONFETTI = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  left: `${(i * 137.5) % 100}%`,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  size: 6 + (i % 8),
  dur: `${1.8 + (i % 5) * 0.4}s`,
  delay: `${(i % 20) * 0.1}s`,
  rot: (i * 47) % 360,
  circle: i % 2 === 0,
}));

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 5.5) % 100}%`,
  color: ["#fda4af","#f9a8d4","#fbcfe8","#fce7f3","#f472b6"][i % 5],
  size: 7 + (i % 8),
  dur: `${7 + (i % 10)}s`,
  delay: `${(i * 0.8) % 14}s`,
}));

const HEARTS_F = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 7) % 90 + 5}%`,
  emoji: ["🩷","💗","💖","💝","🌸"][i % 5],
  size: `${11 + (i % 12)}px`,
  dur: `${5 + (i % 7)}s`,
  delay: `${(i * 0.9) % 12}s`,
}));

/* ─────────────────────────────────────────────
   FLORKS
───────────────────────────────────────────── */
const FlorkCrying = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 130" width="76">
    <ellipse cx="45" cy="96" rx="18" ry="24" fill="white" stroke="#f472b6" strokeWidth="2.2"/>
    <circle cx="45" cy="58" r="17" fill="white" stroke="#f472b6" strokeWidth="2.2"/>
    <ellipse cx="37" cy="54" rx="3.5" ry="4" fill="#be185d"/>
    <ellipse cx="53" cy="54" rx="3.5" ry="4" fill="#be185d"/>
    <path d="M37 58 Q35 65 34 71" fill="none" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round"/>
    <path d="M53 58 Q55 65 56 71" fill="none" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round"/>
    <path d="M36 66 Q45 74 54 66" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round"/>
    <ellipse cx="32" cy="62" rx="5" ry="3" fill="rgba(251,113,133,.32)"/>
    <ellipse cx="58" cy="62" rx="5" ry="3" fill="rgba(251,113,133,.32)"/>
    <polygon points="45,22 30,46 60,46" fill="#fbbf24" stroke="#f472b6" strokeWidth="1.4"/>
    <circle cx="45" cy="22" r="3" fill="#f472b6"/>
    <line x1="27" y1="84" x2="10" y2="70" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="63" y1="84" x2="80" y2="70" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="38" y1="118" x2="28" y2="130" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="52" y1="118" x2="60" y2="130" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
    <text x="45" y="12" textAnchor="middle" fontFamily="Bubblegum Sans,cursive" fontSize="9" fill="#ec4899">im crying 😭</text>
  </svg>
);

const FlorkHeart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 130" width="76">
    <ellipse cx="45" cy="96" rx="18" ry="24" fill="white" stroke="#f472b6" strokeWidth="2.2"/>
    <circle cx="45" cy="58" r="17" fill="white" stroke="#f472b6" strokeWidth="2.2"/>
    <text x="33" y="59" fontSize="13" fill="#ec4899">♥</text>
    <text x="47" y="59" fontSize="13" fill="#ec4899">♥</text>
    <path d="M35 68 Q45 78 55 68" fill="none" stroke="#be185d" strokeWidth="2.2" strokeLinecap="round"/>
    <ellipse cx="32" cy="64" rx="5" ry="3" fill="rgba(251,113,133,.32)"/>
    <ellipse cx="58" cy="64" rx="5" ry="3" fill="rgba(251,113,133,.32)"/>
    <line x1="27" y1="84" x2="8"  y2="65" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="63" y1="84" x2="82" y2="65" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
    <text x="2"  y="64" fontSize="12" fill="#f472b6">🩷</text>
    <text x="80" y="64" fontSize="12" fill="#f472b6">💗</text>
    <line x1="38" y1="118" x2="28" y2="130" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="52" y1="118" x2="60" y2="130" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
    <text x="45" y="12" textAnchor="middle" fontFamily="Bubblegum Sans,cursive" fontSize="9" fill="#ec4899">awww 🥹💗</text>
  </svg>
);

const FlorkFainted = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 58" width="108">
    <ellipse cx="68" cy="42" rx="38" ry="14" fill="white" stroke="#f472b6" strokeWidth="2"/>
    <circle cx="22" cy="28" r="15" fill="white" stroke="#f472b6" strokeWidth="2"/>
    <text x="14" y="27" fontSize="9" fill="#be185d" fontFamily="Bubblegum Sans,cursive">x</text>
    <text x="24" y="27" fontSize="9" fill="#be185d" fontFamily="Bubblegum Sans,cursive">x</text>
    <path d="M14 33 Q21 39 28 33" fill="none" stroke="#be185d" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="44" y1="33" x2="36" y2="16" stroke="#f472b6" strokeWidth="2" strokeLinecap="round"/>
    <line x1="90" y1="30" x2="100" y2="14" stroke="#f472b6" strokeWidth="2" strokeLinecap="round"/>
    <text x="62" y="11" textAnchor="middle" fontFamily="Bubblegum Sans,cursive" fontSize="10" fill="#ec4899">too much love 💗😭</text>
  </svg>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function WishCard() {
  const navigate = useNavigate();

  // phases: "intro" | "typing" | "finale"
  const [phase,        setPhase]        = useState("intro");
  const [activeIdx,    setActiveIdx]    = useState(0);
  const [typedTexts,   setTypedTexts]   = useState(Array(PARAGRAPHS.length).fill(""));
  const [showFlorks,   setShowFlorks]   = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const timerRef  = useRef(null);
  const charRef   = useRef(0);
  const bottomRef = useRef(null);

  // start typing a paragraph
  const startTyping = useCallback((idx) => {
    if (idx >= PARAGRAPHS.length) return;
    const text  = PARAGRAPHS[idx].text;
    const speed = PARAGRAPHS[idx].type === "heading"  ? 36
                : PARAGRAPHS[idx].type === "closing"  ? 30
                : 20;
    charRef.current = 0;

    timerRef.current = setInterval(() => {
      charRef.current += 1;
      const slice = text.slice(0, charRef.current);
      setTypedTexts(prev => {
        const next = [...prev];
        next[idx] = slice;
        return next;
      });
      if (charRef.current >= text.length) {
        clearInterval(timerRef.current);
        // move to next after short pause
        setTimeout(() => {
          if (idx + 1 < PARAGRAPHS.length) {
            setActiveIdx(idx + 1);
          } else {
            // all done
            setTimeout(() => setPhase("finale"),      300);
            setTimeout(() => setShowConfetti(true),   700);
            setTimeout(() => setShowFlorks(true),    1500);
          }
        }, 380);
      }
    }, speed);
  }, []);

  // kick off typing when activeIdx changes (only in typing phase)
  useEffect(() => {
    if (phase !== "typing") return;
    startTyping(activeIdx);
    // scroll after React renders the new paragraph
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    return () => clearInterval(timerRef.current);
  }, [activeIdx, phase, startTyping]);

  const handleOpen = () => {
    setPhase("typing");
    setActiveIdx(0);
  };

  // para styles
  const getStyle = (type) => {
    const base = { lineHeight: 1.85, position: "relative" };
    if (type === "heading")  return { ...base, fontFamily:"'Bubblegum Sans',cursive", fontSize:"clamp(20px,4vw,30px)", color:"#ec4899", textShadow:"2px 2px 0 rgba(251,113,133,.2)", lineHeight:1.3 };
    if (type === "emphasis") return { ...base, fontFamily:"'Quicksand',sans-serif", fontWeight:500, fontSize:"clamp(13px,2.2vw,15px)", color:"#be185d", background:"rgba(252,231,243,.55)", borderLeft:"3px solid #f472b6", borderRadius:"0 10px 10px 0", padding:"10px 14px" };
    if (type === "closing")  return { ...base, fontFamily:"'Great Vibes',cursive", fontSize:"clamp(22px,4vw,34px)", color:"#ec4899", textShadow:"2px 2px 0 rgba(251,113,133,.2)", textAlign:"center", lineHeight:1.4 };
    return { ...base, fontFamily:"'Quicksand',sans-serif", fontWeight:500, fontSize:"clamp(13px,2.2vw,15px)", color:"rgba(159,18,57,.82)" };
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Great+Vibes&family=Quicksand:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        .wp {
          width:100%; min-height:100vh;
          background:linear-gradient(160deg,#fff0f5 0%,#ffe4ef 50%,#ffd6e8 100%);
          display:flex; flex-direction:column; align-items:center;
          font-family:'Quicksand',sans-serif;
          position:relative; overflow-x:hidden; padding-bottom:clamp(40px,8vh,80px);
        }
        .wp::before {
          content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
          background-image:radial-gradient(circle,rgba(244,114,182,.16) 1.5px,transparent 1.5px);
          background-size:28px 28px;
        }
        .wp > * { position:relative; z-index:1; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes floatBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes shimmer  { 0%,100%{left:-100%} 50%{left:140%} }
        @keyframes sealSpin { 0%,100%{transform:rotate(-4deg) scale(1)} 50%{transform:rotate(4deg) scale(1.05)} }
        @keyframes florkPop { from{opacity:0;transform:scale(.7) translateY(22px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes petalFall{
          0%  {transform:translateY(0) rotate(0) translateX(0);opacity:0}
          8%  {opacity:.7}
          88% {opacity:.35}
          100%{transform:translateY(112vh) rotate(640deg) translateX(42px);opacity:0}
        }
        @keyframes heartRise{
          0%  {opacity:0;transform:translateY(0) scale(.5)}
          12% {opacity:.8}
          90% {opacity:.2}
          100%{transform:translateY(-110vh) scale(1.2);opacity:0}
        }
        @keyframes cfFall{
          0%  {transform:translateY(0) rotate(0);opacity:1}
          100%{transform:translateY(110vh) rotate(720deg);opacity:0}
        }

        /* intro */
        .intro { display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:22px;padding:32px 20px;animation:fadeIn .8s ease both; }
        .env   { font-size:90px; animation:floatBob 3s ease-in-out infinite; filter:drop-shadow(0 8px 22px rgba(244,114,182,.3)); }
        .intro-title { font-family:'Bubblegum Sans',cursive; font-size:clamp(18px,5vw,40px); color:#ec4899; text-shadow:2px 2px 0 rgba(251,113,133,.2); text-align:center; animation:fadeUp .8s ease .2s both; padding:0 12px; }
        .intro-sub   { font-size:13px; color:rgba(190,24,93,.48); text-align:center; letter-spacing:.04em; animation:fadeUp .8s ease .3s both; }
        .open-btn {
          padding:15px 56px; background:linear-gradient(135deg,#f472b6,#ec4899);
          border:none; border-radius:100px; color:#fff;
          font-family:'Bubblegum Sans',cursive; font-size:18px;
          cursor:pointer; box-shadow:0 8px 26px rgba(244,114,182,.45);
          transition:transform .25s,box-shadow .25s;
          animation:fadeUp .8s ease .4s both;
          position:relative; overflow:hidden;
        }
        .open-btn:hover { transform:translateY(-3px) scale(1.03); box-shadow:0 14px 36px rgba(244,114,182,.58); }
        .open-btn::after { content:''; position:absolute; top:0; left:-100%; width:55%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent); transform:skewX(-20deg); animation:shimmer 3.5s ease-in-out infinite 2s; }

        /* letter */
        .letter-wrap { width:100%; max-width:680px; padding:0 clamp(12px,4vw,20px); margin-top:32px; }
        .letter-card {
          background:rgba(255,255,255,.88); border:2px solid rgba(244,114,182,.2);
          border-radius:clamp(14px,4vw,24px); padding:clamp(20px,5vw,36px) clamp(16px,5vw,32px);
          box-shadow:0 12px 48px rgba(244,114,182,.14),0 2px 8px rgba(0,0,0,.04);
          backdrop-filter:blur(8px);
          display:flex; flex-direction:column; gap:clamp(14px,3vw,20px);
          animation:fadeUp .7s ease both;
        }
        .letter-top {
          display:flex; align-items:center; justify-content:center; gap:8px;
          padding-bottom:16px; border-bottom:1.5px dashed rgba(244,114,182,.28);
        }
        .top-dot { width:7px; height:7px; border-radius:50%; background:#f9a8d4; }
        .top-label { font-family:'Bubblegum Sans',cursive; font-size:13px; color:rgba(244,114,182,.5); letter-spacing:.08em; }

        /* cursor */
        .cursor {
          display:inline-block; width:2px; height:1.1em;
          background:#f472b6; margin-left:2px;
          vertical-align:middle; animation:blink .65s step-end infinite;
        }

        /* finale */
        .finale { width:100%; max-width:680px; padding:0 20px; display:flex; flex-direction:column; align-items:center; gap:22px; margin-top:28px; animation:fadeUp .8s ease both; }
        .seal   { width:82px; height:82px; border-radius:50%; background:radial-gradient(circle at 38% 38%,#f472b6,#be185d); display:flex; align-items:center; justify-content:center; font-size:34px; box-shadow:0 6px 24px rgba(190,24,93,.36),inset 0 2px 6px rgba(255,255,255,.2); animation:sealSpin 3.2s ease-in-out infinite; }
        .fin-quote { font-family:'Great Vibes',cursive; font-size:clamp(16px,4.5vw,36px); color:#ec4899; text-align:center; line-height:1.5; text-shadow:1px 1px 0 rgba(251,113,133,.18); animation:fadeUp .8s ease .2s both; max-width:90vw; word-break:break-word; }
        .flork-row { display:flex; align-items:flex-end; justify-content:center; gap:16px; flex-wrap:wrap; animation:florkPop .7s cubic-bezier(.34,1.56,.64,1) both; }
        .hub-btn { padding:14px 52px; background:linear-gradient(135deg,#f472b6,#ec4899); border:none; border-radius:100px; color:#fff; font-family:'Bubblegum Sans',cursive; font-size:17px; cursor:pointer; box-shadow:0 8px 26px rgba(244,114,182,.45); transition:transform .25s,box-shadow .25s; animation:fadeUp .8s ease .5s both; }
        .hub-btn:hover { transform:translateY(-3px); box-shadow:0 14px 36px rgba(244,114,182,.58); }

        /* floaters */
        .petal { position:fixed; top:-20px; border-radius:50% 0 50% 0; opacity:0; pointer-events:none; animation:petalFall linear infinite; z-index:10; will-change:transform,opacity; }
        .hf    { position:fixed; pointer-events:none; opacity:0; animation:heartRise linear infinite; z-index:10; will-change:transform,opacity; }
        .cf    { position:fixed; top:-14px; pointer-events:none; animation:cfFall linear forwards; z-index:10; will-change:transform,opacity; }
      `}</style>

      {/* petals */}
      {PETALS.map(p => (
        <div key={p.id} className="petal" style={{ left:p.left, background:p.color, width:`${p.size}px`, height:`${p.size*1.5}px`, animationDuration:p.dur, animationDelay:p.delay }}/>
      ))}

      {/* hearts */}
      {HEARTS_F.map(h => (
        <div key={h.id} className="hf" style={{ left:h.left, bottom:"-10px", fontSize:h.size, animationDuration:h.dur, animationDelay:h.delay }}>{h.emoji}</div>
      ))}

      {/* confetti */}
      {showConfetti && CONFETTI.map(c => (
        <div key={c.id} className="cf" style={{ left:c.left, width:`${c.size}px`, height:c.circle?`${c.size}px`:`${c.size*1.6}px`, background:c.color, borderRadius:c.circle?"50%":"2px", transform:`rotate(${c.rot}deg)`, animationDuration:c.dur, animationDelay:c.delay }}/>
      ))}

      <div className="wp">

        {/* ── INTRO ── */}
        {phase === "intro" && (
          <div className="intro">
            <div className="env">💌</div>
            <h1 className="intro-title">A little something for you, Vaishnavee 🌸</h1>
            <p className="intro-sub">tap to open your birthday wish 🎀</p>
            <button className="open-btn" onClick={handleOpen}>open 🎀</button>
          </div>
        )}

        {/* ── LETTER ── */}
        {(phase === "typing" || phase === "finale") && (
          <div className="letter-wrap">
            <div className="letter-card">
              <div className="letter-top">
                <div className="top-dot"/>
                <span className="top-label">a birthday letter 💌</span>
                <div className="top-dot"/>
              </div>

              {PARAGRAPHS.map((para, i) => {
                if (i > activeIdx && phase === "typing") return null;
                const text = typedTexts[i] || "";
                const isActive = i === activeIdx && phase === "typing";
                return (
                  <p key={i} style={getStyle(para.type)}>
                    {text}
                    {isActive && <span className="cursor"/>}
                  </p>
                );
              })}

              <div ref={bottomRef}/>
            </div>
          </div>
        )}

        {/* ── FINALE ── */}
        {phase === "finale" && (
          <div className="finale">
            <div className="seal">🌸</div>
            <p className="fin-quote">with all my heart, always —{"\n"}happy 21st, Vaishnavee 👑💗</p>
            {showFlorks && (
              <div className="flork-row">
                <FlorkCrying/>
                <FlorkFainted/>
                <FlorkHeart/>
              </div>
            )}
            <button className="hub-btn" onClick={() => navigate("/hub")}>
              back to all your gifts 🎀
            </button>
          </div>
        )}

      </div>
    </>
  );
}