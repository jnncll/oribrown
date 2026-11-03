import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CookieIcon, MonitorSmartphoneIcon, PencilLineIcon, UnlockIcon } from 'lucide-react';
import { useReviews } from '../../contexts/ReviewContext';
import { ReviewSummary } from './ReviewSummary';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';
import { ProductReviewGate } from './ProductReviewGate';
import { SectionHeading } from '../SectionHeading';
import { ConfettiBurst } from '../ConfettiBurst';
import type { ReviewKind } from '../../types/review';
import type { Order } from '../../types/shop';

const TABS: {kind: ReviewKind;label: string;icon: typeof CookieIcon;}[] = [
{ kind: 'website', label: 'Website & Branding', icon: MonitorSmartphoneIcon },
{ kind: 'product', label: 'Makanan & Service', icon: CookieIcon }];


export function ReviewSection() {
  const { reviews, status, isShared } = useReviews();
  const [tab, setTab] = useState<ReviewKind>('website');
  const [writing, setWriting] = useState(false);
  const [unlockedOrder, setUnlockedOrder] = useState<Order | null>(null);
  const [celebrate, setCelebrate] = useState(0);
  const filtered = reviews.filter((r) => r.kind === tab);

  return (
    <section id="review" className="border-t-[3px] border-cocoa bg-cream py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          level={5}
          title="Papan Review"
          desc="Semua review di sini asli dari pengunjung dan pembeli, tampil langsung begitu dikirim." />
        
        {isShared ?
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-cocoa bg-vanilla px-3 py-1 text-sm font-bold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-leaf" />
            </span>
            Live untuk semua pengunjung
          </p> :

        <p className="mt-4 inline-flex rounded-xl border-2 border-dashed border-cocoa/40 px-3 py-1 text-sm font-semibold text-cocoa/75">
            Database review belum terhubung — sementara review hanya tersimpan di perangkat ini.
          </p>
        }

        <div role="tablist" aria-label="Jenis review" className="mt-8 flex w-full max-w-full overflow-x-auto rounded-2xl border-[3px] border-cocoa bg-vanilla p-1 shadow-toon sm:inline-flex sm:w-auto">
          {TABS.map(({ kind, label, icon: Icon }) => {
            const active = tab === kind;
            return (
              <button
                key={kind}
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setTab(kind);
                  setWriting(false);
                }}
                className="relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 font-display text-sm font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zest/30 sm:flex-none sm:text-base">
                
                {active && <motion.span layoutId="review-tab" className="absolute inset-0 rounded-xl bg-choco" transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }} />}
                <Icon className={`relative h-4 w-4 ${active ? 'text-cream' : ''}`} strokeWidth={2.5} />
                <span className={`relative whitespace-nowrap ${active ? 'text-cream' : ''}`}>{label}</span>
              </button>);

          })}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
          <div className="relative space-y-5 lg:sticky lg:top-24 lg:self-start">
            {celebrate > 0 && <ConfettiBurst key={celebrate} />}
            <ReviewSummary kind={tab} reviews={filtered} />

            {tab === 'product' && !unlockedOrder ?
            <ProductReviewGate
              onUnlock={(o) => {
                setUnlockedOrder(o);
                setWriting(true);
              }} /> :


            <div className="toon-card p-5">
                {tab === 'product' && unlockedOrder &&
              <p className="mb-4 flex items-center gap-2 rounded-xl bg-leaf/10 px-3 py-2 text-sm font-bold text-leaf">
                    <UnlockIcon className="h-4 w-4" /> Terbuka untuk pesanan {unlockedOrder.orderNumber}
                  </p>
              }
                {!writing ?
              <button type="button" className="btn-primary w-full" onClick={() => setWriting(true)}>
                    <PencilLineIcon className="h-4 w-4" strokeWidth={2.5} />
                    Tulis Review
                  </button> :

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                    <ReviewForm
                  key={`${tab}-${unlockedOrder?.orderNumber ?? ''}`}
                  kind={tab}
                  order={tab === 'product' ? unlockedOrder ?? undefined : undefined}
                  onDone={() => {
                    setWriting(false);
                    setCelebrate((c) => c + 1);
                    if (tab === 'product') setUnlockedOrder(null);
                  }} />
                
                  </motion.div>
              }
              </div>
            }
          </div>

          <ReviewList kind={tab} reviews={filtered} status={status} />
        </div>
      </div>
    </section>);

}