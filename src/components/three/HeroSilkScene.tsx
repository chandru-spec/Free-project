"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";

const SILK_VERTEX_SHADER = `
  uniform float uTime;
  uniform float uScroll;
  uniform float uWaveAmp;
  varying vec2 vUv;
  varying vec3 vNormalPos;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float wave1 = sin(pos.x * 0.65 + uTime * 0.85) * uWaveAmp;
    float wave2 = cos(pos.y * 1.15 - uTime * 0.65) * (uWaveAmp * 0.6);
    float ripple = sin((pos.x + pos.y) * 1.45 + uTime * 1.1) * (uWaveAmp * 0.35);

    pos.z += wave1 + wave2 + ripple;
    pos.y += sin(pos.x * 0.4 + uTime * 0.5) * 0.25 + uScroll * 2.2;
    pos.x += uScroll * 1.8;

    vElevation = wave1 + wave2;
    vNormalPos = normalize(vec3(-cos(pos.x * 0.65 + uTime * 0.85) * 0.4, 0.3, 1.0));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const SILK_FRAGMENT_SHADER = `
  uniform vec3 uBaseColor;
  uniform vec3 uHighlightColor;
  uniform vec3 uRimColor;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vNormalPos;
  varying float vElevation;

  void main() {
    // Anisotropic silk sheen approximation
    float sheen = pow(clamp(dot(vNormalPos, normalize(vec3(0.35, 0.65, 0.7))), 0.0, 1.0), 3.0);
    float crease = smoothstep(-0.6, 0.75, vElevation);

    vec3 color = mix(uBaseColor, uHighlightColor, crease * 0.62 + sheen * 0.55);
    color += uRimColor * pow(sheen, 4.0) * 0.65;

    // Soft feathered edges along ribbon width and ends
    float edgeV = smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.82, vUv.y);
    float edgeU = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);

    gl_FragColor = vec4(color, uOpacity * edgeV * edgeU);
  }
`;

interface SilkRibbonProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  baseColor: string;
  highlightColor: string;
  rimColor: string;
  opacity: number;
  speed: number;
  waveAmp: number;
  scrollProgress: React.MutableRefObject<number>;
}

function SilkRibbon({
  position,
  rotation,
  scale,
  baseColor,
  highlightColor,
  rimColor,
  opacity,
  speed,
  waveAmp,
  scrollProgress,
}: SilkRibbonProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uWaveAmp: { value: waveAmp },
      uBaseColor: { value: new THREE.Color(baseColor) },
      uHighlightColor: { value: new THREE.Color(highlightColor) },
      uRimColor: { value: new THREE.Color(rimColor) },
      uOpacity: { value: opacity },
    }),
    [baseColor, highlightColor, rimColor, opacity, waveAmp]
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed;
    matRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uScroll.value,
      scrollProgress.current,
      0.08
    );
  });

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[14, 3.2, 84, 24]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={SILK_VERTEX_SHADER}
        fragmentShader={SILK_FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function JharokhaArchObject({
  scrollProgress,
  isMobile,
}: {
  scrollProgress: React.MutableRefObject<number>;
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Build crisp 3D Jharokha Arch silhouette using THREE.Shape
  const { outerArchGeo, innerGlowGeo, cardGeo } = useMemo(() => {
    const createArchShape = (w: number, h: number) => {
      const s = new THREE.Shape();
      const hw = w / 2;
      const hh = h / 2;
      s.moveTo(-hw, -hh);
      s.lineTo(-hw, hh * 0.25);
      s.bezierCurveTo(-hw, hh * 0.68, -hw * 0.42, hh * 0.82, 0, hh);
      s.bezierCurveTo(hw * 0.42, hh * 0.82, hw, hh * 0.68, hw, hh * 0.25);
      s.lineTo(hw, -hh);
      s.closePath();
      return s;
    };

    const outer = createArchShape(2.55, 3.55);
    const hole = createArchShape(2.26, 3.22);
    outer.holes.push(hole);

    const extruded = new THREE.ExtrudeGeometry(outer, {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.03,
      bevelSegments: 4,
      curveSegments: 36,
    });
    extruded.center();

    const innerPlane = new THREE.ShapeGeometry(createArchShape(2.22, 3.18), 32);
    const haloShape = new THREE.ShapeGeometry(createArchShape(2.75, 3.78), 32);

    return {
      outerArchGeo: extruded,
      cardGeo: innerPlane,
      innerGlowGeo: haloShape,
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const s = scrollProgress.current;

    const targetRotY = Math.sin(t * 0.35) * 0.26 + s * 0.45;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      Math.min(1, delta * 3)
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      s * 2.1,
      0.08
    );
    const targetScale = (isMobile ? 0.72 : 1) * (1 + s * 0.22);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08)
    );
  });

  return (
    <Float speed={1.6} rotationIntensity={0.14} floatIntensity={0.35}>
      <group
        ref={groupRef}
        position={isMobile ? [0, -0.35, -0.6] : [2.15, -0.05, 0]}
      >
        {/* Volumetric warm glow backdrop */}
        <mesh geometry={innerGlowGeo} position={[0, 0, -0.22]}>
          <meshBasicMaterial
            color="#E8C98A"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner wine-silk velvet panel inside the Jharokha */}
        <mesh geometry={cardGeo} position={[0, 0, -0.04]}>
          <meshPhysicalMaterial
            color="#3F141F"
            roughness={0.36}
            metalness={0.15}
            sheen={0.95}
            sheenColor="#E8C98A"
            sheenRoughness={0.32}
            clearcoat={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Metallic gold Jharokha frame */}
        <mesh geometry={outerArchGeo}>
          <meshStandardMaterial
            color="#D4AF6E"
            metalness={0.88}
            roughness={0.2}
          />
        </mesh>

        {/* Bindu crown sphere */}
        <mesh position={[0, 2.02, 0]}>
          <sphereGeometry args={[0.085, 24, 24]} />
          <meshStandardMaterial
            color="#E8C98A"
            emissive="#C9A46A"
            emissiveIntensity={0.65}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </group>
    </Float>
  );
}

function CameraRig({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  useFrame((state) => {
    const px = state.pointer.x * 0.35;
    const py = state.pointer.y * 0.22;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, px, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      py - scrollProgress.current * 0.3,
      0.05
    );
    state.camera.lookAt(0.4, 0, 0);
  });
  return null;
}

export default function HeroSilkScene({
  dpr,
  isMobile,
  inView,
  scrollProgress,
}: {
  dpr: number;
  isMobile: boolean;
  inView: boolean;
  scrollProgress: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      dpr={dpr}
      frameloop={inView ? "always" : "demand"}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <ambientLight intensity={0.7} color="#FBF7F1" />
      <directionalLight position={[4, 5, 5]} intensity={2.2} color="#E8C98A" />
      <pointLight position={[-3, -2, 3]} intensity={1.8} color="#C98F86" />
      <pointLight position={[2.2, 0.5, 2.5]} intensity={2.1} color="#E8C98A" />

      <CameraRig scrollProgress={scrollProgress} />

      {/* Three flowing silk ribbons */}
      <SilkRibbon
        position={[-0.6, 0.6, -2.5]}
        rotation={[0.32, 0.1, -0.24]}
        scale={[1.1, 1, 1]}
        baseColor="#5E2230"
        highlightColor="#9B3B4F"
        rimColor="#E8C98A"
        opacity={0.78}
        speed={0.7}
        waveAmp={0.55}
        scrollProgress={scrollProgress}
      />
      <SilkRibbon
        position={[0.4, -0.9, -1.8]}
        rotation={[-0.25, -0.08, 0.16]}
        scale={[1.0, 0.72, 1]}
        baseColor="#8E6837"
        highlightColor="#E8C98A"
        rimColor="#FBF7F1"
        opacity={0.42}
        speed={0.95}
        waveAmp={0.42}
        scrollProgress={scrollProgress}
      />
      <SilkRibbon
        position={[-1.4, -1.4, -3.2]}
        rotation={[0.2, 0.12, 0.35]}
        scale={[1.15, 0.85, 1]}
        baseColor="#2A0F18"
        highlightColor="#C98F86"
        rimColor="#E8C98A"
        opacity={0.62}
        speed={0.55}
        waveAmp={0.62}
        scrollProgress={scrollProgress}
      />

      {/* Foreground 3D Jharokha frame */}
      <JharokhaArchObject scrollProgress={scrollProgress} isMobile={isMobile} />

      {/* Fine gold dust particles */}
      <Sparkles
        count={isMobile ? 28 : 65}
        scale={[10, 6, 4]}
        size={1.9}
        speed={0.28}
        opacity={0.55}
        color="#E8C98A"
      />
    </Canvas>
  );
}
