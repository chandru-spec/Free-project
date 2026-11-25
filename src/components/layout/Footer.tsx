"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site";
import { BrandWordmark } from "@/components/brand/JharokhaLogo";
import styles from "./Footer.module.css";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className={`${styles.footer} jaali-pattern`}>
      <div className="container">
        <div className={styles.topGrid}>
          {/* Brand column */}
          <div className={styles.brandCol}>
            <BrandWordmark tone="light" />
            <p>{SITE_CONFIG.description}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginTop: 20,
                fontSize: 13,
                color: "rgba(251,247,241,0.78)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <MapPin size={15} color="#C9A46A" />
                {SITE_CONFIG.contact.addressLine1}, {SITE_CONFIG.contact.addressLine2}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <Phone size={15} color="#C9A46A" />
                {SITE_CONFIG.contact.phone}
              </span>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <Mail size={15} color="#C9A46A" />
                {SITE_CONFIG.contact.email}
              </a>
              <a
                href={SITE_CONFIG.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#E8C98A",
                  marginTop: 4,
                }}
              >
                <Instagram size={15} />
                {SITE_CONFIG.social.instagramHandle}
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className={styles.colHeading}>Shop</h3>
            <ul className={styles.linkList}>
              {SITE_CONFIG.footerColumns.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className={styles.colHeading}>Help</h3>
            <ul className={styles.linkList}>
              {SITE_CONFIG.footerColumns.help.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className={styles.colHeading}>About</h3>
            <ul className={styles.linkList}>
              {SITE_CONFIG.footerColumns.about.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className={styles.colHeading}>The RERA Circle</h3>
            <p style={{ fontSize: 13, color: "rgba(251,247,241,0.75)" }}>
              Enjoy 10% off your first wardrobe addition and early invitations to
              festive trunk shows.
            </p>
            <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.newsletterInput}
              />
              <button
                type="submit"
                className="btn btn-gold"
                style={{ padding: "12px 20px" }}
              >
                Join
              </button>
            </form>
            {subscribed && (
              <p style={{ fontSize: 12, color: "#E8C98A", marginTop: 10 }}>
                Welcome to the RERA Circle. Use code <strong>RERA10</strong> at
                checkout.
              </p>
            )}
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span>
            © {new Date().getFullYear()} {SITE_CONFIG.fullName}. {SITE_CONFIG.tagline}.
          </span>

          <div className={styles.paymentPills} aria-label="Accepted payment methods">
            <span className={styles.paymentPill}>UPI</span>
            <span className={styles.paymentPill}>VISA / MASTERCARD</span>
            <span className={styles.paymentPill}>RUPAY</span>
            <span className={styles.paymentPill}>NETBANKING</span>
            <span className={styles.paymentPill}>CASH ON DELIVERY</span>
          </div>
        </div>

        <div className={styles.giantWordmark} aria-hidden="true">
          RERA
        </div>
      </div>
    </footer>
  );
}
