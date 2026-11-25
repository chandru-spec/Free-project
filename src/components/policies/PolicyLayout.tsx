import React from "react";
import Link from "next/link";

interface PolicySection {
  heading: string;
  body: string;
}

export function PolicyLayout({
  eyebrow,
  title,
  lastUpdated,
  sections,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  sections: PolicySection[];
}) {
  return (
    <div
      className="surface-ivory"
      style={{
        paddingTop: "calc(var(--header-height) + 52px)",
        paddingBottom: 96,
      }}
    >
      <div className="container" style={{ maxWidth: 820 }}>
        <span className="eyebrow" style={{ color: "var(--maroon)" }}>
          {eyebrow}
        </span>
        <h1 className="section-heading" style={{ marginTop: 8 }}>
          {title}
        </h1>
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
          Placeholder Policy Template ({lastUpdated}) — Please have your legal
          and operations team review and customise before public launch.
        </p>

        <div
          style={{
            marginTop: 32,
            background: "#ffffff",
            borderRadius: 22,
            padding: "clamp(24px, 4vw, 40px)",
            border: "1px solid var(--border-ink)",
            display: "grid",
            gap: 26,
          }}
        >
          {sections.map((sec) => (
            <section key={sec.heading}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  fontWeight: 600,
                  color: "var(--maroon)",
                  marginBottom: 8,
                }}
              >
                {sec.heading}
              </h2>
              <p style={{ fontSize: 15, color: "var(--ink)" }}>{sec.body}</p>
            </section>
          ))}
        </div>

        <div style={{ marginTop: 28 }}>
          <Link href="/contact" className="btn btn-outline-ink">
            Questions? Contact RERA Concierge
          </Link>
        </div>
      </div>
    </div>
  );
}
