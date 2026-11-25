"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/data/products";

export function CategoryArches() {
  return (
    <section
      className="surface-ivory"
      style={{ paddingBlock: "clamp(64px, 8vw, 112px)" }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
            marginBottom: 42,
          }}
        >
          <div>
            <span className="eyebrow" style={{ color: "var(--maroon)" }}>
              Curated Silhouettes
            </span>
            <h2 className="section-heading" style={{ marginTop: 8 }}>
              Shop by <em>Category</em>
            </h2>
          </div>
          <Link href="/collections/all" className="btn btn-outline-ink">
            Explore All Pieces
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="rera-reveal"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transform: idx % 2 === 1 ? "translateY(10px)" : undefined,
              }}
            >
              <div
                className="arch-mask"
                style={{
                  position: "relative",
                  aspectRatio: "3 / 4",
                  border: "1px solid rgba(201, 164, 106, 0.35)",
                  backgroundColor: "var(--blush)",
                  boxShadow: "0 16px 36px rgba(43, 29, 28, 0.08)",
                }}
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 280px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top center",
                    transition: "transform 0.6s var(--ease-luxury)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(20,10,14,0.72) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 16,
                    right: 16,
                    bottom: 16,
                    color: "#FBF7F1",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#E8C98A",
                      }}
                    >
                      {cat.countLabel}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 25,
                        fontWeight: 600,
                        lineHeight: 1.1,
                      }}
                    >
                      {cat.title}
                    </div>
                  </div>
                  <ArrowUpRight size={18} color="#E8C98A" />
                </div>
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)" }}>{cat.subtitle}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
