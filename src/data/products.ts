import { BOUTIQUE_PHOTOS } from "@/lib/images";

export type ProductCategory =
  | "Sarees"
  | "Kurta Sets"
  | "Lehengas"
  | "Anarkalis"
  | "Western Dresses"
  | "Co-ord Sets"
  | "Accessories";

export type FabricType =
  | "Banarasi Silk"
  | "Chanderi"
  | "Cotton"
  | "Georgette"
  | "Organza"
  | "Velvet"
  | "Linen"
  | "Zari Brocade";

export type OccasionType = "Festive" | "Wedding" | "Cocktail" | "Everyday Luxe" | "Resort";

export interface ProductColour {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  collectionTags: string[];
  fabric: FabricType;
  occasion: OccasionType;
  price: number;
  compareAtPrice?: number;
  colours: ProductColour[];
  sizes: string[];
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  shortDescription: string;
  longDescription: string;
  careInstructions: string[];
  images: string[];
  spinImages?: string[];
  completeTheLookIds?: string[];
}

export interface CategoryTile {
  title: string;
  slug: string;
  subtitle: string;
  countLabel: string;
  image: string;
}

export interface FabricOrbItem {
  id: string;
  name: FabricType;
  tagline: string;
  origin: string;
  baseColor: string;
  sheenColor: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  weaveScale: number;
  href: string;
}

export const CATEGORIES: CategoryTile[] = [
  {
    title: "Sarees",
    slug: "sarees",
    subtitle: "Banarasi, Chanderi & Organza drapes",
    countLabel: "Handloom Heritage",
    image: BOUTIQUE_PHOTOS.saree1,
  },
  {
    title: "Kurta Sets",
    slug: "kurta-sets",
    subtitle: "Chikankari, Mulmul & Festive Silks",
    countLabel: "Effortless Grace",
    image: BOUTIQUE_PHOTOS.kurta1,
  },
  {
    title: "Lehengas",
    slug: "lehengas",
    subtitle: "Bandhani, Brocade & Sangeet Silhouettes",
    countLabel: "Bridal & Soirée",
    image: BOUTIQUE_PHOTOS.lehenga1,
  },
  {
    title: "Anarkalis",
    slug: "anarkalis",
    subtitle: "Sweeping panels in gossamer silk",
    countLabel: "Royal Movement",
    image: BOUTIQUE_PHOTOS.lehenga4,
  },
  {
    title: "Western Dresses",
    slug: "western-dresses",
    subtitle: "Sculpted satins & evening midis",
    countLabel: "Modern Muse",
    image: BOUTIQUE_PHOTOS.western1,
  },
  {
    title: "Co-ord Sets",
    slug: "co-ord-sets",
    subtitle: "Tailored linens & printed resort pairs",
    countLabel: "City to Coast",
    image: BOUTIQUE_PHOTOS.western2,
  },
  {
    title: "Accessories",
    slug: "accessories",
    subtitle: "Zardozi potlis, heirloom dupattas & jewels",
    countLabel: "Finishing Touches",
    image: BOUTIQUE_PHOTOS.jewel1,
  },
];

export const FABRIC_ORBS: FabricOrbItem[] = [
  {
    id: "banarasi-silk",
    name: "Banarasi Silk",
    tagline: "Molten katan silk woven with antique gold zari threads.",
    origin: "Varanasi Looms",
    baseColor: "#5E2230",
    sheenColor: "#E8C98A",
    roughness: 0.24,
    metalness: 0.18,
    clearcoat: 0.85,
    weaveScale: 16,
    href: "/collections/all?fabric=Banarasi+Silk",
  },
  {
    id: "chanderi",
    name: "Chanderi",
    tagline: "Featherlight silk-cotton shimmer with delicate transparency.",
    origin: "Madhya Pradesh",
    baseColor: "#E6D4BC",
    sheenColor: "#FBF7F1",
    roughness: 0.42,
    metalness: 0.08,
    clearcoat: 0.45,
    weaveScale: 24,
    href: "/collections/all?fabric=Chanderi",
  },
  {
    id: "cotton",
    name: "Cotton",
    tagline: "Breathable hand-spun mulmul crafted for warm Indian afternoons.",
    origin: "Lucknow & Jaipur",
    baseColor: "#F3E3DC",
    sheenColor: "#FFFFFF",
    roughness: 0.82,
    metalness: 0.0,
    clearcoat: 0.05,
    weaveScale: 30,
    href: "/collections/all?fabric=Cotton",
  },
  {
    id: "georgette",
    name: "Georgette",
    tagline: "Fluid crêpe-twist drape that cascades cleanly with every step.",
    origin: "Artisan Dye Houses",
    baseColor: "#C98F86",
    sheenColor: "#F5D7CE",
    roughness: 0.56,
    metalness: 0.04,
    clearcoat: 0.2,
    weaveScale: 28,
    href: "/collections/all?fabric=Georgette",
  },
  {
    id: "organza",
    name: "Organza",
    tagline: "Crisp, luminous silk mist holding architectural silhouettes.",
    origin: "Kora Weavers",
    baseColor: "#EFE6D8",
    sheenColor: "#E8C98A",
    roughness: 0.28,
    metalness: 0.12,
    clearcoat: 0.72,
    weaveScale: 34,
    href: "/collections/all?fabric=Organza",
  },
  {
    id: "velvet",
    name: "Velvet",
    tagline: "Plush micro-pile deep enough to drink in evening candlelight.",
    origin: "Winter Atelier",
    baseColor: "#2A0F18",
    sheenColor: "#C98F86",
    roughness: 0.72,
    metalness: 0.05,
    clearcoat: 0.12,
    weaveScale: 42,
    href: "/collections/all?fabric=Velvet",
  },
  {
    id: "linen",
    name: "Linen",
    tagline: "Sun-kissed flax weave with crisp structure and lived-in luxury.",
    origin: "Coastal Studio",
    baseColor: "#B79279",
    sheenColor: "#FBF7F1",
    roughness: 0.86,
    metalness: 0.0,
    clearcoat: 0.04,
    weaveScale: 20,
    href: "/collections/all?fabric=Linen",
  },
  {
    id: "zari-brocade",
    name: "Zari Brocade",
    tagline: "Rich jacquard motifs raised in metallic champagne and rose gold.",
    origin: "Heritage Guild",
    baseColor: "#8E6837",
    sheenColor: "#E8C98A",
    roughness: 0.3,
    metalness: 0.55,
    clearcoat: 0.78,
    weaveScale: 14,
    href: "/collections/all?fabric=Zari+Brocade",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "rera-01",
    name: "Ruhani Banarasi Silk Saree",
    slug: "ruhani-banarasi-silk-saree",
    category: "Sarees",
    collectionTags: ["ethnic", "festive-edit", "new-arrivals", "sarees"],
    fabric: "Banarasi Silk",
    occasion: "Wedding",
    price: 18499,
    compareAtPrice: 22999,
    colours: [
      { name: "Royal Maroon", hex: "#5E2230" },
      { name: "Champagne Gold", hex: "#C9A46A" },
    ],
    sizes: ["Free Size (5.5m + 0.9m Blouse)"],
    stock: 7,
    isNew: true,
    isBestSeller: true,
    shortDescription:
      "Handwoven pure katan silk saree detailed with kadwa shikargah motifs and an heirloom zari pallu.",
    longDescription:
      "Woven over eighteen days on a traditional pit loom in Varanasi, the Ruhani Banarasi Silk Saree pairs deep wine-maroon katan silk with muted antique gold zari. Finished with hand-knotted tassels along the pallu and paired with an unstitched brocade blouse piece.",
    careInstructions: [
      "Dry clean only with a trusted silk specialist.",
      "Wrap in pure unbleached muslin cloth away from direct sunlight.",
      "Refold every three months to preserve the zari weave.",
    ],
    images: [
      BOUTIQUE_PHOTOS.saree1,
      BOUTIQUE_PHOTOS.saree2,
      BOUTIQUE_PHOTOS.saree4,
    ],
    spinImages: [
      BOUTIQUE_PHOTOS.saree1,
      BOUTIQUE_PHOTOS.saree2,
      BOUTIQUE_PHOTOS.saree4,
      BOUTIQUE_PHOTOS.saree3,
    ],
    completeTheLookIds: ["rera-14", "rera-15"],
  },
  {
    id: "rera-02",
    name: "Noor Chikankari Kurta Set",
    slug: "noor-chikankari-kurta-set",
    category: "Kurta Sets",
    collectionTags: ["ethnic", "new-arrivals", "kurta-sets"],
    fabric: "Cotton",
    occasion: "Everyday Luxe",
    price: 5499,
    compareAtPrice: 6899,
    colours: [
      { name: "Ivory Cream", hex: "#FBF7F1" },
      { name: "Blush Rose", hex: "#E5C5BE" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 14,
    isNew: true,
    isBestSeller: true,
    shortDescription:
      "Three-piece Lucknowi hand-embroidered mulmul kurta with tonal mukaish work and scalloped organza dupatta.",
    longDescription:
      "Crafted from feather-soft combed cotton mulmul, the Noor Kurta Set celebrates authentic shadow-work Chikankari done by women artisans in Lucknow. Paired with wide-leg palazzo trousers and an airy organza dupatta edged in crochet lace.",
    careInstructions: [
      "Gentle hand wash separately in cold water with mild liquid detergent.",
      "Dry flat in shade; do not wring.",
      "Steam iron on low heat from the reverse side.",
    ],
    images: [BOUTIQUE_PHOTOS.kurta1, BOUTIQUE_PHOTOS.kurta2],
    completeTheLookIds: ["rera-15", "rera-16"],
  },
  {
    id: "rera-03",
    name: "Gulabo Bandhani Lehenga",
    slug: "gulabo-bandhani-lehenga",
    category: "Lehengas",
    collectionTags: ["ethnic", "festive-edit", "lehengas"],
    fabric: "Georgette",
    occasion: "Wedding",
    price: 24999,
    compareAtPrice: 28999,
    colours: [
      { name: "Sindoori Rose", hex: "#9E3B42" },
      { name: "Aubergine Wine", hex: "#3F141F" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 4,
    isNew: true,
    isBestSeller: true,
    shortDescription:
      "Hand-tied Kutchi Bandhani georgette skirt featuring 24 kalis, gotta-patti border, and embellished choli.",
    longDescription:
      "Designed for pheras and sangeet nights that spin past midnight, the Gulabo Lehenga brings together thousands of hand-knotted Bandhani dots on pure viscose georgette. Includes a raw-silk sweetheart blouse and a double-bordered net dupatta.",
    careInstructions: [
      "Strict professional dry clean only.",
      "Store padded in a breathable garment bag.",
    ],
    images: [BOUTIQUE_PHOTOS.lehenga1, BOUTIQUE_PHOTOS.lehenga3],
    spinImages: [
      BOUTIQUE_PHOTOS.lehenga1,
      BOUTIQUE_PHOTOS.lehenga3,
      BOUTIQUE_PHOTOS.lehenga2,
      BOUTIQUE_PHOTOS.lehenga1,
    ],
    completeTheLookIds: ["rera-14", "rera-15"],
  },
  {
    id: "rera-04",
    name: "Ivory Organza Anarkali",
    slug: "ivory-organza-anarkali",
    category: "Anarkalis",
    collectionTags: ["ethnic", "festive-edit", "new-arrivals", "anarkalis"],
    fabric: "Organza",
    occasion: "Festive",
    price: 14299,
    compareAtPrice: 16999,
    colours: [
      { name: "Warm Ivory", hex: "#FBF7F1" },
      { name: "Champagne Mist", hex: "#E8D5B7" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 9,
    isNew: true,
    shortDescription:
      "Floor-sweeping 16-panel silk organza Anarkali hand-painted with delicate floral motifs and zari dori.",
    longDescription:
      "Cut to float like mist, this ethereal Anarkali pairs a fitted bodice highlighted with subtle gold zardozi with sixteen luminous organza panels lined in pure crepe. Complete with churidar bottoms and a scalloped dupatta.",
    careInstructions: [
      "Dry clean only.",
      "Steam gently from a safe distance; never press hot iron directly on organza.",
    ],
    images: [BOUTIQUE_PHOTOS.lehenga4, BOUTIQUE_PHOTOS.ethnicPair],
    completeTheLookIds: ["rera-14", "rera-16"],
  },
  {
    id: "rera-05",
    name: "Sienna Linen Co-ord Set",
    slug: "sienna-linen-coord-set",
    category: "Co-ord Sets",
    collectionTags: ["western", "new-arrivals", "co-ord-sets"],
    fabric: "Linen",
    occasion: "Resort",
    price: 4299,
    compareAtPrice: 5199,
    colours: [
      { name: "Terracotta Sienna", hex: "#A85D4E" },
      { name: "Sandstone", hex: "#D9C3B0" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 18,
    isNew: true,
    isBestSeller: true,
    shortDescription:
      "Relaxed notched-lapel linen vest paired with pleated high-waist tailored trousers.",
    longDescription:
      "Tailored from European-grade breathable flax linen washed for supple drape, the Sienna Co-ord Set transitions seamlessly from sunlit gallery brunches to rooftop evenings. Features horn buttons and deep side pockets.",
    careInstructions: [
      "Machine wash cold on delicate cycle or dry clean.",
      "Line dry and steam while slightly damp.",
    ],
    images: [BOUTIQUE_PHOTOS.western2, BOUTIQUE_PHOTOS.western5],
    completeTheLookIds: ["rera-15", "rera-16"],
  },
  {
    id: "rera-06",
    name: "Meher Chanderi Tissue Saree",
    slug: "meher-chanderi-tissue-saree",
    category: "Sarees",
    collectionTags: ["ethnic", "festive-edit", "sarees"],
    fabric: "Chanderi",
    occasion: "Festive",
    price: 11899,
    compareAtPrice: 13999,
    colours: [
      { name: "Antique Rose", hex: "#C98F86" },
      { name: "Muted Gold", hex: "#C9A46A" },
    ],
    sizes: ["Free Size (5.5m + 0.9m Blouse)"],
    stock: 11,
    isBestSeller: true,
    shortDescription:
      "Luminous handwoven Chanderi tissue drape scattered with tiny coin-butis and scalloped zari edge.",
    longDescription:
      "Weightless yet glowing under evening light, the Meher Chanderi Tissue Saree captures rose-gold reflections at every pleat. Comes with a raw-silk tonal blouse piece.",
    careInstructions: ["Dry clean only.", "Store folded in butter paper or muslin."],
    images: [BOUTIQUE_PHOTOS.saree3, BOUTIQUE_PHOTOS.saree4],
    completeTheLookIds: ["rera-14", "rera-15"],
  },
  {
    id: "rera-07",
    name: "Zoya Velvet Zardozi Kurta Set",
    slug: "zoya-velvet-zardozi-kurta-set",
    category: "Kurta Sets",
    collectionTags: ["ethnic", "festive-edit", "kurta-sets"],
    fabric: "Velvet",
    occasion: "Wedding",
    price: 13499,
    compareAtPrice: 15999,
    colours: [
      { name: "Deep Aubergine", hex: "#2A0F18" },
      { name: "Emerald Noir", hex: "#14261E" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 6,
    isBestSeller: true,
    shortDescription:
      "Plush silk-blend micro-velvet kurta encrusted with dabka neckline embroidery and organza dupatta.",
    longDescription:
      "Made for winter weddings and candlelit receptions, Zoya features intricate floral zardozi at the neckline and cuffs, balanced by straight silk trousers and a contrasting gilded organza dupatta.",
    careInstructions: [
      "Dry clean only.",
      "Do not iron velvet directly; steam lightly from inside.",
    ],
    images: [BOUTIQUE_PHOTOS.ethnicPair, BOUTIQUE_PHOTOS.kurta2],
    completeTheLookIds: ["rera-14", "rera-15"],
  },
  {
    id: "rera-08",
    name: "Aanya Satin Draped Midi Dress",
    slug: "aanya-satin-draped-midi-dress",
    category: "Western Dresses",
    collectionTags: ["western", "new-arrivals", "western-dresses"],
    fabric: "Georgette",
    occasion: "Cocktail",
    price: 6799,
    compareAtPrice: 7999,
    colours: [
      { name: "Wine Berry", hex: "#5E2230" },
      { name: "Midnight Noir", hex: "#140A0E" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 12,
    isNew: true,
    shortDescription:
      "Bias-cut fluid cowl-neck midi dress with sculpted waist gathers and side slit.",
    longDescription:
      "Cut on the true bias for effortless fluidity, the Aanya Midi hugs and skims with quiet confidence. Finished with delicate French seams and an adjustable back tie.",
    careInstructions: ["Dry clean recommended or gentle cold hand wash."],
    images: [BOUTIQUE_PHOTOS.western1, BOUTIQUE_PHOTOS.western3],
    completeTheLookIds: ["rera-15", "rera-16"],
  },
  {
    id: "rera-09",
    name: "Tara Block-Print Mulmul Kurta Set",
    slug: "tara-block-print-mulmul-kurta-set",
    category: "Kurta Sets",
    collectionTags: ["ethnic", "kurta-sets"],
    fabric: "Cotton",
    occasion: "Everyday Luxe",
    price: 3499,
    compareAtPrice: 4199,
    colours: [
      { name: "Blush Terracotta", hex: "#C98F86" },
      { name: "Ivory Indigo", hex: "#38465E" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 22,
    shortDescription:
      "Jaipuri Sanganeri hand-block printed A-line kurta with gota lace trim and cotton dupatta.",
    longDescription:
      "Stamped by hand with carved teakwood blocks in Bagru, the Tara Kurta Set offers everyday elegance that stays cool through Indian summers.",
    careInstructions: ["Gentle cold hand wash separately; dry in shade."],
    images: [BOUTIQUE_PHOTOS.kurta2, BOUTIQUE_PHOTOS.kurta1],
    completeTheLookIds: ["rera-16"],
  },
  {
    id: "rera-10",
    name: "Ira Zari Brocade Lehenga",
    slug: "ira-zari-brocade-lehenga",
    category: "Lehengas",
    collectionTags: ["ethnic", "festive-edit", "lehengas"],
    fabric: "Zari Brocade",
    occasion: "Wedding",
    price: 21999,
    compareAtPrice: 25499,
    colours: [
      { name: "Champagne Antique", hex: "#C9A46A" },
      { name: "Rose Maroon", hex: "#5E2230" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 5,
    shortDescription:
      "Sculpted Banarasi brocade skirt woven with architectural floral trellises and velvet-edged blouse.",
    longDescription:
      "Architectural and regal without excessive weight, the Ira Brocade Lehenga is crafted from silk-zari jacquard with a structured can-can layer that can be custom detached.",
    careInstructions: ["Dry clean only."],
    images: [BOUTIQUE_PHOTOS.lehenga2, BOUTIQUE_PHOTOS.lehenga3],
    completeTheLookIds: ["rera-14", "rera-15"],
  },
  {
    id: "rera-11",
    name: "Kaira Pleated Georgette Anarkali",
    slug: "kaira-pleated-georgette-anarkali",
    category: "Anarkalis",
    collectionTags: ["ethnic", "anarkalis"],
    fabric: "Georgette",
    occasion: "Festive",
    price: 9899,
    compareAtPrice: 11999,
    colours: [
      { name: "Dusty Rose", hex: "#C98F86" },
      { name: "Mulberry", hex: "#4D1B2A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 10,
    shortDescription:
      "Micro-pleated pure georgette Anarkali featuring mirror-work yoke and ruffled organza drape.",
    longDescription:
      "Designed for twirl-worthy sangeet evenings and Diwali cards nights, Kaira pairs fine sunray pleats with delicate hand-tacked mirror embroidery.",
    careInstructions: ["Dry clean only."],
    images: [BOUTIQUE_PHOTOS.lehenga3, BOUTIQUE_PHOTOS.lehenga4],
    completeTheLookIds: ["rera-14", "rera-15"],
  },
  {
    id: "rera-12",
    name: "Vanya Sculpted Corset Maxi Dress",
    slug: "vanya-sculpted-corset-maxi-dress",
    category: "Western Dresses",
    collectionTags: ["western", "festive-edit", "western-dresses"],
    fabric: "Organza",
    occasion: "Cocktail",
    price: 8499,
    compareAtPrice: 9999,
    colours: [
      { name: "Espresso Noir", hex: "#1C1014" },
      { name: "Champagne Ivory", hex: "#ECE0CE" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 8,
    isBestSeller: true,
    shortDescription:
      "Boned structured bodice with sheer tiered silk organza skirt and detachable cape sleeves.",
    longDescription:
      "Where couture structure meets gossamer movement. Vanya contours the torso cleanly while cascading into airy organza tiers perfect for cocktail receptions.",
    careInstructions: ["Dry clean only."],
    images: [BOUTIQUE_PHOTOS.western3, BOUTIQUE_PHOTOS.western4],
    completeTheLookIds: ["rera-14", "rera-15"],
  },
  {
    id: "rera-13",
    name: "Nysa Chanderi Shirt & Palazzo Co-ord",
    slug: "nysa-chanderi-shirt-palazzo-coord",
    category: "Co-ord Sets",
    collectionTags: ["western", "ethnic", "co-ord-sets"],
    fabric: "Chanderi",
    occasion: "Resort",
    price: 4999,
    compareAtPrice: 5899,
    colours: [
      { name: "Alabaster Gold", hex: "#EFE4D2" },
      { name: "Rosewood", hex: "#8B4A4A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 15,
    shortDescription:
      "Indo-western relaxed Chanderi silk-cotton shirt paired with fluid wide-leg zari-striped trousers.",
    longDescription:
      "Effortless heritage tailoring: wear the shirt knotted over denim or styled as a monochrome set with statement jhumkas.",
    careInstructions: ["Dry clean or gentle cold wash."],
    images: [BOUTIQUE_PHOTOS.western4, BOUTIQUE_PHOTOS.western2],
    completeTheLookIds: ["rera-15", "rera-16"],
  },
  {
    id: "rera-14",
    name: "Riva Zardozi Silk Potli",
    slug: "riva-zardozi-silk-potli",
    category: "Accessories",
    collectionTags: ["ethnic", "festive-edit", "accessories"],
    fabric: "Velvet",
    occasion: "Wedding",
    price: 2499,
    compareAtPrice: 2999,
    colours: [
      { name: "Maroon Gold", hex: "#5E2230" },
      { name: "Champagne Pearl", hex: "#D6B77E" },
    ],
    sizes: ["One Size"],
    stock: 25,
    isBestSeller: true,
    shortDescription:
      "Hand-embroidered silk velvet potli bag with freshwater-style pearl handle and braided dori.",
    longDescription:
      "Spacious enough for your smartphone, lipstick, and essentials while adding antique heirloom charm to any saree or lehenga.",
    careInstructions: ["Spot clean gently; store in dust pouch."],
    images: [BOUTIQUE_PHOTOS.jewel3, BOUTIQUE_PHOTOS.jewel2],
  },
  {
    id: "rera-15",
    name: "Aarohi Kundan & Pearl Chandbalis",
    slug: "aarohi-kundan-pearl-chandbalis",
    category: "Accessories",
    collectionTags: ["ethnic", "festive-edit", "accessories"],
    fabric: "Zari Brocade",
    occasion: "Wedding",
    price: 1899,
    compareAtPrice: 2299,
    colours: [{ name: "Antique Gold", hex: "#C9A46A" }],
    sizes: ["One Size"],
    stock: 30,
    shortDescription:
      "Featherlight 22k gold-plated crescent chandbalis studded with uncut stones and drop pearls.",
    longDescription:
      "Hand-set by Jaipur karigars for comfortable all-night wear without pulling on the earlobes.",
    careInstructions: ["Keep away from perfume and moisture; store in zip pouch."],
    images: [BOUTIQUE_PHOTOS.jewel1, BOUTIQUE_PHOTOS.jewel2],
  },
  {
    id: "rera-16",
    name: "Sitara Handwoven Organza Dupatta",
    slug: "sitara-handwoven-organza-dupatta",
    category: "Accessories",
    collectionTags: ["ethnic", "new-arrivals", "accessories"],
    fabric: "Organza",
    occasion: "Festive",
    price: 1499,
    compareAtPrice: 1899,
    colours: [
      { name: "Ivory Zari", hex: "#FBF7F1" },
      { name: "Blush Gold", hex: "#E8C3B9" },
    ],
    sizes: ["2.5 Meters"],
    stock: 20,
    shortDescription:
      "Sheer pure silk organza dupatta finished with hand-scalloped kinari border and kiran tassels.",
    longDescription:
      "An instant heirloom layer that elevates minimal kurta sets, sarees, or tailored evening separates.",
    careInstructions: ["Dry clean only."],
    images: [BOUTIQUE_PHOTOS.dupatta, BOUTIQUE_PHOTOS.saree2],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCollection(slug: string): Product[] {
  if (!slug || slug === "all") return PRODUCTS;
  return PRODUCTS.filter(
    (p) =>
      p.collectionTags.includes(slug) ||
      p.category.toLowerCase().replace(/\s+/g, "-") === slug
  );
}
