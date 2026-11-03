import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PlayIcon, ScissorsIcon } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { StockMeter } from './StockMeter';
import { PhaseStatus } from './PhaseStatus';
import { FloatingSnacks } from './FloatingSnacks';
import { images } from '../data/images';
import { product } from '../data/product';
import { formatRupiah } from '../utils/format';

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
const HEADLINE = [
{ w: 'Brownies' }, { w: 'fudgy' }, { w: 'dengan' }, { w: 'rahasia' }, { w: 'kecil' }, { w: 'dari' },
{ w: 'kulit', hl: true }, { w: 'jeruk.', hl: true }];

const ORIRI_LINES = ['Hai, aku Oriri!', 'Cobain deh, ada jeruknya!', 'Cuma 40 cup lho!'];

function rise(delay: number) {
  return { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, delay, ease: EASE } };
}

export function Hero() {
  const reduce = useReducedMotion();
  const [line, setLine] = useState(0);

  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      <FloatingSnacks />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-12 lg:grid-cols-[1.05fr_1fr] lg:pt-16">
        <div>
          <motion.div {...rise(0)} className="inline-block -rotate-1 rounded-3xl border-[3px] border-cocoa bg-[#fde8d2] shadow-toon-lg">
            <BrandLogo className="w-72 rounded-3xl sm:w-96" />
          </motion.div>

          <motion.p {...rise(0.08)} className="mt-6 inline-flex items-center rounded-full border-[3px] border-cocoa bg-cocoa px-4 py-1.5 font-display text-sm font-semibold text-cream">
            Kel 1: Joanna & Arvin
          </motion.p>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
            {HEADLINE.map((word, i) =>
            <motion.span
              key={i}
              className={`mr-[0.25em] inline-block ${word.hl ? 'text-burnt' : ''}`}
              initial={{ opacity: 0, y: 18, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.28, delay: 0.12 + i * 0.04, ease: EASE }}>
              
                {word.w}
              </motion.span>
            )}
          </h1>
          <motion.p {...rise(0.45)} className="mt-4 max-w-xl text-lg leading-relaxed text-cocoa/85">
            Oribrown adalah brownies cokelat yang lembut dan fudgy, diberi sentuhan citrus dari bubuk kulit jeruk yang di-upcycle. Cokelatnya tetap juara, jeruknya jadi kejutan.
          </motion.p>

          <motion.div {...rise(0.52)} className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#pesan" className="btn-primary px-6 py-3 text-lg">
              <PlayIcon className="h-5 w-5 fill-white" strokeWidth={2.5} />
              Mulai Pesan
            </a>
            <a href="#bedah" className="btn-secondary px-6 py-3 text-lg">
              <ScissorsIcon className="h-5 w-5" strokeWidth={2.5} />
              Bedah Brownie
            </a>
          </motion.div>

          <motion.div {...rise(0.6)} className="mt-8 max-w-xl">
            <PhaseStatus />
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.3, delay: 0.15, ease: EASE }}>
            
            <motion.div
              className="overflow-hidden rounded-[36px] border-[3px] border-cocoa bg-[#fbe3c3] shadow-toon-lg"
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              
              <img src={images.heroCup} alt={`Ilustrasi ${product.name} Oribrown dalam cup`} className="aspect-square w-full object-cover" />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -left-4 top-6 rounded-2xl border-[3px] border-cocoa bg-zest px-4 py-2 text-white shadow-toon sm:-left-8"
            initial={{ rotate: -8 }}
            animate={reduce ? { rotate: -8 } : { rotate: [-8, -3, -8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
            
            <p className="font-display text-2xl font-bold leading-none">{formatRupiah(product.price)}</p>
            <p className="text-sm font-bold">per cup</p>
          </motion.div>

          <div className="absolute -bottom-8 left-4 right-20 rounded-2xl border-[3px] border-cocoa bg-vanilla p-4 shadow-toon sm:right-28">
            <p className="font-display text-lg font-semibold">{product.name}</p>
            <div className="mt-2">
              <StockMeter />
            </div>
          </div>

          <div className="absolute -bottom-16 -right-4 z-10 w-28 sm:-right-10 sm:w-40">
            <AnimatePresence mode="wait">
              <motion.p
                key={line}
                className="absolute -top-10 right-6 whitespace-nowrap rounded-2xl border-[3px] border-cocoa bg-white px-3 py-1 font-display text-sm font-semibold shadow-toon-sm"
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, delay: line === 0 ? 0.8 : 0, ease: EASE }}>
                
                {ORIRI_LINES[line]}
              </motion.p>
            </AnimatePresence>
            <motion.button
              type="button"
              onClick={() => setLine((l) => (l + 1) % ORIRI_LINES.length)}
              aria-label="Sapa Oriri"
              className="block w-full mix-blend-multiply focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zest/50"
              whileHover={reduce ? undefined : { rotate: -5, y: -4 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.16, ease: EASE }}>
              
              <img src={images.oriri} alt="Oriri, maskot beruang chef Oribrown" className="w-full" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>);

}