import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShop } from '../contexts/ShopContext';
import { images } from '../data/images';

export function CartFlyer() {
  const { flight, clearFlight } = useShop();
  const target = flight ? document.getElementById('hud-cart')?.getBoundingClientRect() : undefined;

  return (
    <AnimatePresence>
      {flight && target &&
      <motion.img
        key={flight.id}
        src={images.heroCup}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] h-14 w-14 rounded-xl border-[3px] border-cocoa object-cover shadow-toon-sm"
        initial={{ x: flight.x - 28, y: flight.y - 28, scale: 1, rotate: 0 }}
        animate={{ x: target.left + target.width / 2 - 28, y: target.top + target.height / 2 - 28, scale: 0.35, rotate: 25 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
        onAnimationComplete={clearFlight} />

      }
    </AnimatePresence>);

}