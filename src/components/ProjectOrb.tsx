import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function Shape({ accent, kind }: { accent: string; kind: string }) {
  const ref = useRef<Mesh>(null);
  const ring = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.6;
      ref.current.rotation.x = t * 0.25;
    }
    if (ring.current) ring.current.rotation.z = t * 0.4;
  });

  return (
    <group>
      <mesh ref={ref}>
        {kind === "cash" ? (
          <octahedronGeometry args={[1.05, 0]} />
        ) : kind === "prospects" ? (
          <dodecahedronGeometry args={[1.05, 0]} />
        ) : (
          <icosahedronGeometry args={[1.05, 0]} />
        )}
        <meshStandardMaterial
          color="#081018"
          metalness={0.8}
          roughness={0.2}
          emissive={accent}
          emissiveIntensity={0.35}
        />
      </mesh>
      <group ref={ring}>
        <mesh>
          <torusGeometry args={[1.45, 0.02, 12, 64]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      </group>
    </group>
  );
}

export function ProjectOrb({ accent, kind }: { accent: string; kind: string }) {
  return (
    <div className="h-48 w-full md:h-full md:min-h-[280px]">
      <Canvas camera={{ position: [0, 0, 3.6], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 2, 3]} intensity={12} color={accent} />
        <Shape accent={accent} kind={kind} />
      </Canvas>
    </div>
  );
}
