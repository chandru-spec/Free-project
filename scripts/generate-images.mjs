import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");

const PLACEHOLDERS = [
  // Hero & Lookbook & Brand editorial slots
  { file: "hero/hero-arch-look.svg", title: "RUHANI BANARASI", subtitle: "Festive Edit 2026", bg1: "#2A0F18", bg2: "#5E2230", accent: "#E8C98A" },
  { file: "story/atelier-story.svg", title: "THE RERA ATELIER", subtitle: "Kala Ghoda Â· Heritage Craft", bg1: "#3F141F", bg2: "#140A0E", accent: "#C9A46A" },
  { file: "split/ethnic-edit.svg", title: "ETHNIC HERITAGE", subtitle: "Sarees Â· Lehengas Â· Anarkalis", bg1: "#5E2230", bg2: "#2A0F18", accent: "#E8C98A" },
  { file: "split/western-edit.svg", title: "WESTERN MUSE", subtitle: "Sculpted Midis Â· Linen Co-ords", bg1: "#2B1D1C", bg2: "#7D5048", accent: "#F3E3DC" },
  { file: "instagram/ig-1.svg", title: "FESTIVE DRAPES", subtitle: "@reraboutique.in", bg1: "#5E2230", bg2: "#2A0F18", accent: "#E8C98A" },
  { file: "instagram/ig-2.svg", title: "CHIKANKARI DETAIL", subtitle: "@reraboutique.in", bg1: "#3D2B27", bg2: "#7D6E68", accent: "#FBF7F1" },
  { file: "instagram/ig-3.svg", title: "ZARI LOOMS", subtitle: "@reraboutique.in", bg1: "#2A0F18", bg2: "#8E6837", accent: "#E8C98A" },
  { file: "instagram/ig-4.svg", title: "RESORT CO-ORDS", subtitle: "@reraboutique.in", bg1: "#7B4A3E", bg2: "#C98F86", accent: "#FBF7F1" },
  { file: "instagram/ig-5.svg", title: "BRIDAL COUTURE", subtitle: "@reraboutique.in", bg1: "#3F141F", bg2: "#5E2230", accent: "#E8C98A" },
  { file: "instagram/ig-6.svg", title: "POTLI & JEWELS", subtitle: "@reraboutique.in", bg1: "#140A0E", bg2: "#3F141F", accent: "#C9A46A" },

  // Categories
  { file: "categories/sarees.svg", title: "SAREES", subtitle: "Banarasi & Chanderi", bg1: "#5E2230", bg2: "#2A0F18", accent: "#E8C98A" },
  { file: "categories/kurta-sets.svg", title: "KURTA SETS", subtitle: "Chikankari & Mulmul", bg1: "#8E5E56", bg2: "#5E2230", accent: "#FBF7F1" },
  { file: "categories/lehengas.svg", title: "LEHENGAS", subtitle: "Bandhani & Brocade", bg1: "#3F141F", bg2: "#140A0E", accent: "#E8C98A" },
  { file: "categories/anarkalis.svg", title: "ANARKALIS", subtitle: "Organza & Georgette", bg1: "#6F4E42", bg2: "#3B2420", accent: "#F3E3DC" },
  { file: "categories/western-dresses.svg", title: "WESTERN DRESSES", subtitle: "Bias Satin & Midis", bg1: "#2A0F18", bg2: "#522531", accent: "#E8C98A" },
  { file: "categories/co-ord-sets.svg", title: "CO-ORD SETS", subtitle: "European Linen", bg1: "#9B6A58", bg2: "#5A382E", accent: "#FBF7F1" },
  { file: "categories/accessories.svg", title: "ACCESSORIES", subtitle: "Potlis & Chandbalis", bg1: "#1E1014", bg2: "#5E2230", accent: "#C9A46A" },

  // Products (16 products + alternate views)
  { file: "products/ruhani-saree-1.svg", title: "RUHANI SAREE", subtitle: "Banarasi Katan Silk", bg1: "#5E2230", bg2: "#2A0F18", accent: "#E8C98A" },
  { file: "products/ruhani-saree-2.svg", title: "RUHANI PALLU", subtitle: "Antique Zari Detail", bg1: "#3F141F", bg2: "#8E6837", accent: "#FBF7F1" },
  { file: "products/ruhani-saree-3.svg", title: "RUHANI BLOUSE", subtitle: "Brocade Weave", bg1: "#2A0F18", bg2: "#5E2230", accent: "#C9A46A" },
  { file: "products/noor-kurta-1.svg", title: "NOOR KURTA SET", subtitle: "Lucknowi Chikankari", bg1: "#D9C3B0", bg2: "#9D7E70", accent: "#2B1D1C" },
  { file: "products/noor-kurta-2.svg", title: "NOOR DUPATTA", subtitle: "Scalloped Organza", bg1: "#C98F86", bg2: "#7D5550", accent: "#FBF7F1" },
  { file: "products/gulabo-lehenga-1.svg", title: "GULABO LEHENGA", subtitle: "Kutchi Bandhani", bg1: "#8D2B38", bg2: "#3F141F", accent: "#E8C98A" },
  { file: "products/gulabo-lehenga-2.svg", title: "GULABO CHOLI", subtitle: "Gotta Patti Border", bg1: "#5E2230", bg2: "#140A0E", accent: "#C9A46A" },
  { file: "products/ivory-anarkali-1.svg", title: "IVORY ANARKALI", subtitle: "16-Panel Organza", bg1: "#C8B39B", bg2: "#8C725D", accent: "#2B1D1C" },
  { file: "products/ivory-anarkali-2.svg", title: "IVORY DETAIL", subtitle: "Zardozi Yoke", bg1: "#A88E76", bg2: "#5E483B", accent: "#FBF7F1" },
  { file: "products/sienna-coord-1.svg", title: "SIENNA CO-ORD", subtitle: "Flax Linen Tailoring", bg1: "#A85D4E", bg2: "#5E2D26", accent: "#FBF7F1" },
  { file: "products/sienna-coord-2.svg", title: "SIENNA TROUSER", subtitle: "Resort Silhouette", bg1: "#8C4D40", bg2: "#3D1F1A", accent: "#E8C98A" },
  { file: "products/meher-saree-1.svg", title: "MEHER SAREE", subtitle: "Chanderi Tissue", bg1: "#B67C74", bg2: "#6E3F3B", accent: "#FBF7F1" },
  { file: "products/meher-saree-2.svg", title: "MEHER BORDER", subtitle: "Rose Gold Zari", bg1: "#8E5E56", bg2: "#4A2B28", accent: "#E8C98A" },
  { file: "products/zoya-kurta-1.svg", title: "ZOYA VELVET SET", subtitle: "Dabka Embroidery", bg1: "#2A0F18", bg2: "#140A0E", accent: "#E8C98A" },
  { file: "products/zoya-kurta-2.svg", title: "ZOYA SLEEVE", subtitle: "Micro-Velvet Plush", bg1: "#3F141F", bg2: "#1F0A10", accent: "#C9A46A" },
  { file: "products/aanya-dress-1.svg", title: "AANYA MIDI DRESS", subtitle: "Bias-Cut Wine Satin", bg1: "#5E2230", bg2: "#260B12", accent: "#E8C98A" },
  { file: "products/aanya-dress-2.svg", title: "AANYA COWL BACK", subtitle: "Cocktail Silhouette", bg1: "#38121B", bg2: "#140A0E", accent: "#F3E3DC" },
  { file: "products/tara-kurta-1.svg", title: "TARA KURTA SET", subtitle: "Jaipuri Block Print", bg1: "#C98F86", bg2: "#8E5A53", accent: "#FBF7F1" },
  { file: "products/tara-kurta-2.svg", title: "TARA MULMUL", subtitle: "Hand-Carved Teak Stamp", bg1: "#A66E65", bg2: "#5E3834", accent: "#FBF7F1" },
  { file: "products/ira-lehenga-1.svg", title: "IRA BROCADE", subtitle: "Zari Jacquard", bg1: "#8E6837", bg2: "#4A3216", accent: "#FBF7F1" },
  { file: "products/ira-lehenga-2.svg", title: "IRA VELVET TRIM", subtitle: "Sangeet Couture", bg1: "#5E2230", bg2: "#8E6837", accent: "#E8C98A" },
  { file: "products/kaira-anarkali-1.svg", title: "KAIRA ANARKALI", subtitle: "Sunray Georgette", bg1: "#9E5E59", bg2: "#542B2A", accent: "#FBF7F1" },
  { file: "products/kaira-anarkali-2.svg", title: "KAIRA MIRROR YOKE", subtitle: "Hand-Tacked Shisha", bg1: "#753E3B", bg2: "#381918", accent: "#E8C98A" },
  { file: "products/vanya-dress-1.svg", title: "VANYA MAXI DRESS", subtitle: "Sculpted Organza", bg1: "#1C1014", bg2: "#4A2A35", accent: "#E8C98A" },
  { file: "products/vanya-dress-2.svg", title: "VANYA CORSET", subtitle: "Tiered Evening Gown", bg1: "#2A0F18", bg2: "#140A0E", accent: "#C9A46A" },
  { file: "products/nysa-coord-1.svg", title: "NYSA CO-ORD", subtitle: "Chanderi Zari Stripe", bg1: "#BDA48B", bg2: "#7A624E", accent: "#FBF7F1" },
  { file: "products/nysa-coord-2.svg", title: "NYSA PALAZZO", subtitle: "Indo-Western Ease", bg1: "#8C4D40", bg2: "#4A2721", accent: "#FBF7F1" },
  { file: "products/riva-potli-1.svg", title: "RIVA SILK POTLI", subtitle: "Zardozi & Pearl", bg1: "#5E2230", bg2: "#220B11", accent: "#E8C98A" },
  { file: "products/riva-potli-2.svg", title: "RIVA DORI DETAIL", subtitle: "Velvet Clutch", bg1: "#3F141F", bg2: "#7D592B", accent: "#FBF7F1" },
  { file: "products/aarohi-earrings-1.svg", title: "AAROHI CHANDBALIS", subtitle: "Kundan & Pearl", bg1: "#2A0F18", bg2: "#705128", accent: "#E8C98A" },
  { file: "products/aarohi-earrings-2.svg", title: "AAROHI GOLDWORK", subtitle: "Jaipur Karigari", bg1: "#140A0E", bg2: "#5E2230", accent: "#C9A46A" },
  { file: "products/sitara-dupatta-1.svg", title: "SITARA DUPATTA", subtitle: "Pure Silk Organza", bg1: "#D8C2AE", bg2: "#967A68", accent: "#2B1D1C" },
  { file: "products/sitara-dupatta-2.svg", title: "SITARA KINARI", subtitle: "Scalloped Lace Edge", bg1: "#C98F86", bg2: "#825550", accent: "#FBF7F1" },
];

function createArtworkSvg({ title, subtitle, bg1, bg2, accent }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1066" width="800" height="1066">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg1}" />
      <stop offset="100%" stop-color="${bg2}" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="45%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.22" />
      <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
    <pattern id="jaali" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M24 0 L48 24 L24 48 L0 24 Z" fill="none" stroke="${accent}" stroke-opacity="0.09" stroke-width="1"/>
      <circle cx="24" cy="24" r="3" fill="none" stroke="${accent}" stroke-opacity="0.09" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="1066" fill="url(#bg)"/>
  <rect width="800" height="1066" fill="url(#jaali)"/>
  <rect width="800" height="1066" fill="url(#glow)"/>
  
  <!-- Outer delicate hairline frame -->
  <rect x="34" y="34" width="732" height="998" fill="none" stroke="${accent}" stroke-opacity="0.28" stroke-width="1.2"/>
  
  <!-- Jharokha arch silhouette -->
  <path d="M 160 890 L 160 400 C 160 280, 270 235, 400 155 C 530 235, 640 280, 640 400 L 640 890 Z"
        fill="none" stroke="${accent}" stroke-opacity="0.45" stroke-width="1.8"/>
  <path d="M 185 865 L 185 408 C 185 304, 285 262, 400 190 C 515 262, 615 304, 615 408 L 615 865 Z"
        fill="${accent}" fill-opacity="0.04" stroke="${accent}" stroke-opacity="0.22" stroke-width="1"/>
  
  <!-- Bindu dot above arch -->
  <circle cx="400" cy="126" r="6" fill="${accent}" fill-opacity="0.85"/>

  <!-- Silk wave ornament inside arch -->
  <path d="M 210 580 Q 310 510 400 565 T 590 545" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="1.5"/>
  <path d="M 210 610 Q 320 545 415 595 T 590 580" fill="none" stroke="${accent}" stroke-opacity="0.2" stroke-width="1"/>

  <!-- Typography -->
  <text x="400" y="455" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="18" letter-spacing="8" fill="${accent}" fill-opacity="0.78">RERA BOUTIQUE</text>
  <text x="400" y="695" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-weight="600" letter-spacing="4" fill="${accent}">${title}</text>
  <text x="400" y="742" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="18" letter-spacing="3" fill="${accent}" fill-opacity="0.82">${subtitle.toUpperCase()}</text>
  <text x="400" y="965" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="13" letter-spacing="4" fill="${accent}" fill-opacity="0.48">PLACEHOLDER ARTWORK Â· REPLACE WITH STUDIO PHOTO</text>
</svg>`;
}

for (const item of PLACEHOLDERS) {
  const fullPath = path.join(PUBLIC_IMAGES, item.file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, createArtworkSvg(item), "utf8");
  }
}

console.log(`[RERA] Verified ${PLACEHOLDERS.length} editorial placeholder artworks in public/images.`);
