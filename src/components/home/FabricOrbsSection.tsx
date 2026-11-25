"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FABRIC_ORBS, type FabricOrbItem } from "@/data/products";
import { useInViewElement, useWebGLCapability } from "@/hooks/useWebGLCapability";

const FabricOrbsScene = dynamic(
  () => import("@/components/three/FabricOrbsScene"),
  { ssr: false, loading: () => null }
);

export function FabricOrbsSection() {
  const [activeOrb, setActiveOrb] = useState<FabricOrbItem>(FABRIC_ORBS[0]);
  const { canUse3D, isMobile, dpr } = useWebGLCapability();
  const { ref, inView } = useInViewElement<HTMLElement>("180px");

  return (
    <section
      ref={ref}
      className="surface-wine jaali-pattern"
      style={{
        paddingBlock: "clamp(64px, 8vw, 112px)",
        borderTop: "1px solid var(--border-gold)",
        borderBottom: "1px solid var(--border-gold)",
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 640, marginInline: "auto" }}>
          <span className="eyebrow">Tactile Craft · 3D Materiality</span>
          <h2 className="section-heading" style={{ marginTop: 10 }}>
            Feel the <em>fabric</em>
          </h2>
          <p style={{ marginTop: 12, color: "rgba(251,247,241,0.74)", fontSize: 15 }}>
            Hover or tap any woven sphere to inspect its sheen, drape, and heritage
            origin before stepping into the collection.
          </p>
        </div>

        {/* 3D Canvas or Tactile CSS Orb Grid Fallback */}
        {canUse3D ? (
          <div style={{ height: isMobile ? 340 : 280, marginTop: 28 }}>
            <FabricOrbsScene
              activeId={activeOrb.id}
              onSelect={setActiveOrb}
              dpr={dpr}
              isMobile={isMobile}
              inView={inView}
            />
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
              gap: 18,
              marginTop: 32,
              justifyItems: "center",
            }}
          >
            {FABRIC_ORBS.map((orb) => {
              const selected = orb.id === activeOrb.id;
              return (
                <button
                  key={orb.id}
                  type="button"
                  onClick={() => setActiveOrb(orb)}
                  aria-label={`Select ${orb.name}`}
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 32% 28%, ${orb.sheenColor}, ${orb.baseColor} 68%, #140A0E 100%)`,
                    border: selected
                      ? "2px solid #E8C98A"
                      : "1px solid rgba(201,164,106,0.35)",
                    transform: selected ? "translateY(-6px) scale(1.08)" : "none",
                    transition: "transform 0.3s ease",
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Quick-select pill strip (great for accessibility & touch) */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
            marginTop: 14,
          }}
        >
          {FABRIC_ORBS.map((orb) => (
            <button
              key={orb.id}
              type="button"
              onClick={() => setActiveOrb(orb)}
              style={{
                padding: "7px 14px",
                borderRadius: 999,
                fontSize: 12,
                letterSpacing: "0.08em",
                border:
                  activeOrb.id === orb.id
                    ? "1px solid #E8C98A"
                    : "1px solid rgba(201,164,106,0.22)",
                background:
                  activeOrb.id === orb.id
                    ? "rgba(232,201,138,0.16)"
                    : "transparent",
                color: activeOrb.id === orb.id ? "#E8C98A" : "rgba(251,247,241,0.75)",
              }}
            >
              {orb.name}
            </button>
          ))}
        </div>

        {/* Active Fabric Detail Glass Card */}
        <div
          className="glass-panel-dark"
          style={{
            marginTop: 28,
            borderRadius: 20,
            padding: "24px 28px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <div>
            <span className="eyebrow">{activeOrb.origin}</span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 600,
                marginTop: 4,
              }}
            >
              {activeOrb.name}
            </h3>
            <p style={{ color: "rgba(251,247,241,0.78)", fontSize: 15, marginTop: 4 }}>
              {activeOrb.tagline}
            </p>
          </div>
          <Link href={activeOrb.href} className="btn btn-gold">
            Shop {activeOrb.name} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
