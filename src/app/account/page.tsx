"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogOut, Package, User } from "lucide-react";
import { formatINR } from "@/lib/format";

/**
 * Sample demo orders UI — replace with authenticated API/database orders in production.
 */
const SAMPLE_ORDERS = [
  {
    id: "RERA-SAMPLE-1042",
    date: "14 Oct 2026",
    status: "Delivered (Sample)",
    items: "Ruhani Banarasi Silk Saree · Royal Maroon",
    total: 18499,
  },
  {
    id: "RERA-SAMPLE-1019",
    date: "28 Sep 2026",
    status: "In Tailoring Studio (Sample)",
    items: "Noor Chikankari Kurta Set · Size M",
    total: 5499,
  },
];

export default function AccountPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [signedInUser, setSignedInUser] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setSignedInUser(name.trim() || email.split("@")[0] || "RERA Guest");
  };

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
        paddingTop: "calc(var(--header-height) + 52px)",
        paddingBottom: 96,
        minHeight: "84vh",
      }}
    >
      <div className="container">
        <span className="eyebrow" style={{ color: "var(--maroon)" }}>
          Client Atelier Portal
        </span>
        <h1 className="section-heading" style={{ marginTop: 6, marginBottom: 32 }}>
          My <em>Account</em> & Orders
        </h1>

        {!signedInUser ? (
          <div
            style={{
              maxWidth: 480,
              marginInline: "auto",
              background: "#ffffff",
              borderRadius: 24,
              padding: 32,
              border: "1px solid rgba(201,164,106,0.35)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              <button
                type="button"
                onClick={() => setTab("login")}
                className={`btn ${
                  tab === "login" ? "btn-maroon" : "btn-outline-ink"
                }`}
                style={{ flex: 1, padding: "10px 14px" }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab("register")}
                className={`btn ${
                  tab === "register" ? "btn-maroon" : "btn-outline-ink"
                }`}
                style={{ flex: 1, padding: "10px 14px" }}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleAuth} style={{ display: "grid", gap: 14 }}>
              {tab === "register" && (
                <input
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
              )}
              <input
                required
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
              <input
                required
                type="password"
                placeholder="Password"
                style={inputStyle}
              />
              <button type="submit" className="btn btn-maroon">
                {tab === "login" ? "Sign In (Demo UI)" : "Register (Demo UI)"}
              </button>
            </form>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 14 }}>
              Demo authentication UI: enter any email to preview the customer
              orders dashboard.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 28 }}>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: 24,
                border: "1px solid var(--border-ink)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "var(--blush)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--maroon)",
                  }}
                >
                  <User size={22} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26 }}>
                    Namaste, {signedInUser}
                  </h2>
                  <p style={{ fontSize: 13, color: "var(--muted)" }}>
                    {email || "Member Profile"} · Demo Session
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-outline-ink"
                onClick={() => setSignedInUser(null)}
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>

            <div
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: 28,
                border: "1px solid var(--border-ink)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                }}
              >
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>
                  Order History (Sample UI)
                </h3>
                <Link href="/collections/all" className="btn btn-outline-ink">
                  Shop New Season
                </Link>
              </div>

              <div style={{ display: "grid", gap: 14 }}>
                {SAMPLE_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      padding: 18,
                      borderRadius: 14,
                      border: "1px solid var(--border-ink)",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <Package size={20} color="#5E2230" />
                      <div>
                        <div style={{ fontWeight: 600 }}>{order.id}</div>
                        <div style={{ fontSize: 13, color: "var(--muted)" }}>
                          {order.items} · {order.date}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 600, color: "var(--maroon)" }}>
                        {formatINR(order.total)}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
