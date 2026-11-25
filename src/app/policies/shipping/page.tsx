import type { Metadata } from "next";
import { PolicyLayout } from "@/components/policies/PolicyLayout";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Pan-India shipping timelines, dispatch charges, and COD availability at RERA Boutique.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout
      eyebrow="Boutique Policies"
      title="Shipping Policy"
      lastUpdated="Client Review Template · 2026"
      sections={[
        {
          heading: "1. Dispatch Timelines",
          body: "Ready-to-ship silhouettes are inspected, steamed, and dispatched from our studio within 24–48 business hours. Pieces requested with custom blouse stitching or hem alterations require an additional 2–3 business days.",
        },
        {
          heading: "2. Pan-India Shipping Charges",
          body: "We offer complimentary standard shipping across India on orders of ₹1,999 and above. For orders below ₹1,999, a flat shipping fee of ₹149 applies. Express Air Dispatch is available at checkout for ₹299.",
        },
        {
          heading: "3. Estimated Delivery Windows",
          body: "Metro cities typically receive parcels within 3–4 business days after dispatch. Tier-2, Tier-3 towns, and remote pin codes generally arrive within 5–7 business days via tracked courier partners.",
        },
        {
          heading: "4. Cash on Delivery (COD)",
          body: "Cash on Delivery is available on eligible pin codes across India. Our concierge team may confirm high-value COD orders via WhatsApp or phone prior to dispatch.",
        },
      ]}
    />
  );
}
