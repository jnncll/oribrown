import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { images } from '../data/images';
import { guideTips, oririFacts } from '../data/guideTips';

const SECTION_IDS = ['top', 'bedah', 'kenapa', 'pesan', 'review'];

export function OririGuide() {
  const reduce = useReducedMotion();
  const [section, setSection] = useState('top');
  const [open, setOpen] = useState(true);
  const [factIndex, setFactIndex] = useState<number | null>(null);
  const [wiggle, setWiggle] = useState(0);

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setSection(visible.target.id);
          setFactIndex(null);
        }
      },
      { threshold: [0.2, 0.5], rootMargin: '-20% 0px -40% 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const message = factIndex !== null ? oririFacts[factIndex] : guideTips[section] ?? guideTips.top;

  function handleClick() {
    setOpen(true);
    setFactIndex((i) => i === null ? 0 : (i + 1) % oririFacts.length);
    setWiggle((w) => w + 1);
  }

  return (
    <div className="fixed bottom-4 left-4 z-30 flex items-end gap-2">
      <motion.button
        key={wiggle}
        type="button"
        onClick={handleClick}
        aria-label="Oriri, klik untuk fakta seru"
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-[3px] border-cocoa bg-white shadow-toon focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zest/50 sm:h-24 sm:w-24"
        initial={false}
        animate={wiggle && !reduce ? { rotate: [0, -14, 10, -6, 0] } : undefined}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
        
        <motion.img
          src={images.oriri}
          alt="Oriri, maskot Oribrown"
          className="h-full w-full object-contain p-1"
          animate={reduce ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
        
      </motion.button>
      <AnimatePresence mode="wait">
        {open &&
        <motion.div
          key={message}
          role="status"
          className="relative mb-8 max-w-[220px] rounded-2xl border-[3px] border-cocoa bg-vanilla px-3.5 py-2.5 text-sm font-semibold text-cocoa shadow-toon-sm sm:max-w-[260px]"
          initial={{ opacity: 0, scale: 0.96, x: -8 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}>
          
            <p className="font-display text-xs font-semibold text-choco">Oriri</p>
            <p>{message}</p>
            <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup pesan Oriri"
            className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border-2 border-cocoa bg-white">
            
              <XIcon className="h-3 w-3" strokeWidth={3} />
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}