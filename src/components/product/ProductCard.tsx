"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { formatINR, getDiscountPercent } from "@/lib/format";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import styles from "./ProductCard.module.css";

export function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});

  const wishlist = useBoutiqueStore((s) => s.wishlist);
  const toggleWishlist = useBoutiqueStore((s) => s.toggleWishlist);
  const openQuickView = useBoutiqueStore((s) => s.openQuickView);
  const addToCart = useBoutiqueStore((s) => s.addToCart);
  const hasHydrated = useBoutiqueStore((s) => s.hasHydrated);

  const isWishlisted = hasHydrated && wishlist.includes(product.id);
  const discount = getDiscountPercent(product.price, product.compareAtPrice);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * 9;
    const rotateY = (x - 0.5) * 9;

    setTiltStyle({
      transform: `perspective(900px) rotateX(${rotateX.toFixed(
        2
      )}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`,
    });
    setGlareStyle({
      background: `radial-gradient(circle at ${x * 100}% ${
        y * 100
      }%, rgba(232, 201, 138, 0.24), transparent 55%)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({});
  };

  return (
    <article
      ref={cardRef}
      className={styles.card}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.glare} style={glareStyle} aria-hidden="true" />

      <div className={styles.media}>
        <div className={styles.badges}>
          {product.isNew && <span className={styles.badge}>New In</span>}
          {discount > 0 && <span className={styles.badge}>{discount}% Off</span>}
        </div>

        <button
          type="button"
          className={styles.wishlistBtn}
          onClick={() => toggleWishlist(product.id)}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >
          <Heart
            size={16}
            fill={isWishlisted ? "#5E2230" : "none"}
            color={isWishlisted ? "#5E2230" : "#2B1D1C"}
          />
        </button>

        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 80vw, 320px"
            className={styles.imgPrimary}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 768px) 80vw, 320px"
              className={styles.imgSecondary}
            />
          )}
        </Link>

        <div className={styles.quickBar}>
          <button
            type="button"
            className={styles.quickBtn}
            onClick={() => openQuickView(product.slug)}
          >
            <Eye size={13} />
            Quick View
          </button>
          <button
            type="button"
            className={styles.quickBtn}
            onClick={() =>
              addToCart({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size: product.sizes[0] || "M",
                colour: product.colours[0]?.name || "Signature",
              })
            }
          >
            <ShoppingBag size={13} />
            Add
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          {product.category} · {product.fabric}
        </div>
        <Link href={`/products/${product.slug}`} className={styles.name}>
          {product.name}
        </Link>
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatINR(product.price)}</span>
          {product.compareAtPrice && (
            <span className={styles.compare}>
              {formatINR(product.compareAtPrice)}
            </span>
          )}
        </div>
        <div className={styles.swatches} aria-label="Available colours">
          {product.colours.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className={styles.swatch}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
