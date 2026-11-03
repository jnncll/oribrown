import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ScissorsIcon } from 'lucide-react';

const TOP_ZEST = [
{ l: 12, r: -20 }, { l: 24, r: 35 }, { l: 38, r: -10 }, { l: 50, r: 50 },
{ l: 63, r: -30 }, { l: 75, r: 15 }, { l: 87, r: -40 }];

const CRUMBS = [
{ l: 10, t: 50 }, { l: 25, t: 70 }, { l: 40, t: 45 }, { l: 55, t: 75 }, { l: 70, t: 50 }, { l: 85, t: 68 }];


export function WholeBrownie({ onOpen }: {onOpen: () => void;}) {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className="mb-5 rounded-2xl border-[3px] border-cocoa bg-vanilla px-4 py-2 font-display font-semibold text-cocoa shadow-toon-sm"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
        
        Klik untuk membedah!
      </motion.div>
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Bedah brownie untuk melihat bahan-bahannya"
        className="group relative h-48 w-64 rounded-[28px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zest/60 sm:w-80"
        whileHover={reduce ? undefined : { rotate: -2, y: -4 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}>
        
        <div className="absolute inset-x-0 bottom-0 top-6 overflow-hidden rounded-[28px] border-4 border-cocoa bg-choco shadow-toon-lg">
          <div className="absolute inset-x-0 top-0 h-12 border-b-4 border-cocoa bg-[#3b2116]">
            <span className="absolute left-6 top-3 h-2 w-20 rounded-full bg-white/25" />
            <span className="absolute right-10 top-6 h-0.5 w-10 rotate-12 bg-[#5a3322]" />
            <span className="absolute left-1/2 top-4 h-0.5 w-8 -rotate-12 bg-[#5a3322]" />
          </div>
          {CRUMBS.map((c, i) =>
          <span key={i} className="absolute h-2 w-2 rounded-full bg-[#5a3322]" style={{ left: `${c.l}%`, top: `${c.t}%` }} />
          )}
          <span className="absolute inset-y-0 left-1/2 w-0 border-l-[3px] border-dashed border-cream/70 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
        </div>
        {TOP_ZEST.map((z, i) =>
        <span
          key={i}
          className="absolute top-5 h-3 w-4 rounded-full border-2 border-cocoa bg-zest"
          style={{ left: `${z.l}%`, transform: `rotate(${z.r}deg)` }} />

        )}
        <span className="absolute -right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border-[3px] border-cocoa bg-zest text-white shadow-toon-sm">
          <ScissorsIcon className="h-5 w-5" strokeWidth={2.5} />
        </span>
      </motion.button>
    </div>);

}