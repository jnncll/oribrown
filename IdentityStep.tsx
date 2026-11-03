import React from 'react';
import { classOptions } from '../../data/orderOptions';
import type { CheckoutStepProps } from './useCheckoutForm';

export function IdentityStep({ values, errors, update }: CheckoutStepProps) {
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="co-name" className="toon-label">Nama lengkap</label>
        <input id="co-name" className="toon-input" value={values.name} onChange={(e) => update('name', e.target.value)} placeholder="mis. Nadia Putri" autoComplete="name" />
        {errors.name && <p className="toon-error">{errors.name}</p>}
      </div>

      <fieldset>
        <legend className="toon-label">Kelas</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {classOptions.map((opt) => {
            const selected = values.kelasChoice === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                aria-pressed={selected}
                onClick={() => update('kelasChoice', opt.value)}
                className={`chip-toggle ${selected ? 'bg-zest text-white' : 'bg-white text-cocoa hover:bg-cream'}`}>
                
                {opt.label}
              </button>);

          })}
        </div>
        {errors.kelasChoice && <p className="toon-error">{errors.kelasChoice}</p>}
      </fieldset>

      {values.kelasChoice === 'Lainnya' &&
      <div>
          <label htmlFor="co-kelas-other" className="toon-label">Tulis kelas / status kamu</label>
          <input id="co-kelas-other" className="toon-input" value={values.kelasOther} onChange={(e) => update('kelasOther', e.target.value)} placeholder="mis. Staf TU, Alumni, Orang tua" />
          {errors.kelasOther && <p className="toon-error">{errors.kelasOther}</p>}
        </div>
      }
    </div>);

}