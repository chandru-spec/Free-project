"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, User, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE_CONFIG, type NavItem } from "@/lib/site";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import { BrandWordmark } from "@/components/brand/JharokhaLogo";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<NavItem | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const cart = useBoutiqueStore((s) => s.cart);
  const wishlist = useBoutiqueStore((s) => s.wishlist);
  const hasHydrated = useBoutiqueStore((s) => s.hasHydrated);
  const openCart = useBoutiqueStore((s) => s.openCart);
  const openSearch = useBoutiqueStore((s) => s.openSearch);

  const cartCount = hasHydrated
    ? cart.reduce((sum, item) => sum + item.quantity, 0)
    : 0;
  const wishlistCount = hasHydrated ? wishlist.length : 0;

  const isDarkHeroRoute = pathname === "/" || pathname === "/lookbook";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setActiveMega(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const headerTone = isDarkHeroRoute ? "light" : "dark";

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ""} ${
          !isDarkHeroRoute ? styles.headerLightPage : ""
        }`}
        style={{
          color: isDarkHeroRoute ? "#FBF7F1" : "#2B1D1C",
        }}
        onMouseLeave={() => setActiveMega(null)}
      >
        <div className={`container ${styles.inner}`}>
          {/* Mobile menu button */}
          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link href="/" aria-label="RERA Boutique Home">
            <BrandWordmark tone={headerTone} />
          </Link>

          {/* Desktop navigation */}
          <nav className={styles.navDesktop} aria-label="Main navigation">
            {SITE_CONFIG.navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <div
                  key={item.label}
                  className={styles.navLinkWrap}
                  onMouseEnter={() =>
                    setActiveMega(item.megaMenu ? item : null)
                  }
                >
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${
                      isActive ? styles.navLinkActive : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right icon actions */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={openSearch}
              aria-label="Search RERA Boutique"
            >
              <Search size={19} />
            </button>

            <Link
              href="/wishlist"
              className={styles.iconBtn}
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className={styles.badge}>{wishlistCount}</span>
              )}
            </Link>

            <Link
              href="/account"
              className={styles.iconBtn}
              aria-label="Account and Orders"
            >
              <User size={19} />
            </Link>

            <button
              type="button"
              className={styles.iconBtn}
              onClick={openCart}
              aria-label={`Shopping Bag (${cartCount} items)`}
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu */}
        <AnimatePresence>
          {activeMega?.megaMenu && (
            <motion.div
              className={styles.megaMenu}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActiveMega(activeMega)}
              onMouseLeave={() => setActiveMega(null)}
            >
              {activeMega.megaMenu.columns.map((col) => (
                <div key={col.heading}>
                  <p className={styles.megaHeading}>{col.heading}</p>
                  <ul className={styles.megaList}>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className={styles.megaLinkTitle}
                          onClick={() => setActiveMega(null)}
                        >
                          {link.label}
                        </Link>
                        {link.description && (
                          <span className={styles.megaLinkDesc}>
                            {link.description}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <Link
                href={activeMega.megaMenu.featured.href}
                className={styles.megaFeatured}
                onClick={() => setActiveMega(null)}
              >
                <div className={styles.megaFeaturedImg}>
                  <Image
                    src={activeMega.megaMenu.featured.image}
                    alt={activeMega.megaMenu.featured.title}
                    fill
                    sizes="270px"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                </div>
                <div className={styles.megaFeaturedText}>
                  <div className={styles.megaFeaturedTitle}>
                    {activeMega.megaMenu.featured.title}
                  </div>
                  <div className={styles.megaFeaturedSub}>
                    {activeMega.megaMenu.featured.subtitle}
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Fullscreen Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={`${styles.mobileMenu} jaali-pattern`}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <BrandWordmark tone="light" compact />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    border: "1px solid rgba(201,164,106,0.35)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FBF7F1",
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <ul className={styles.mobileNavList}>
                {SITE_CONFIG.navItems.map((item, idx) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={styles.mobileNavLink}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight size={20} color="#C9A46A" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 32 }}>
              <p className="eyebrow" style={{ marginBottom: 8 }}>
                Atelier Concierge
              </p>
              <p style={{ fontSize: 13, color: "rgba(251,247,241,0.72)" }}>
                {SITE_CONFIG.contact.addressLine1}, {SITE_CONFIG.contact.addressLine2}
              </p>
              <p style={{ fontSize: 13, color: "#E8C98A", marginTop: 4 }}>
                {SITE_CONFIG.contact.phone} · {SITE_CONFIG.contact.storeHours}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
