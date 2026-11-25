"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ChevronDown,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  Rotate3d,
  Ruler,
  Truck,
} from "lucide-react";
import { PRODUCTS, type Product } from "@/data/products";
import { formatINR, getDiscountPercent, getWhatsAppOrderUrl } from "@/lib/format";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import { ProductCard } from "@/components/product/ProductCard";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import styles from "./ProductDetail.module.css";

export function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const [spinMode, setSpinMode] = useState(false);
  const [spinIdx, setSpinIdx] = useState(0);

  const [selectedColour, setSelectedColour] = useState(
    product.colours[0]?.name ?? "Signature"
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "M");
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string>("description");

  const addToCart = useBoutiqueStore((s) => s.addToCart);
  const wishlist = useBoutiqueStore((s) => s.wishlist);
  const toggleWishlist = useBoutiqueStore((s) => s.toggleWishlist);
  const hasHydrated = useBoutiqueStore((s) => s.hasHydrated);

  const isWishlisted = hasHydrated && wishlist.includes(product.id);
  const discount = getDiscountPercent(product.price, product.compareAtPrice);

  const spinFrames = product.spinImages ?? [];
  const displayedSrc =
    spinMode && spinFrames.length > 0
      ? spinFrames[spinIdx % spinFrames.length]
      : product.images[activeImageIdx] ?? product.images[0];

  const completeTheLook = (product.completeTheLookIds ?? [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  )
    .concat(PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, 4);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.trim();
    if (!/^[1-9][0-9]{5}$/.test(clean)) {
      setPincodeStatus("Please enter a valid 6-digit Indian pincode.");
      return;
    }
    setPincodeStatus(
      `Express delivery available to ${clean}: Arrives in 3–5 business days. Cash on Delivery supported.`
    );
  };

  const whatsappUrl = getWhatsAppOrderUrl(
    `Namaste RERA Boutique! I would like to order "${product.name}" (${formatINR(
      product.price
    )}) in Colour: ${selectedColour}, Size: ${selectedSize}.`
  );

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/collections/${product.category.toLowerCase().replace(/\s+/g, "-")}`}>
            {product.category}
          </Link>
          <span>/</span>
          <span style={{ color: "var(--ink)" }}>{product.name}</span>
        </nav>

        <div className={styles.mainGrid}>
          {/* Left Gallery + Zoom + Optional 360° Spin */}
          <div className={styles.galleryCol}>
            <div
              className={`${styles.mainImageWrap} ${
                isZoomed ? styles.isZoomed : ""
              }`}
              onClick={() => {
                if (!spinMode) setIsZoomed((z) => !z);
              }}
              onMouseMove={(e) => {
                if (!isZoomed) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setZoomOrigin(`${x}% ${y}%`);
              }}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <Image
                src={displayedSrc}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 560px"
                style={{
                  objectFit: "cover",
                  objectPosition: "top center",
                  transform: isZoomed ? "scale(1.65)" : "scale(1)",
                  transformOrigin: zoomOrigin,
                  transition: "transform 0.25s ease",
                }}
              />

              {spinFrames.length > 0 && (
                <button
                  type="button"
                  className={styles.spinBadgeBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSpinMode((s) => !s);
                    setIsZoomed(false);
                  }}
                >
                  <Rotate3d size={14} />
                  {spinMode ? "Exit 360° Spin" : "360° View"}
                </button>
              )}
            </div>

            {spinMode && spinFrames.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: "#f5ede3",
                }}
              >
                <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Drag Angle:
                </span>
                <input
                  type="range"
                  min={0}
                  max={spinFrames.length * 3 - 1}
                  value={spinIdx}
                  onChange={(e) => setSpinIdx(Number(e.target.value))}
                  aria-label="Rotate 360 product angle"
                  style={{ flex: 1, accentColor: "var(--maroon)" }}
                />
              </div>
            )}

            <div className={styles.thumbStrip}>
              {product.images.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  className={`${styles.thumbBtn} ${
                    !spinMode && activeImageIdx === idx ? styles.thumbBtnActive : ""
                  }`}
                  onClick={() => {
                    setSpinMode(false);
                    setActiveImageIdx(idx);
                  }}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Product Info */}
          <div className={styles.infoCol}>
            <div>
              <span className="eyebrow" style={{ color: "var(--maroon)" }}>
                {product.fabric} · {product.occasion}
              </span>
              <h1 className={styles.title} style={{ marginTop: 6 }}>
                {product.name}
              </h1>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.price}>{formatINR(product.price)}</span>
              {product.compareAtPrice && (
                <span className={styles.mrp}>
                  {formatINR(product.compareAtPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className={styles.discountTag}>Save {discount}%</span>
              )}
            </div>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: -10 }}>
              Inclusive of all taxes · {product.stock} pieces ready in atelier
            </p>

            <p style={{ fontSize: 15, color: "var(--ink)" }}>
              {product.shortDescription}
            </p>

            {/* Colour Swatches */}
            <div>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8 }}>
                Colour: <strong>{selectedColour}</strong>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {product.colours.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColour(c.name)}
                    aria-label={`Colour ${c.name}`}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: c.hex,
                      border:
                        selectedColour === c.name
                          ? "2px solid var(--maroon)"
                          : "1px solid rgba(0,0,0,0.2)",
                      outline:
                        selectedColour === c.name ? "2px solid var(--gold)" : "none",
                      outlineOffset: 2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector + Size Guide */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em" }}>
                  Select Size
                </span>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    color: "var(--maroon)",
                    textDecoration: "underline",
                  }}
                >
                  <Ruler size={14} />
                  Indian Size Guide
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: "9px 18px",
                      borderRadius: 999,
                      fontSize: 13,
                      border:
                        selectedSize === size
                          ? "1px solid var(--maroon)"
                          : "1px solid var(--border-ink)",
                      background:
                        selectedSize === size ? "var(--maroon)" : "#ffffff",
                      color: selectedSize === size ? "var(--ivory)" : "var(--ink)",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Wishlist */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid var(--border-ink)",
                  borderRadius: 999,
                  background: "#ffffff",
                }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  style={{ width: 38, height: 38 }}
                >
                  <Minus size={14} style={{ marginInline: "auto" }} />
                </button>
                <span style={{ minWidth: 28, textAlign: "center", fontSize: 14 }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  aria-label="Increase quantity"
                  style={{ width: 38, height: 38 }}
                >
                  <Plus size={14} style={{ marginInline: "auto" }} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="btn btn-outline-ink"
                style={{ padding: "10px 18px" }}
              >
                <Heart
                  size={16}
                  fill={isWishlisted ? "#5E2230" : "none"}
                  color="#5E2230"
                />
                {isWishlisted ? "Saved in Wishlist" : "Save to Wishlist"}
              </button>
            </div>

            {/* Primary CTAs */}
            <div className={styles.ctaGrid}>
              <button
                type="button"
                className="btn btn-maroon"
                onClick={() =>
                  addToCart({
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    size: selectedSize,
                    colour: selectedColour,
                    quantity,
                  })
                }
              >
                Add to Bag
              </button>

              <button
                type="button"
                className="btn btn-gold"
                onClick={() => {
                  addToCart({
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    size: selectedSize,
                    colour: selectedColour,
                    quantity,
                  });
                  router.push("/checkout");
                }}
              >
                Buy Now
              </button>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-ink"
              style={{ width: "100%" }}
            >
              <MessageCircle size={16} />
              Order or Customise on WhatsApp
            </a>

            {/* Delivery Pincode Checker */}
            <div className={styles.pincodeBox}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500 }}>
                <Truck size={16} color="#5E2230" />
                Check Pan-India Delivery & COD Availability
              </div>
              <form className={styles.pincodeForm} onSubmit={handleCheckPincode}>
                <label htmlFor="pincode-input" className="sr-only">
                  Enter 6-digit Indian pincode
                </label>
                <input
                  id="pincode-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit pincode (e.g. 400001)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className={styles.pincodeInput}
                />
                <button
                  type="submit"
                  className="btn btn-maroon"
                  style={{ padding: "10px 18px" }}
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--maroon)",
                    marginTop: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <CheckCircle2 size={14} />
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* Accordions */}
            <div>
              {[
                {
                  id: "description",
                  title: "Silhouette & Craft Description",
                  content: <p style={{ fontSize: 14, color: "var(--muted)" }}>{product.longDescription}</p>,
                },
                {
                  id: "care",
                  title: "Fabric & Care Instructions",
                  content: (
                    <ul style={{ paddingLeft: 18, fontSize: 14, color: "var(--muted)" }}>
                      {product.careInstructions.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  id: "shipping",
                  title: "Shipping, Alterations & Returns",
                  content: (
                    <p style={{ fontSize: 14, color: "var(--muted)" }}>
                      Complimentary shipping above ₹1,999. Ready-to-ship pieces
                      dispatch within 24–48 hours; bespoke blouse or length
                      alterations take 2 additional days. Easy 7-day exchange across
                      India.
                    </p>
                  ),
                },
              ].map((acc) => {
                const isOpen = openAccordion === acc.id;
                return (
                  <div key={acc.id} className={styles.accordionItem}>
                    <button
                      type="button"
                      className={styles.accordionBtn}
                      aria-expanded={isOpen}
                      onClick={() => setOpenAccordion(isOpen ? "" : acc.id)}
                    >
                      <span>{acc.title}</span>
                      <ChevronDown
                        size={17}
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "none",
                          transition: "transform 0.25s ease",
                        }}
                      />
                    </button>
                    {isOpen && <div style={{ paddingBottom: 16 }}>{acc.content}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Complete the Look */}
        {completeTheLook.length > 0 && (
          <section className={styles.relatedSection}>
            <span className="eyebrow" style={{ color: "var(--maroon)" }}>
              Atelier Pairing
            </span>
            <h2 className="section-heading" style={{ marginTop: 6, marginBottom: 28 }}>
              Complete the <em>Look</em>
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 22,
              }}
            >
              {completeTheLook.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}

        {/* You May Also Like */}
        <section className={styles.relatedSection}>
          <span className="eyebrow" style={{ color: "var(--maroon)" }}>
            Curated Recommendations
          </span>
          <h2 className="section-heading" style={{ marginTop: 6, marginBottom: 28 }}>
            You May Also <em>Like</em>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 22,
            }}
          >
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
}
