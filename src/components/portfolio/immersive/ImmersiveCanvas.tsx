"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera, RoundedBox, useTexture } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import type { FeaturedWorkItem, PortfolioSceneId, SceneQuality } from "@/data/portfolio-content";

type PointerPosition = { x: number; y: number };

type ImmersiveCanvasProps = {
  activeScene: PortfolioSceneId;
  activeWork: FeaturedWorkItem;
  pointer: PointerPosition;
  quality: Exclude<SceneQuality, "static">;
  onReady: () => void;
  onContextLost: () => void;
};

function HeroStudioScene({ pointer }: { pointer: PointerPosition }) {
  return (
    <group rotation={[pointer.y * 0.025, pointer.x * 0.035, 0]} position={[2.55, 0.1, -0.5]}>
      <mesh position={[-0.55, 0.9, -1.2]} rotation={[0, 0, -0.12]}>
        <planeGeometry args={[3.7, 5.2]} />
        <meshBasicMaterial color="#2457e6" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.7, -0.3, -0.5]} rotation={[0, 0, 0.08]}>
        <planeGeometry args={[3.1, 4.4]} />
        <meshBasicMaterial color="#57c7e8" transparent opacity={0.055} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-1.5, -1.55, 0.1]}>
        <ringGeometry args={[0.95, 0.965, 96]} />
        <meshBasicMaterial color="#2457e6" transparent opacity={0.28} />
      </mesh>
      <mesh position={[1.5, 1.45, 0.25]} rotation={[0, 0, 0.35]}>
        <planeGeometry args={[1.25, 0.018]} />
        <meshBasicMaterial color="#0d1728" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function DeviceSurface({ work, pointer }: { work: FeaturedWorkItem; pointer: PointerPosition }) {
  const texture = useTexture(work.media.primary);
  const dimensions: [number, number] = work.presentation === "phone" ? [2.25, 4.5] : [5.2, 3.25];
  const frameDepth = work.presentation === "phone" ? 0.22 : 0.13;

  return (
    <group rotation={[pointer.y * 0.04, pointer.x * 0.05, pointer.x * -0.01]}>
      <RoundedBox args={[dimensions[0] + 0.18, dimensions[1] + 0.18, frameDepth]} radius={0.16} smoothness={4}>
        <meshStandardMaterial color={work.presentation === "phone" ? "#08090b" : "#e9edf5"} metalness={0.4} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0, frameDepth / 2 + 0.012]}>
        <planeGeometry args={dimensions} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {work.presentation !== "phone" ? (
        <mesh position={[0, dimensions[1] / 2 - 0.13, frameDepth / 2 + 0.025]}>
          <planeGeometry args={[dimensions[0] - 0.2, 0.16]} />
          <meshBasicMaterial color="#0d1728" transparent opacity={0.72} />
        </mesh>
      ) : null}
    </group>
  );
}

function ShowreelScene({ work, pointer, quality }: { work: FeaturedWorkItem; pointer: PointerPosition; quality: "high" | "balanced" }) {
  return (
    <group position={[2.25, 0, -0.3]}>
      <ambientLight intensity={1.8} />
      <directionalLight position={[3, 5, 6]} intensity={quality === "high" ? 3 : 1.6} color="#ffffff" />
      <pointLight position={[-3, -1, 3]} intensity={quality === "high" ? 14 : 5} color={work.accent} />
      <Suspense fallback={null}>
        <DeviceSurface work={work} pointer={pointer} />
      </Suspense>
      {quality === "high" ? (
        <ContactShadows position={[0, -2.65, 0]} opacity={0.2} scale={8} blur={2.5} far={4.5} frames={1} />
      ) : null}
    </group>
  );
}

function DeviceMorphScene({ pointer, quality }: { pointer: PointerPosition; quality: "high" | "balanced" }) {
  return (
    <group position={[0, 0, 0]} rotation={[pointer.y * 0.025, pointer.x * 0.035, 0]}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.4} />
      <pointLight position={[-2, 0, 2]} intensity={quality === "high" ? 12 : 5} color="#2457e6" />
      <RoundedBox args={[2.45, 4.9, 0.28]} radius={0.22} smoothness={5}>
        <meshStandardMaterial color="#090a0d" metalness={0.72} roughness={0.24} />
      </RoundedBox>
      <RoundedBox args={[2.17, 4.62, 0.05]} radius={0.18} smoothness={5} position={[0, 0, 0.17]}>
        <meshStandardMaterial color="#f5f2ea" roughness={0.8} />
      </RoundedBox>
      <mesh position={[0, 2.05, 0.22]}>
        <capsuleGeometry args={[0.09, 0.55, 4, 16]} />
        <meshBasicMaterial color="#050505" />
      </mesh>
      {quality === "high" ? (
        <ContactShadows position={[0, -2.75, 0]} opacity={0.22} scale={7} blur={2.8} far={5} frames={1} />
      ) : null}
    </group>
  );
}

function CareerFilmScene({ pointer }: { pointer: PointerPosition }) {
  const frames = [-3, -2, -1, 0, 1, 2, 3];
  return (
    <group position={[1.7, 0, -1]} rotation={[pointer.y * 0.015, pointer.x * 0.025, -0.12]}>
      {frames.map((frame) => (
        <group key={frame} position={[frame * 1.35, Math.sin(frame * 0.65) * 0.34, Math.abs(frame) * -0.18]} rotation={[0, frame * -0.035, 0]}>
          <mesh>
            <planeGeometry args={[1.12, 1.72]} />
            <meshBasicMaterial color={frame === 0 ? "#2457e6" : "#0d1728"} transparent opacity={frame === 0 ? 0.28 : 0.09} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <ringGeometry args={[0.29, 0.3, 48]} />
            <meshBasicMaterial color="#f5f2ea" transparent opacity={0.48} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function ImmersiveCanvas({
  activeScene,
  activeWork,
  pointer,
  quality,
  onReady,
  onContextLost,
}: ImmersiveCanvasProps) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ antialias: quality === "high", alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.domElement.addEventListener("webglcontextlost", onContextLost, { once: true });
        onReady();
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 8.5]} fov={40} />
      <group visible={activeScene === "hero"}>
        <HeroStudioScene pointer={pointer} />
      </group>
      <group visible={activeScene === "showreel"}>
        <ShowreelScene key={activeWork.id} work={activeWork} pointer={pointer} quality={quality} />
      </group>
      <group visible={activeScene === "mode-transition"}>
        <DeviceMorphScene pointer={pointer} quality={quality} />
      </group>
      <group visible={activeScene === "career"}>
        <CareerFilmScene pointer={pointer} />
      </group>
    </Canvas>
  );
}
