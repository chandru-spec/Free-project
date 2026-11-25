import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Product } from "@/data/products";

function createFallbackTexture(product: Product): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 420;
  canvas.height = 560;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 420, 560);
    grad.addColorStop(0, "#3F141F");
    grad.addColorStop(1, "#140A0E");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 420, 560);

    ctx.strokeStyle = "rgba(232, 201, 138, 0.55)";
    ctx.lineWidth = 3;
    ctx.strokeRect(24, 24, 372, 512);

    ctx.fillStyle = "#E8C98A";
    ctx.font = "500 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(product.fabric.toUpperCase(), 210, 260);

    ctx.fillStyle = "#FBF7F1";
    ctx.font = "600 24px Georgia, serif";
    ctx.fillText(product.name, 210, 305);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function CurvedPanel({
  product,
  angle,
  radius,
  onSelect,
}: {
  product: Product;
  angle: number;
  radius: number;
  onSelect: (slug: string) => void;
}) {
  const fallback = useMemo(() => createFallbackTexture(product), [product]);
  const [texture, setTexture] = useState<THREE.Texture>(fallback);

  useEffect(() => {
    let active = true;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      product.images[0],
      (loaded) => {
        if (!active) return;
        loaded.colorSpace = THREE.SRGBColorSpace;
        setTexture(loaded);
      },
      undefined,
      () => {
        // Keep fallback canvas texture if blocked or offline
      }
    );
    return () => {
      active = false;
    };
  }, [product.images]);

  const geometry = useMemo(() => {
    return new THREE.CylinderGeometry(
      radius,
      radius,
      2.55,
      24,
      1,
      true,
      -0.34,
      0.68
    );
  }, [radius]);

  return (
    <group rotation={[0, angle, 0]}>
      <mesh
        geometry={geometry}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(product.slug);
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial
          map={texture}
          roughness={0.38}
          metalness={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function RingCarousel({
  products,
  dragRotation,
  scrollRotation,
  onSelect,
}: {
  products: Product[];
  dragRotation: React.MutableRefObject<number>;
  scrollRotation: React.MutableRefObject<number>;
  onSelect: (slug: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 3.55;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const target =
      dragRotation.current +
      scrollRotation.current +
      state.clock.elapsedTime * 0.08;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      target,
      Math.min(1, delta * 4.5)
    );
  });

  return (
    <group ref={groupRef} rotation={[0.08, 0, 0]}>
      {products.map((product, idx) => {
        const angle = (idx / products.length) * Math.PI * 2;
        return (
          <CurvedPanel
            key={product.id}
            product={product}
            angle={angle}
            radius={radius}
            onSelect={onSelect}
          />
        );
      })}
    </group>
  );
}

export default function LookbookRingScene({
  products,
  dragRotation,
  scrollRotation,
  onSelect,
  dpr,
  inView,
}: {
  products: Product[];
  dragRotation: React.MutableRefObject<number>;
  scrollRotation: React.MutableRefObject<number>;
  onSelect: (slug: string) => void;
  dpr: number;
  inView: boolean;
}) {
  return (
    <Canvas
      dpr={dpr}
      frameloop={inView ? "always" : "demand"}
      camera={{ position: [0, 0.55, 6.2], fov: 44 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={1.25} color="#FBF7F1" />
      <directionalLight position={[4, 6, 5]} intensity={1.7} color="#E8C98A" />
      <pointLight position={[0, 0, 2]} intensity={1.4} color="#C9A46A" />

      <RingCarousel
        products={products}
        dragRotation={dragRotation}
        scrollRotation={scrollRotation}
        onSelect={onSelect}
      />
    </Canvas>
  );
}
