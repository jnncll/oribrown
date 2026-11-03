import React, { useState } from 'react';
import { KeyRoundIcon, LockIcon } from 'lucide-react';
import { useShop } from '../../contexts/ShopContext';
import { useReviews } from '../../contexts/ReviewContext';
import type { Order } from '../../types/shop';

interface ProductReviewGateProps {
  onUnlock: (order: Order) => void;
}

export function ProductReviewGate({ onUnlock }: ProductReviewGateProps) {
  const { orders } = useShop();
  const { reviews } = useReviews();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const reviewed = new Set(reviews.map((r) => r.orderNumber).filter(Boolean));
  const pending = orders.filter((o) => !reviewed.has(o.orderNumber));

  function verify(value: string) {
    const normalized = value.trim().toUpperCase();
    if (!normalized) {
      setError('Masukkan nomor pesananmu.');
      return;
    }
    const order = orders.find((o) => o.orderNumber === normalized);
    if (!order) {
      setError('Nomor pesanan tidak ditemukan. Pastikan kamu sudah order lewat website ini di perangkat yang sama.');
      return;
    }
    if (reviewed.has(normalized)) {
      setError('Nomor pesanan ini sudah dipakai untuk menulis review.');
      return;
    }
    setError('');
    onUnlock(order);
  }

  return (
    <div className="toon-card p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-[3px] border-cocoa bg-choco text-cream">
          <LockIcon className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold">Level terkunci</h3>
          <p className="text-sm text-cocoa/75">Khusus untuk yang sudah order.</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed">
        Masukkan nomor pesanan (contoh: <strong>ORB-7K2P</strong>) yang kamu dapat saat checkout untuk membuka form review makanan & service.
      </p>
      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          verify(code);
        }}>
        
        <label htmlFor="order-code" className="sr-only">Nomor pesanan</label>
        <input
          id="order-code"
          className="toon-input uppercase tracking-wider"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError('');
          }}
          placeholder="ORB-XXXX" />
        
        <button type="submit" className="btn-dark shrink-0 px-4">
          <KeyRoundIcon className="h-4 w-4" strokeWidth={2.5} />
          Buka
        </button>
      </form>
      {error && <p className="toon-error">{error}</p>}
      {pending.length > 0 &&
      <div className="mt-4">
          <p className="text-xs font-bold text-cocoa/70">Pesananmu di perangkat ini:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {pending.map((o) =>
          <button key={o.orderNumber} type="button" onClick={() => verify(o.orderNumber)} className="chip-toggle bg-cream">
                {o.orderNumber}
              </button>
          )}
          </div>
        </div>
      }
    </div>);

}