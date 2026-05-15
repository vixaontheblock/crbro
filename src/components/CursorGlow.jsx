"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {

  const glowRef = useRef(null);

  useEffect(() => {

    const moveGlow = (e) => {

      if (!glowRef.current) return;

      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;

    };

    window.addEventListener("mousemove", moveGlow);

    return () => {
      window.removeEventListener("mousemove", moveGlow);
    };

  }, []);

  return (
    <div
      ref={glowRef}
      className="
        pointer-events-none
        fixed
        z-[999]
        h-[300px]
        w-[300px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-blue-500/10
        blur-3xl
      "
    />
  );
}