import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import {
  Color,
  Group,
  InstancedMesh,
  Object3D,
  Vector3,
} from "three";

const NODE_COUNT = 110;
const dummy = new Object3D();

function NeuralField() {
  const mesh = useRef<InstancedMesh>(null);
  const lines = useRef<Group>(null);

  const { positions, connections, colors } = useMemo(() => {
    const positions: Vector3[] = [];
    const colors: Color[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const r = 3.4 + Math.random() * 5.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.push(
        new Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.62,
          r * Math.cos(phi),
        ),
      );
      colors.push(
        new Color().setHSL(0.48 + Math.random() * 0.14, 0.85, 0.58 + Math.random() * 0.2),
      );
    }

    const connections: [number, number][] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < 1.85 && connections.length < 220) {
          connections.push([i, j]);
        }
      }
    }
    return { positions, connections, colors };
  }, []);

  const linePositions = useMemo(() => {
    const arr = new Float32Array(connections.length * 6);
    connections.forEach(([a, b], i) => {
      arr[i * 6] = positions[a].x;
      arr[i * 6 + 1] = positions[a].y;
      arr[i * 6 + 2] = positions[a].z;
      arr[i * 6 + 3] = positions[b].x;
      arr[i * 6 + 4] = positions[b].y;
      arr[i * 6 + 5] = positions[b].z;
    });
    return arr;
  }, [connections, positions]);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (!mesh.current) return;
    positions.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.position.x += Math.sin(t * 0.35 + i) * 0.08;
      dummy.position.y += Math.cos(t * 0.28 + i * 0.4) * 0.06;
      dummy.lookAt(0, 0, 0);
      const s = 0.035 + (i % 7 === 0 ? 0.05 : 0);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
      mesh.current!.setColorAt(i, colors[i]);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    if (lines.current) {
      lines.current.rotation.y = t * 0.04 + pointer.x * 0.12;
      lines.current.rotation.x = pointer.y * 0.08;
    }
  });

  return (
    <group ref={lines}>
      <instancedMesh ref={mesh} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#7ec8ff" transparent opacity={0.32} />
      </lineSegments>
    </group>
  );
}

function Core() {
  const ref = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.22;
    ref.current.rotation.x = 0.35 + pointer.y * 0.2;
    ref.current.rotation.z = pointer.x * 0.15;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial
            color="#0b1220"
            metalness={0.85}
            roughness={0.15}
            emissive="#12324a"
            emissiveIntensity={0.6}
            wireframe={false}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.38, 1]} />
          <meshBasicMaterial color="#3ee0c8" wireframe transparent opacity={0.55} />
        </mesh>
        <mesh>
          <torusGeometry args={[1.95, 0.012, 16, 80]} />
          <meshBasicMaterial color="#f5c16c" transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0.4, 0]}>
          <torusGeometry args={[2.25, 0.008, 16, 90]} />
          <meshBasicMaterial color="#6ea8ff" transparent opacity={0.45} />
        </mesh>
      </group>
    </Float>
  );
}

export function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8.4], fov: 52 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#05070d"]} />
        <fog attach="fog" args={["#05070d", 11, 22]} />
        <ambientLight intensity={0.45} />
        <pointLight position={[4, 3, 6]} intensity={22} color="#3ee0c8" />
        <pointLight position={[-5, -2, 4]} intensity={16} color="#6ea8ff" />
        <pointLight position={[0, 4, -2]} intensity={10} color="#f5c16c" />
        <group position={[2.8, 0.4, -1.2]} scale={0.92}>
          <NeuralField />
          <Core />
        </group>
        <EffectComposer>
          <Bloom intensity={1.15} luminanceThreshold={0.18} mipmapBlur />
          <Vignette eskil={false} offset={0.15} darkness={0.85} />
        </EffectComposer>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
