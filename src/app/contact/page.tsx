"use client";

import React, { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site";
import { getWhatsAppOrderUrl } from "@/lib/format";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
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
      }}
    >
      <div className="container">
        <span className="eyebrow" style={{ color: "var(--maroon)" }}>
          Atelier Concierge
        </span>
        <h1 className="section-heading" style={{ marginTop: 6, marginBottom: 14 }}>
          Visit or <em>Write</em> to Us
        </h1>
        <p style={{ maxWidth: 560, color: "var(--muted)", marginBottom: 40 }}>
          Need bespoke blouse sizing, bridal trousseau curation, or assistance with
          an order? Our stylists are happy to help.
        </p>

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
              borderRadius: 24,
              padding: "clamp(24px, 4vw, 36px)",
              border: "1px solid rgba(201,164,106,0.35)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                marginBottom: 18,
              }}
            >
              Send a Styling Note
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
              <input
                required
                aria-label="Your Full Name"
                placeholder="Your Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
              />
              <input
                required
                type="tel"
                aria-label="Phone or WhatsApp Number"
                placeholder="Phone / WhatsApp Number (+91)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                style={inputStyle}
              />
              <input
                required
                type="email"
                aria-label="Email Address"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
              />
              <textarea
                required
                rows={4}
                aria-label="Your styling message"
                placeholder="Tell us what occasion, outfit, or sizing help you are looking for..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: "vertical" }}
              />
              <button type="submit" className="btn btn-maroon">
                Send Message
              </button>
            </form>

            {submitted && (
              <p
                style={{
                  marginTop: 14,
                  fontSize: 13,
                  color: "var(--maroon)",
                  fontWeight: 500,
                }}
              >
                Thank you for writing to RERA Boutique. Our stylist team will respond
                within 24 hours.
              </p>
            )}
          </div>

          <div style={{ display: "grid", gap: 22 }}>
            <div
              className="surface-wine jaali-pattern"
              style={{
                borderRadius: 24,
                padding: 30,
                border: "1px solid var(--border-gold)",
                display: "grid",
                gap: 16,
              }}
            >
              <span className="eyebrow">Flagship Studio</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30 }}>
                {SITE_CONFIG.fullName}
              </h2>

              <div style={{ display: "grid", gap: 12, fontSize: 14 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <MapPin size={18} color="#E8C98A" style={{ flexShrink: 0 }} />
                  <span>
                    {SITE_CONFIG.contact.addressLine1},{" "}
                    {SITE_CONFIG.contact.addressLine2}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Phone size={18} color="#E8C98A" style={{ flexShrink: 0 }} />
                  <span>{SITE_CONFIG.contact.phone}</span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Mail size={18} color="#E8C98A" style={{ flexShrink: 0 }} />
                  <span>{SITE_CONFIG.contact.email}</span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Clock size={18} color="#E8C98A" style={{ flexShrink: 0 }} />
                  <span>{SITE_CONFIG.contact.storeHours}</span>
                </div>
              </div>

              <a
                href={getWhatsAppOrderUrl(
                  "Namaste RERA Boutique! I would like to book a styling appointment."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
                style={{ marginTop: 8 }}
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>

            <div
              style={{
                borderRadius: 20,
                height: 220,
                background: "var(--blush)",
                border: "1px dashed rgba(94,34,48,0.35)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: 24,
              }}
            >
              <MapPin size={26} color="#5E2230" />
              <strong
                style={{
                  marginTop: 8,
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                }}
              >
                Boutique Map Location Placeholder
              </strong>
              <span style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
                Embed your Google Maps iframe for {SITE_CONFIG.contact.addressLine1}{" "}
                before launch.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
