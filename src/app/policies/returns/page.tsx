import type { Metadata } from "next";
import { PolicyLayout } from "@/components/policies/PolicyLayout";

export const metadata: Metadata = {
  title: "Returns & Exchange Policy",
  description: "7-day doorstep exchange and return guidelines for RERA Boutique.",
};

export default function ReturnsPolicyPage() {
  return (
    <PolicyLayout
      eyebrow="Boutique Policies"
      title="Returns & 7-Day Exchanges"
      lastUpdated="Client Review Template · 2026"
      sections={[
        {
          heading: "1. Easy 7-Day Exchange Window",
          body: "If your size isn't quite right, you may request a size exchange or store credit within 7 days of delivery. Returned garments must be unworn, unwashed, unaltered, and carry all original RERA tags and muslin packaging.",
        },
        {
          heading: "2. Non-Returnable & Custom Items",
          body: "Bespoke bridal orders, custom-stitched saree blouses, earrings (for hygiene reasons), and garments altered to custom measurements are not eligible for return unless received with a verified transit defect.",
        },
        {
          heading: "3. Doorstep Reverse Pickup",
          body: "Once your request is approved via email or WhatsApp, our courier partner will arrange pickup within 2–3 business days. Refunds (where applicable) or store credit are processed within 5–7 business days of quality inspection.",
        },
      ]}
    />
  );
}
