import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import type { Group } from "three";

const agents = [
  { label: "Retrieve", color: "#3ee0c8", pos: [-1.6, 0.35, 0] as const },
  { label: "Reason", color: "#6ea8ff", pos: [0, 1.15, 0.2] as const },
  { label: "Act", color: "#f5c16c", pos: [1.6, 0.2, 0] as const },
];

function AgentGraph() {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.35) * 0.25;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={ref}>
        {agents.map((a) => (
          <group key={a.label} position={a.pos}>
            <mesh>
              <sphereGeometry args={[0.32, 32, 32]} />
              <meshStandardMaterial
                color="#071018"
                emissive={a.color}
                emissiveIntensity={1.4}
                metalness={0.7}
                roughness={0.2}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.42, 24, 24]} />
              <meshBasicMaterial color={a.color} wireframe transparent opacity={0.45} />
            </mesh>
            <Html center distanceFactor={8} occlude={false}>
              <div className="rounded-full border border-white/15 bg-black/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                {a.label}
              </div>
            </Html>
          </group>
        ))}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([-1.6, 0.35, 0, 0, 1.15, 0.2, 1.6, 0.2, 0]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#9fd8ff" transparent opacity={0.55} />
        </line>
      </group>
    </Float>
  );
}

export function HeroStage() {
  return (
    <div className="relative z-10 h-[340px] w-full cursor-grab overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a101c] active:cursor-grabbing md:h-[480px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(62,224,200,0.12),transparent_58%)]" />
      <Canvas
        camera={{ position: [0, 0.2, 5.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[3, 4, 4]} intensity={22} color="#3ee0c8" />
        <pointLight position={[-3, 1, 3]} intensity={16} color="#6ea8ff" />
        <AgentGraph />
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.18} mipmapBlur />
        </EffectComposer>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.45} />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-cyan/80">
        Agentic loop · Retrieve · Reason · Act
      </p>
    </div>
  );
}
