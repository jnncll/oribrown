import React from 'react';
import { MessageCircleIcon } from 'lucide-react';
import { contacts } from '../data/contacts';
import { images } from '../data/images';
import { buildWaLink } from '../utils/order';

interface ClosedNoticeProps {
  title?: string;
  compact?: boolean;
}

export function ClosedNotice({ title = 'Jadwal pre-order telah selesai', compact = false }: ClosedNoticeProps) {
  return (
    <div className={`${compact ? '' : 'toon-card flex flex-col items-center gap-6 p-8 text-center md:flex-row md:text-left'}`}>
      {!compact && <img src={images.oriri} alt="Oriri" className="h-32 w-32 shrink-0 rounded-full border-[3px] border-cocoa bg-white object-contain p-1" />}
      <div className={compact ? 'text-center' : ''}>
        <h3 className={`font-display font-bold ${compact ? 'text-lg' : 'text-3xl'}`}>{title}</h3>
        <p className="mt-2 text-cocoa/80">
          Silahkan hubungi lebih lanjut kedua kontak berikut jika hendak memesan (Joanna/Arvin).
        </p>
        <div className={`mt-4 flex flex-wrap gap-3 ${compact ? 'justify-center' : 'justify-center md:justify-start'}`}>
          {contacts.map((c) =>
          <a key={c.id} href={buildWaLink(c.wa)} target="_blank" rel="noopener noreferrer" className="btn-toon bg-leaf text-white">
              <MessageCircleIcon className="h-4 w-4" strokeWidth={2.5} />
              {c.name} · {c.phoneDisplay}
            </a>
          )}
        </div>
      </div>
    </div>);

}