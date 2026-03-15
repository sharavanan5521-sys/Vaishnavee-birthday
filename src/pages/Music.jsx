import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Howl } from "howler";

/* ─────────────────────────────────────────────
   SONGS  — drop audio files in public/audio/
───────────────────────────────────────────── */
const SONGS = [
  { id: 1, title: "Ranjha",               artist: "Hanan Shaah",       file: "/audio/ranjha.mp3",        color: "#fda4af", accent: "#be185d" },
  { id: 2, title: "Aaruyire",             artist: "A.R. Rahman",        file: "/audio/aaruyire.mp3",       color: "#f9a8d4", accent: "#9d174d" },
  { id: 3, title: "Oorum Blood Orchestral", artist: "Sai Abhyankkar",   file: "/audio/oorum-blood.mp3",   color: "#fbcfe8", accent: "#be185d" },
  { id: 4, title: "Snehidhane",           artist: "A.R. Rahman",        file: "/audio/snehidhane.mp3",     color: "#fce7f3", accent: "#9d174d" },
  { id: 5, title: "Unnal Unnal",          artist: "A.R. Rahman",        file: "/audio/unnal-unnal.mp3",    color: "#fda4af", accent: "#be185d" },
];

/* ─────────────────────────────────────────────
   SONG MEMORIES — one per song, shown in flork bubbles
───────────────────────────────────────────── */
const MEMORIES = [
  {
    left:  "this song started it all 🎵",
    right: "our first ever music convo!!",
  },
  {
    left:  "The song I asked you to sing 🌙",
    right: "You refused to sing, and we had a long convo.",
  },
  {
    left:  "I asked who's your fav music director 🤔",
    right: "You said Sai Abhyankkar!",
  },
  {
    left:  "I said this album is overrated!",
    right: "You said that you love this album🎶",
  },
  {
    left:  "this is SO you vaishu 🌸",
    right: "I believe this song belongs to you 💗",
  },
];

/* ─────────────────────────────────────────────
   JASMINE SVG — single flower
───────────────────────────────────────────── */
const JasminePetal = ({ cx, cy, angle, size = 1, opacity = 1 }) => {
  const r = `rotate(${angle} ${cx} ${cy})`;
  const pw = 9 * size, ph = 16 * size;
  return (
    <g transform={r} opacity={opacity}>
      <ellipse cx={cx} cy={cy - ph * 0.5} rx={pw / 2} ry={ph / 2}
        fill="white" stroke="#f9a8d4" strokeWidth="0.7"/>
    </g>
  );
};

const JasmineFlower = ({ cx, cy, size = 1, bloom = 1, delay = 0 }) => {
  const petals = 5;
  const centerR = 4 * size;
  return (
    <g style={{ opacity: bloom, transition: `opacity 0.8s ease ${delay}s` }}>
      {Array.from({ length: petals }, (_, i) => (
        <JasminePetal key={i} cx={cx} cy={cy} angle={(360 / petals) * i} size={size} />
      ))}
      {/* yellow center */}
      <circle cx={cx} cy={cy} r={centerR} fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.6"/>
      <circle cx={cx} cy={cy} r={centerR * 0.55} fill="#fef08a"/>
    </g>
  );
};

/* ─────────────────────────────────────────────
   JASMINE BOUQUET SVG
───────────────────────────────────────────── */
const JasmineBouquet = ({ bloomCount, allPlayed }) => {
  const flowers = [
    { cx: 190, cy: 105, size: 1.9, delay: 0    },
    { cx: 248, cy: 82,  size: 1.7, delay: 0.15 },
    { cx: 136, cy: 94,  size: 1.6, delay: 0.25 },
    { cx: 228, cy: 142, size: 1.5, delay: 0.35 },
    { cx: 155, cy: 138, size: 1.6, delay: 0.45 },
    { cx: 196, cy: 63,  size: 1.4, delay: 0.55 },
    { cx: 278, cy: 112, size: 1.3, delay: 0.60 },
    { cx: 112, cy: 128, size: 1.3, delay: 0.70 },
    { cx: 210, cy: 168, size: 1.4, delay: 0.80 },
    { cx: 172, cy: 172, size: 1.2, delay: 0.90 },
    { cx: 254, cy: 162, size: 1.2, delay: 1.00 },
    { cx: 128, cy: 165, size: 1.1, delay: 1.10 },
    { cx: 192, cy: 42,  size: 1.1, delay: 1.20 },
    { cx: 295, cy: 78,  size: 1.0, delay: 1.30 },
  ];

  const toShow = Math.min(flowers.length, Math.round((bloomCount / 5) * flowers.length));

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <svg viewBox="0 0 400 360" width="100%" height="auto" style={{ overflow: "visible", flexShrink: 0, maxWidth: "340px", minWidth: "180px" }}>
        {/* green stems */}
        <g stroke="#86efac" strokeWidth="2.2" fill="none" strokeLinecap="round">
          <path d="M200 340 Q182 282 155 235 Q138 200 136 165"/>
          <path d="M200 340 Q200 282 192 232 Q188 195 190 160"/>
          <path d="M200 340 Q218 282 235 232 Q252 200 248 160"/>
          <path d="M200 340 Q212 298 226 260 Q242 222 262 180"/>
          <path d="M200 340 Q188 298 175 260 Q160 222 140 180"/>
          <path d="M200 340 Q198 295 198 252 Q195 208 196 168"/>
          <path d="M200 340 Q226 296 248 256 Q268 220 278 175"/>
          <path d="M200 340 Q174 296 154 256 Q134 220 112 175"/>
          <path d="M200 340 Q208 294 214 252 Q218 215 210 188"/>
          <path d="M200 340 Q192 294 188 252 Q184 218 172 190"/>
          <path d="M200 340 Q222 295 242 258 Q260 222 254 182"/>
          <path d="M200 340 Q178 295 160 258 Q142 222 128 182"/>
          <path d="M200 340 Q200 290 196 245 Q193 205 192 165"/>
          <path d="M200 340 Q234 298 262 255 Q284 220 295 155"/>
          {/* leaves */}
          <path d="M182 258 Q166 246 169 234 Q185 244 182 258Z" fill="#86efac" stroke="none"/>
          <path d="M218 248 Q234 236 232 224 Q216 234 218 248Z" fill="#86efac" stroke="none"/>
          <path d="M188 212 Q172 200 174 188 Q190 198 188 212Z" fill="#86efac" stroke="none"/>
          <path d="M212 204 Q228 192 226 180 Q210 190 212 204Z" fill="#86efac" stroke="none"/>
          <path d="M175 190 Q159 178 162 166 Q178 176 175 190Z" fill="#86efac" stroke="none"/>
        </g>

        {/* ribbon wrap */}
        <path d="M176 336 Q200 324 224 336 Q218 348 200 352 Q182 348 176 336Z"
          fill="#fda4af" stroke="#f472b6" strokeWidth="1.2"/>
        <path d="M176 336 Q172 318 184 306 L200 316 L216 306 Q228 318 224 336"
          fill="#fbcfe8" stroke="#f9a8d4" strokeWidth="1.2"/>
        {/* bow */}
        <path d="M192 308 Q178 296 183 286 Q195 294 192 308Z" fill="#f472b6"/>
        <path d="M208 308 Q222 296 217 286 Q205 294 208 308Z" fill="#f472b6"/>
        <circle cx="200" cy="306" r="6" fill="#ec4899"/>

        {/* jasmine flowers */}
        {flowers.map((f, i) => (
          <JasmineFlower key={i} cx={f.cx} cy={f.cy} size={f.size} bloom={i < toShow ? 1 : 0} delay={f.delay}/>
        ))}

        {/* floating petals */}
        {bloomCount > 0 && [
          { x: 72, y: 92, r: 12 }, { x: 328, y: 118, r: -14 },
          { x: 60, y: 190, r: 22 }, { x: 335, y: 72, r: -9 },
          { x: 88, y: 260, r: 16 }, { x: 315, y: 200, r: -18 },
        ].map((p, i) => (
          <ellipse key={i} cx={p.x} cy={p.y} rx="7" ry="12"
            fill="rgba(255,255,255,.75)" stroke="#f9a8d4" strokeWidth="0.7"
            transform={`rotate(${p.r} ${p.x} ${p.y})`}
            style={{ opacity: bloomCount / 5, animation: `floatPetal ${2.2 + i * 0.4}s ease-in-out infinite alternate` }}
          />
        ))}
      </svg>

      {/* finale message when all 5 songs played */}
      {allPlayed && (
        <div style={{
          fontFamily: "'Bubblegum Sans', cursive",
          fontSize: "clamp(16px, 3.5vw, 22px)",
          color: "#ec4899",
          textAlign: "center",
          textShadow: "2px 2px 0 rgba(251,113,133,.2)",
          animation: "fadeUp .9s cubic-bezier(.34,1.56,.64,1) both",
          padding: "4px 16px",
        }}>
          nah this is for you, Vaishu 🌼💗
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   FLORK holding jasmine
───────────────────────────────────────────── */
const FlorkWithFlower = ({ memory }) => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"6px", flexShrink:0 }}>
    <div style={{
      background:"rgba(255,255,255,.92)", border:"2px solid rgba(244,114,182,.3)",
      borderRadius:"14px", padding:"7px 12px",
      fontFamily:"'Bubblegum Sans',cursive", fontSize:"11px", color:"#be185d",
      maxWidth:"130px", textAlign:"center", lineHeight:1.4,
      boxShadow:"0 3px 12px rgba(244,114,182,.15)", position:"relative",
      opacity: memory ? 1 : 0,
      transform: memory ? "translateY(0) scale(1)" : "translateY(8px) scale(.9)",
      transition:"opacity .5s ease, transform .5s cubic-bezier(.34,1.56,.64,1)",
      minHeight:"36px",
    }}>
      {memory || "‎"}
      {memory && <div style={{ position:"absolute", bottom:"-8px", left:"50%", transform:"translateX(-50%)", width:0, height:0, borderLeft:"7px solid transparent", borderRight:"7px solid transparent", borderTop:"8px solid rgba(255,255,255,.92)" }}/>}
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 150" width="88">
      <ellipse cx="55" cy="112" rx="22" ry="28" fill="white" stroke="#f472b6" strokeWidth="2.2"/>
      <circle cx="55" cy="68" r="19" fill="white" stroke="#f472b6" strokeWidth="2.2"/>
      <text x="43" y="67" fontSize="11" fill="#f59e0b" fontFamily="Bubblegum Sans,cursive">★</text>
      <text x="57" y="67" fontSize="11" fill="#f59e0b" fontFamily="Bubblegum Sans,cursive">★</text>
      <path d="M44 76 Q55 86 66 76" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="40" cy="73" rx="5" ry="3" fill="rgba(251,113,133,.3)"/>
      <ellipse cx="70" cy="73" rx="5" ry="3" fill="rgba(251,113,133,.3)"/>
      <line x1="34" y1="100" x2="14" y2="76" stroke="#f472b6" strokeWidth="2.3" strokeLinecap="round"/>
      <line x1="76" y1="102" x2="94" y2="118" stroke="#f472b6" strokeWidth="2.3" strokeLinecap="round"/>
      <line x1="46" y1="138" x2="36" y2="150" stroke="#f472b6" strokeWidth="2.3" strokeLinecap="round"/>
      <line x1="64" y1="138" x2="72" y2="150" stroke="#f472b6" strokeWidth="2.3" strokeLinecap="round"/>
      <line x1="14" y1="76" x2="14" y2="48" stroke="#86efac" strokeWidth="1.8" strokeLinecap="round"/>
      {[0,72,144,216,288].map((a,i) => (
        <ellipse key={i} cx={14+Math.sin(a*Math.PI/180)*7} cy={44+Math.cos(a*Math.PI/180)*7}
          rx="4" ry="7" fill="white" stroke="#f9a8d4" strokeWidth="0.8"
          transform={`rotate(${a} ${14+Math.sin(a*Math.PI/180)*7} ${44+Math.cos(a*Math.PI/180)*7})`}/>
      ))}
      <circle cx="14" cy="44" r="3.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.6"/>
    </svg>
  </div>
);

const FlorkDancing = ({ memory }) => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"6px", flexShrink:0 }}>
    <div style={{
      background:"rgba(255,255,255,.92)", border:"2px solid rgba(244,114,182,.3)",
      borderRadius:"14px", padding:"7px 12px",
      fontFamily:"'Bubblegum Sans',cursive", fontSize:"11px", color:"#be185d",
      maxWidth:"130px", textAlign:"center", lineHeight:1.4,
      boxShadow:"0 3px 12px rgba(244,114,182,.15)", position:"relative",
      opacity: memory ? 1 : 0,
      transform: memory ? "translateY(0) scale(1)" : "translateY(8px) scale(.9)",
      transition:"opacity .5s ease, transform .5s cubic-bezier(.34,1.56,.64,1)",
      minHeight:"36px",
    }}>
      {memory || "‎"}
      {memory && <div style={{ position:"absolute", bottom:"-8px", left:"50%", transform:"translateX(-50%)", width:0, height:0, borderLeft:"7px solid transparent", borderRight:"7px solid transparent", borderTop:"8px solid rgba(255,255,255,.92)" }}/>}
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 130" width="72">
      <ellipse cx="45" cy="95" rx="18" ry="24" fill="white" stroke="#f472b6" strokeWidth="2"/>
      <circle cx="45" cy="58" r="17" fill="white" stroke="#f472b6" strokeWidth="2"/>
      <text x="36" y="56" fontSize="11" fill="#f59e0b" fontFamily="Bubblegum Sans,cursive">★</text>
      <text x="49" y="56" fontSize="11" fill="#f59e0b" fontFamily="Bubblegum Sans,cursive">★</text>
      <path d="M35 66 Q45 76 55 66" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="33" cy="63" rx="4.5" ry="2.8" fill="rgba(251,113,133,.3)"/>
      <ellipse cx="57" cy="63" rx="4.5" ry="2.8" fill="rgba(251,113,133,.3)"/>
      <line x1="28" y1="84" x2="10" y2="64" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="62" y1="84" x2="80" y2="64" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
      <text x="4"  y="62" fontSize="12" fill="#f472b6">♪</text>
      <text x="80" y="62" fontSize="12" fill="#f472b6">♫</text>
      <line x1="38" y1="118" x2="28" y2="130" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="52" y1="118" x2="60" y2="130" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  </div>
);

/* ─────────────────────────────────────────────
   MUSIC VISUALISER BARS
───────────────────────────────────────────── */
const Visualiser = ({ playing }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "28px" }}>
    {[1,2,3,4,5,6].map(i => (
      <div key={i} style={{
        width: "4px", background: "#f472b6", borderRadius: "2px",
        height: playing ? undefined : "4px",
        animation: playing ? `bar${i} ${0.5 + i * 0.07}s ease-in-out infinite alternate` : "none",
        minHeight: "4px",
      }}/>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function Music() {
  const navigate  = useNavigate();
  const [current,  setCurrent]  = useState(null); // index of playing song
  const [playing,  setPlaying]  = useState(false);
  const [progress, setProgress] = useState(0);    // 0-1
  const [duration, setDuration] = useState(0);
  const [visible,  setVisible]  = useState([]);   // which cards have scrolled in
  const howlRef   = useRef(null);
  const rafRef    = useRef(null);
  const cardRefs  = useRef([]);

  // bloomCount = number of songs played at least once
  const [played, setPlayed] = useState(new Set());
  const bloomCount = played.size;

  /* ── intersection observer for scroll-in cards ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const i = parseInt(e.target.dataset.idx);
          setVisible(v => v.includes(i) ? v : [...v, i]);
        }
      }),
      { threshold: 0.2 }
    );
    cardRefs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  /* ── progress ticker ── */
  const tick = () => {
    if (!howlRef.current) return;
    const seek = howlRef.current.seek() || 0;
    const dur  = howlRef.current.duration() || 1;
    setProgress(seek / dur);
    setDuration(dur);
    rafRef.current = requestAnimationFrame(tick);
  };

  /* ── play a song ── */
  const playSong = (idx) => {
    if (howlRef.current) { howlRef.current.stop(); howlRef.current.unload(); }
    cancelAnimationFrame(rafRef.current);

    const song = SONGS[idx];
    const h = new Howl({
      src: [song.file],
      html5: true,
      onplay: () => { setPlaying(true); rafRef.current = requestAnimationFrame(tick); },
      onpause: () => { setPlaying(false); cancelAnimationFrame(rafRef.current); },
      onstop:  () => { setPlaying(false); cancelAnimationFrame(rafRef.current); setProgress(0); },
      onend:   () => {
        setPlaying(false); setProgress(0);
        cancelAnimationFrame(rafRef.current);
        // auto next
        const next = (idx + 1) % SONGS.length;
        setTimeout(() => playSong(next), 600);
      },
    });
    h.play();
    howlRef.current = h;
    setCurrent(idx);
    setPlayed(p => new Set([...p, idx]));
  };

  const togglePlay = () => {
    if (!howlRef.current) return;
    if (playing) howlRef.current.pause();
    else         howlRef.current.play();
  };

  const seek = (e) => {
    if (!howlRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = (e.clientX - rect.left) / rect.width;
    howlRef.current.seek(frac * (howlRef.current.duration() || 0));
  };

  const fmt = (secs) => {
    const s = Math.floor(secs);
    return `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  };

  useEffect(() => () => {
    if (howlRef.current) howlRef.current.unload();
    cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Great+Vibes&family=Quicksand:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        .music-page {
          width:100%; min-height:100vh;
          background:linear-gradient(160deg,#fff0f5 0%,#ffe4ef 50%,#ffd6e8 100%);
          display:flex; flex-direction:column;
          align-items:center;
          font-family:'Quicksand',sans-serif;
          position:relative; overflow-x:hidden;
          padding-bottom:60px;
        }
        .music-page::before {
          content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
          background-image:radial-gradient(circle,rgba(244,114,182,.16) 1.5px,transparent 1.5px);
          background-size:28px 28px;
        }
        .music-page > * { position:relative; z-index:1; }

        @keyframes fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes floatBob{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes floatPetal { from{transform:translateY(0) rotate(0deg)} to{transform:translateY(-10px) rotate(20deg)} }

        /* bar animations */
        @keyframes bar1 { from{height:4px} to{height:22px} }
        @keyframes bar2 { from{height:6px} to{height:28px} }
        @keyframes bar3 { from{height:8px} to{height:18px} }
        @keyframes bar4 { from{height:5px} to{height:24px} }
        @keyframes bar5 { from{height:7px} to{height:20px} }
        @keyframes bar6 { from{height:4px} to{height:16px} }

        /* ── header ── */
        .music-header {
          text-align:center; padding:28px 20px 0;
          animation:fadeUp .8s ease both;
        }
        .music-title {
          font-family:'Bubblegum Sans',cursive;
          font-size:clamp(18px,5vw,40px); color:#ec4899;
          text-shadow:2px 2px 0 rgba(251,113,133,.2);
        }
        .music-sub {
          font-size:12px; letter-spacing:.04em;
          color:rgba(190,24,93,.48); margin-top:5px;
        }

        .bouquet-float { animation:floatBob 4s ease-in-out infinite; }

        /* ── now playing ── */
        .now-playing {
          width:100%;
          background:rgba(255,255,255,.82);
          border:2px solid rgba(244,114,182,.25);
          border-radius:20px; padding:18px 20px;
          backdrop-filter:blur(8px);
          box-shadow:0 6px 28px rgba(244,114,182,.15);
          animation:fadeUp .8s ease .3s both;
        }
        .np-top { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
        .np-disc {
          width:52px; height:52px; border-radius:50%;
          background:linear-gradient(135deg,#fda4af,#f472b6);
          display:flex; align-items:center; justify-content:center;
          font-size:22px; flex-shrink:0;
          box-shadow:0 4px 14px rgba(244,114,182,.3);
          animation:none;
        }
        .np-disc.spinning { animation:spin 3s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg); } }

        .np-info { flex:1; min-width:0; }
        .np-title  { font-family:'Bubblegum Sans',cursive; font-size:17px; color:#be185d; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .np-artist { font-size:12px; color:rgba(190,24,93,.55); margin-top:2px; }

        /* progress */
        .np-bar-wrap {
          width:100%; height:6px; background:rgba(244,114,182,.2);
          border-radius:3px; cursor:pointer; margin-bottom:6px;
          position:relative; overflow:hidden;
        }
        .np-bar-fill { height:100%; background:linear-gradient(90deg,#f472b6,#ec4899); border-radius:3px; transition:width .25s linear; }
        .np-times { display:flex; justify-content:space-between; font-size:11px; color:rgba(190,24,93,.45); margin-bottom:12px; }

        /* controls */
        .np-controls { display:flex; align-items:center; justify-content:center; gap:14px; }
        .ctrl-btn {
          width:38px; height:38px; border-radius:50%;
          border:2px solid rgba(244,114,182,.3);
          background:rgba(255,255,255,.7);
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; font-size:14px;
          transition:transform .2s, background .2s, border-color .2s;
        }
        .ctrl-btn:hover { transform:scale(1.1); background:rgba(255,255,255,.95); border-color:rgba(244,114,182,.55); }
        .ctrl-play {
          width:52px; height:52px;
          background:linear-gradient(135deg,#f472b6,#ec4899);
          border:none; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; font-size:20px;
          box-shadow:0 6px 20px rgba(244,114,182,.4);
          transition:transform .2s, box-shadow .2s;
        }
        .ctrl-play:hover { transform:scale(1.08); box-shadow:0 10px 28px rgba(244,114,182,.55); }

        /* ── song cards ── */
        .cards-section { width:100%; display:flex; flex-direction:column; gap:12px; }

        .song-card {
          display:flex; align-items:center; gap:14px;
          background:rgba(255,255,255,.75);
          border:2px solid rgba(244,114,182,.18);
          border-radius:16px; padding:14px 16px;
          cursor:pointer;
          box-shadow:0 4px 16px rgba(244,114,182,.1);
          backdrop-filter:blur(6px);
          opacity:0; transform:translateX(-30px);
          transition:opacity .6s ease, transform .6s cubic-bezier(.34,1.4,.64,1),
                      background .25s, border-color .25s, box-shadow .25s;
        }
        .song-card.visible { opacity:1; transform:translateX(0); }
        .song-card.active  { border-color:rgba(244,114,182,.55); background:rgba(255,255,255,.95); box-shadow:0 6px 24px rgba(244,114,182,.22); }
        .song-card:hover:not(.active) { background:rgba(255,255,255,.88); transform:translateX(4px); }

        .card-num {
          font-family:'Bubblegum Sans',cursive; font-size:15px;
          color:rgba(244,114,182,.45); width:22px; flex-shrink:0; text-align:center;
        }
        .card-num.active-num { color:#ec4899; }
        .card-dot { width:42px; height:42px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:18px; }
        .card-info { flex:1; min-width:0; }
        .card-title  { font-family:'Bubblegum Sans',cursive; font-size:15px; color:#be185d; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .card-artist { font-size:11.5px; color:rgba(190,24,93,.52); margin-top:2px; }
        .card-right  { display:flex; align-items:center; }
        .played-badge { font-size:10px; color:#f472b6; font-family:'Bubblegum Sans',cursive; letter-spacing:.02em; }

        /* ── two-column layout ── */
        .main-layout {
          width:100%; max-width:1100px;
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:28px; align-items:start;
          padding:0 20px;
        }
        /* left col: player + cards */
        .left-col { display:flex; flex-direction:column; gap:16px; min-width:0; }
        /* right col: florks + bouquet */
        .right-col {
          display:flex; flex-direction:column;
          align-items:center; gap:8px;
          position:sticky; top:24px; min-width:0;
        }

        /* on small screens stack vertically */
        @media (max-width: 700px) {
          .main-layout { grid-template-columns:1fr; padding:0 16px; gap:16px; }
          .right-col { position:static; }
        }
        @media (max-width: 480px) {
          .main-layout { padding:0 12px; gap:12px; }
          .now-playing { padding:14px 14px; }
          .song-card   { padding:10px 12px; gap:10px; }
        }

        /* ── back button ── */
        .back-btn {
          margin-top:28px; padding:13px 44px;
          background:linear-gradient(135deg,#f472b6,#ec4899);
          border:none; border-radius:100px; color:#fff;
          font-family:'Bubblegum Sans',cursive; font-size:16px;
          cursor:pointer; box-shadow:0 6px 20px rgba(244,114,182,.4);
          animation:fadeUp .8s ease .6s both;
          transition:transform .2s, box-shadow .2s;
        }
        .back-btn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(244,114,182,.55); }

        /* floating music notes */
        .note { position:fixed; pointer-events:none; font-size:18px; animation:noteFloat linear infinite; opacity:0; will-change:transform,opacity; }
        @keyframes noteFloat {
          0%   { opacity:0; transform:translateY(0) rotate(0deg); }
          10%  { opacity:.7; }
          90%  { opacity:.3; }
          100% { opacity:0; transform:translateY(-100vh) rotate(30deg); }
        }
      `}</style>

      {/* floating music notes when something plays */}
      {playing && ["♪","♫","♩","♬","♪","♫"].map((n,i) => (
        <div key={i} className="note" style={{
          left:`${10 + i * 15}%`,
          bottom:"-20px",
          animationDuration:`${4 + i * 0.8}s`,
          animationDelay:`${i * 0.9}s`,
          color:["#f472b6","#ec4899","#fbbf24","#e879f9","#fda4af","#fb7185"][i],
        }}>{n}</div>
      ))}

      <div className="music-page">

        {/* header */}
        <div className="music-header">
          <h1 className="music-title">Vaishu&apos;s Songs 🎵</h1>
          <p className="music-sub">songs that remind me of you 🌼</p>
        </div>

        {/* ── two column layout ── */}
        <div className="main-layout">

          {/* LEFT — player + song cards */}
          <div className="left-col">

            {/* now playing */}
            <div className="now-playing">
              {current === null ? (
                <div style={{ textAlign:"center", padding:"10px 0" }}>
                  <div style={{ fontSize:"32px", marginBottom:"8px" }}>🌼</div>
                  <p style={{ fontFamily:"'Bubblegum Sans',cursive", color:"#ec4899", fontSize:"16px" }}>
                    pick a song to bloom the bouquet
                  </p>
                  <p style={{ fontSize:"12px", color:"rgba(190,24,93,.45)", marginTop:"4px" }}>
                    each song unlocks more jasmine flowers 🌸
                  </p>
                </div>
              ) : (
                <>
                  <div className="np-top">
                    <div className={`np-disc ${playing ? "spinning" : ""}`}>🎵</div>
                    <div className="np-info">
                      <div className="np-title">{SONGS[current].title}</div>
                      <div className="np-artist">{SONGS[current].artist}</div>
                    </div>
                    <Visualiser playing={playing}/>
                  </div>
                  <div className="np-bar-wrap" onClick={seek}>
                    <div className="np-bar-fill" style={{ width:`${progress * 100}%` }}/>
                  </div>
                  <div className="np-times">
                    <span>{fmt(progress * duration)}</span>
                    <span>{fmt(duration)}</span>
                  </div>
                  <div className="np-controls">
                    <button className="ctrl-btn" onClick={() => playSong((current - 1 + SONGS.length) % SONGS.length)}>⏮</button>
                    <button className="ctrl-play" onClick={togglePlay}>{playing ? "⏸" : "▶"}</button>
                    <button className="ctrl-btn" onClick={() => playSong((current + 1) % SONGS.length)}>⏭</button>
                  </div>
                </>
              )}
            </div>

            {/* song cards */}
            <div className="cards-section">
              {SONGS.map((song, i) => (
                <div
                  key={song.id}
                  ref={el => cardRefs.current[i] = el}
                  data-idx={i}
                  className={`song-card ${visible.includes(i) ? "visible" : ""} ${current === i ? "active" : ""}`}
                  style={{ transitionDelay:`${i * 0.08}s` }}
                  onClick={() => playSong(i)}
                >
                  <span className={`card-num ${current === i ? "active-num" : ""}`}>{i + 1}</span>
                  <div className="card-dot" style={{ background: song.color }}>🎵</div>
                  <div className="card-info">
                    <div className="card-title">{song.title}</div>
                    <div className="card-artist">{song.artist}</div>
                  </div>
                  <div className="card-right">
                    {played.has(i)
                      ? <span className="played-badge">✦ played</span>
                      : <span style={{ fontSize:"18px", opacity:.4 }}>▶</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <button className="back-btn" onClick={() => navigate("/hub")}>
              back to gifts 🎀
            </button>

          </div>

          {/* RIGHT — bouquet + florks */}
          <div className="right-col">
            <div style={{
              display:"grid",
              gridTemplateColumns:"auto 1fr auto",
              alignItems:"end",
              gap:"8px",
              width:"100%",
            }}>
              {/* left flork */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingBottom:"8px" }}>
                <FlorkWithFlower memory={current !== null ? MEMORIES[current].left : null}/>
              </div>

              {/* centre bouquet */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }} className="bouquet-float">
                <JasmineBouquet bloomCount={bloomCount} allPlayed={played.size === SONGS.length}/>
              </div>

              {/* right flork */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingBottom:"8px" }}>
                <FlorkDancing memory={current !== null ? MEMORIES[current].right : null}/>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}