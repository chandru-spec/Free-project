import { BOUTIQUE_PHOTOS } from "@/lib/images";

export interface NavSubLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  megaMenu?: {
    eyebrow: string;
    columns: {
      heading: string;
      links: NavSubLink[];
    }[];
    featured: {
      title: string;
      subtitle: string;
      href: string;
      image: string;
    };
  };
}

export const SITE_CONFIG = {
  brandName: "RERA",
  brandSub: "BOUTIQUE",
  fullName: "RERA Boutique",
  tagline: "Ethnic & western edits, chosen with love",
  description:
    "Luxury Indian women's boutique curating handloom sarees, Chikankari kurta sets, bridal lehengas, organza anarkalis, and sculpted western silhouettes.",
  url: "https://reraboutique.example",
  currency: "INR",
  currencySymbol: "₹",
  freeShippingThreshold: 1999,
  standardShippingFee: 149,
  codAvailable: true,

  // Replace these placeholders before launch
  contact: {
    phone: "+91 XXXXX XXXXX",
    whatsappNumber: "919999999999",
    whatsappDisplay: "+91 XXXXX XXXXX",
    email: "atelier@reraboutique.example",
    addressLine1: "14, Heritage Courtyard, Kala Ghoda",
    addressLine2: "Fort, Mumbai, Maharashtra 400001",
    storeHours: "Mon – Sun · 11:00 AM to 8:30 PM IST",
  },

  social: {
    instagramHandle: "@reraboutique.in",
    instagramUrl: "https://instagram.com/reraboutique.in",
    pinterestUrl: "https://pinterest.com",
  },

  announcements: [
    "Complimentary pan-India shipping on orders above ₹1,999",
    "The New Festive Edit 2026 is now live · Handcrafted weaves",
    "Cash on Delivery & bespoke blouse alterations available across India",
  ],

  navItems: [
    { label: "New In", href: "/collections/new-arrivals" },
    {
      label: "Ethnic",
      href: "/collections/ethnic",
      megaMenu: {
        eyebrow: "Heirloom & Contemporary Craft",
        columns: [
          {
            heading: "Silhouettes",
            links: [
              {
                label: "Sarees",
                href: "/collections/sarees",
                description: "Banarasi, Organza & Chanderi drapes",
              },
              {
                label: "Kurta Sets",
                href: "/collections/kurta-sets",
                description: "Chikankari, Mulmul & Silk sets",
              },
              {
                label: "Lehengas",
                href: "/collections/lehengas",
                description: "Bandhani, Zari & Bridal edits",
              },
              {
                label: "Anarkalis",
                href: "/collections/anarkalis",
                description: "Floor-grazing festive flares",
              },
            ],
          },
          {
            heading: "By Fabric",
            links: [
              { label: "Banarasi Silk", href: "/collections/all?fabric=Banarasi+Silk" },
              { label: "Chanderi & Organza", href: "/collections/all?fabric=Organza" },
              { label: "Lucknowi Chikankari", href: "/collections/all?fabric=Cotton" },
              { label: "Velvet & Brocade", href: "/collections/all?fabric=Velvet" },
            ],
          },
        ],
        featured: {
          title: "The Ruhani Banarasi Edit",
          subtitle: "Handwoven zari borders kissed with heirloom gold",
          href: "/products/ruhani-banarasi-silk-saree",
          image: BOUTIQUE_PHOTOS.saree1,
        },
      },
    },
    {
      label: "Western",
      href: "/collections/western",
      megaMenu: {
        eyebrow: "Modern Tailored Ease",
        columns: [
          {
            heading: "Silhouettes",
            links: [
              {
                label: "Western Dresses",
                href: "/collections/western-dresses",
                description: "Draped satins & sculptural midis",
              },
              {
                label: "Co-ord Sets",
                href: "/collections/co-ord-sets",
                description: "Linen tailoring & resort prints",
              },
              {
                label: "Tops & Blouses",
                href: "/collections/all?category=Western+Dresses",
                description: "Day-to-soiree statement cuts",
              },
            ],
          },
          {
            heading: "Accessories",
            links: [
              { label: "Silk Potli Bags", href: "/collections/accessories" },
              { label: "Heirloom Dupattas", href: "/collections/accessories" },
              { label: "Artisanal Jewellery", href: "/collections/accessories" },
            ],
          },
        ],
        featured: {
          title: "Aanya Satin Draped Midi",
          subtitle: "Bias-cut wine fluidity with modern sculpted ease",
          href: "/products/aanya-satin-draped-midi-dress",
          image: BOUTIQUE_PHOTOS.western1,
        },
      },
    },
    { label: "Festive Edit", href: "/collections/festive-edit" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "Our Story", href: "/about" },
  ] satisfies NavItem[],

  popularSearches: [
    "Banarasi Saree",
    "Chikankari Kurta",
    "Organza Anarkali",
    "Bridal Lehenga",
    "Linen Co-ord",
    "Potli Bag",
  ],

  footerColumns: {
    shop: [
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Sarees", href: "/collections/sarees" },
      { label: "Kurta Sets", href: "/collections/kurta-sets" },
      { label: "Lehengas & Anarkalis", href: "/collections/lehengas" },
      { label: "Western & Co-ords", href: "/collections/western" },
      { label: "Accessories", href: "/collections/accessories" },
    ],
    help: [
      { label: "My Account & Orders", href: "/account" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shipping Policy", href: "/policies/shipping" },
      { label: "Returns & Exchanges", href: "/policies/returns" },
      { label: "Contact & Styling", href: "/contact" },
    ],
    about: [
      { label: "The RERA Story", href: "/about" },
      { label: "3D Festive Lookbook", href: "/lookbook" },
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms & Conditions", href: "/policies/terms" },
    ],
  },
} as const;
