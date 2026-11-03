import React from 'react';
import { BellRingIcon } from 'lucide-react';
import { useShop } from '../contexts/ShopContext';
import { FULFILLMENT_LABEL, PREORDER_LABEL } from '../utils/schedule';

export function ScheduleTicker() {
  const { phase } = useShop();
  const status = phase === 'open' ? 'Pre-order DIBUKA — sudah bisa pesan!' : 'Pre-order gelombang ini telah selesai';
  return (
    <div className="bg-cocoa px-4 py-2 text-center text-sm text-cream">
      <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5">
        <BellRingIcon className="h-4 w-4 animate-bounce text-zest" strokeWidth={2.5} aria-hidden="true" />
        <strong className="font-display font-semibold text-zest">{status}</strong>
        <span>Pre-Order: {PREORDER_LABEL}</span>
        <span className="hidden sm:inline" aria-hidden="true">·</span>
        <span>Ambil/Kirim: {FULFILLMENT_LABEL}</span>
      </p>
    </div>);

}