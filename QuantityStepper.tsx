import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface QuantityStepperProps {
  value: number;
  max: number;
  min?: number;
  onChange: (value: number) => void;
  label?: string;
}

export function QuantityStepper({ value, max, min = 1, onChange, label = 'Jumlah' }: QuantityStepperProps) {
  const btn =
  'grid h-10 w-10 place-items-center transition-colors duration-150 hover:bg-cream focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-zest/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent';
  return (
    <div role="group" aria-label={label} className="inline-flex items-center overflow-hidden rounded-2xl border-[3px] border-cocoa bg-white shadow-toon-sm">
      <button type="button" aria-label="Kurangi" disabled={value <= min} onClick={() => onChange(value - 1)} className={btn}>
        <MinusIcon className="h-4 w-4" strokeWidth={3} />
      </button>
      <span aria-live="polite" className="min-w-[2.75rem] border-x-[3px] border-cocoa py-1.5 text-center font-display text-lg font-bold">
        {value}
      </span>
      <button type="button" aria-label="Tambah" disabled={value >= max} onClick={() => onChange(value + 1)} className={btn}>
        <PlusIcon className="h-4 w-4" strokeWidth={3} />
      </button>
    </div>);

}