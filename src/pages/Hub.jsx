import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CARDS = [
  {
    id: "cake",
    route: "/cake",
    emoji: "🎂",
    title: "Make a Wish",
    bg: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
    border: "#f9a8d4",
    accent: "#ec4899",
    sparkle: "#f472b6",
    pattern: "circles",
  },
  {
    id: "gallery",
    route: "/gallery",
    emoji: "📸",
    title: "Vaishu's Gallery",
    bg: "linear-gradient(135deg, #fff0f5 0%, #ffe4ef 100%)",
    border: "#fda4af",
    accent: "#be185d",
    sparkle: "#fb7185",
    pattern: "dots",
  },
  {
    id: "music",
    route: "/music",
    emoji: "🎵",
    title: "Vaishu's Songs",
    bg: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
    border: "#f0abfc",
    accent: "#a21caf",
    sparkle: "#e879f9",
    pattern: "waves",
  },
  {
    id: "wish",
    route: "/wish",
    emoji: "💌",
    title: "My Wish For You",
    sub: "open with love",
    bg: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)",
    border: "#fca5a5",
    accent: "#e11d48",
    sparkle: "#fb7185",
    pattern: "stars",
  },
];

// tiny decorative patterns per card (pure CSS via inline SVG bg)
const PATTERNS = {
  circles: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='2' fill='rgba(244,114,182,.12)'/%3E%3C/svg%3E")`,
  dots: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='1.5' fill='rgba(251,113,133,.14)'/%3E%3C/svg%3E")`,
  waves: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='20'%3E%3Cpath d='M0 10 Q10 0 20 10 Q30 20 40 10' fill='none' stroke='rgba(232,121,249,.12)' stroke-width='1.5'/%3E%3C/svg%3E")`,
  stars: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Ctext x='10' y='22' font-size='10' fill='rgba(251,113,133,.13)'%3E✦%3C/text%3E%3C/svg%3E")`,
};

const PETALS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  color: ["#fda4af", "#f9a8d4", "#fbcfe8", "#f472b6", "#fce7f3", "#e879f9"][i % 6],
  size: 6 + Math.random() * 8,
  duration: `${7 + Math.random() * 10}s`,
  delay: `${Math.random() * 14}s`,
}));

export default function Hub() {
  const navigate = useNavigate();
  const [zooming, setZooming] = useState(null); // card id that's zooming

  const handleCard = (card) => {
    if (zooming) return;
    setZooming(card.id);
    setTimeout(() => navigate(card.route), 700);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Great+Vibes&family=Quicksand:wght@300;400;500&display=swap');

        .hub-page {
          width: 100vw; min-height: 100vh;
          background: linear-gradient(160deg, #fff0f5 0%, #ffe4ef 45%, #ffd6e8 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          font-family: 'Quicksand', sans-serif;
          position: relative; overflow: hidden;
          padding: 32px 20px 48px;
        }
        .hub-page::before {
          content: ''; position: fixed; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(244,114,182,.15) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
        }

        /* ── header ── */
        .hub-header {
          text-align: center; margin-bottom: 36px;
          opacity: 0; transform: translateY(-18px);
          animation: fadeSlideDown .9s cubic-bezier(.34,1.56,.64,1) .3s forwards;
        }
        @keyframes fadeSlideDown {
          to { opacity:1; transform:translateY(0); }
        }
        .hub-eyebrow {
          font-family: 'Quicksand', sans-serif; font-weight: 400;
          font-size: 11px; letter-spacing: .38em; text-transform: uppercase;
          color: rgba(236,72,153,.45); margin-bottom: 8px;
        }
        .hub-title {
          font-family: 'Bubblegum Sans', cursive;
          font-size: clamp(28px, 5vw, 46px);
          color: #ec4899;
          text-shadow: 2px 2px 0 rgba(251,113,133,.22);
          line-height: 1.1;
        }
        .hub-sub {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(18px, 3vw, 26px);
          color: #be185d; margin-top: 4px;
        }

        /* ── grid ── */
        .hub-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          width: 100%; max-width: 560px;
        }

        /* ── card ── */
        .hub-card {
          position: relative; border-radius: 24px;
          padding: 28px 20px 24px;
          display: flex; flex-direction: column; align-items: center;
          gap: 10px; cursor: pointer; overflow: hidden;
          border: 2px solid transparent;
          box-shadow: 0 4px 20px rgba(244,114,182,.12), 0 1px 4px rgba(0,0,0,.04);
          opacity: 0; transform: scale(.82) translateY(20px);
          transition: transform .32s cubic-bezier(.34,1.56,.64,1), box-shadow .28s ease, border-color .28s ease;
          animation: cardPop .7s cubic-bezier(.34,1.56,.64,1) forwards;
          backdrop-filter: blur(4px);
        }
        .hub-card:nth-child(1) { animation-delay: .55s; }
        .hub-card:nth-child(2) { animation-delay: .72s; }
        .hub-card:nth-child(3) { animation-delay: .88s; }
        .hub-card:nth-child(4) { animation-delay:1.04s; }
        @keyframes cardPop {
          to { opacity:1; transform:scale(1) translateY(0); }
        }
        .hub-card:hover {
          transform: scale(1.04) translateY(-3px);
          box-shadow: 0 12px 36px rgba(244,114,182,.28), 0 2px 8px rgba(0,0,0,.06);
        }
        .hub-card:active { transform: scale(.97); }

        /* zoom-out overlay when card is clicked */
        .hub-card.zooming {
          animation: cardZoom .68s cubic-bezier(.55,0,1,.45) forwards !important;
          z-index: 100;
        }
        @keyframes cardZoom {
          0%   { transform: scale(1);    opacity: 1; border-radius: 24px; }
          100% { transform: scale(22);   opacity: 0; border-radius: 0px;  }
        }

        /* pattern overlay inside card */
        .card-pattern {
          position: absolute; inset: 0; border-radius: 22px;
          pointer-events: none; opacity: .7;
        }

        /* emoji blob */
        .card-emoji-wrap {
          position: relative; z-index: 1;
          width: 68px; height: 68px; border-radius: 50%;
          background: rgba(255,255,255,.72);
          display: flex; align-items: center; justify-content: center;
          font-size: 32px;
          box-shadow: 0 4px 14px rgba(244,114,182,.18);
          transition: transform .3s cubic-bezier(.34,1.56,.64,1);
        }
        .hub-card:hover .card-emoji-wrap { transform: scale(1.12) rotate(-6deg); }

        .card-title {
          font-family: 'Bubblegum Sans', cursive;
          font-size: 18px; line-height: 1;
          position: relative; z-index: 1;
          text-align: center;
        }
        .card-sub {
          font-family: 'Quicksand', sans-serif;
          font-weight: 400; font-size: 11.5px;
          letter-spacing: .04em; text-align: center;
          position: relative; z-index: 1;
          opacity: .72;
        }

        /* little sparkle dots on hover */
        .card-sparkle {
          position: absolute; width: 6px; height: 6px;
          border-radius: 50%; pointer-events: none;
          opacity: 0; transition: opacity .3s;
        }
        .hub-card:hover .card-sparkle { opacity: 1; animation: sparklePop 1.2s ease-in-out infinite; }
        @keyframes sparklePop {
          0%,100% { transform: scale(0); opacity:0; }
          50%     { transform: scale(1); opacity:.8; }
        }

        /* petals */
        .petal { position:fixed; top:-20px; border-radius:50% 0 50% 0; opacity:0; pointer-events:none; animation:petalFall linear infinite; }
        @keyframes petalFall {
          0%  { transform:translateY(0) rotate(0deg) translateX(0); opacity:0; }
          8%  { opacity:.65; }
          88% { opacity:.35; }
          100%{ transform:translateY(112vh) rotate(620deg) translateX(40px); opacity:0; }
        }

        /* page fade-out when navigating */
        .hub-page.fading { animation: pageFade .4s ease forwards; }
        @keyframes pageFade { to { opacity:0; } }
      `}</style>

      <div className={`hub-page`}>

        {/* petals */}
        {PETALS.map(p => (
          <div key={p.id} className="petal" style={{
            left: p.left, background: p.color,
            width: `${p.size}px`, height: `${p.size * 1.5}px`,
            animationDuration: p.duration, animationDelay: p.delay,
          }} />
        ))}

        {/* header */}
        <div className="hub-header">
          <p className="hub-eyebrow">✨ your special day ✨</p>
          <h1 className="hub-title">pick your adventure 🎀</h1>
          <p className="hub-sub">what do you want to open first?</p>
        </div>

        {/* 2x2 grid */}
        <div className="hub-grid">
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              className={`hub-card${zooming === card.id ? " zooming" : ""}`}
              style={{
                background: card.bg,
                borderColor: zooming === card.id ? card.accent : "rgba(255,255,255,.6)",
              }}
              onClick={() => handleCard(card)}
            >
              {/* pattern */}
              <div className="card-pattern" style={{ backgroundImage: PATTERNS[card.pattern] }} />

              {/* sparkle dots */}
              {[
                { top: "12%", left: "10%", delay: "0s" },
                { top: "18%", right: "12%", delay: ".4s" },
                { bottom: "14%", left: "14%", delay: ".8s" },
                { bottom: "18%", right: "10%", delay: ".2s" },
              ].map((pos, j) => (
                <div key={j} className="card-sparkle"
                  style={{ ...pos, background: card.sparkle, animationDelay: pos.delay }} />
              ))}

              {/* emoji */}
              <div className="card-emoji-wrap">
                {card.emoji}
              </div>

              {/* text */}
              <p className="card-title" style={{ color: card.accent }}>{card.title}</p>
              <p className="card-sub" style={{ color: card.accent }}>{card.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}