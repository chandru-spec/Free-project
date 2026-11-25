"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Sparkles } from "lucide-react";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import { formatINR } from "@/lib/format";
import { BOUTIQUE_PHOTOS } from "@/lib/images";
import { useInViewElement, useWebGLCapability } from "@/hooks/useWebGLCapability";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";

const LookbookRingScene = dynamic(
  () => import("@/components/three/LookbookRingScene"),
  { ssr: false, loading: () => null }
);

interface Hotspot {
  id: string;
  xPercent: number;
  yPercent: number;
  productSlug: string;
  note: string;
}

interface LookBoard {
  id: string;
  title: string;
  caption: string;
  image: string;
  hotspots: Hotspot[];
}

const LOOK_BOARDS: LookBoard[] = [
  {
    id: "look-1",
    title: "Look I · Varanasi Twilight",
    caption:
      "Pure katan silk paired with antique kundan chandbalis and a zardozi velvet potli.",
    image: BOUTIQUE_PHOTOS.saree1,
    hotspots: [
      {
        id: "h1",
        xPercent: 48,
        yPercent: 46,
        productSlug: "ruhani-banarasi-silk-saree",
        note: "Main Drape · Katan Banarasi Silk",
      },
      {
        id: "h2",
        xPercent: 65,
        yPercent: 28,
        productSlug: "aarohi-kundan-pearl-chandbalis",
        note: "Ear Ornament · Kundan & Pearl",
      },
      {
        id: "h3",
        xPercent: 32,
        yPercent: 68,
        productSlug: "riva-zardozi-silk-potli",
        note: "Carry · Velvet Zardozi Potli",
      },
    ],
  },
  {
    id: "look-2",
    title: "Look II · Sangeet Reverie",
    caption:
      "Kutchi Bandhani georgette balanced with scalloped silk organza and heirloom gold.",
    image: BOUTIQUE_PHOTOS.lehenga1,
    hotspots: [
      {
        id: "h4",
        xPercent: 52,
        yPercent: 54,
        productSlug: "gulabo-bandhani-lehenga",
        note: "24-Kali Bandhani Skirt & Choli",
      },
      {
        id: "h5",
        xPercent: 34,
        yPercent: 34,
        productSlug: "sitara-handwoven-organza-dupatta",
        note: "Shoulder Drape · Scalloped Organza",
      },
    ],
  },
];

export function LookbookClient() {
  const dragRotation = useRef(0);
  const scrollRotation = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  const { canUse3D, isMobile, dpr } = useWebGLCapability();
  const { ref: canvasWrapRef, inView } = useInViewElement<HTMLDivElement>("200px");
  const openQuickView = useBoutiqueStore((s) => s.openQuickView);
  const addToCart = useBoutiqueStore((s) => s.addToCart);

  const [activeHotspots, setActiveHotspots] = useState<Record<string, string>>({
    "look-1": "h1",
    "look-2": "h4",
  });

  const ringProducts = PRODUCTS.filter((p) =>
    p.collectionTags.includes("festive-edit")
  );

  return (
    <div
      className="surface-dark"
      style={{ paddingTop: "calc(var(--header-height) + 32px)" }}
    >
      {/* Full-Screen 3D Editorial Stage */}
      <section
        ref={canvasWrapRef}
        className="jaali-pattern"
        style={{
          paddingBlock: "clamp(48px, 6vw, 84px)",
          borderBottom: "1px solid var(--border-gold)",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 680, marginInline: "auto" }}>
            <span className="eyebrow">Festive Edit 2026 · Interactive 3D</span>
            <h1
              className="display-title"
              style={{ fontSize: "clamp(44px, 6vw, 84px)", marginTop: 10 }}
            >
              The RERA <em>Lookbook</em>
            </h1>
            <p style={{ marginTop: 14, color: "rgba(251,247,241,0.78)" }}>
              Drag the 3D cylinder gallery to orbit our festive silhouettes, or click
              any panel to open sizing and fabric details.
            </p>
          </div>

          {canUse3D ? (
            <div
              style={{
                height: isMobile ? 420 : 520,
                marginTop: 24,
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
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 20,
                marginTop: 32,
              }}
            >
              {ringProducts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => openQuickView(p.slug)}
                  className="arch-mask"
                  style={{
                    position: "relative",
                    aspectRatio: "3 / 4",
                    border: "1px solid var(--border-gold)",
                  }}
                >
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    sizes="260px"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Shoppable Hotspot Boards */}
      <section
        className="surface-ivory"
        style={{ paddingBlock: "clamp(64px, 8vw, 108px)" }}
      >
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <span className="eyebrow" style={{ color: "var(--maroon)" }}>
              Tap the Gold Pins
            </span>
            <h2 className="section-heading" style={{ marginTop: 8 }}>
              Shoppable <em>Hotspot</em> Styling
            </h2>
          </div>

          <div style={{ display: "grid", gap: 56 }}>
            {LOOK_BOARDS.map((board) => {
              const selectedHotspot =
                board.hotspots.find((h) => h.id === activeHotspots[board.id]) ??
                board.hotspots[0];
              const linkedProduct = getProductBySlug(selectedHotspot.productSlug);

              return (
                <div
                  key={board.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                    gap: 32,
                    alignItems: "center",
                    background: "#ffffff",
                    borderRadius: 24,
                    padding: "clamp(18px, 3vw, 32px)",
                    border: "1px solid rgba(201,164,106,0.35)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  {/* Hotspot Image */}
                  <div
                    className="arch-mask"
                    style={{
                      position: "relative",
                      aspectRatio: "3 / 4",
                      maxHeight: 540,
                      width: "100%",
                      background: "var(--blush)",
                    }}
                  >
                    <Image
                      src={board.image}
                      alt={board.title}
                      fill
                      sizes="520px"
                      style={{ objectFit: "cover", objectPosition: "top center" }}
                    />

                    {board.hotspots.map((spot) => {
                      const isActive = spot.id === selectedHotspot.id;
                      return (
                        <button
                          key={spot.id}
                          type="button"
                          aria-label={`Inspect ${spot.note}`}
                          onClick={() =>
                            setActiveHotspots((prev) => ({
                              ...prev,
                              [board.id]: spot.id,
                            }))
                          }
                          style={{
                            position: "absolute",
                            left: `${spot.xPercent}%`,
                            top: `${spot.yPercent}%`,
                            transform: "translate(-50%, -50%)",
                            width: isActive ? 34 : 26,
                            height: isActive ? 34 : 26,
                            borderRadius: "50%",
                            background: isActive ? "#E8C98A" : "rgba(20,10,14,0.85)",
                            border: "2px solid #E8C98A",
                            boxShadow: "0 0 20px rgba(232,201,138,0.65)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isActive ? "#140A0E" : "#E8C98A",
                            transition: "all 0.25s ease",
                          }}
                        >
                          <Sparkles size={13} />
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Hotspot Product Card */}
                  <div>
                    <span className="eyebrow" style={{ color: "var(--maroon)" }}>
                      Editorial Ensemble
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 34,
                        fontWeight: 600,
                        marginTop: 6,
                      }}
                    >
                      {board.title}
                    </h3>
                    <p style={{ color: "var(--muted)", marginTop: 8 }}>
                      {board.caption}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginTop: 20,
                      }}
                    >
                      {board.hotspots.map((spot) => (
                        <button
                          key={spot.id}
                          type="button"
                          onClick={() =>
                            setActiveHotspots((prev) => ({
                              ...prev,
                              [board.id]: spot.id,
                            }))
                          }
                          style={{
                            padding: "7px 14px",
                            borderRadius: 999,
                            fontSize: 12,
                            border:
                              spot.id === selectedHotspot.id
                                ? "1px solid var(--maroon)"
                                : "1px solid var(--border-ink)",
                            background:
                              spot.id === selectedHotspot.id
                                ? "var(--maroon)"
                                : "transparent",
                            color:
                              spot.id === selectedHotspot.id
                                ? "var(--ivory)"
                                : "var(--ink)",
                          }}
                        >
                          {spot.note}
                        </button>
                      ))}
                    </div>

                    {linkedProduct && (
                      <div
                        style={{
                          marginTop: 24,
                          padding: 20,
                          borderRadius: 18,
                          background: "var(--ivory)",
                          border: "1px solid rgba(201,164,106,0.38)",
                          display: "grid",
                          gridTemplateColumns: "84px 1fr",
                          gap: 16,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            aspectRatio: "3 / 4",
                            borderRadius: 10,
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            src={linkedProduct.images[0]}
                            alt={linkedProduct.name}
                            fill
                            sizes="90px"
                            style={{ objectFit: "cover", objectPosition: "top center" }}
                          />
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              letterSpacing: "0.16em",
                              textTransform: "uppercase",
                              color: "var(--muted)",
                            }}
                          >
                            {linkedProduct.fabric}
                          </div>
                          <Link
                            href={`/products/${linkedProduct.slug}`}
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: 23,
                              fontWeight: 600,
                              display: "block",
                              marginTop: 2,
                            }}
                          >
                            {linkedProduct.name}
                          </Link>
                          <div
                            style={{
                              fontWeight: 600,
                              color: "var(--maroon)",
                              marginTop: 4,
                            }}
                          >
                            {formatINR(linkedProduct.price)}
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                            <button
                              type="button"
                              className="btn btn-maroon"
                              style={{ padding: "9px 16px" }}
                              onClick={() =>
                                addToCart({
                                  productId: linkedProduct.id,
                                  slug: linkedProduct.slug,
                                  name: linkedProduct.name,
                                  price: linkedProduct.price,
                                  image: linkedProduct.images[0],
                                  size: linkedProduct.sizes[0] || "M",
                                  colour: linkedProduct.colours[0]?.name || "Signature",
                                })
                              }
                            >
                              <ShoppingBag size={14} />
                              Add to Bag
                            </button>
                            <Link
                              href={`/products/${linkedProduct.slug}`}
                              className="btn btn-outline-ink"
                              style={{ padding: "9px 16px" }}
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
