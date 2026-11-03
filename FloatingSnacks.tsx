import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CitrusIcon, CookieIcon, LeafIcon, SparkleIcon } from 'lucide-react';

type Tone = 'light' | 'dark';

const ITEMS = [
{ Icon: CitrusIcon, light: 'text-zest', dark: 'text-zest', l: '3%', t: '10%', s: 36, d: 0, dur: 5 },
{ Icon: LeafIcon, light: 'text-leaf', dark: 'text-caramel', l: '46%', t: '5%', s: 26, d: 0.6, dur: 6 },
{ Icon: CookieIcon, light: 'text-choco', dark: 'text-cream', l: '93%', t: '8%', s: 30, d: 1.2, dur: 5.5 },
{ Icon: SparkleIcon, light: 'text-burnt', dark: 'text-zest', l: '55%', t: '90%', s: 24, d: 0.3, dur: 4.5 },
{ Icon: CitrusIcon, light: 'text-burnt', dark: 'text-caramel', l: '90%', t: '86%', s: 40, d: 0.9, dur: 6.5 },
{ Icon: SparkleIcon, light: 'text-zest', dark: 'text-cream', l: '2%', t: '72%', s: 22, d: 1.5, dur: 5 },
{ Icon: CookieIcon, light: 'text-choco', dark: 'text-caramel', l: '36%', t: '95%', s: 24, d: 2, dur: 6 }];


export function FloatingSnacks({ tone = 'light' }: {tone?: Tone;}) {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
      {ITEMS.map(({ Icon, light, dark, l, t, s, d, dur }, i) =>
      <motion.span
        key={i}
        className={`absolute ${tone === 'dark' ? dark : light} opacity-70`}
        style={{ left: l, top: t }}
        animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, i % 2 ? 12 : -12, 0] }}
        transition={{ duration: dur, delay: d, repeat: Infinity, ease: 'easeInOut' }}>
        
          <Icon style={{ width: s, height: s }} strokeWidth={2.5} />
        </motion.span>
      )}
    </div>);

}