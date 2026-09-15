"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function GlassOrbit({ position, color, speed, scale = 1 }: { position: [number, number, number]; color: string; speed: number; scale?: number }) {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const elapsed = clock.getElapsedTime() * speed;
    ref.current.rotation.x = elapsed * 0.35;
    ref.current.rotation.y = elapsed * 0.5;
    ref.current.position.y = position[1] + Math.sin(elapsed) * 0.18;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusKnotGeometry args={[0.72, 0.16, 96, 12]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.5}
        roughness={0.18}
        metalness={0.16}
        transmission={0.34}
        thickness={1.8}
        emissive={color}
        emissiveIntensity={0.28}
      />
    </mesh>
  );
}

export default function SpatialGlow() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas dpr={[1, 1.35]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.7} />
        <directionalLight position={[3, 4, 4]} intensity={5.5} color="#9CC8FF" />
        <pointLight position={[-3, -2, 2]} intensity={4.4} color="#20D4EF" />
        <pointLight position={[2, 2, 1]} intensity={3.4} color="#7C5CFF" />
        <GlassOrbit position={[-3.05, 0.82, -0.45]} color="#315DFF" speed={0.18} scale={0.94} />
        <GlassOrbit position={[2.52, -0.78, -0.7]} color="#23D7F2" speed={0.14} scale={1.06} />
        <GlassOrbit position={[0.65, 1.82, -1.9]} color="#765BFF" speed={0.1} scale={0.52} />
      </Canvas>
    </div>
  );
}
