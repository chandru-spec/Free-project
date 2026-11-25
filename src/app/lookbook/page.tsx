import type { Metadata } from "next";
import { LookbookClient } from "@/components/lookbook/LookbookClient";

export const metadata: Metadata = {
  title: "3D Lookbook — Festive Edit 2026",
  description:
    "Orbit the RERA Boutique 3D lookbook gallery and shop complete festive ensembles via interactive hotspots.",
};

export default function LookbookPage() {
  return <LookbookClient />;
}
