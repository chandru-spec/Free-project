"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

/**
 * Sample reviews (replace before launch with genuine client feedback).
 */
const SAMPLE_REVIEWS = [
  {
    id: "sample-1",
    label: "Sample Review · Festive Saree Order",
    quote:
      "The drape of the katan silk feels regal without feeling heavy. The custom-stitched blouse fit right out of the muslin keepsake box.",
    author: "Client Placeholder A · Mumbai",
    piece: "Ruhani Banarasi Silk Saree",
  },
  {
    id: "sample-2",
    label: "Sample Review · Everyday Chikankari",
    quote:
      "The hand-embroidered mulmul stayed breathable all day during our afternoon family puja, and the scalloped organza dupatta completed the look.",
    author: "Client Placeholder B · Bengaluru",
    piece: "Noor Chikankari Kurta Set",
  },
  {
    id: "sample-3",
    label: "Sample Review · Resort Tailoring",
    quote:
      "Finally a boutique that understands both wedding heritage and sharp linen tailoring. Delivery arrived in 3 days with lovely gift packaging.",
    author: "Client Placeholder C · New Delhi",
    piece: "Sienna Linen Co-ord Set",
  },
];

export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const current = SAMPLE_REVIEWS[idx];

  const prev = () =>
    setIdx((i) => (i - 1 + SAMPLE_REVIEWS.length) % SAMPLE_REVIEWS.length);
  const next = () => setIdx((i) => (i + 1) % SAMPLE_REVIEWS.length);

  return (
    <section
      className="surface-blush"
      style={{ paddingBlock: "clamp(64px, 8vw, 100px)" }}
    >
      <div className="container" style={{ maxWidth: 880, textAlign: "center" }}>
        <span className="eyebrow" style={{ color: "var(--maroon)" }}>
          Customer Love · Sample Copy (Replace Before Launch)
        </span>
        <h2 className="section-heading" style={{ marginTop: 8 }}>
          Notes from the <em>Wardrobe</em>
        </h2>

        <div
          style={{
            marginTop: 32,
            background: "var(--ivory)",
            border: "1px solid rgba(201,164,106,0.38)",
            borderRadius: 24,
            padding: "clamp(28px, 5vw, 48px)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <Quote
            size={28}
            color="#C9A46A"
            style={{ marginInline: "auto", marginBottom: 14 }}
          />
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 3vw, 30px)",
              fontStyle: "italic",
              lineHeight: 1.35,
              color: "var(--ink)",
            }}
          >
            “{current.quote}”
          </p>
          <div style={{ marginTop: 22 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: "var(--maroon)" }}>
              {current.author}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
              {current.piece} · {current.label}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginTop: 24,
            }}
          >
            <button
              type="button"
              onClick={prev}
              aria-label="Previous sample review"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid var(--border-ink)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next sample review"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid var(--border-ink)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
