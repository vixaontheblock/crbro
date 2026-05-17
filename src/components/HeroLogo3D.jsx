"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/models/crbro-logo-3d.glb";

function LogoModel() {
  const groupRef = useRef();
  const warmLightRef = useRef();

  const { scene } = useGLTF(MODEL_PATH);

  const logoScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        child.material = new THREE.MeshStandardMaterial({
          color: "#d08a4b",
          metalness: 0.78,
          roughness: 0.34,
          envMapIntensity: 1.05,
          emissive: new THREE.Color("#5a2a12"),
          emissiveIntensity: 0.045,
        });
      }
    });

    return clone;
  }, [scene]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // movimiento suave de lado a lado, sin 360
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.13;
      groupRef.current.rotation.x = Math.sin(t * 0.45) * 0.025;
      groupRef.current.position.y = Math.sin(t * 1.05) * 0.025;
    }

    if (warmLightRef.current) {
      // luz viva, pero sin quemar ni oscurecer demasiado
      warmLightRef.current.position.x = Math.sin(t * 0.75) * 1.15;
      warmLightRef.current.intensity = 1.25 + Math.sin(t * 0.85) * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={1.18} color="#fff1e4" />

      <directionalLight
        position={[2.8, 3.2, 4.5]}
        intensity={1.55}
        color="#ffd7aa"
      />

      <directionalLight
        position={[-2.5, 1.8, 3.2]}
        intensity={0.88}
        color="#fff6ee"
      />

      <pointLight
        ref={warmLightRef}
        position={[0, 1.1, 3.4]}
        intensity={1.25}
        distance={8}
        color="#c47a3d"
      />

      <Center>
        <group ref={groupRef} scale={2.25}>
          <primitive object={logoScene} />
        </group>
      </Center>
    </>
  );
}

export default function HeroLogo3D() {
  return (
    <div className="hero-logo-3d-shell">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 31 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.92;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <LogoModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);