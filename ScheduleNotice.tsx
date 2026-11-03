import React, { useState } from 'react';
import { CalendarClockIcon, PackageCheckIcon } from 'lucide-react';
import { Modal } from './Modal';
import { useShop } from '../contexts/ShopContext';
import { images } from '../data/images';
import { FULFILLMENT_LABEL, PREORDER_LABEL } from '../utils/schedule';

const KEY = 'oribrown:notice-seen';

export function ScheduleNotice() {
  const { phase } = useShop();
  const [open, setOpen] = useState(() => {
    try {
      return window.sessionStorage.getItem(KEY) !== '1';
    } catch {
      return true;
    }
  });

  function close() {
    try {
      window.sessionStorage.setItem(KEY, '1');
    } catch {

      // ignore
    }setOpen(false);
  }

  return (
    <Modal open={open} onClose={close} title="Notifikasi">
      <div className="flex items-center gap-4">
        <img src={images.oriri} alt="Oriri" className="h-20 w-20 shrink-0 rounded-full border-[3px] border-cocoa bg-white object-contain p-1" />
        <p className="font-display text-xl font-semibold leading-snug">
          {phase === 'closed' ? 'Jadwal pre-order telah selesai!' : 'Pre-order Oribrown gelombang ini!'}
        </p>
      </div>
      <ul className="mt-5 space-y-3">
        <li className="flex items-center gap-3 rounded-2xl border-[3px] border-cocoa bg-white p-3">
          <CalendarClockIcon className="h-6 w-6 shrink-0 text-burnt" strokeWidth={2.5} />
          <div>
            <p className="text-xs font-bold text-cocoa/70">Jadwal Pre-Order</p>
            <p className="font-display text-lg font-semibold">{PREORDER_LABEL}</p>
          </div>
        </li>
        <li className="flex items-center gap-3 rounded-2xl border-[3px] border-cocoa bg-white p-3">
          <PackageCheckIcon className="h-6 w-6 shrink-0 text-burnt" strokeWidth={2.5} />
          <div>
            <p className="text-xs font-bold text-cocoa/70">Jadwal Ambil/Kirim Produk</p>
            <p className="font-display text-lg font-semibold">{FULFILLMENT_LABEL}</p>
          </div>
        </li>
      </ul>
      <p className="mt-4 text-sm text-cocoa/80">
        {phase === 'closed' ?
        'Silahkan hubungi Joanna atau Arvin jika hendak memesan.' :
        'Kamu sudah bisa pesan dari sekarang! Stok terbatas 40 cup. Selebihnya akan diinfokan kembali.'}
      </p>
      <button type="button" onClick={close} className="btn-primary mt-6 w-full">
        Siap, lanjut!
      </button>
    </Modal>);

}