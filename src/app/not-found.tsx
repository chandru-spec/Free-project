import React from "react";
import Link from "next/link";
import { JharokhaMark } from "@/components/brand/JharokhaLogo";

export default function NotFoundPage() {
  return (
    <section
      className="surface-wine jaali-pattern"
      style={{
        minHeight: "82vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "calc(var(--header-height) + 40px)",
        paddingBottom: 72,
        textAlign: "center",
      }}
    >
      <div className="container" style={{ maxWidth: 560 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <JharokhaMark size={64} strokeColor="#C9A46A" dotColor="#E8C98A" />
        </div>
        <span className="eyebrow">404 · Page Not Found</span>
        <h1
          className="display-title"
          style={{ fontSize: "clamp(40px, 6vw, 70px)", marginTop: 10 }}
        >
          Lost beyond the <em>Jharokha</em>
        </h1>
        <p style={{ marginTop: 14, color: "rgba(251,247,241,0.78)", fontSize: 15 }}>
          The silhouette or editorial page you were looking for has moved to a new
          season. Let us guide you back inside the boutique.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
            marginTop: 28,
          }}
        >
          <Link href="/" className="btn btn-gold">
            Back to the Boutique
          </Link>
          <Link href="/collections/festive-edit" className="btn btn-outline-gold">
            Explore Festive Edit
          </Link>
        </div>
      </div>
    </section>
  );
}
