import React from 'react';
import { useNow } from '../hooks/useNow';
import { getTimeParts } from '../utils/schedule';

export function Countdown({ target }: {target: Date;}) {
  const now = useNow(1000);
  const t = getTimeParts(target, now);
  const parts = [
  { v: t.days, l: 'hari' },
  { v: t.hours, l: 'jam' },
  { v: t.minutes, l: 'menit' },
  { v: t.seconds, l: 'detik' }];

  return (
    <div className="flex gap-2" aria-live="off">
      {parts.map((p) =>
      <div key={p.l} className="w-14 rounded-xl border-[3px] border-cocoa bg-vanilla py-1 text-center text-cocoa">
          <div className="font-display text-xl font-bold tabular-nums leading-tight">{String(p.v).padStart(2, '0')}</div>
          <div className="text-[10px] font-bold uppercase text-cocoa/70">{p.l}</div>
        </div>
      )}
    </div>);

}