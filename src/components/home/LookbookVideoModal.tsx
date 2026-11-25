"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";

export function LookbookVideoModal() {
  const isOpen = useBoutiqueStore((s) => s.isVideoModalOpen);
  const close = useBoutiqueStore((s) => s.closeVideoModal);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="RERA Festive Lookbook Film"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(20, 10, 14, 0.88)",
            backdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(94vw, 860px)",
              background: "#140A0E",
              border: "1px solid rgba(201,164,106,0.4)",
              borderRadius: 20,
              overflow: "hidden",
              color: "#FBF7F1",
            }}
          >
            <div
              style={{
                padding: "16px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(201,164,106,0.2)",
              }}
            >
              <span className="eyebrow">Festive Edit 2026 · Atelier Film</span>
              <button
                type="button"
                onClick={close}
                aria-label="Close lookbook film"
                style={{ color: "#FBF7F1", padding: 4 }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Animated editorial reel preview (replace with client MP4 video when ready) */}
            <div
              className="jaali-pattern"
              style={{
                aspectRatio: "16 / 9",
                background:
                  "radial-gradient(circle at 50% 45%, rgba(94,34,48,0.85), #140A0E 78%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: 32,
                gap: 14,
              }}
            >
              <Sparkles size={32} color="#E8C98A" />
              <h3
                className="display-title"
                style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
              >
                The Silk Drape <em>Film</em>
              </h3>
              <p style={{ maxWidth: 460, fontSize: 14, color: "rgba(251,247,241,0.78)" }}>
                Step inside our Varanasi looms, Lucknowi chikankari ateliers, and Kala
                Ghoda draping studio. Replace this stage with your studio campaign MP4.
              </p>
              <Link href="/lookbook" className="btn btn-gold" onClick={close}>
                Explore 3D Lookbook
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
