import React from 'react';
import { useShop } from '../contexts/ShopContext';
import { Countdown } from './Countdown';
import { PREORDER_END, isBeforeOfficialStart } from '../utils/schedule';

export function PhaseStatus() {
  const { phase } = useShop();
  if (phase === 'closed') {
    return (
      <div className="rounded-2xl border-[3px] border-cocoa bg-cocoa p-4 text-cream">
        <p className="font-display font-semibold">Jadwal pre-order telah selesai</p>
        <p className="text-sm text-cream/85">Hubungi Joanna atau Arvin kalau masih mau pesan.</p>
      </div>);

  }
  const early = isBeforeOfficialStart(new Date());
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border-[3px] border-cocoa bg-choco p-4 text-cream">
      <div className="min-w-[180px] flex-1">
        <p className="font-display font-semibold">Pre-order ditutup dalam</p>
        <p className="text-sm text-cream/85">
          {early ? 'Resmi dibuka 5 Okt, tapi sudah bisa pesan dari sekarang!' : 'Sampai 11 Oktober 2026, 23.59 WIB'}
        </p>
      </div>
      <Countdown target={PREORDER_END} />
    </div>);

}