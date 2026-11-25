"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export function NewArrivalsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const arrivals = PRODUCTS.filter((p) => p.isNew);

  const scrollByAmount = (dir: -1 | 1) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section
      className="surface-blush"
      style={{ paddingBlock: "clamp(64px, 8vw, 108px)" }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
            marginBottom: 34,
          }}
        >
          <div>
            <span className="eyebrow" style={{ color: "var(--maroon)" }}>
              Just Unboxed
            </span>
            <h2 className="section-heading" style={{ marginTop: 8 }}>
              New <em>Arrivals</em>
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Scroll new arrivals left"
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: "1px solid var(--border-ink)",
                background: "var(--ivory)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Scroll new arrivals right"
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: "1px solid var(--border-ink)",
                background: "var(--ivory)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronRight size={18} />
            </button>
            <Link href="/collections/new-arrivals" className="btn btn-maroon">
              View All
            </Link>
          </div>
        </div>

        <div
          ref={trackRef}
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: "minmax(265px, 295px)",
            gap: 22,
            overflowX: "auto",
            paddingBottom: 14,
            scrollSnapType: "x mandatory",
            scrollbarWidth: "thin",
          }}
        >
          {arrivals.map((product) => (
            <div key={product.id} style={{ scrollSnapAlign: "start" }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
