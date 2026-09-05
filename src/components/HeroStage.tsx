import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import type { Group } from "three";

function Artifact() {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.35;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.55}>
      <group ref={ref}>
        <mesh castShadow>
          <icosahedronGeometry args={[1.25, 1]} />
          <meshPhysicalMaterial
            color="#102033"
            metalness={0.92}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.08}
            emissive="#1a4d55"
            emissiveIntensity={0.7}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.29, 1]} />
          <meshBasicMaterial color="#3ee0c8" wireframe transparent opacity={0.85} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.85, 0.025, 16, 80]} />
          <meshBasicMaterial color="#f5c16c" />
        </mesh>
        <mesh rotation={[0.7, 0.4, 0.2]}>
          <torusGeometry args={[2.15, 0.012, 16, 90]} />
          <meshBasicMaterial color="#6ea8ff" />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.38, 0]} />
          <meshBasicMaterial color="#3ee0c8" />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroStage() {
  return (
    <div className="relative z-10 h-[380px] w-full cursor-grab active:cursor-grabbing md:h-[560px]">
      <div className="pointer-events-none absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(62,224,200,0.22),transparent_68%)]" />
      <Canvas camera={{ position: [0, 0.2, 5.2], fov: 42 }} dpr={[1, 1.75]}>
        <color attach="background" args={["#05070d"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[4, 6, 4]} intensity={40} color="#3ee0c8" angle={0.4} />
        <pointLight position={[-3, 2, 3]} intensity={20} color="#6ea8ff" />
        <pointLight position={[2, -2, 2]} intensity={12} color="#f5c16c" />
        <Artifact />
        <ContactShadows opacity={0.35} scale={8} blur={2.4} far={4} color="#000" />
        <Environment preset="city" />
        <EffectComposer>
          <Bloom intensity={1.35} luminanceThreshold={0.2} mipmapBlur />
        </EffectComposer>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
      <p className="pointer-events-none absolute bottom-2 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-cyan/70">
        Drag the model · Neural core
      </p>
    </div>
  );
}
