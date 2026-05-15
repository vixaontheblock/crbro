"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function PageReveal() {

  useEffect(() => {

    const elements = document.querySelectorAll(".reveal");

    if (elements.length === 0) return;

    gsap.from(elements, {
      opacity: 0,
      y: 80,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
    });

  }, []);

  return null;
}