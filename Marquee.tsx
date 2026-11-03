import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SparkleIcon } from 'lucide-react';

interface MarqueeProps {
  items: string[];
  tone?: 'zest' | 'choco';
  reverse?: boolean;
}

export function Marquee({ items, tone = 'zest', reverse = false }: MarqueeProps) {
  const reduce = useReducedMotion();
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y-[3px] border-cocoa py-3 ${tone === 'zest' ? 'bg-zest text-white' : 'bg-choco text-cream'}`} aria-hidden="true">
      <motion.div
        className="flex w-max"
        animate={reduce ? undefined : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 26, ease: 'linear', repeat: Infinity }}>
        
        {row.map((t, i) =>
        <span key={i} className="flex items-center gap-6 whitespace-nowrap pr-6 font-display text-xl font-semibold">
            {t}
            <SparkleIcon className="h-5 w-5" strokeWidth={2.5} />
          </span>
        )}
      </motion.div>
    </div>);

}