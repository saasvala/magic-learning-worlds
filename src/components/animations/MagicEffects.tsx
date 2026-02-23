import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stars = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 3,
}));

export const FloatingStars = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {stars.map((star) => (
      <motion.div
        key={star.id}
        className="absolute rounded-full bg-primary"
        style={{
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: star.size,
          height: star.size,
        }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: star.duration,
          repeat: Infinity,
          delay: star.delay,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export const XPBurst = ({ show }: { show: boolean }) => {
  if (!show) return null;
  return (
    <motion.div
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: [0, 1.5, 1], opacity: [1, 0.8, 0] }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 rounded-full bg-primary/30"
    />
  );
};

export const GlowOrb = ({ color = "primary", size = 200, className = "" }: { color?: string; size?: number; className?: string }) => (
  <div
    className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
    style={{
      width: size,
      height: size,
      background: color === "primary" ? "hsl(42 100% 58%)" : color === "purple" ? "hsl(270 80% 65%)" : "hsl(210 90% 55%)",
    }}
  />
);
