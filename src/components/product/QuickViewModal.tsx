"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getProductBySlug } from "@/data/products";
import { formatINR } from "@/lib/format";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";

export function QuickViewModal() {
  const quickViewSlug = useBoutiqueStore((s) => s.quickViewSlug);
  const closeQuickView = useBoutiqueStore((s) => s.closeQuickView);
  const addToCart = useBoutiqueStore((s) => s.addToCart);

  const product = quickViewSlug ? getProductBySlug(quickViewSlug) : undefined;
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColour, setSelectedColour] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] ?? "M");
      setSelectedColour(product.colours[0]?.name ?? "Signature");
    }
  }, [product]);

  useEffect(() => {
    if (!quickViewSlug) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuickView();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [quickViewSlug, closeQuickView]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view ${product.name}`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 98,
            background: "rgba(20, 10, 14, 0.72)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 18,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(96vw, 820px)",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "var(--ivory)",
              color: "var(--ink)",
              borderRadius: 20,
              border: "1px solid rgba(201, 164, 106, 0.35)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={closeQuickView}
              aria-label="Close quick view"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                zIndex: 5,
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(251,247,241,0.92)",
                border: "1px solid var(--border-ink)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={18} />
            </button>

            <div style={{ position: "relative", minHeight: 360, background: "var(--blush)" }}>
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="420px"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
            </div>

            <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
              <span className="eyebrow" style={{ color: "var(--maroon)" }}>
                {product.category} · {product.fabric}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  fontWeight: 600,
                  lineHeight: 1.1,
                }}
              >
                {product.name}
              </h2>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <strong style={{ fontSize: 22, color: "var(--maroon)" }}>
                  {formatINR(product.price)}
                </strong>
                {product.compareAtPrice && (
                  <span style={{ textDecoration: "line-through", color: "var(--muted)" }}>
                    {formatINR(product.compareAtPrice)}
                  </span>
                )}
              </div>
              <p style={{ fontSize: 14, color: "var(--muted)" }}>
                {product.shortDescription}
              </p>

              <div>
                <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8 }}>
                  Colour: <strong>{selectedColour}</strong>
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  {product.colours.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColour(c.name)}
                      aria-label={`Select colour ${c.name}`}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        backgroundColor: c.hex,
                        border:
                          selectedColour === c.name
                            ? "2px solid var(--maroon)"
                            : "1px solid rgba(0,0,0,0.2)",
                        outline: selectedColour === c.name ? "2px solid var(--gold)" : "none",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8 }}>
                  Size
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: "7px 14px",
                        borderRadius: 999,
                        fontSize: 12,
                        border:
                          selectedSize === size
                            ? "1px solid var(--maroon)"
                            : "1px solid var(--border-ink)",
                        background:
                          selectedSize === size ? "var(--maroon)" : "transparent",
                        color: selectedSize === size ? "var(--ivory)" : "var(--ink)",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  className="btn btn-maroon"
                  onClick={() => {
                    addToCart({
                      productId: product.id,
                      slug: product.slug,
                      name: product.name,
                      price: product.price,
                      image: product.images[0],
                      size: selectedSize,
                      colour: selectedColour,
                    });
                    closeQuickView();
                  }}
                >
                  Add to Bag
                </button>
                <Link
                  href={`/products/${product.slug}`}
                  onClick={closeQuickView}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    fontSize: 13,
                    color: "var(--maroon)",
                    padding: "8px 0",
                  }}
                >
                  View Full Silhouette & Size Guide <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
