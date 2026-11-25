"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site";
import { BOUTIQUE_PHOTOS } from "@/lib/images";

const IG_TILES = [
  { src: BOUTIQUE_PHOTOS.saree2, alt: "RERA Festive Drapes" },
  { src: BOUTIQUE_PHOTOS.kurta1, alt: "Lucknowi Chikankari Craft" },
  { src: BOUTIQUE_PHOTOS.saree3, alt: "Banarasi Zari Looms" },
  { src: BOUTIQUE_PHOTOS.western3, alt: "Sienna Resort Co-ords" },
  { src: BOUTIQUE_PHOTOS.lehenga3, alt: "Bridal Lehenga Silhouettes" },
  { src: BOUTIQUE_PHOTOS.jewel1, alt: "Zardozi Potli & Jewellery" },
];

export function InstagramNewsletterSection() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
    setEmail("");
  };

  return (
    <section
      className="surface-ivory"
      style={{ paddingBlock: "clamp(64px, 8vw, 108px)" }}
    >
      <div className="container">
        {/* 6-tile Instagram Grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div>
            <span className="eyebrow" style={{ color: "var(--maroon)" }}>
              In the Moment
            </span>
            <h2 className="section-heading" style={{ marginTop: 6 }}>
              Styled on <em>Instagram</em>
            </h2>
          </div>
          <a
            href={SITE_CONFIG.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-ink"
          >
            <Instagram size={16} />
            {SITE_CONFIG.social.instagramHandle}
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 14,
          }}
        >
          {IG_TILES.map((tile) => (
            <a
              key={tile.src}
              href={SITE_CONFIG.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "relative",
                aspectRatio: "3 / 4",
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(201,164,106,0.28)",
              }}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="220px"
                style={{
                  objectFit: "cover",
                  objectPosition: "top center",
                  transition: "transform 0.55s var(--ease-luxury)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.06)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </a>
          ))}
        </div>

        {/* Join the RERA Circle Newsletter */}
        <div
          className="surface-wine jaali-pattern"
          style={{
            marginTop: "clamp(52px, 7vw, 84px)",
            borderRadius: 24,
            padding: "clamp(32px, 5vw, 60px)",
            border: "1px solid var(--border-gold)",
            textAlign: "center",
          }}
        >
          <span className="eyebrow">Private Invitations</span>
          <h2 className="section-heading" style={{ marginTop: 10 }}>
            Join the <em>RERA</em> circle
          </h2>
          <p
            style={{
              maxWidth: 480,
              marginInline: "auto",
              marginTop: 12,
              fontSize: 15,
              color: "rgba(251,247,241,0.78)",
            }}
          >
            Receive 10% off your first wardrobe piece, private access to bridal trunk
            shows, and seasonal craft notes.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
              marginTop: 26,
              maxWidth: 500,
              marginInline: "auto",
            }}
          >
            <label htmlFor="home-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="home-newsletter-email"
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: "1 1 240px",
                padding: "14px 20px",
                borderRadius: 999,
                border: "1px solid var(--border-gold-strong)",
                background: "rgba(20,10,14,0.65)",
                color: "#FBF7F1",
                fontSize: 14,
              }}
            />
            <button type="submit" className="btn btn-gold">
              Claim 10% Off
            </button>
          </form>

          {joined && (
            <p style={{ marginTop: 14, color: "#E8C98A", fontSize: 13 }}>
              Thank you for joining! Apply code <strong>RERA10</strong> at checkout.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
