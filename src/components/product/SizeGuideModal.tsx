"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const SIZE_ROWS = [
  { size: "XS", bust: "32", waist: "26", hip: "35", uk: "6" },
  { size: "S", bust: "34", waist: "28", hip: "37", uk: "8" },
  { size: "M", bust: "36", waist: "30", hip: "39", uk: "10" },
  { size: "L", bust: "38", waist: "32", hip: "41", uk: "12" },
  { size: "XL", bust: "40", waist: "34", hip: "43", uk: "14" },
  { size: "XXL", bust: "42", waist: "36", hip: "45", uk: "16" },
];

export function SizeGuideModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Indian Sizing Chart"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(20, 10, 14, 0.72)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 18,
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(96vw, 620px)",
              background: "var(--ivory)",
              color: "var(--ink)",
              borderRadius: 20,
              border: "1px solid rgba(201,164,106,0.4)",
              padding: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div>
                <span className="eyebrow" style={{ color: "var(--maroon)" }}>
                  Indian Garment Measurements
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 30,
                    fontWeight: 600,
                  }}
                >
                  RERA Size Guide
                </h2>
              </div>
              <button type="button" onClick={onClose} aria-label="Close size guide">
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 18 }}>
              All measurements below are body measurements in <strong>inches</strong>.
              Our ethnic kurtas and lehengas include a 1.5-inch inner seam allowance
              for easy bespoke tailoring.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid var(--border-ink)",
                      color: "var(--maroon)",
                    }}
                  >
                    <th style={{ padding: "10px 8px" }}>Size</th>
                    <th style={{ padding: "10px 8px" }}>Bust (in)</th>
                    <th style={{ padding: "10px 8px" }}>Waist (in)</th>
                    <th style={{ padding: "10px 8px" }}>Hip (in)</th>
                    <th style={{ padding: "10px 8px" }}>UK Equiv.</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_ROWS.map((row) => (
                    <tr
                      key={row.size}
                      style={{ borderBottom: "1px solid rgba(43,29,28,0.08)" }}
                    >
                      <td style={{ padding: "10px 8px", fontWeight: 600 }}>
                        {row.size}
                      </td>
                      <td style={{ padding: "10px 8px" }}>{row.bust}″</td>
                      <td style={{ padding: "10px 8px" }}>{row.waist}″</td>
                      <td style={{ padding: "10px 8px" }}>{row.hip}″</td>
                      <td style={{ padding: "10px 8px" }}>{row.uk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 16 }}>
              Between sizes? Select the larger size or message our Kala Ghoda atelier on
              WhatsApp for custom measurements.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
