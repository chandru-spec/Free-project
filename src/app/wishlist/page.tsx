"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import { ProductCard } from "@/components/product/ProductCard";
import { JharokhaMark } from "@/components/brand/JharokhaLogo";

export default function WishlistPage() {
  const wishlist = useBoutiqueStore((s) => s.wishlist);
  const hasHydrated = useBoutiqueStore((s) => s.hasHydrated);

  const savedProducts = hasHydrated
    ? PRODUCTS.filter((p) => wishlist.includes(p.id))
    : [];

  return (
    <div
      className="surface-ivory"
      style={{
        paddingTop: "calc(var(--header-height) + 52px)",
        paddingBottom: 96,
        minHeight: "82vh",
      }}
    >
      <div className="container">
        <span className="eyebrow" style={{ color: "var(--maroon)" }}>
          Saved Silhouettes
        </span>
        <h1 className="section-heading" style={{ marginTop: 6, marginBottom: 32 }}>
          Your RERA <em>Wishlist</em>
        </h1>

        {savedProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "72px 24px",
              background: "#ffffff",
              borderRadius: 24,
              border: "1px solid var(--border-ink)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <JharokhaMark size={50} strokeColor="#5E2230" dotColor="#C9A46A" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                fontWeight: 600,
              }}
            >
              No favourites saved yet
            </h2>
            <p style={{ maxWidth: 400, color: "var(--muted)", fontSize: 15 }}>
              Tap the heart icon on any saree, kurta set, or evening dress to keep
              it close for your next celebration.
            </p>
            <Link href="/collections/festive-edit" className="btn btn-maroon">
              Browse Festive Edit
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
