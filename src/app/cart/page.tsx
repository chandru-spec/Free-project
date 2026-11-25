"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import { SITE_CONFIG } from "@/lib/site";
import { formatINR } from "@/lib/format";
import { JharokhaMark } from "@/components/brand/JharokhaLogo";

export default function CartPage() {
  const cart = useBoutiqueStore((s) => s.cart);
  const updateQuantity = useBoutiqueStore((s) => s.updateQuantity);
  const removeFromCart = useBoutiqueStore((s) => s.removeFromCart);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMsg, setPromoMsg] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const discountedSubtotal = subtotal - discount;
  const shipping =
    discountedSubtotal >= SITE_CONFIG.freeShippingThreshold || cart.length === 0
      ? 0
      : SITE_CONFIG.standardShippingFee;
  const total = discountedSubtotal + shipping;

  const handlePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "RERA10") {
      setPromoApplied(true);
      setPromoMsg("RERA10 applied — 10% welcome privilege unlocked.");
    } else {
      setPromoApplied(false);
      setPromoMsg("Invalid code. Try RERA10 for 10% off your first order.");
    }
  };

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
          RERA Boutique Bag
        </span>
        <h1 className="section-heading" style={{ marginTop: 6, marginBottom: 32 }}>
          Your Shopping <em>Bag</em>
        </h1>

        {cart.length === 0 ? (
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
              gap: 16,
            }}
          >
            <JharokhaMark size={52} strokeColor="#5E2230" dotColor="#C9A46A" />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 600,
              }}
            >
              Your bag awaits its first silhouette
            </h2>
            <p style={{ maxWidth: 420, color: "var(--muted)", fontSize: 15 }}>
              Discover handwoven Banarasi sarees, airy Chikankari kurta sets, and
              tailored linen co-ords.
            </p>
            <Link href="/collections/all" className="btn btn-maroon">
              Explore the Collection
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 36,
              alignItems: "start",
            }}
          >
            {/* Left Line Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {cart.map((item) => (
                <article
                  key={`${item.productId}-${item.size}-${item.colour}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "105px 1fr",
                    gap: 18,
                    padding: 18,
                    background: "#ffffff",
                    borderRadius: 18,
                    border: "1px solid var(--border-ink)",
                    alignItems: "center",
                  }}
                >
                  <Link
                    href={`/products/${item.slug}`}
                    className="arch-mask"
                    style={{
                      position: "relative",
                      aspectRatio: "3 / 4",
                      background: "var(--blush)",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="110px"
                      style={{ objectFit: "cover", objectPosition: "top center" }}
                    />
                  </Link>

                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <Link
                        href={`/products/${item.slug}`}
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 24,
                          fontWeight: 600,
                        }}
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.productId, item.size, item.colour)
                        }
                        aria-label={`Remove ${item.name}`}
                        style={{ color: "var(--muted)" }}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
                      Size: {item.size} · Colour: {item.colour}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        marginTop: 14,
                      }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          border: "1px solid var(--border-ink)",
                          borderRadius: 999,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.colour,
                              item.quantity - 1
                            )
                          }
                          aria-label="Decrease quantity"
                          style={{ width: 34, height: 34 }}
                        >
                          <Minus size={13} style={{ marginInline: "auto" }} />
                        </button>
                        <span style={{ minWidth: 26, textAlign: "center", fontSize: 13 }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.colour,
                              item.quantity + 1
                            )
                          }
                          aria-label="Increase quantity"
                          style={{ width: 34, height: 34 }}
                        >
                          <Plus size={13} style={{ marginInline: "auto" }} />
                        </button>
                      </div>

                      <strong style={{ fontSize: 17, color: "var(--maroon)" }}>
                        {formatINR(item.price * item.quantity)}
                      </strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Right Summary */}
            <aside
              style={{
                background: "#ffffff",
                borderRadius: 22,
                padding: 28,
                border: "1px solid rgba(201,164,106,0.38)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 600,
                  marginBottom: 18,
                }}
              >
                Order Summary
              </h2>

              <form onSubmit={handlePromo} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <label htmlFor="promo-code" className="sr-only">
                  Promo code
                </label>
                <input
                  id="promo-code"
                  type="text"
                  placeholder="Promo code (try RERA10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    borderRadius: 999,
                    border: "1px solid var(--border-ink)",
                    fontSize: 13,
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-outline-ink"
                  style={{ padding: "10px 18px" }}
                >
                  Apply
                </button>
              </form>
              {promoMsg && (
                <p style={{ fontSize: 12, color: "var(--maroon)", marginBottom: 14 }}>
                  {promoMsg}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  paddingBlock: 16,
                  borderTop: "1px solid var(--border-ink)",
                  borderBottom: "1px solid var(--border-ink)",
                  fontSize: 14,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--muted)" }}>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "var(--maroon)",
                    }}
                  >
                    <span>Welcome Privilege (RERA10)</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--muted)" }}>Pan-India Shipping</span>
                  <span>{shipping === 0 ? "Complimentary" : formatINR(shipping)}</span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginTop: 16,
                  marginBottom: 22,
                }}
              >
                <span style={{ fontWeight: 600 }}>Total (incl. taxes)</span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 30,
                    fontWeight: 600,
                    color: "var(--maroon)",
                  }}
                >
                  {formatINR(total)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="btn btn-maroon"
                style={{ width: "100%" }}
              >
                Proceed to Checkout
              </Link>

              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  fontSize: 12,
                  color: "var(--muted)",
                  marginTop: 14,
                }}
              >
                <ShieldCheck size={15} color="#5E2230" />
                UPI, Cards, NetBanking & Cash on Delivery
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
