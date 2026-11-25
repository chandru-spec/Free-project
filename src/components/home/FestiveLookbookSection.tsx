"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS } from "@/data/products";
import { formatINR } from "@/lib/format";
import { useInViewElement, useWebGLCapability } from "@/hooks/useWebGLCapability";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";

const LookbookRingScene = dynamic(
  () => import("@/components/three/LookbookRingScene"),
  { ssr: false, loading: () => null }
);

gsap.registerPlugin(ScrollTrigger);

export function FestiveLookbookSection() {
  const pinRef = useRef<HTMLElement>(null);
  const dragRotation = useRef(0);
  const scrollRotation = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  const { canUse3D, isMobile, dpr, reducedMotion } = useWebGLCapability();
  const { ref: inViewRef, inView } = useInViewElement<HTMLElement>("200px");
  const openQuickView = useBoutiqueStore((s) => s.openQuickView);

  const ringProducts = PRODUCTS.filter((p) =>
    p.collectionTags.includes("festive-edit")
  ).slice(0, 7);

  useEffect(() => {
    const el = pinRef.current;
    if (!el || !canUse3D || isMobile || reducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=900",
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          scrollRotation.current = self.progress * Math.PI * 1.35;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [canUse3D, isMobile, reducedMotion]);

  return (
    <section
      ref={(node) => {
        pinRef.current = node;
        inViewRef.current = node;
      }}
      className="surface-dark"
      style={{
        paddingBlock: "clamp(64px, 8vw, 96px)",
        overflow: "hidden",
        borderBottom: "1px solid var(--border-gold)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <div>
            <span className="eyebrow">Festive Edit 2026</span>
            <h2 className="section-heading" style={{ marginTop: 8 }}>
              3D Lookbook <em>Gallery</em>
            </h2>
          </div>
          <p style={{ maxWidth: 380, fontSize: 14, color: "rgba(251,247,241,0.72)" }}>
            Scroll or drag to orbit our festive ring. Click any curved silhouette to
            inspect fabric & sizing.
          </p>
        </div>

        {canUse3D ? (
          <div
            style={{
              height: isMobile ? 410 : 500,
              marginTop: 20,
              cursor: "grab",
              touchAction: "pan-y",
            }}
            onPointerDown={(e) => {
              dragging.current = true;
              lastX.current = e.clientX;
            }}
            onPointerMove={(e) => {
              if (!dragging.current) return;
              const dx = e.clientX - lastX.current;
              lastX.current = e.clientX;
              dragRotation.current += dx * 0.008;
            }}
            onPointerUp={() => {
              dragging.current = false;
            }}
            onPointerLeave={() => {
              dragging.current = false;
            }}
          >
            <LookbookRingScene
              products={ringProducts}
              dragRotation={dragRotation}
              scrollRotation={scrollRotation}
              onSelect={(slug) => openQuickView(slug)}
              dpr={dpr}
              inView={inView}
            />
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridAutoFlow: "column",
              gridAutoColumns: "minmax(220px, 260px)",
              gap: 18,
              overflowX: "auto",
              marginTop: 28,
              paddingBottom: 10,
            }}
          >
            {ringProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => openQuickView(product.slug)}
                className="arch-mask"
                style={{
                  position: "relative",
                  aspectRatio: "3 / 4",
                  border: "1px solid var(--border-gold)",
                  textAlign: "left",
                }}
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="260px"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 55%, rgba(20,10,14,0.88) 100%)",
                  }}
                />
                <div style={{ position: "absolute", left: 14, right: 14, bottom: 14 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>
                    {product.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#E8C98A" }}>
                    {formatINR(product.price)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 18 }}>
          <Link href="/lookbook" className="btn btn-outline-gold">
            Open Full Editorial Lookbook
          </Link>
        </div>
      </div>
    </section>
  );
}
