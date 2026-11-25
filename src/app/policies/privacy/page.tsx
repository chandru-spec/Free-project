import type { Metadata } from "next";
import { PolicyLayout } from "@/components/policies/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How RERA Boutique collects, uses, and safeguards customer information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      eyebrow="Boutique Policies"
      title="Privacy Policy"
      lastUpdated="Client Review Template · 2026"
      sections={[
        {
          heading: "1. Information We Collect",
          body: "When you browse, save a wishlist, or place an order with RERA Boutique, we collect only the details necessary to fulfil your order and styling requests — such as your name, shipping address, phone number, and email address.",
        },
        {
          heading: "2. Payment Security",
          body: "We do not store your credit card, debit card, or UPI PIN credentials on our servers. All live online transactions are intended to be processed through PCI-DSS compliant Indian payment gateways such as Razorpay.",
        },
        {
          heading: "3. Local Storage & Preferences",
          body: "Your shopping bag and wishlist are stored locally in your browser so your selections stay intact between visits. You may clear your browser storage at any time.",
        },
      ]}
    />
  );
}
