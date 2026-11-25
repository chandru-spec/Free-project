"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export function BestSellersSection() {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8);

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
            marginBottom: 38,
          }}
        >
          <div>
            <span className="eyebrow" style={{ color: "var(--maroon)" }}>
              Most Loved Silhouettes
            </span>
            <h2 className="section-heading" style={{ marginTop: 8 }}>
              Boutique <em>Best Sellers</em>
            </h2>
          </div>
          <Link href="/collections/all" className="btn btn-outline-ink">
            Shop Entire Wardrobe
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
