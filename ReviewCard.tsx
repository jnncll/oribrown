import React, { useState } from 'react';
import { BadgeCheckIcon, Loader2Icon, StarIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { useReviews } from '../../contexts/ReviewContext';
import { reviewAspects } from '../../data/reviewAspects';
import { formatShortDate } from '../../utils/format';
import { StarRating } from './StarRating';
import type { Review } from '../../types/review';

interface ReviewCardProps {
  review: Review;
  onOpenPhoto: (src: string) => void;
}

export function ReviewCard({ review, onOpenPhoto }: ReviewCardProps) {
  const { isMine, deleteReview } = useReviews();
  const mine = isMine(review.id);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const aspects = reviewAspects[review.kind];

  async function handleDelete() {
    setDeleting(true);
    const ok = await deleteReview(review.id);
    setDeleting(false);
    if (ok) toast.success('Review kamu sudah dihapus');else
    {
      toast.error('Gagal menghapus review. Coba lagi.');
      setConfirming(false);
    }
  }

  return (
    <article className={`toon-card p-5 ${mine ? 'ring-4 ring-zest/30' : ''}`}>
      <header className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-[3px] border-cocoa bg-caramel font-display text-lg font-bold uppercase">
          {review.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h4 className="truncate font-display text-lg font-semibold">{review.name}</h4>
            {review.orderNumber &&
            <span className="inline-flex items-center gap-1 rounded-full border-2 border-leaf px-2 py-0.5 text-xs font-bold text-leaf">
                <BadgeCheckIcon className="h-3.5 w-3.5" />
                Pembeli terverifikasi
              </span>
            }
            {mine && <span className="rounded-full bg-cocoa px-2 py-0.5 text-xs font-bold text-cream">Review kamu</span>}
          </div>
          <p className="text-sm text-cocoa/70">
            {review.kelas || 'Pengunjung'} · {formatShortDate(review.createdAt)}
          </p>
        </div>
        <StarRating value={review.rating} size="sm" />
      </header>

      <p className="mt-3 whitespace-pre-line leading-relaxed">{review.comment}</p>

      <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {aspects.map((a) =>
        <div key={a.key} className="rounded-xl bg-cream px-3 py-2">
            <dt className="text-xs font-bold text-cocoa/70">{a.label}</dt>
            <dd className="flex items-center gap-1 font-display font-semibold">
              <StarIcon className="h-3.5 w-3.5 fill-zest text-cocoa" />
              {review.aspects[a.key] ?? '–'}/5
            </dd>
          </div>
        )}
      </dl>

      {review.photos.length > 0 &&
      <div className="mt-4 flex flex-wrap gap-2">
          {review.photos.map((src, i) =>
        <button
          key={i}
          type="button"
          onClick={() => onOpenPhoto(src)}
          aria-label={`Perbesar foto ${i + 1} dari ${review.name}`}
          className="h-20 w-20 overflow-hidden rounded-xl border-[3px] border-cocoa transition-transform duration-150 ease-toon hover:-rotate-3 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zest/40">
          
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
        )}
        </div>
      }

      {mine &&
      <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t-2 border-dashed border-cocoa/15 pt-3">
          {!confirming ?
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-bold transition-colors duration-150 hover:bg-cream focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zest/30">
          
              <Trash2Icon className="h-4 w-4 text-burnt" strokeWidth={2.5} />
              Hapus review saya
            </button> :

        <>
              <span className="text-sm font-bold">Yakin mau hapus?</span>
              <button type="button" onClick={() => setConfirming(false)} disabled={deleting} className="btn-secondary px-3 py-1 text-sm">
                Batal
              </button>
              <button type="button" onClick={handleDelete} disabled={deleting} className="btn-dark px-3 py-1 text-sm">
                {deleting && <Loader2Icon className="h-4 w-4 animate-spin" />}
                Hapus
              </button>
            </>
        }
        </div>
      }
    </article>);

}