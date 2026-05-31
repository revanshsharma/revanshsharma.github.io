import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { chapters } from "../../data/chapters";

const NeuralNetwork = () => {
  const group = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      temp.push(new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ));
    }
    return temp;
  }, []);

  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 3) {
          temp.push([nodes[i], nodes[j]]);
        }
      }
    }
    return temp;
  }, [nodes]);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.001;
      group.current.rotation.x += 0.0005;
    }
  });

  return (
    <group ref={group}>
      {nodes.map((pos, i) => (
        <Sphere key={i} position={pos} args={[0.05, 8, 8]}>
          <meshBasicMaterial color="#4cd7f6" transparent opacity={0.8} />
        </Sphere>
      ))}
      {lines.map((line: any, i) => (
        <Line key={i} points={line} color="#2a4b5c" lineWidth={1} transparent opacity={0.3} />
      ))}
    </group>
  );
};

export const AISection = () => {
  return (
    <section className="relative min-h-screen w-full py-24 flex items-center z-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <NeuralNetwork />
        </Canvas>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-24 w-full">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Entering <span className="text-secondary">AI</span>
          </h2>
          <div className="w-24 h-1 bg-secondary rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapters.ai.projects.map((project, i) => (
            <div key={i} className="glass-card p-8 rounded-xl border border-secondary/20 hover:border-secondary/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="text-secondary font-mono text-sm mb-4 opacity-70">Project {String(i + 1).padStart(2, '0')}</div>
              <h3 className="text-xl md:text-2xl font-display text-white">{project}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
