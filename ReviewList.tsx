import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReviewCard } from './ReviewCard';
import { Modal } from '../Modal';
import { images } from '../../data/images';
import type { Review, ReviewKind, ReviewStatus } from '../../types/review';

type SortKey = 'newest' | 'highest' | 'lowest' | 'photos';

interface ReviewListProps {
  kind: ReviewKind;
  reviews: Review[];
  status: ReviewStatus;
}

export function ReviewList({ kind, reviews, status }: ReviewListProps) {
  const [sort, setSort] = useState<SortKey>('newest');
  const [photo, setPhoto] = useState<string | null>(null);

  const sorted = useMemo(() => {
    const list = sort === 'photos' ? reviews.filter((r) => r.photos.length > 0) : [...reviews];
    if (sort === 'highest') list.sort((a, b) => b.rating - a.rating);else
    if (sort === 'lowest') list.sort((a, b) => a.rating - b.rating);else
    list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return list;
  }, [reviews, sort]);

  if (status === 'loading') {
    return (
      <div className="space-y-4" aria-busy="true" aria-label="Memuat review">
        {[0, 1].map((i) =>
        <div key={i} className="h-44 animate-pulse rounded-3xl border-[3px] border-cocoa/20 bg-vanilla" />
        )}
      </div>);

  }

  if (status === 'error') {
    return (
      <div className="rounded-3xl border-[3px] border-cocoa bg-vanilla p-8 text-center">
        <p className="font-display text-xl font-semibold">Gagal memuat review</p>
        <p className="mt-1 text-cocoa/75">Periksa koneksi internet, lalu muat ulang halaman.</p>
      </div>);

  }

  if (reviews.length === 0) {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-3xl border-[3px] border-dashed border-cocoa/40 bg-vanilla/60 p-8 text-center">
        <motion.img
          src={images.oriri}
          alt="Oriri menunggu review pertama"
          className="h-32 w-32 rounded-full border-[3px] border-cocoa bg-white object-contain p-1"
          animate={{ rotate: [0, -4, 4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
        
        <h3 className="mt-4 font-display text-2xl font-semibold">Belum ada review</h3>
        <p className="mt-1 max-w-sm text-cocoa/75">
          {kind === 'website' ?
          'Jadilah yang pertama kasih kesan soal website & branding Oribrown!' :
          'Review makanan & service akan muncul di sini setelah pembeli pertama menulisnya.'}
        </p>
      </div>);

  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-display font-semibold">{sorted.length} review</p>
        <label className="flex items-center gap-2 text-sm font-bold">
          <span>Urutkan</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="rounded-xl border-[3px] border-cocoa bg-white px-3 py-1.5 font-body font-bold focus:outline-none focus:ring-4 focus:ring-zest/30">
            <option value="newest">Terbaru</option>
            <option value="highest">Rating tertinggi</option>
            <option value="lowest">Rating terendah</option>
            <option value="photos">Dengan foto</option>
          </select>
        </label>
      </div>
      {sorted.length === 0 ?
      <p className="rounded-2xl bg-vanilla p-6 text-center font-semibold text-cocoa/70">Belum ada review dengan foto.</p> :

      <div className="space-y-4">
          <AnimatePresence initial={false} mode="popLayout">
            {sorted.map((r, i) =>
          <motion.div
            key={r.id}
            layout
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, delay: Math.min(i, 6) * 0.04, ease: [0.23, 1, 0.32, 1] }}>
            
                <ReviewCard review={r} onOpenPhoto={setPhoto} />
              </motion.div>
          )}
          </AnimatePresence>
        </div>
      }
      <Modal open={photo !== null} onClose={() => setPhoto(null)} title="Foto review" size="lg">
        {photo && <img src={photo} alt="Foto dari review pelanggan" className="mx-auto max-h-[70vh] rounded-2xl border-[3px] border-cocoa object-contain" />}
      </Modal>
    </div>);

}