"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function LogoModel() {
  const groupRef = useRef();
  const glowLightRef = useRef();
  const rimLightRef = useRef();

  const { scene } = useGLTF("/models/crbro-logo-3d.glb");

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        child.material = new THREE.MeshStandardMaterial({
          color: "#c47a3d",
          metalness: 1,
          roughness: 0.2,
          envMapIntensity: 1.6,
          emissive: new THREE.Color("#7a3d16"),
          emissiveIntensity: 0.18,
        });
      }
    });

    return clone;
  }, [scene]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // movimiento lateral elegante, NO 360
      groupRef.current.rotation.y = Math.sin(t * 0.9) * 0.42; // lado a lado
      groupRef.current.rotation.x = Math.sin(t * 0.45) * 0.04; // leve inclinación
      groupRef.current.rotation.z = Math.sin(t * 0.35) * 0.015; // detalle sutil
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.05; // flotación leve
    }

    if (glowLightRef.current) {
      glowLightRef.current.position.x = Math.sin(t * 1.1) * 2.6;
      glowLightRef.current.position.y = 1.6 + Math.cos(t * 1.4) * 0.35;
      glowLightRef.current.intensity = 22 + ((Math.sin(t * 2.2) + 1) / 2) * 10;
    }

    if (rimLightRef.current) {
      rimLightRef.current.position.x = -2 + Math.cos(t * 0.8) * 0.6;
      rimLightRef.current.intensity = 8 + ((Math.cos(t * 1.7) + 1) / 2) * 3;
    }
  });

  return (
    <>
      <ambientLight intensity={1.15} color="#fff2e6" />

      <directionalLight
        position={[3, 4, 5]}
        intensity={2.3}
        color="#ffe4c4"
      />

      <pointLight
        ref={glowLightRef}
        position={[2.2, 1.8, 3.2]}
        intensity={26}
        distance={14}
        color="#ffb062"
      />

      <pointLight
        ref={rimLightRef}
        position={[-2, 0.8, -2]}
        intensity={9}
        distance={10}
        color="#ffd9b0"
      />

      <spotLight
        position={[0, 4, 4]}
        angle={0.42}
        penumbra={1}
        intensity={18}
        distance={18}
        color="#ffc27a"
      />

      <Center>
        <group ref={groupRef} scale={2.65}>
          <primitive object={clonedScene} />
        </group>
      </Center>
    </>
  );
}

export default function HeroLogo3D() {
  return (
    <div className="hero-logo-3d">
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Environment preset="studio" />
        <LogoModel />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/crbro-logo-3d.glb");