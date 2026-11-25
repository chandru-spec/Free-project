"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, RefreshCw, Sparkles, Truck } from "lucide-react";
import { useInViewElement, useWebGLCapability } from "@/hooks/useWebGLCapability";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import { BOUTIQUE_PHOTOS } from "@/lib/images";
import styles from "./HeroSection.module.css";

const HeroSilkScene = dynamic(() => import("@/components/three/HeroSilkScene"), {
  ssr: false,
  loading: () => null,
});

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);
  const { canUse3D, isMobile, dpr, reducedMotion } = useWebGLCapability();
  const { ref: inViewRef, inView } = useInViewElement<HTMLElement>("150px");
  const openVideoModal = useBoutiqueStore((s) => s.openVideoModal);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-line-inner", {
        yPercent: 105,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        inViewRef.current = node;
      }}
      className={styles.hero}
    >
      {/* 3D WebGL Layer or Fallback */}
      <div className={styles.canvasLayer} aria-hidden="true">
        {canUse3D ? (
          <HeroSilkScene
            dpr={dpr}
            isMobile={isMobile}
            inView={inView}
            scrollProgress={scrollProgress}
          />
        ) : (
          <div className={styles.fallbackSilk} />
        )}
      </div>

      {/* Foreground Copy + Framed Hero Arch Preview */}
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.copyCol}>
          <span className="eyebrow">New Festive Edit 2026</span>

          <h1 className={styles.headline}>
            <span className={styles.lineMask}>
              <span className="hero-line-inner" style={{ display: "block" }}>
                Draped in <em>grace</em>,
              </span>
            </span>
            <span className={styles.lineMask}>
              <span className="hero-line-inner" style={{ display: "block" }}>
                made for <em>now</em>
              </span>
            </span>
          </h1>

          <p className={styles.subcopy}>
            Handwoven Banarasi silks, luminous Chikankari kurtas, and sculpted
            western silhouettes — crafted across India’s heritage looms and tailored
            for the modern wardrobe.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/collections/festive-edit" className="btn btn-gold">
              Shop the Collection
            </Link>
            <button
              type="button"
              className="btn btn-outline-gold"
              onClick={openVideoModal}
            >
              <Play size={14} fill="currentColor" />
              Watch the Lookbook
            </button>
          </div>
        </div>

        {/* Framed Hero Editorial Image (sits alongside/within the 3D Arch vibe) */}
        <div className={styles.archPreviewMobile}>
          <Image
            src={BOUTIQUE_PHOTOS.heroArch}
            alt="Ruhani Banarasi Festive Edit 2026"
            fill
            priority
            sizes="320px"
            style={{ objectFit: "cover", objectPosition: "top center" }}
          />
        </div>
      </div>

      {/* Bottom Glass Trust Strip */}
      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <div className={`glass-panel-dark ${styles.trustStrip}`}>
          <div className={styles.trustItem}>
            <Sparkles size={18} color="#E8C98A" />
            <span>
              <strong>Handpicked Fabrics</strong> — Pure Katan Silk, Chanderi & Mulmul
            </span>
          </div>
          <div className={styles.trustItem}>
            <Truck size={18} color="#E8C98A" />
            <span>
              <strong>Pan-India Delivery</strong> — Free above ₹1,999 & COD ready
            </span>
          </div>
          <div className={styles.trustItem}>
            <RefreshCw size={18} color="#E8C98A" />
            <span>
              <strong>Easy 7-Day Exchange</strong> — Doorstep pickup & sizing support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
