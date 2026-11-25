import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, HeartHandshake, Sparkles } from "lucide-react";
import { BOUTIQUE_PHOTOS } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our Story & Craft Atelier",
  description:
    "Discover how RERA Boutique curates heirloom handloom weaves and modern silhouettes across India's master craft clusters.",
};

const CRAFT_TIMELINE = [
  {
    step: "01",
    place: "Varanasi & Chanderi",
    title: "Handloom Weaving",
    text: "Our Banarasi katan and Chanderi tissue yardage begins on traditional pit looms, where real silk warp meets antique-toned zari weft.",
  },
  {
    step: "02",
    place: "Lucknow & Kutch",
    title: "Chikankari & Bandhani",
    text: "Shadow-work floral motifs and thousands of hand-knotted Bandhani dots are completed over weeks by family artisan guilds.",
  },
  {
    step: "03",
    place: "Jaipur Block Studios",
    title: "Carved Teak & Natural Dyes",
    text: "Soft mulmul cottons are stamped by hand using seasoned teakwood blocks and sun-dried for gentle, breathable colourfastness.",
  },
  {
    step: "04",
    place: "Kala Ghoda, Mumbai",
    title: "Bespoke Tailoring & Finish",
    text: "Every silhouette is pattern-graded for the Indian form, finished with French seams, soft cotton linings, and optional custom alterations.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "calc(var(--header-height) + 32px)" }}>
      {/* Editorial Header */}
      <section
        className="surface-wine jaali-pattern"
        style={{
          paddingBlock: "clamp(56px, 7vw, 96px)",
          borderBottom: "1px solid var(--border-gold)",
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div>
            <span className="eyebrow">The RERA Heritage</span>
            <h1
              className="display-title"
              style={{ fontSize: "clamp(42px, 5.5vw, 76px)", marginTop: 10 }}
            >
              Chosen with <em>love</em>, rooted in <em>craft</em>
            </h1>
            <p
              style={{
                marginTop: 18,
                fontSize: 16,
                color: "rgba(251,247,241,0.8)",
                maxWidth: 540,
              }}
            >
              RERA Boutique was born from a simple conviction: modern Indian women
              deserve a single curated sanctuary where heirloom sarees feel effortless
              and contemporary western co-ords carry quiet soul.
            </p>
          </div>

          <div
            className="arch-mask"
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              maxWidth: 420,
              width: "100%",
              marginInline: "auto",
              border: "1px solid var(--border-gold-strong)",
            }}
          >
            <Image
              src={BOUTIQUE_PHOTOS.storyRack}
              alt="RERA Boutique Kala Ghoda Studio"
              fill
              sizes="420px"
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section
        className="surface-ivory"
        style={{ paddingBlock: "clamp(56px, 7vw, 96px)" }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="eyebrow" style={{ color: "var(--maroon)" }}>
              What Guides Us
            </span>
            <h2 className="section-heading" style={{ marginTop: 8 }}>
              Three Pillars of the <em>Boutique</em>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {[
              {
                icon: Sparkles,
                title: "Small-Batch Curation",
                desc: "We never mass-produce. Each weave and printed run arrives in limited numbers so your wardrobe stays intimate and distinct.",
              },
              {
                icon: HeartHandshake,
                title: "Artisan-First Partnerships",
                desc: "We work closely with weaver cooperatives and master karigars, honouring fair timelines and preserving regional needlework.",
              },
              {
                icon: Award,
                title: "Modern Fit & Comfort",
                desc: "Breathable mulmul linings, thoughtful pocket placement, and complimentary sleeve or hem alterations ensure all-day confidence.",
              },
            ].map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  style={{
                    background: "#ffffff",
                    borderRadius: 20,
                    padding: 28,
                    border: "1px solid var(--border-ink)",
                  }}
                >
                  <Icon size={24} color="#5E2230" />
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 26,
                      marginTop: 14,
                    }}
                  >
                    {val.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 8 }}>
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Craft Process Timeline */}
      <section
        className="surface-blush"
        style={{ paddingBlock: "clamp(56px, 7vw, 96px)" }}
      >
        <div className="container">
          <span className="eyebrow" style={{ color: "var(--maroon)" }}>
            From Loom to Wardrobe
          </span>
          <h2 className="section-heading" style={{ marginTop: 8, marginBottom: 36 }}>
            Our Craft <em>Timeline</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {CRAFT_TIMELINE.map((item) => (
              <div
                key={item.step}
                style={{
                  background: "var(--ivory)",
                  borderRadius: 18,
                  padding: 24,
                  border: "1px solid rgba(201,164,106,0.4)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 38,
                    color: "var(--gold)",
                    lineHeight: 1,
                  }}
                >
                  {item.step}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--maroon)",
                    marginTop: 10,
                  }}
                >
                  {item.place}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    marginTop: 4,
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 8 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/collections/all" className="btn btn-maroon">
              Explore the Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
