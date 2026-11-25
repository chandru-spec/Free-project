"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import { SITE_CONFIG } from "@/lib/site";
import { formatINR } from "@/lib/format";
import { JharokhaMark } from "@/components/brand/JharokhaLogo";
import styles from "./CartDrawer.module.css";

export function CartDrawer() {
  const isCartOpen = useBoutiqueStore((s) => s.isCartOpen);
  const closeCart = useBoutiqueStore((s) => s.closeCart);
  const cart = useBoutiqueStore((s) => s.cart);
  const updateQuantity = useBoutiqueStore((s) => s.updateQuantity);
  const removeFromCart = useBoutiqueStore((s) => s.removeFromCart);

  useEffect(() => {
    if (!isCartOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isCartOpen, closeCart]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const threshold = SITE_CONFIG.freeShippingThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const progress = Math.min(100, (subtotal / threshold) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
        >
          <motion.aside
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Bag"
          >
            <div className={styles.header}>
              <h2 className={styles.title}>
                Your Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={closeCart}
                aria-label="Close shopping bag"
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.shippingBanner}>
              {remaining === 0 ? (
                <span>
                  ✦ You have unlocked <strong>complimentary pan-India shipping</strong>.
                </span>
              ) : (
                <span>
                  Add <strong>{formatINR(remaining)}</strong> more for complimentary
                  pan-India delivery.
                </span>
              )}
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className={styles.body}>
              {cart.length === 0 ? (
                <div className={styles.emptyState}>
                  <JharokhaMark size={48} strokeColor="#5E2230" dotColor="#C9A46A" />
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 26,
                      fontWeight: 600,
                    }}
                  >
                    Your RERA bag is empty
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 280 }}>
                    Explore handwoven Banarasi sarees, Chikankari kurtas, and sculpted
                    western co-ords.
                  </p>
                  <Link
                    href="/collections/new-arrivals"
                    className="btn btn-maroon"
                    onClick={closeCart}
                  >
                    Discover New Arrivals
                  </Link>
                </div>
              ) : (
                <div className={styles.itemList}>
                  {cart.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}-${item.colour}`}
                      className={styles.item}
                    >
                      <Link
                        href={`/products/${item.slug}`}
                        className={styles.thumb}
                        onClick={closeCart}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          style={{ objectFit: "cover", objectPosition: "top center" }}
                        />
                      </Link>
                      <div>
                        <Link
                          href={`/products/${item.slug}`}
                          className={styles.itemName}
                          onClick={closeCart}
                        >
                          {item.name}
                        </Link>
                        <div className={styles.itemVariant}>
                          Size: {item.size} · {item.colour}
                        </div>
                        <div
                          style={{
                            fontWeight: 500,
                            fontSize: 14,
                            marginTop: 4,
                            color: "var(--maroon)",
                          }}
                        >
                          {formatINR(item.price)}
                        </div>
                        <div className={styles.itemBottom}>
                          <div className={styles.qtyBox}>
                            <button
                              type="button"
                              className={styles.qtyBtn}
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.colour,
                                  item.quantity - 1
                                )
                              }
                              aria-label="Decrease quantity"
                            >
                              <Minus size={13} />
                            </button>
                            <span className={styles.qtyVal}>{item.quantity}</span>
                            <button
                              type="button"
                              className={styles.qtyBtn}
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.colour,
                                  item.quantity + 1
                                )
                              }
                              aria-label="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(item.productId, item.size, item.colour)
                            }
                            aria-label={`Remove ${item.name}`}
                            style={{ color: "var(--muted)", padding: 4 }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.subtotalRow}>
                  <span className={styles.subtotalLabel}>Subtotal</span>
                  <span className={styles.subtotalPrice}>{formatINR(subtotal)}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14 }}>
                  Taxes included. Complimentary gift wrap available at checkout.
                </p>
                <div style={{ display: "grid", gap: 10 }}>
                  <Link
                    href="/checkout"
                    className="btn btn-maroon"
                    style={{ width: "100%" }}
                    onClick={closeCart}
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/cart"
                    className="btn btn-outline-ink"
                    style={{ width: "100%" }}
                    onClick={closeCart}
                  >
                    View Full Bag
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
