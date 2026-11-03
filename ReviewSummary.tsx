import React from 'react';
import { reviewAspects } from '../../data/reviewAspects';
import { StarRating } from './StarRating';
import type { Review, ReviewKind } from '../../types/review';

interface ReviewSummaryProps {
  kind: ReviewKind;
  reviews: Review[];
}

export function ReviewSummary({ kind, reviews }: ReviewSummaryProps) {
  const count = reviews.length;
  const avg = count ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;
  const aspects = reviewAspects[kind];

  return (
    <div className="toon-card p-5">
      <div className="flex items-center gap-4">
        <div className="font-display text-5xl font-bold leading-none">{count ? avg.toFixed(1) : '–'}</div>
        <div>
          <StarRating value={avg} size="md" />
          <p className="mt-1 text-sm font-semibold text-cocoa/70">{count ? `dari ${count} review` : 'Belum ada review'}</p>
        </div>
      </div>

      <div className="mt-5 space-y-1.5">
        {[5, 4, 3, 2, 1].map((star) => {
          const n = reviews.filter((r) => r.rating === star).length;
          const pct = count ? n / count * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-2 text-xs font-bold">
              <span className="w-3 text-right">{star}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full border-2 border-cocoa bg-white">
                <div className="h-full bg-zest" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-5 text-right text-cocoa/60">{n}</span>
            </div>);

        })}
      </div>

      <div className="mt-5 border-t-2 border-dashed border-cocoa/20 pt-4">
        <p className="mb-2 font-display text-sm font-semibold">Rata-rata per aspek</p>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
          {aspects.map((a) => {
            const v = count ? reviews.reduce((s, r) => s + (r.aspects[a.key] ?? 0), 0) / count : 0;
            return (
              <div key={a.key} className="flex items-baseline justify-between gap-2 text-sm">
                <dt className="text-cocoa/75">{a.label}</dt>
                <dd className="font-display font-semibold">{count ? v.toFixed(1) : '–'}</dd>
              </div>);

          })}
        </dl>
      </div>
    </div>);

}