# RERA Boutique — "Heritage in 3D"

Luxury Indian ethnic & western women's boutique built with **Next.js 15 (App Router)**, **TypeScript**, **React Three Fiber / Three.js**, **GSAP + ScrollTrigger**, **Lenis**, **Framer Motion**, and **Zustand**.

---

## Pre-Launch Replacement Checklist (Mandatory Before Going Live)

### 1. Business Details (`src/lib/site.ts`)
Replace all placeholder values in `SITE_CONFIG`:
- `url`: Replace `https://reraboutique.example` with your production domain
- `contact.phone`: Replace `+91 XXXXX XXXXX`
- `contact.whatsappNumber` & `whatsappDisplay`: Replace `919999999999` and `+91 XXXXX XXXXX`
- `contact.email`: Replace `atelier@reraboutique.example`
- `contact.addressLine1` & `addressLine2`: Verify studio address
- `contact.storeHours`: Confirm boutique hours
- `social.instagramHandle` & `instagramUrl`: Replace with live client handle

### 2. Sample Customer Reviews (`src/components/home/TestimonialsSection.tsx`)
- Currently displays **clearly marked sample copy** (`SAMPLE_REVIEWS`). Replace with verified customer testimonials and names prior to launch.

### 3. Demo Payment & Account UI
- `src/app/checkout/page.tsx`: Currently simulates checkout with a **Razorpay placeholder**. Integrate the official Razorpay SDK / server order creation API before taking real payments.
- `src/app/account/page.tsx`: Displays demo sign-in and sample order history (`SAMPLE_ORDERS`). Connect to your authentication and Prisma/PostgreSQL backend.
- `src/app/contact/page.tsx`: Replace the map placeholder box with your client's Google Maps embed `<iframe>` and wire the form submission to email/CRM.
- `src/components/home/LookbookVideoModal.tsx`: Replace the animated editorial film card with the client's campaign MP4/video embed.

### 4. Legal & Store Policies (Client Review Required)
Review and customise:
- `src/app/policies/shipping/page.tsx`
- `src/app/policies/returns/page.tsx`
- `src/app/policies/privacy/page.tsx`
- `src/app/policies/terms/page.tsx`

### 5. Image Slots to Replace (`public/images/...`)
On first `npm run dev` or `npm run build`, `scripts/generate-images.mjs` creates bespoke SVG placeholder artwork for every slot below. Swap them with real studio photography (3:4 portrait ratio recommended, `.jpg` / `.webp`, updating paths in `src/data/products.ts` and `src/lib/site.ts` if file extensions change from `.svg` to `.jpg`/`.webp`):

- **Hero & Brand Editorial**
  - `public/images/hero/hero-arch-look.svg`
  - `public/images/story/atelier-story.svg`
  - `public/images/split/ethnic-edit.svg`
  - `public/images/split/western-edit.svg`
- **Instagram Grid (6 slots)**
  - `public/images/instagram/ig-1.svg` through `ig-6.svg`
- **Category Arches (7 slots)**
  - `public/images/categories/sarees.svg`
  - `public/images/categories/kurta-sets.svg`
  - `public/images/categories/lehengas.svg`
  - `public/images/categories/anarkalis.svg`
  - `public/images/categories/western-dresses.svg`
  - `public/images/categories/co-ord-sets.svg`
  - `public/images/categories/accessories.svg`
- **Products (16 products, 33 image slots)**
  - `public/images/products/ruhani-saree-1.svg`, `-2.svg`, `-3.svg`
  - `public/images/products/noor-kurta-1.svg`, `-2.svg`
  - `public/images/products/gulabo-lehenga-1.svg`, `-2.svg`
  - `public/images/products/ivory-anarkali-1.svg`, `-2.svg`
  - `public/images/products/sienna-coord-1.svg`, `-2.svg`
  - `public/images/products/meher-saree-1.svg`, `-2.svg`
  - `public/images/products/zoya-kurta-1.svg`, `-2.svg`
  - `public/images/products/aanya-dress-1.svg`, `-2.svg`
  - `public/images/products/tara-kurta-1.svg`, `-2.svg`
  - `public/images/products/ira-lehenga-1.svg`, `-2.svg`
  - `public/images/products/kaira-anarkali-1.svg`, `-2.svg`
  - `public/images/products/vanya-dress-1.svg`, `-2.svg`
  - `public/images/products/nysa-coord-1.svg`, `-2.svg`
  - `public/images/products/riva-potli-1.svg`, `-2.svg`
  - `public/images/products/aarohi-earrings-1.svg`, `-2.svg`
  - `public/images/products/sitara-dupatta-1.svg`, `-2.svg`Complete Folder StructureTextrera-boutique/
├── package.json
├── tsconfig.json
├── next.config.ts
├── README.md
├── scripts/
│   └── generate-images.mjs
├── public/
│   └── images/                  (auto-populated by generate-images.mjs)
│       ├── hero/
│       ├── story/
│       ├── split/
│       ├── instagram/
│       ├── categories/
│       └── products/
└── src/
    ├── app/
    │   ├── icon.svg
    │   ├── opengraph-image.tsx
    │   ├── robots.ts
    │   ├── sitemap.ts
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── not-found.tsx
    │   ├── about/page.tsx
    │   ├── account/page.tsx
    │   ├── cart/page.tsx
    │   ├── checkout/page.tsx
    │   ├── contact/page.tsx
    │   ├── lookbook/page.tsx
    │   ├── wishlist/page.tsx
    │   ├── collections/[slug]/page.tsx
    │   ├── products/[slug]/page.tsx
    │   └── policies/
    │       ├── privacy/page.tsx
    │       ├── returns/page.tsx
    │       ├── shipping/page.tsx
    │       └── terms/page.tsx
    ├── components/
    │   ├── brand/
    │   │   └── JharokhaLogo.tsx
    │   ├── collection/
    │   │   ├── Collection.module.css
    │   │   └── CollectionClient.tsx
    │   ├── home/
    │   │   ├── BestSellersSection.tsx
    │   │   ├── CategoryArches.tsx
    │   │   ├── EthnicWesternSplit.tsx
    │   │   ├── FabricOrbsSection.tsx
    │   │   ├── FestiveLookbookSection.tsx
    │   │   ├── HeroSection.module.css
    │   │   ├── HeroSection.tsx
    │   │   ├── HomePageClient.tsx
    │   │   ├── InstagramNewsletterSection.tsx
    │   │   ├── LookbookVideoModal.tsx
    │   │   ├── MarqueeStrip.tsx
    │   │   ├── NewArrivalsCarousel.tsx
    │   │   ├── StorySection.tsx
    │   │   ├── TestimonialsSection.tsx
    │   │   └── WhyReraSection.tsx
    │   ├── layout/
    │   │   ├── AnnouncementBar.tsx
    │   │   ├── BoutiqueProviders.tsx
    │   │   ├── CartDrawer.module.css
    │   │   ├── CartDrawer.tsx
    │   │   ├── Footer.module.css
    │   │   ├── Footer.tsx
    │   │   ├── Header.module.css
    │   │   ├── Header.tsx
    │   │   ├── IntroLoader.tsx
    │   │   ├── SearchOverlay.module.css
    │   │   ├── SearchOverlay.tsx
    │   │   └── WhatsAppButton.tsx
    │   ├── lookbook/
    │   │   └── LookbookClient.tsx
    │   ├── policies/
    │   │   └── PolicyLayout.tsx
    │   ├── product/
    │   │   ├── ProductCard.module.css
    │   │   ├── ProductCard.tsx
    │   │   ├── ProductDetail.module.css
    │   │   ├── ProductDetailClient.tsx
    │   │   ├── QuickViewModal.tsx
    │   │   └── SizeGuideModal.tsx
    │   └── three/
    │       ├── FabricOrbsScene.tsx
    │       ├── HeroSilkScene.tsx
    │       └── LookbookRingScene.tsx
    ├── data/
    │   └── products.ts
    ├── hooks/
    │   └── useWebGLCapability.ts
    ├── lib/
    │   ├── format.ts
    │   └── site.ts
    ├── store/
    │   └── useBoutiqueStore.ts
    └── styles/
        └── globals.cssExact Commands to Install, Run & Deploy on VercelInstall dependencies and generate editorial placeholder artwork:Bashnpm install
npm run setup:imagesRun local development server:Bashnpm run devOpen http://localhost:3000.Production type-check & build verification:Bashnpm run build
npm run startDeploy to Vercel:Bashnpx vercel login
npx vercel --prod(Or push the repository to GitHub and import it in the Vercel dashboard — prebuild automatically generates /public/images before next build.)Client Presentation Script (7 Talking Points)Signature Curtain Intro & Jharokha Identity: "Notice how on the very first visit, the RERA Jharokha arch draws itself in champagne gold before lifting into the boutique — giving your brand an unmistakable luxury fashion house entrance without slowing down repeat shoppers."The 3D "Silk Drape" Hero: "Behind the headline, real-time WebGL silk ribbons flow in deep maroon and champagne gold using custom light-sheen shaders, paired with a rotating metallic 3D Jharokha arch frame and drifting gold dust that subtly tilts with your cursor."Interactive "Feel the Fabric" 3D Orbs: "Instead of flat colour squares, customers can touch or hover over 8 woven 3D fabric spheres — from Banarasi Silk to Organza and Velvet — each reacting with realistic textile sheen and opening directly into that fabric's edit."Pinned 3D Lookbook Ring Gallery: "As shoppers scroll into the Festive Edit, the page pins smoothly while curved lookbook panels rotate around a 3D cylinder — allowing customers to orbit silhouettes by scroll or touch-drag and tap any piece for instant sizing."Ethnic vs. Western Interactive Split: "Your two worlds — Indian heritage looms and contemporary western tailoring — meet in a draggable split-screen showcase so customers can explore either aesthetic with a single swipe."Tactile Product Discovery & Indian Shopping Flows: "Every product card tilts in 3D with a soft gold sheen, cross-fades to an alternate angle, and connects to quick view, a 360° spin viewer, an Indian bust-waist-hip size guide, a 6-digit pincode delivery checker, and direct WhatsApp ordering."Built for Indian Mobile Speed & Graceful Fallbacks: "Every 3D scene lazy-loads below the fold, pauses off-screen, caps pixel density on mobile, and automatically falls back to a curated editorial layout on low-power phones or reduced-motion settings."Final Verification ChecklistEvery page in the site map exists and is fully designed (/, /collections/[slug], /products/[slug], /cart, /checkout, /wishlist, /lookbook, /about, /contact, /policies/shipping, /policies/returns, /policies/privacy, /policies/terms, /account, 404).Hero silk ribbons, fabric orbs, and lookbook ring all use next/dynamic (ssr: false) and include clean non-3D fallbacks.Mobile-first responsive layouts, touch controls, and bottom-sheet filters are built in.Cart, wishlist (localStorage with try/catch), filters, size guide, quick view, 360° spin, pincode checker, and instant search all function.Zero lorem ipsum, zero broken internal links, sample reviews and demo checkout clearly marked, and full schema.org + sitemap.ts + robots.ts SEO configured.Designed around RERA Boutique’s classic Indian elegance (#140A0E noir, #5E2230 maroon, #C9A46A/#E8C98A gold, #FBF7F1 ivory, Cormorant Garamond + Jost).
