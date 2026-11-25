import React from "react";

const CRAFT_WORDS = [
  "Banarasi",
  "Chanderi",
  "Zari",
  "Block Print",
  "Chikankari",
  "Bandhani",
];

export function MarqueeStrip() {
  const repeated = [...CRAFT_WORDS, ...CRAFT_WORDS, ...CRAFT_WORDS];

  return (
    <div
      style={{
        backgroundColor: "#2A0F18",
        borderTop: "1px solid rgba(201,164,106,0.2)",
        borderBottom: "1px solid rgba(201,164,106,0.2)",
        color: "#E8C98A",
        overflow: "hidden",
        padding: "16px 0",
      }}
      aria-label="Heritage Craft Techniques"
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          gap: "36px",
          animation: "reraMarquee 28s linear infinite",
        }}
      >
        {repeated.map((word, idx) => (
          <span
            key={`${word}-${idx}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "36px",
              fontFamily: "var(--font-display)",
              fontSize: "24px",
              fontStyle: idx % 2 === 1 ? "italic" : "normal",
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
            }}
          >
            <span>{word}</span>
            <span style={{ fontSize: "12px", opacity: 0.6 }}>✦</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes reraMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="reraMarquee"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
