import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Color, Group, InstancedMesh, Object3D, Vector3 } from "three";

const STREAMS = 18;
const PER_STREAM = 42;
const COUNT = STREAMS * PER_STREAM;
const dummy = new Object3D();
const color = new Color();

function DataRivers() {
  const mesh = useRef<InstancedMesh>(null);
  const paths = useMemo(() => {
    return Array.from({ length: STREAMS }, (_, s) => {
      const radius = 2.4 + (s % 6) * 0.55;
      const tilt = (s / STREAMS) * Math.PI;
      const speed = 0.18 + (s % 5) * 0.05;
      const hue = s % 3 === 0 ? 0.48 : s % 3 === 1 ? 0.62 : 0.12;
      return { radius, tilt, speed, hue, phase: s * 0.4 };
    });
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    let i = 0;
    paths.forEach((p) => {
      for (let k = 0; k < PER_STREAM; k++) {
        const a = t * p.speed + p.phase + (k / PER_STREAM) * Math.PI * 2;
        const x = Math.cos(a) * p.radius;
        const y = Math.sin(a * 1.15 + p.tilt) * 1.15 + Math.sin(t * 0.2 + p.phase) * 0.2;
        const z = Math.sin(a) * p.radius * 0.55 - 1.4;
        dummy.position.set(x + pointer.x * 0.35, y + pointer.y * 0.2, z);
        const pulse = 0.55 + 0.45 * Math.sin(a * 3 + t);
        dummy.scale.setScalar(0.018 + pulse * 0.028);
        dummy.updateMatrix();
        mesh.current!.setMatrixAt(i, dummy.matrix);
        color.setHSL(p.hue, 0.85, 0.45 + pulse * 0.35);
        mesh.current!.setColorAt(i, color);
        i += 1;
      }
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    mesh.current.rotation.y = t * 0.045 + pointer.x * 0.08;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial transparent opacity={0.95} blending={AdditiveBlending} toneMapped={false} />
    </instancedMesh>
  );
}

function SignalArcs() {
  const points = useMemo(() => {
    const pts: Vector3[] = [];
    for (let i = 0; i < 160; i++) {
      const a = (i / 160) * Math.PI * 2;
      pts.push(new Vector3(Math.cos(a) * 4.2, Math.sin(a * 2) * 0.35, Math.sin(a) * 2.1));
    }
    return pts;
  }, []);
  const line = useMemo(() => {
    const arr = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, [points]);
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.08;
  });

  return (
    <group ref={ref}>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[line, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3ee0c8" transparent opacity={0.22} />
      </line>
    </group>
  );
}

export function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <img
        src="./bg-neural-galaxy.png"
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/35 via-[#05070d]/55 to-[#05070d]" />
      <Canvas camera={{ position: [0, 0, 7.6], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <DataRivers />
        <SignalArcs />
      </Canvas>
    </div>
  );
}
