import type { Metadata } from "next";
import { CollectionClient } from "@/components/collection/CollectionClient";

const COLLECTION_META: Record<string, { title: string; subtitle: string }> = {
  all: {
    title: "The Complete RERA Wardrobe",
    subtitle:
      "Browse every handloom saree, Chikankari kurta, bridal lehenga, and modern western silhouette.",
  },
  "new-arrivals": {
    title: "New Arrivals",
    subtitle:
      "Fresh off the looms and tailoring tables — limited-edition releases for the 2026 season.",
  },
  ethnic: {
    title: "Ethnic Heritage",
    subtitle:
      "Handwoven Banarasi silks, Kutchi Bandhani, Lucknowi Chikankari, and luminous organzas.",
  },
  western: {
    title: "Western Muse",
    subtitle:
      "Bias-cut evening midis, structured corset dresses, and European flax linen co-ords.",
  },
  "festive-edit": {
    title: "The Festive Edit 2026",
    subtitle:
      "Heirloom silhouettes designed for sangeets, pheras, Diwali soirées, and winter receptions.",
  },
  sarees: {
    title: "Handloom Sarees",
    subtitle: "Pure katan Banarasi and luminous Chanderi tissue drapes with zari borders.",
  },
  "kurta-sets": {
    title: "Kurta Sets",
    subtitle: "Effortless three-piece ensembles in mulmul cotton, velvet zardozi, and block print.",
  },
  lehengas: {
    title: "Bridal & Festive Lehengas",
    subtitle: "Twenty-four-kali Bandhani flares and sculpted zari brocade skirts.",
  },
  anarkalis: {
    title: "Anarkalis",
    subtitle: "Floor-grazing organza and sunray-pleated georgette silhouettes.",
  },
  "western-dresses": {
    title: "Western Dresses",
    subtitle: "Fluid bias-cut satins and architectural evening gowns.",
  },
  "co-ord-sets": {
    title: "Co-ord Sets",
    subtitle: "Relaxed resort tailoring in washed linen and zari-striped Chanderi.",
  },
  accessories: {
    title: "Potlis, Dupattas & Jewels",
    subtitle: "Zardozi velvet potlis, kundan chandbalis, and scalloped silk organza dupattas.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = COLLECTION_META[slug] ?? COLLECTION_META.all;
  return {
    title: meta.title,
    description: meta.subtitle,
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ fabric?: string; category?: string }>;
}) {
  const { slug } = await params;
  const resolvedSearch = await searchParams;
  const meta = COLLECTION_META[slug] ?? {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    subtitle: "Curated ethnic and contemporary styles from RERA Boutique.",
  };

  return (
    <CollectionClient
      slug={slug}
      title={meta.title}
      subtitle={meta.subtitle}
      initialFabric={resolvedSearch.fabric ?? ""}
      initialCategory={resolvedSearch.category ?? ""}
    />
  );
}
