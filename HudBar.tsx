import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBasketIcon } from 'lucide-react';
import { useShop } from '../contexts/ShopContext';
import { BrandLogo } from './BrandLogo';

const NAV = [
{ href: '#bedah', label: 'Bedah Brownie' },
{ href: '#kenapa', label: 'Kenapa Oribrown' },
{ href: '#pesan', label: 'Pesan' },
{ href: '#review', label: 'Review' }];


export function HudBar() {
  const { cartQty, cartPulse, openCart, stockLeft } = useShop();
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-cocoa bg-cream">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="shrink-0 rounded-xl border-[3px] border-cocoa bg-[#fde8d2] shadow-toon-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zest/40" aria-label="Oribrown, kembali ke atas">
          <BrandLogo className="h-11 rounded-lg" />
        </a>
        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) =>
            <li key={n.href}>
                <a href={n.href} className="whitespace-nowrap rounded-xl px-3 py-2 font-display font-semibold transition-colors duration-150 hover:bg-vanilla focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zest/40">
                  {n.label}
                </a>
              </li>
            )}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden whitespace-nowrap rounded-xl border-[3px] border-cocoa bg-vanilla px-3 py-1.5 font-display text-sm font-semibold sm:inline-block">
            Stok {stockLeft}/40
          </span>
          <motion.button
            key={cartPulse}
            id="hud-cart"
            type="button"
            onClick={openCart}
            aria-label={`Buka keranjang, ${cartQty} cup`}
            className="btn-primary relative px-3.5"
            initial={cartPulse ? { scale: 0.9, rotate: -8 } : false}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
            
            <ShoppingBasketIcon className="h-5 w-5" strokeWidth={2.5} />
            <span className="hidden sm:inline">Keranjang</span>
            {cartQty > 0 &&
            <span className="absolute -right-2 -top-2 grid h-6 min-w-[1.5rem] place-items-center rounded-full border-[3px] border-cocoa bg-vanilla px-1 text-xs font-bold text-cocoa">
                {cartQty}
              </span>
            }
          </motion.button>
        </div>
      </div>
    </header>);

}