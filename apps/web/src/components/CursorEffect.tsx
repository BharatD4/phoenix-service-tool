"use client";

import { useEffect, useState } from "react";

export default function CursorEffect() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on pointer fine devices (non-touch)
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  // Smooth trail animation
  useEffect(() => {
    let animationFrameId: number;
    const animateTrail = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(animateTrail);
    };

    animationFrameId = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Large Ambient Spotlight following mouse */}
      <div
        className="pointer-events-none fixed z-30 transition-opacity duration-300"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: "translate(-50%, -50%)",
          width: "480px",
          height: "480px",
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.14) 0%, rgba(99, 102, 241, 0.08) 35%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* 2. Trailing Outer Ring */}
      <div
        className="pointer-events-none fixed z-50 transition-all duration-75 ease-out"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.6 : 1})`,
          width: "36px",
          height: "36px",
          border: isHovered
            ? "1.5px solid rgba(192, 132, 252, 0.85)"
            : "1px solid rgba(168, 85, 247, 0.45)",
          backgroundColor: isHovered
            ? "rgba(168, 85, 247, 0.15)"
            : "transparent",
          borderRadius: "50%",
          boxShadow: isHovered
            ? "0 0 20px rgba(168, 85, 247, 0.4)"
            : "none",
        }}
      />

      {/* 3. Center Precision Dot */}
      <div
        className="pointer-events-none fixed z-50"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: "translate(-50%, -50%)",
          width: isHovered ? "6px" : "4px",
          height: isHovered ? "6px" : "4px",
          backgroundColor: isHovered ? "#f472b6" : "#c084fc",
          borderRadius: "50%",
          boxShadow: "0 0 10px rgba(192, 132, 252, 0.9)",
          transition: "width 0.15s, height 0.15s, background-color 0.15s",
        }}
      />
    </>
  );
}
