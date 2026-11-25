import type { Metadata } from "next";
import { PolicyLayout } from "@/components/policies/PolicyLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of service governing purchases and use of the RERA Boutique website.",
};

export default function TermsPolicyPage() {
  return (
    <PolicyLayout
      eyebrow="Boutique Policies"
      title="Terms & Conditions"
      lastUpdated="Client Review Template · 2026"
      sections={[
        {
          heading: "1. Craftsmanship & Colour Variations",
          body: "Many RERA Boutique garments feature handloom weaves, natural dyes, and hand-stamped block prints. Subtle variations in weave tension, motif placement, or hue are hallmarks of authentic human craft rather than defects.",
        },
        {
          heading: "2. Pricing & Currency",
          body: "All prices listed on RERA Boutique are in Indian Rupees (₹ INR) and inclusive of applicable GST unless stated otherwise at checkout.",
        },
        {
          heading: "3. Intellectual Property",
          body: "All editorial imagery, 3D showcases, copy, and the RERA Boutique Jharokha emblem belong to RERA Boutique and may not be reproduced commercially without written permission.",
        },
      ]}
    />
  );
}
