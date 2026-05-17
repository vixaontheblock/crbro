"use client";

import { useEffect, useRef } from "react";

export default function ExperienceLayer() {
  const progressRef = useRef(null);
  const glowRef = useRef(null);
  const glowRafRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const moveGlow = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (glowRafRef.current) return; // ya hay un frame pendiente

      glowRafRef.current = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`;
        }
        glowRafRef.current = null;
      });
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("mousemove", moveGlow);

    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("mousemove", moveGlow);
      if (glowRafRef.current) cancelAnimationFrame(glowRafRef.current);
    };
  }, []);

  return (
    <>
      <div className="experience-noise" />

      <div className="scroll-progress-wrap">
        <div ref={progressRef} className="scroll-progress" />
      </div>

      <div ref={glowRef} className="cursor-glow" />
    </>
  );
}
