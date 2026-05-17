"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function LogoModel() {
  const group = useRef();
  const keyLight = useRef();
  const fillLight = useRef();

  const { scene } = useGLTF("/models/crbro-logo-3d.glb");
  const logoScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    logoScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#f5efe4"),
          metalness: 0.28,
          roughness: 0.42,
          envMapIntensity: 0.9,
        });
      }
    });
  }, [logoScene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      // movimiento lateral suave, sin girar 360
      group.current.rotation.y = Math.sin(t * 0.85) * 0.16;
      group.current.rotation.x = Math.sin(t * 0.45) * 0.025;
      group.current.position.y = Math.sin(t * 1.1) * 0.035;
    }

    if (keyLight.current) {
      keyLight.current.position.x = 2.2 + Math.sin(t * 0.8) * 0.28;
      keyLight.current.intensity = 2.05 + Math.sin(t * 0.8) * 0.14;
    }

    if (fillLight.current) {
      fillLight.current.position.x = -2.1 + Math.cos(t * 0.65) * 0.18;
      fillLight.current.intensity = 1.25 + Math.cos(t * 0.65) * 0.08;
    }
  });

  return (
    <>
      {/* base para que nunca quede full oscuro */}
      <ambientLight intensity={1.3} color="#f7efe5" />

      {/* luz principal cobriza, más sutil */}
      <directionalLight
        ref={keyLight}
        position={[2.2, 2.4, 4]}
        intensity={2.05}
        color="#d79a62"
      />

      {/* luz de relleno para balancear */}
      <directionalLight
        ref={fillLight}
        position={[-2.1, 1.8, 3.2]}
        intensity={1.25}
        color="#fff3e6"
      />

      {/* pequeño glow cálido */}
      <pointLight
        position={[0, -0.4, 2.8]}
        intensity={0.45}
        color="#a85c2c"
      />

      <group ref={group} scale={2.75} position={[0, -0.08, 0]}>
        <primitive object={logoScene} />
      </group>
    </>
  );
}

export default function HeroLogo3D() {
  return (
    <div className="hero-logo-3d-shell">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 26 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Suspense fallback={null}>
          <LogoModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/crbro-logo-3d.glb");