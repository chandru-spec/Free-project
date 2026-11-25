"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { SITE_CONFIG } from "@/lib/site";
import { formatINR } from "@/lib/format";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import styles from "./SearchOverlay.module.css";

export function SearchOverlay() {
  const isSearchOpen = useBoutiqueStore((s) => s.isSearchOpen);
  const closeSearch = useBoutiqueStore((s) => s.closeSearch);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSearchOpen) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isSearchOpen, closeSearch]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 4);
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.occasion.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          role="dialog"
          aria-modal="true"
          aria-label="Search Boutique"
        >
          <div className={styles.panel}>
            <div className={styles.topRow}>
              <span className="eyebrow">Search the Boutique</span>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={closeSearch}
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.inputWrap}>
              <Search size={24} color="#C9A46A" />
              <input
                ref={inputRef}
                type="search"
                className={styles.input}
                placeholder="Search sarees, Banarasi, Chikankari, co-ords..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search products"
              />
            </div>

            <div className={styles.popularRow}>
              {SITE_CONFIG.popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  className={styles.pill}
                  onClick={() => setQuery(term)}
                >
                  {term}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 28 }}>
              <p className="eyebrow">
                {query.trim()
                  ? `${results.length} Curated Match${results.length === 1 ? "" : "es"}`
                  : "Curated Highlights"}
              </p>

              {results.length === 0 ? (
                <p style={{ marginTop: 20, color: "rgba(251,247,241,0.72)" }}>
                  No silhouettes matched “{query}”. Try searching by fabric such as
                  Organza, Banarasi Silk, or Linen.
                </p>
              ) : (
                <div className={styles.resultsGrid}>
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className={styles.resultCard}
                      onClick={closeSearch}
                    >
                      <div className={styles.resultImg}>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="240px"
                          style={{ objectFit: "cover", objectPosition: "top center" }}
                        />
                      </div>
                      <div className={styles.resultInfo}>
                        <div className={styles.resultName}>{product.name}</div>
                        <div className={styles.resultMeta}>
                          {formatINR(product.price)} · {product.fabric}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
