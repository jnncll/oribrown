import React from 'react';
import { MessageCircleIcon } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { contacts } from '../data/contacts';
import { buildWaLink } from '../utils/order';

export function Footer() {
  return (
    <footer className="border-t-[3px] border-cocoa bg-cocoa py-14 text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="inline-block rounded-2xl border-[3px] border-cream/30 bg-[#fde8d2]">
            <BrandLogo className="w-64 rounded-2xl" />
          </div>
          <p className="mt-5 font-display text-lg font-semibold">Kel 1: Joanna & Arvin</p>
          <p className="mt-1 text-cream/80">#ORIBROWN #UpcycledDessert #BrowniesWithPurpose</p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">Hubungi kami</h2>
          <ul className="mt-4 space-y-3">
            {contacts.map((c) =>
            <li key={c.id}>
                <a href={buildWaLink(c.wa)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-xl py-1 transition-colors duration-150 hover:text-zest focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zest/40">
                  <MessageCircleIcon className="h-5 w-5" strokeWidth={2.5} />
                  <span className="font-display font-semibold">{c.name}</span>
                  <span className="text-cream/80">{c.phoneDisplay}</span>
                </a>
              </li>
            )}
          </ul>
          <p className="mt-8 text-sm text-cream/60">© 2026 Oribrown. A Little Orange, A Lot of Brownie.</p>
        </div>
      </div>
    </footer>);

}