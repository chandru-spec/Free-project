"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const visited = window.sessionStorage.getItem("rera_intro_seen");
      if (!visited) {
        setVisible(true);
        window.sessionStorage.setItem("rera_intro_seen", "1");
        const timer = window.setTimeout(() => {
          setVisible(false);
        }, 1750);
        return () => window.clearTimeout(timer);
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
          }}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9990,
            backgroundColor: "#140A0E",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "18px",
          }}
        >
          <svg
            width="68"
            height="80"
            viewBox="0 0 48 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="24"
              cy="5.5"
              r="2.6"
              fill="#E8C98A"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.35 }}
            />
            <motion.path
              d="M9 51V24.5C9 17.5 16 14 24 9.5C32 14 39 17.5 39 24.5V51H9Z"
              stroke="#C9A46A"
              strokeWidth="1.6"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
              d="M14.5 51V26.5C14.5 21.3 19 18.7 24 15.6C29 18.7 33.5 21.3 33.5 26.5V51"
              stroke="#E8C98A"
              strokeOpacity="0.45"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.25, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.55 }}
            style={{ textAlign: "center" }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "34px",
                fontWeight: 600,
                letterSpacing: "0.28em",
                color: "#FBF7F1",
                paddingLeft: "0.28em",
              }}
            >
              RERA
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                letterSpacing: "0.46em",
                color: "#E8C98A",
                marginTop: "4px",
                paddingLeft: "0.46em",
              }}
            >
              BOUTIQUE
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
