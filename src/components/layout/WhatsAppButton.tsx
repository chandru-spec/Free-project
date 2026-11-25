"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppOrderUrl } from "@/lib/format";

export function WhatsAppButton() {
  const url = getWhatsAppOrderUrl(
    "Namaste RERA Boutique! I would love styling assistance with your collection."
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RERA on WhatsApp"
      style={{
        position: "fixed",
        right: "20px",
        bottom: "22px",
        zIndex: 50,
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 18px",
        borderRadius: "999px",
        background: "rgba(20, 10, 14, 0.9)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(232, 201, 138, 0.45)",
        color: "#FBF7F1",
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        boxShadow: "0 14px 36px rgba(20, 10, 14, 0.35)",
      }}
    >
      <MessageCircle size={18} color="#E8C98A" />
      <span>Chat with RERA</span>
    </a>
  );
}
