"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, CreditCard, Lock, Smartphone, Truck } from "lucide-react";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import { SITE_CONFIG } from "@/lib/site";
import { formatINR } from "@/lib/format";
import { JharokhaMark } from "@/components/brand/JharokhaLogo";

const INDIAN_STATES = [
  "Maharashtra",
  "Delhi NCR",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "Telangana",
  "West Bengal",
  "Rajasthan",
  "Uttar Pradesh",
  "Punjab",
  "Kerala",
];

export default function CheckoutPage() {
  const cart = useBoutiqueStore((s) => s.cart);
  const clearCart = useBoutiqueStore((s) => s.clearCart);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    line1: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
  });
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [orderPlacedId, setOrderPlacedId] = useState<string | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const standardFee =
    subtotal >= SITE_CONFIG.freeShippingThreshold
      ? 0
      : SITE_CONFIG.standardShippingFee;
  const deliveryFee = deliveryMethod === "express" ? 299 : standardFee;
  const total = subtotal + deliveryFee;

  const handlePlaceDemoOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `RERA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderPlacedId(id);
    clearCart();
  };

  if (orderPlacedId) {
    return (
      <div
        className="surface-ivory"
        style={{
          paddingTop: "calc(var(--header-height) + 64px)",
          paddingBottom: 96,
          minHeight: "82vh",
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: 640,
            textAlign: "center",
            background: "#ffffff",
            padding: "48px 32px",
            borderRadius: 24,
            border: "1px solid rgba(201,164,106,0.45)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <CheckCircle2
            size={48}
            color="#5E2230"
            style={{ marginInline: "auto", marginBottom: 14 }}
          />
          <span className="eyebrow" style={{ color: "var(--maroon)" }}>
            Demo Order Confirmed
          </span>
          <h1 className="section-heading" style={{ marginTop: 8 }}>
            Thank you for choosing <em>RERA</em>
          </h1>
          <p style={{ color: "var(--muted)", marginTop: 12 }}>
            Demo Order Reference: <strong>{orderPlacedId}</strong>
          </p>
          <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 8 }}>
            This was a simulated storefront checkout (no real payment was charged).
            Connect Razorpay in <code>/checkout</code> before going live.
          </p>
          <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 12 }}>
            <Link href="/collections/all" className="btn btn-maroon">
              Continue Exploring
            </Link>
            <Link href="/account" className="btn btn-outline-ink">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div
        className="surface-ivory"
        style={{
          paddingTop: "calc(var(--header-height) + 80px)",
          paddingBottom: 96,
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: 480 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <JharokhaMark size={48} strokeColor="#5E2230" dotColor="#C9A46A" />
          </div>
          <h1 className="section-heading" style={{ marginTop: 16 }}>
            Nothing in your bag yet
          </h1>
          <p style={{ color: "var(--muted)", marginTop: 10 }}>
            Add your favourite sarees, kurtas, or co-ords before proceeding to
            checkout.
          </p>
          <Link
            href="/collections/all"
            className="btn btn-maroon"
            style={{ marginTop: 22 }}
          >
            Shop RERA Boutique
          </Link>
        </div>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid var(--border-ink)",
    background: "#ffffff",
    fontSize: 14,
  };

  return (
    <div
      className="surface-ivory"
      style={{
        paddingTop: "calc(var(--header-height) + 46px)",
        paddingBottom: 96,
      }}
    >
      <div className="container">
        <div style={{ marginBottom: 28 }}>
          <span className="eyebrow" style={{ color: "var(--maroon)" }}>
            Secure Boutique Checkout · Demo Mode
          </span>
          <h1 className="section-heading" style={{ marginTop: 6 }}>
            Complete Your <em>Order</em>
          </h1>
        </div>

        {/* 3-Step Indicator */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 32,
          }}
        >
          {[
            { num: 1, label: "1. Shipping Address" },
            { num: 2, label: "2. Delivery Preference" },
            { num: 3, label: "3. Payment (Demo)" },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                if (s.num <= step) setStep(s.num as 1 | 2 | 3);
              }}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border:
                  step === s.num
                    ? "1px solid var(--maroon)"
                    : "1px solid var(--border-ink)",
                background: step === s.num ? "var(--maroon)" : "#ffffff",
                color: step === s.num ? "var(--ivory)" : "var(--ink)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 36,
            alignItems: "start",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 22,
              padding: "clamp(22px, 4vw, 34px)",
              border: "1px solid var(--border-ink)",
            }}
          >
            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
                style={{ display: "grid", gap: 16 }}
              >
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>
                  Shipping Address
                </h2>
                <div style={{ display: "grid", gap: 12 }}>
                  <input
                    required
                    aria-label="Full Name"
                    placeholder="Full Name"
                    value={address.fullName}
                    onChange={(e) =>
                      setAddress({ ...address, fullName: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <input
                      required
                      type="tel"
                      aria-label="Mobile number"
                      placeholder="Mobile (+91)"
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                      }
                      style={inputStyle}
                    />
                    <input
                      required
                      type="email"
                      aria-label="Email address"
                      placeholder="Email Address"
                      value={address.email}
                      onChange={(e) =>
                        setAddress({ ...address, email: e.target.value })
                      }
                      style={inputStyle}
                    />
                  </div>
                  <input
                    required
                    aria-label="Street Address"
                    placeholder="House / Flat No., Building, Street"
                    value={address.line1}
                    onChange={(e) =>
                      setAddress({ ...address, line1: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                    <input
                      required
                      aria-label="City"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      style={inputStyle}
                    />
                    <select
                      aria-label="State"
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      style={inputStyle}
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <input
                      required
                      aria-label="6-digit Indian pincode"
                      pattern="[1-9][0-9]{5}"
                      maxLength={6}
                      placeholder="6-digit Pincode"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                      }
                      style={inputStyle}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-maroon">
                  Continue to Delivery
                </button>
              </form>
            )}

            {step === 2 && (
              <div style={{ display: "grid", gap: 18 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>
                  Choose Delivery Speed
                </h2>

                {[
                  {
                    id: "standard" as const,
                    title: "Standard Pan-India Couture Courier",
                    desc: "Delivered in 4–6 business days in our signature muslin garment wrap.",
                    fee: standardFee === 0 ? "Complimentary" : formatINR(standardFee),
                  },
                  {
                    id: "express" as const,
                    title: "Express Air Dispatch",
                    desc: "Priority 2–3 business day delivery across metro & tier-1 cities.",
                    fee: formatINR(299),
                  },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 14,
                      padding: 18,
                      borderRadius: 16,
                      border:
                        deliveryMethod === opt.id
                          ? "2px solid var(--maroon)"
                          : "1px solid var(--border-ink)",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === opt.id}
                        onChange={() => setDeliveryMethod(opt.id)}
                      />
                      <div>
                        <div style={{ fontWeight: 600 }}>{opt.title}</div>
                        <div style={{ fontSize: 13, color: "var(--muted)" }}>
                          {opt.desc}
                        </div>
                      </div>
                    </div>
                    <strong style={{ color: "var(--maroon)" }}>{opt.fee}</strong>
                  </label>
                ))}

                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    type="button"
                    className="btn btn-outline-ink"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-maroon"
                    style={{ flex: 1 }}
                    onClick={() => setStep(3)}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handlePlaceDemoOrder} style={{ display: "grid", gap: 18 }}>
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: 12,
                    background: "var(--blush)",
                    border: "1px solid rgba(94,34,48,0.25)",
                    fontSize: 13,
                  }}
                >
                  <strong>Demo Payment Step (Razorpay Placeholder):</strong> Select a
                  payment mode below to simulate checkout. No real payment is
                  processed.
                </div>

                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>
                  Payment Method
                </h2>

                <div style={{ display: "grid", gap: 12 }}>
                  {[
                    {
                      id: "upi" as const,
                      label: "UPI (GPay, PhonePe, Paytm, BHIM)",
                      icon: Smartphone,
                    },
                    {
                      id: "card" as const,
                      label: "Credit / Debit Card & NetBanking (Razorpay Placeholder)",
                      icon: CreditCard,
                    },
                    {
                      id: "cod" as const,
                      label: "Cash on Delivery (Available across India)",
                      icon: Truck,
                    },
                  ].map((pm) => {
                    const Icon = pm.icon;
                    return (
                      <label
                        key={pm.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: 16,
                          borderRadius: 14,
                          border:
                            paymentMethod === pm.id
                              ? "2px solid var(--maroon)"
                              : "1px solid var(--border-ink)",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === pm.id}
                          onChange={() => setPaymentMethod(pm.id)}
                        />
                        <Icon size={18} color="#5E2230" />
                        <span style={{ fontWeight: 500, fontSize: 14 }}>{pm.label}</span>
                      </label>
                    );
                  })}
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    type="button"
                    className="btn btn-outline-ink"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-gold" style={{ flex: 1 }}>
                    <Lock size={15} />
                    Place Demo Order ({formatINR(total)})
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside
            style={{
              background: "#ffffff",
              borderRadius: 22,
              padding: 26,
              border: "1px solid rgba(201,164,106,0.35)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                marginBottom: 16,
              }}
            >
              In Your Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>

            <div style={{ display: "grid", gap: 12, marginBottom: 18 }}>
              {cart.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.colour}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                    gap: 10,
                  }}
                >
                  <span>
                    {item.name} ({item.size}) × {item.quantity}
                  </span>
                  <strong>{formatINR(item.price * item.quantity)}</strong>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "1px solid var(--border-ink)",
                paddingTop: 14,
                display: "grid",
                gap: 8,
                fontSize: 14,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--muted)" }}>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--muted)" }}>Delivery</span>
                <span>{deliveryFee === 0 ? "Complimentary" : formatINR(deliveryFee)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: 10,
                  borderTop: "1px solid var(--border-ink)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "var(--maroon)",
                }}
              >
                <span>Payable Total</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
