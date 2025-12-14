"use client";

import { useEffect, useRef, useState } from "react";

const TouchIndicator = () => {
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastPositionRef = useRef({ x: -100, y: -100 });
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const flush = () => {
      rafRef.current = null;
      const el = indicatorRef.current;
      if (!el) return;
      const { x, y } = lastPositionRef.current;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastPositionRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(flush);
      }
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={indicatorRef}
      className={`touch-indicator ${isActive ? "active" : ""}`}
    />
  );
};

export default TouchIndicator;
