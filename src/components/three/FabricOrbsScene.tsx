"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { FABRIC_ORBS, type FabricOrbItem } from "@/data/products";

function createWeaveNormalTexture(scale: number): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "rgb(128,128,255)";
    ctx.fillRect(0, 0, size, size);
    const step = Math.max(4, Math.floor(size / scale));
    for (let y = 0; y < size; y += step) {
      for (let x = 0; x < size; x += step) {
        const checker = ((x / step) + (y / step)) % 2 === 0;
        ctx.fillStyle = checker ? "rgb(156,120,248)" : "rgb(102,138,248)";
        ctx.fillRect(x, y, step - 1, step - 1);
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

function FabricOrbMesh({
  orb,
  position,
  isActive,
  onSelect,
}: {
  orb: FabricOrbItem;
  position: [number, number, number];
  isActive: boolean;
  onSelect: (orb: FabricOrbItem) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const normalMap = useMemo(() => createWeaveNormalTexture(orb.weaveScale), [orb.weaveScale]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const targetY = isActive
      ? position[1] + 0.34 + Math.sin(state.clock.elapsedTime * 2) * 0.04
      : position[1];
    const targetScale = isActive ? 1.18 : 1;

    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      Math.min(1, delta * 6)
    );
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, Math.min(1, delta * 6))
    );
    meshRef.current.rotation.y += delta * (isActive ? 0.9 : 0.22);
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onSelect(orb);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(orb);
      }}
    >
      <sphereGeometry args={[0.64, 48, 48]} />
      <meshPhysicalMaterial
        color={orb.baseColor}
        roughness={orb.roughness}
        metalness={orb.metalness}
        clearcoat={orb.clearcoat}
        clearcoatRoughness={0.22}
        sheen={1}
        sheenColor={orb.sheenColor}
        sheenRoughness={orb.roughness}
        normalMap={normalMap}
        normalScale={new THREE.Vector2(0.45, 0.45)}
      />
    </mesh>
  );
}

export default function FabricOrbsScene({
  activeId,
  onSelect,
  dpr,
  isMobile,
  inView,
}: {
  activeId: string;
  onSelect: (orb: FabricOrbItem) => void;
  dpr: number;
  isMobile: boolean;
  inView: boolean;
}) {
  const positions = useMemo<[number, number, number][]>(() => {
    if (isMobile) {
      // 2 rows x 4 columns
      return FABRIC_ORBS.map((_, idx) => {
        const col = idx % 4;
        const row = Math.floor(idx / 4);
        return [(col - 1.5) * 1.62, row === 0 ? 0.92 : -0.92, 0];
      });
    }
    // Single sweeping arc row of 8 spheres
    return FABRIC_ORBS.map((_, idx) => {
      const x = (idx - 3.5) * 1.58;
      const z = -Math.abs(idx - 3.5) * 0.16;
      const y = Math.cos((idx - 3.5) * 0.35) * 0.18;
      return [x, y, z];
    });
  }, [isMobile]);

  return (
    <Canvas
      dpr={dpr}
      frameloop={inView ? "always" : "demand"}
      camera={{ position: [0, 0.25, isMobile ? 7.8 : 7.2], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.72} color="#FBF7F1" />
      <directionalLight position={[5, 6, 6]} intensity={2.1} color="#E8C98A" />
      <pointLight position={[-5, -2, 4]} intensity={1.4} color="#C98F86" />
      <pointLight position={[0, 3, 5]} intensity={1.2} color="#FBF7F1" />

      {FABRIC_ORBS.map((orb, idx) => (
        <FabricOrbMesh
          key={orb.id}
          orb={orb}
          position={positions[idx]}
          isActive={orb.id === activeId}
          onSelect={onSelect}
        />
      ))}
    </Canvas>
  );
}
