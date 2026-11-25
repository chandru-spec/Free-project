"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BOUTIQUE_PHOTOS } from "@/lib/images";

function CountUpStat({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let started = false;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            setVal(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function StorySection() {
  return (
    <section
      className="surface-ivory"
      style={{ paddingBlock: "clamp(64px, 8vw, 116px)" }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(32px, 5vw, 72px)",
          alignItems: "center",
        }}
      >
        <div
          className="arch-mask"
          style={{
            position: "relative",
            aspectRatio: "4 / 5",
            maxWidth: 480,
            width: "100%",
            marginInline: "auto",
            border: "1px solid rgba(201,164,106,0.4)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <Image
            src={BOUTIQUE_PHOTOS.storyAtelier}
            alt="Inside the RERA Boutique Atelier"
            fill
            sizes="480px"
            style={{ objectFit: "cover", objectPosition: "top center" }}
          />
        </div>

        <div>
          <span className="eyebrow" style={{ color: "var(--maroon)" }}>
            The RERA Story
          </span>
          <h2 className="section-heading" style={{ marginTop: 10 }}>
            Born from <em>looms</em>, tailored for <em>today</em>
          </h2>
          <p style={{ marginTop: 18, color: "var(--muted)", fontSize: 16 }}>
            Founded with a quiet reverence for India’s weaving clusters, RERA Boutique
            bridges heirloom handloom artistry with modern, effortless tailoring. Every
            piece is chosen personally — from the crisp rustle of Varanasi katan silk
            to the sunlit breathability of European flax linen.
          </p>
          <blockquote
            style={{
              marginTop: 22,
              paddingLeft: 18,
              borderLeft: "2px solid var(--gold)",
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontStyle: "italic",
              color: "var(--maroon)",
            }}
          >
            “A garment should never wear you — it should remember the hands that wove
            it and move effortlessly with the woman wearing it.”
          </blockquote>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              marginTop: 28,
              paddingTop: 24,
              borderTop: "1px solid var(--border-ink)",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 34,
                  fontWeight: 600,
                  color: "var(--maroon)",
                }}
              >
                <CountUpStat target={14} suffix="+" />
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                Artisan Clusters
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 34,
                  fontWeight: 600,
                  color: "var(--maroon)",
                }}
              >
                <CountUpStat target={48} suffix="h" />
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                Bespoke Alterations
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 34,
                  fontWeight: 600,
                  color: "var(--maroon)",
                }}
              >
                <CountUpStat target={100} suffix="%" />
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                Curated Quality
              </div>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <Link href="/about" className="btn btn-maroon">
              Read Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
