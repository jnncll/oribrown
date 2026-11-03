import React from 'react';
import { StoreIcon, TruckIcon } from 'lucide-react';
import { QuantityStepper } from '../QuantityStepper';
import { pickupDates } from '../../data/orderOptions';
import { product } from '../../data/product';
import { formatRupiah } from '../../utils/format';
import type { CheckoutStepProps } from './useCheckoutForm';
import type { FulfillmentMethod } from '../../types/shop';

const METHODS: {value: FulfillmentMethod;label: string;hint: string;icon: typeof StoreIcon;}[] = [
{ value: 'ambil', label: 'Ambil sendiri', hint: 'Ketemu Joanna/Arvin di sekolah', icon: StoreIcon },
{ value: 'antar', label: 'Diantarkan', hint: 'Diantar ke lokasi yang kamu tulis', icon: TruckIcon }];


export function OrderDetailsStep({ values, errors, update, stockLeft }: CheckoutStepProps & {stockLeft: number;}) {
  return (
    <div className="space-y-6">
      <div>
        <span className="toon-label">Jumlah pesanan</span>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-[3px] border-cocoa/20 bg-white/60 p-3">
          <QuantityStepper value={values.quantity} max={stockLeft} onChange={(n) => update('quantity', n)} label="Jumlah cup" />
          <div className="text-right">
            <p className="text-xs font-bold text-cocoa/60">{values.quantity} × {formatRupiah(product.price)}</p>
            <p className="font-display text-xl font-bold">{formatRupiah(values.quantity * product.price)}</p>
          </div>
        </div>
        <p className="mt-1.5 text-xs font-semibold text-cocoa/60">Stok tersisa {stockLeft} cup</p>
        {errors.quantity && <p className="toon-error">{errors.quantity}</p>}
      </div>

      <fieldset>
        <legend className="toon-label">Diantarkan atau diambil sendiri?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {METHODS.map(({ value, label, hint, icon: Icon }) => {
            const selected = values.method === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => update('method', value)}
                className={`chip-toggle flex items-center gap-3 p-3 text-left ${selected ? 'bg-zest text-white' : 'bg-white hover:bg-cream'}`}>
                
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border-[3px] border-cocoa ${selected ? 'bg-vanilla text-cocoa' : 'bg-cream'}`}>
                  <Icon className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <span>
                  <span className="block text-base">{label}</span>
                  <span className={`block font-body text-xs font-semibold ${selected ? 'text-white' : 'text-cocoa/65'}`}>{hint}</span>
                </span>
              </button>);

          })}
        </div>
        {errors.method && <p className="toon-error">{errors.method}</p>}
      </fieldset>

      {values.method === 'antar' &&
      <div>
          <label htmlFor="co-location" className="toon-label">Lokasi pengantaran</label>
          <input id="co-location" className="toon-input" value={values.location} onChange={(e) => update('location', e.target.value)} placeholder="mis. Kelas XI IPA, lantai 2 / Ruang Guru" />
          {errors.location && <p className="toon-error">{errors.location}</p>}
        </div>
      }

      <fieldset>
        <legend className="toon-label">Tanggal {values.method === 'antar' ? 'pengiriman' : 'pengambilan'}</legend>
        <div className="grid grid-cols-5 gap-2">
          {pickupDates.map((d) => {
            const selected = values.date === d.value;
            return (
              <button
                key={d.value}
                type="button"
                aria-pressed={selected}
                aria-label={d.label}
                onClick={() => update('date', d.value)}
                className={`chip-toggle flex flex-col items-center px-1 py-2 ${selected ? 'bg-zest text-white' : 'bg-white hover:bg-cream'}`}>
                
                <span className="text-xs">{d.day}</span>
                <span className="text-2xl leading-none">{d.date}</span>
                <span className="text-[11px]">Okt</span>
              </button>);

          })}
        </div>
        {errors.date && <p className="toon-error">{errors.date}</p>}
      </fieldset>

      <div>
        <label htmlFor="co-details" className="toon-label">
          Detail pesanan <span className="font-body font-normal text-cocoa/60">(opsional)</span>
        </label>
        <textarea
          id="co-details"
          rows={3}
          className="toon-input resize-none"
          value={values.details}
          onChange={(e) => update('details', e.target.value)}
          placeholder="mis. jam istirahat kedua, tambah sendok, pesanan untuk 2 orang, dll." />
        
      </div>
    </div>);

}