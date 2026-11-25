import type { MetadataRoute } from "next";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { SITE_CONFIG } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/collections/all",
    "/collections/new-arrivals",
    "/collections/ethnic",
    "/collections/western",
    "/collections/festive-edit",
    "/lookbook",
    "/about",
    "/contact",
    "/cart",
    "/wishlist",
    "/account",
    "/policies/shipping",
    "/policies/returns",
    "/policies/privacy",
    "/policies/terms",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${base}/collections/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${base}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
