import React from "react";
import { Award, RefreshCw, Scissors, ShieldCheck } from "lucide-react";

const PILLARS = [
  {
    icon: Award,
    title: "Handpicked Quality",
    text: "Every saree, kurta, and dress passes a 12-point weave, finish, and lining inspection.",
  },
  {
    icon: Scissors,
    title: "Custom Fitting & Alterations",
    text: "Complimentary sleeve, length, and blouse adjustments tailored to your exact measurements.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Indian Payments",
    text: "Encrypted UPI, RuPay, credit/debit cards, NetBanking, and Cash on Delivery across India.",
  },
  {
    icon: RefreshCw,
    title: "Easy 7-Day Exchange",
    text: "Hassle-free doorstep pickup and quick size exchanges on all ready-to-wear silhouettes.",
  },
];

export function WhyReraSection() {
  return (
    <section
      className="surface-dark jaali-pattern"
      style={{
        paddingBlock: "clamp(56px, 7vw, 96px)",
        borderTop: "1px solid var(--border-gold)",
        borderBottom: "1px solid var(--border-gold)",
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="eyebrow">The Boutique Promise</span>
          <h2 className="section-heading" style={{ marginTop: 8 }}>
            Why <em>RERA</em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 20,
          }}
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="glass-panel-dark"
                style={{
                  padding: 26,
                  borderRadius: 18,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "1px solid var(--border-gold)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold-glow)",
                  }}
                >
                  <Icon size={20} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  {pillar.title}
                </h3>
                <p style={{ fontSize: 14, color: "rgba(251,247,241,0.74)" }}>
                  {pillar.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
