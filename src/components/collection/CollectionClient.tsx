"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PRODUCTS,
  type FabricType,
  type OccasionType,
  type ProductCategory,
} from "@/data/products";
import { formatINR } from "@/lib/format";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import { ProductCard } from "@/components/product/ProductCard";
import styles from "./Collection.module.css";

interface CollectionClientProps {
  slug: string;
  title: string;
  subtitle: string;
  initialFabric?: string;
  initialCategory?: string;
}

const ALL_CATEGORIES: ProductCategory[] = [
  "Sarees",
  "Kurta Sets",
  "Lehengas",
  "Anarkalis",
  "Western Dresses",
  "Co-ord Sets",
  "Accessories",
];

const ALL_FABRICS: FabricType[] = [
  "Banarasi Silk",
  "Chanderi",
  "Cotton",
  "Georgette",
  "Organza",
  "Velvet",
  "Linen",
  "Zari Brocade",
];

const ALL_OCCASIONS: OccasionType[] = [
  "Festive",
  "Wedding",
  "Cocktail",
  "Everyday Luxe",
  "Resort",
];

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size", "One Size"];

const PRICE_RANGES = [
  { id: "all", label: "All Prices" },
  { id: "under-5000", label: "Under ₹5,000" },
  { id: "5000-15000", label: "₹5,000 – ₹15,000" },
  { id: "above-15000", label: "Above ₹15,000" },
];

export function CollectionClient({
  slug,
  title,
  subtitle,
  initialFabric = "",
  initialCategory = "",
}: CollectionClientProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>(
    initialFabric ? [initialFabric] : []
  );
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColour, setSelectedColour] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const addToCart = useBoutiqueStore((s) => s.addToCart);
  const openQuickView = useBoutiqueStore((s) => s.openQuickView);

  useEffect(() => {
    setSelectedFabrics(initialFabric ? [initialFabric] : []);
  }, [initialFabric]);

  useEffect(() => {
    setSelectedCategories(initialCategory ? [initialCategory] : []);
  }, [initialCategory]);

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileFiltersOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileFiltersOpen]);

  const baseProducts = useMemo(() => {
    if (!slug || slug === "all") return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.collectionTags.includes(slug) ||
        p.category.toLowerCase().replace(/\s+/g, "-") === slug
    );
  }, [slug]);

  const availableColours = useMemo(() => {
    const map = new Map<string, string>();
    baseProducts.forEach((p) =>
      p.colours.forEach((c) => {
        if (!map.has(c.name)) map.set(c.name, c.hex);
      })
    );
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [baseProducts]);

  const filteredProducts = useMemo(() => {
    let list = [...baseProducts];

    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedFabrics.length > 0) {
      list = list.filter((p) => selectedFabrics.includes(p.fabric));
    }
    if (selectedOccasions.length > 0) {
      list = list.filter((p) => selectedOccasions.includes(p.occasion));
    }
    if (selectedSizes.length > 0) {
      list = list.filter((p) =>
        p.sizes.some((s) =>
          selectedSizes.some((sel) =>
            sel === "Free Size" ? s.includes("Free") || s.includes("2.5") : s === sel
          )
        )
      );
    }
    if (selectedColour) {
      list = list.filter((p) =>
        p.colours.some((c) => c.name === selectedColour)
      );
    }
    if (priceRange === "under-5000") {
      list = list.filter((p) => p.price < 5000);
    } else if (priceRange === "5000-15000") {
      list = list.filter((p) => p.price >= 5000 && p.price <= 15000);
    } else if (priceRange === "above-15000") {
      list = list.filter((p) => p.price > 15000);
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      list.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
    }

    return list;
  }, [
    baseProducts,
    selectedCategories,
    selectedFabrics,
    selectedOccasions,
    selectedSizes,
    selectedColour,
    priceRange,
    sortBy,
  ]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const toggleVal = (
    val: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedFabrics([]);
    setSelectedOccasions([]);
    setSelectedSizes([]);
    setSelectedColour("");
    setPriceRange("all");
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedFabrics.length +
    selectedOccasions.length +
    selectedSizes.length +
    (selectedColour ? 1 : 0) +
    (priceRange !== "all" ? 1 : 0);

  const filterBody = (
    <>
      <div className={styles.filterGroup}>
        <h3 className={styles.filterHeading}>Category</h3>
        <div className={styles.chipList}>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.chip} ${
                selectedCategories.includes(cat) ? styles.chipActive : ""
              }`}
              onClick={() =>
                toggleVal(cat, selectedCategories, setSelectedCategories)
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterHeading}>Fabric</h3>
        <div className={styles.chipList}>
          {ALL_FABRICS.map((fab) => (
            <button
              key={fab}
              type="button"
              className={`${styles.chip} ${
                selectedFabrics.includes(fab) ? styles.chipActive : ""
              }`}
              onClick={() => toggleVal(fab, selectedFabrics, setSelectedFabrics)}
            >
              {fab}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterHeading}>Size</h3>
        <div className={styles.chipList}>
          {ALL_SIZES.map((sz) => (
            <button
              key={sz}
              type="button"
              className={`${styles.chip} ${
                selectedSizes.includes(sz) ? styles.chipActive : ""
              }`}
              onClick={() => toggleVal(sz, selectedSizes, setSelectedSizes)}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterHeading}>Colour</h3>
        <div className={styles.chipList}>
          {availableColours.map((col) => (
            <button
              key={col.name}
              type="button"
              className={`${styles.chip} ${
                selectedColour === col.name ? styles.chipActive : ""
              }`}
              onClick={() =>
                setSelectedColour(selectedColour === col.name ? "" : col.name)
              }
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: col.hex,
                  border: "1px solid rgba(0,0,0,0.2)",
                }}
              />
              {col.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterHeading}>Occasion</h3>
        <div className={styles.chipList}>
          {ALL_OCCASIONS.map((occ) => (
            <button
              key={occ}
              type="button"
              className={`${styles.chip} ${
                selectedOccasions.includes(occ) ? styles.chipActive : ""
              }`}
              onClick={() =>
                toggleVal(occ, selectedOccasions, setSelectedOccasions)
              }
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup} style={{ borderBottom: "none" }}>
        <h3 className={styles.filterHeading}>Price Range</h3>
        <div className={styles.chipList}>
          {PRICE_RANGES.map((range) => (
            <button
              key={range.id}
              type="button"
              className={`${styles.chip} ${
                priceRange === range.id ? styles.chipActive : ""
              }`}
              onClick={() => setPriceRange(range.id)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className={styles.page}>
      {/* Collection Hero Banner */}
      <section className={`${styles.banner} jaali-pattern`}>
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "rgba(251,247,241,0.68)" }}>
            <Link href="/">Home</Link> / <span>{title}</span>
          </nav>
          <h1 className={styles.bannerTitle}>{title}</h1>
          <p className={styles.bannerDesc}>{subtitle}</p>
        </div>
      </section>

      <div className="container">
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <button
              type="button"
              className={styles.mobileFilterBtn}
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={15} />
              Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
            </button>

            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              Showing <strong>{visibleProducts.length}</strong> of{" "}
              <strong>{filteredProducts.length}</strong> silhouettes
            </span>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                style={{
                  fontSize: 12,
                  color: "var(--maroon)",
                  textDecoration: "underline",
                }}
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className={styles.toolbarRight}>
            <label htmlFor="collection-sort" className="sr-only">
              Sort products
            </label>
            <select
              id="collection-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.select}
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            <div className={styles.viewToggle} role="group" aria-label="View mode">
              <button
                type="button"
                className={`${styles.viewBtn} ${
                  viewMode === "grid" ? styles.viewBtnActive : ""
                }`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                type="button"
                className={`${styles.viewBtn} ${
                  viewMode === "list" ? styles.viewBtnActive : ""
                }`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar + Product Listing */}
        <div className={styles.layout}>
          <aside className={styles.sidebar} aria-label="Product Filters">
            {filterBody}
          </aside>

          <div>
            {filteredProducts.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "64px 20px",
                  border: "1px dashed var(--border-ink)",
                  borderRadius: 20,
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 30,
                    fontWeight: 600,
                  }}
                >
                  No silhouettes matched your filters
                </h2>
                <p style={{ color: "var(--muted)", marginTop: 8 }}>
                  Try clearing one or more fabric, occasion, or size selections.
                </p>
                <button
                  type="button"
                  className="btn btn-maroon"
                  style={{ marginTop: 20 }}
                  onClick={clearFilters}
                >
                  Reset Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className={styles.grid}>
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className={styles.list}>
                {visibleProducts.map((product) => (
                  <article key={product.id} className={styles.listCard}>
                    <Link href={`/products/${product.slug}`} className={styles.listImg}>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="200px"
                        style={{ objectFit: "cover", objectPosition: "top center" }}
                      />
                    </Link>
                    <div>
                      <span className="eyebrow" style={{ color: "var(--maroon)" }}>
                        {product.category} · {product.fabric} · {product.occasion}
                      </span>
                      <Link href={`/products/${product.slug}`}>
                        <h2
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 28,
                            fontWeight: 600,
                            marginTop: 4,
                          }}
                        >
                          {product.name}
                        </h2>
                      </Link>
                      <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 6 }}>
                        {product.shortDescription}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          gap: 14,
                          marginTop: 14,
                        }}
                      >
                        <strong style={{ fontSize: 18, color: "var(--maroon)" }}>
                          {formatINR(product.price)}
                        </strong>
                        <button
                          type="button"
                          className="btn btn-maroon"
                          style={{ padding: "10px 20px" }}
                          onClick={() =>
                            addToCart({
                              productId: product.id,
                              slug: product.slug,
                              name: product.name,
                              price: product.price,
                              image: product.images[0],
                              size: product.sizes[0] || "M",
                              colour: product.colours[0]?.name || "Signature",
                            })
                          }
                        >
                          Add to Bag
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-ink"
                          style={{ padding: "10px 18px" }}
                          onClick={() => openQuickView(product.slug)}
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {visibleCount < filteredProducts.length && (
              <div style={{ textAlign: "center", marginTop: 40 }}>
                <button
                  type="button"
                  className="btn btn-outline-ink"
                  onClick={() => setVisibleCount((c) => c + 8)}
                >
                  Load More Silhouettes ({filteredProducts.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet Filters */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            className={styles.sheetBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileFiltersOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Filter Products"
          >
            <motion.div
              className={styles.sheet}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.sheetHeader}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  Refine Edit
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>

              <div className={styles.sheetBody}>{filterBody}</div>

              <div className={styles.sheetFooter}>
                <button
                  type="button"
                  className="btn btn-outline-ink"
                  style={{ flex: 1 }}
                  onClick={clearFilters}
                >
                  Clear All
                </button>
                <button
                  type="button"
                  className="btn btn-maroon"
                  style={{ flex: 1 }}
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  Show {filteredProducts.length} Items
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
