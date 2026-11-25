"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { BOUTIQUE_PHOTOS } from "@/lib/images";

export function EthnicWesternSplit() {
  const [splitPercent, setSplitPercent] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitPercent(Math.max(18, Math.min(82, pct)));
  };

  return (
    <section
      className="surface-ivory"
      style={{ paddingBlock: "clamp(64px, 8vw, 108px)" }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span className="eyebrow" style={{ color: "var(--maroon)" }}>
            Two Worlds, One Signature
          </span>
          <h2 className="section-heading" style={{ marginTop: 8 }}>
            Ethnic Heritage <em>vs</em> Western Muse
          </h2>
          <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 8 }}>
            Glide across or drag the gold divider to reveal either side of the RERA
            wardrobe.
          </p>
        </div>

        <div
          ref={containerRef}
          onMouseMove={(e) => updateFromClientX(e.clientX)}
          onTouchMove={(e) => {
            if (e.touches[0]) updateFromClientX(e.touches[0].clientX);
          }}
          style={{
            position: "relative",
            height: "clamp(380px, 56vw, 560px)",
            borderRadius: 24,
            overflow: "hidden",
            border: "1px solid var(--border-gold)",
            userSelect: "none",
            cursor: "ew-resize",
          }}
        >
          {/* Right / Base Layer: Western */}
          <div style={{ position: "absolute", inset: 0 }}>
            <Image
              src={BOUTIQUE_PHOTOS.splitWestern}
              alt="RERA Western Muse Collection"
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(270deg, rgba(20,10,14,0.8) 0%, rgba(20,10,14,0.2) 55%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "clamp(20px, 5vw, 56px)",
                bottom: "clamp(24px, 5vw, 52px)",
                textAlign: "right",
                color: "#FBF7F1",
                maxWidth: 340,
              }}
            >
              <span className="eyebrow">Contemporary Tailoring</span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(30px, 4vw, 48px)",
                  fontWeight: 600,
                  marginTop: 4,
                }}
              >
                Western Edit
              </h3>
              <p style={{ fontSize: 14, color: "rgba(251,247,241,0.82)", margin: "8px 0 18px" }}>
                Bias-cut wine satins, corset maxis & European flax linen co-ords.
              </p>
              <Link href="/collections/western" className="btn btn-gold">
                Shop Western
              </Link>
            </div>
          </div>

          {/* Left / Clipped Layer: Ethnic */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: `inset(0 ${100 - splitPercent}% 0 0)`,
              transition: "clip-path 0.08s linear",
            }}
          >
            <Image
              src={BOUTIQUE_PHOTOS.splitEthnic}
              alt="RERA Ethnic Heritage Collection"
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(20,10,14,0.82) 0%, rgba(20,10,14,0.2) 55%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "clamp(20px, 5vw, 56px)",
                bottom: "clamp(24px, 5vw, 52px)",
                color: "#FBF7F1",
                maxWidth: 340,
              }}
            >
              <span className="eyebrow">Looms of India</span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(30px, 4vw, 48px)",
                  fontWeight: 600,
                  marginTop: 4,
                }}
              >
                Ethnic Edit
              </h3>
              <p style={{ fontSize: 14, color: "rgba(251,247,241,0.82)", margin: "8px 0 18px" }}>
                Banarasi sarees, Chikankari kurta sets, Bandhani lehengas & Anarkalis.
              </p>
              <Link href="/collections/ethnic" className="btn btn-gold">
                Shop Ethnic
              </Link>
            </div>
          </div>

          {/* Gold Divider Handle */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${splitPercent}%`,
              width: 2,
              backgroundColor: "#E8C98A",
              transform: "translateX(-50%)",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#140A0E",
                border: "1px solid #E8C98A",
                color: "#E8C98A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(232,201,138,0.45)",
              }}
            >
              <MoveHorizontal size={18} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
