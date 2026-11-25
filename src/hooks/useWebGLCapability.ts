"use client";

import { useEffect, useRef, useState } from "react";

export interface WebGLCapability {
  canUse3D: boolean;
  isMobile: boolean;
  dpr: number;
  reducedMotion: boolean;
}

export function useWebGLCapability(): WebGLCapability {
  const [capability, setCapability] = useState<WebGLCapability>({
    canUse3D: false,
    isMobile: false,
    dpr: 1,
    reducedMotion: false,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    let webglSupported = false;
    try {
      const canvas = document.createElement("canvas");
      webglSupported = Boolean(
        window.WebGLRenderingContext &&
          (canvas.getContext("webgl2") || canvas.getContext("webgl"))
      );
    } catch {
      webglSupported = false;
    }

    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowCores =
      typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2;
    const lowMemory =
      typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2;

    const canUse3D = webglSupported && !reducedMotion && !lowCores && !lowMemory;

    setCapability({
      canUse3D,
      isMobile,
      dpr: isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5),
      reducedMotion,
    });
  }, []);

  return capability;
}

export function useInViewElement<T extends HTMLElement>(rootMargin = "220px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setInView(entries[0]?.isIntersecting ?? false);
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
