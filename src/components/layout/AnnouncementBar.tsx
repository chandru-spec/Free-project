"use client";

import React, { useEffect, useState } from "react";
import { SITE_CONFIG } from "@/lib/site";

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const messages = SITE_CONFIG.announcements;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [messages.length]);

  return (
    <div
      style={{
        backgroundColor: "#140A0E",
        borderBottom: "1px solid rgba(201, 164, 106, 0.18)",
        color: "#FBF7F1",
        fontSize: "11px",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        textAlign: "center",
        padding: "8px 16px",
        position: "relative",
        zIndex: 60,
      }}
      role="region"
      aria-label="Boutique Announcements"
    >
      <span style={{ color: "#E8C98A", marginRight: "8px" }}>✦</span>
      <span>{messages[index]}</span>
      <span style={{ color: "#E8C98A", marginLeft: "8px" }}>✦</span>
    </div>
  );
}
