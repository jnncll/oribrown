import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const COLORS = ['#fd5a01', '#ce5c03', '#734933', '#d19975', '#4a7324', '#ffe6c1'];

export function ConfettiBurst({ count = 26 }: {count?: number;}) {
  const reduce = useReducedMotion();
  const pieces = useMemo(
    () =>
    Array.from({ length: count }, (_, i) => {
      const angle = i / count * Math.PI * 2 + Math.random() * 0.4;
      const dist = 80 + Math.random() * 120;
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 40,
        r: Math.random() * 540 - 270,
        c: COLORS[i % COLORS.length],
        w: 7 + Math.random() * 6,
        round: i % 3 === 0
      };
    }),
    [count]
  );

  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute left-1/2 top-1/3 z-20" aria-hidden="true">
      {pieces.map((p, i) =>
      <motion.span
        key={i}
        className={`absolute block border-2 border-cocoa ${p.round ? 'rounded-full' : 'rounded-sm'}`}
        style={{ width: p.w, height: p.round ? p.w : p.w * 0.6, backgroundColor: p.c }}
        initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
        animate={{ x: p.x, y: [0, p.y, p.y + 70], opacity: [1, 1, 0], rotate: p.r }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }} />

      )}
    </div>);

}