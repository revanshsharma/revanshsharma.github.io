import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { chapters } from "../../data/chapters";

const HeroScene = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const rimRef = useRef<THREE.Mesh>(null);

  useFrame(({ mouse, clock }) => {
    if (sphereRef.current) {
      sphereRef.current.position.x += (mouse.x * 1.2 - sphereRef.current.position.x) * 0.05;
      sphereRef.current.position.y += (mouse.y * 1.2 - sphereRef.current.position.y) * 0.05;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
    if (rimRef.current) {
      rimRef.current.rotation.z = clock.getElapsedTime() * 0.05;
      rimRef.current.rotation.x = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.05} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#c0c1ff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.8} color="#4cd7f6" />
      <pointLight position={[0, 0, 3]} intensity={2} color="#c0c1ff" distance={8} />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere ref={sphereRef} args={[1.6, 128, 128]}>
          <MeshDistortMaterial
            color="#0a0a1a"
            distort={0.45}
            speed={1.8}
            roughness={0.1}
            metalness={1.0}
            envMapIntensity={1}
          />
        </Sphere>
      </Float>

      {/* Outer glowing ring */}
      <mesh ref={rimRef} position={[0, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 8, 120]} />
        <meshBasicMaterial color="#c0c1ff" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.008, 8, 120]} />
        <meshBasicMaterial color="#4cd7f6" transparent opacity={0.2} />
      </mesh>
    </>
  );
};

const ParticleField = () => {
  const meshRef = useRef<THREE.Points>(null);
  const count = 600;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#c0c1ff" size={0.025} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true }}>
          <HeroScene />
          <ParticleField />
        </Canvas>
      </div>

      <div className="z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="mb-6 px-4 py-1.5 glass-card rounded-full border border-primary/20">
          <span className="text-xs font-mono tracking-[0.3em] text-secondary uppercase">
            DEVELOPER • DESIGNER • COMMUNITY BUILDER
          </span>
        </div>

        <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white mb-6 drop-shadow-2xl">
          {chapters.hero.title.split(" ")[0]}{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #c0c1ff 0%, #4cd7f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {chapters.hero.title.split(" ")[1]}
          </span>
        </h1>

        <div className="h-10 overflow-hidden mb-10">
          <div className="flex flex-col items-center" style={{ animation: "slide-up 6s ease-in-out infinite" }}>
            {chapters.hero.subtitles.map((sub, i) => (
              <span key={i} className="text-xl md:text-3xl font-mono h-10 flex items-center text-[#c0c1ff]">
                {sub}
              </span>
            ))}
            <span className="text-xl md:text-3xl font-mono h-10 flex items-center text-[#c0c1ff]">
              {chapters.hero.subtitles[0]}
            </span>
          </div>
        </div>

        <div className="glass-card px-6 py-3 rounded-full border border-primary/20">
          <p className="text-xs md:text-sm text-muted-foreground font-mono tracking-[0.2em] uppercase">
            {chapters.hero.label}
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs font-mono tracking-widest uppercase text-white">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};
