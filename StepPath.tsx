import React from 'react';
import { CheckIcon } from 'lucide-react';
import { CHECKOUT_STEPS } from './useCheckoutForm';

export function StepPath({ current }: {current: number;}) {
  return (
    <ol className="mb-6 flex items-center" aria-label="Tahapan pemesanan">
      {CHECKOUT_STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none" aria-current={active ? 'step' : undefined}>
            <div className="flex flex-col items-center gap-1">
              <span
                className={`grid h-9 w-9 place-items-center rounded-full border-[3px] border-cocoa font-display font-bold transition-colors duration-200 ${
                done ? 'bg-leaf text-white' : active ? 'bg-zest text-white' : 'bg-vanilla text-cocoa/50'}`
                }>
                
                {done ? <CheckIcon className="h-4 w-4" strokeWidth={3.5} /> : i + 1}
              </span>
              <span className={`text-xs font-bold ${active ? 'text-cocoa' : 'text-cocoa/60'}`}>{label}</span>
            </div>
            {i < CHECKOUT_STEPS.length - 1 &&
            <div className="mx-2 mb-5 h-1 flex-1 overflow-hidden rounded-full bg-cocoa/15">
                <div className={`h-full bg-leaf transition-[width] duration-300 ease-toon ${done ? 'w-full' : 'w-0'}`} />
              </div>
            }
          </li>);

      })}
    </ol>);

}