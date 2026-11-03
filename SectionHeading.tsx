import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from 'lucide-react';

interface SectionHeadingProps {
  level: number;
  title: string;
  desc: React.ReactNode;
  tone?: 'light' | 'dark';
}

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

export function SectionHeading({ level, title, desc, tone = 'light' }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <motion.span
        initial={{ opacity: 0, scale: 0.96, rotate: -6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.25, ease: EASE }}
        className={`inline-flex items-center gap-1.5 rounded-xl border-[3px] border-cocoa px-3 py-1 font-display text-sm font-semibold shadow-toon-sm ${
        tone === 'dark' ? 'bg-zest text-cocoa' : 'bg-choco text-cream'}`
        }>
        
        <StarIcon className="h-4 w-4 fill-current" strokeWidth={2} />
        Level {level}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.3, delay: 0.05, ease: EASE }}
        className="mt-3 font-display text-4xl font-bold sm:text-5xl">
        
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.3, delay: 0.1, ease: EASE }}
        className={`mt-3 text-lg ${tone === 'dark' ? 'text-cream/85' : 'text-cocoa/80'}`}>
        
        {desc}
      </motion.p>
    </div>);

}