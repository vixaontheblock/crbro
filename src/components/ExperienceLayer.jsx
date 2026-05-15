"use client";

import { useEffect, useRef } from "react";

export default function ExperienceLayer() {
  const progressRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const moveGlow = (event) => {
      if (!glowRef.current) return;

      glowRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };

    window.addEventListener("scroll", updateProgress);
    window.addEventListener("mousemove", moveGlow);

    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("mousemove", moveGlow);
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