import React, { useState } from 'react';
import { Loader2Icon, SendIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useReviews } from '../../contexts/ReviewContext';
import { reviewAspects } from '../../data/reviewAspects';
import { classOptions } from '../../data/orderOptions';
import { StarRating } from './StarRating';
import { PhotoUploader } from './PhotoUploader';
import type { ReviewKind } from '../../types/review';
import type { Order } from '../../types/shop';

interface ReviewFormProps {
  kind: ReviewKind;
  order?: Order;
  onDone?: () => void;
}

type FormErrors = Partial<Record<'name' | 'rating' | 'aspects' | 'comment', string>>;

export function ReviewForm({ kind, order, onDone }: ReviewFormProps) {
  const { addReview } = useReviews();
  const aspects = reviewAspects[kind];
  const [name, setName] = useState(order?.name ?? '');
  const [kelas, setKelas] = useState(order?.kelas ?? '');
  const [rating, setRating] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: FormErrors = {};
    if (name.trim().length < 2) next.name = 'Isi namamu dulu ya.';
    if (rating === 0) next.rating = 'Kasih bintang keseluruhan.';
    if (aspects.some((a) => !scores[a.key])) next.aspects = 'Nilai semua aspek di atas.';
    if (comment.trim().length < 10) next.comment = 'Ceritakan minimal 10 karakter.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    const ok = await addReview({
      kind,
      name: name.trim(),
      kelas: kelas.trim(),
      rating,
      aspects: scores,
      comment: comment.trim(),
      photos,
      orderNumber: order?.orderNumber
    });
    setSubmitting(false);
    if (!ok) {
      toast.error('Gagal mengirim review. Cek koneksi atau coba kurangi foto.');
      return;
    }
    toast.success('Review terkirim! +10 XP untuk kamu');
    onDone?.();
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${kind}-name`} className="toon-label">Nama</label>
          <input id={`${kind}-name`} className="toon-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama kamu" />
          {errors.name && <p className="toon-error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${kind}-kelas`} className="toon-label">Kelas / Status <span className="font-body font-normal text-cocoa/60">(opsional)</span></label>
          <input id={`${kind}-kelas`} list={`${kind}-kelas-list`} className="toon-input" value={kelas} onChange={(e) => setKelas(e.target.value)} placeholder="mis. Kelas XI IPA" />
          <datalist id={`${kind}-kelas-list`}>
            {classOptions.filter((c) => c.value !== 'Lainnya').map((c) =>
            <option key={c.value} value={c.value} />
            )}
          </datalist>
        </div>
      </div>

      <div>
        <span className="toon-label">Rating keseluruhan</span>
        <StarRating value={rating} onChange={setRating} size="lg" label="Rating keseluruhan" />
        {errors.rating && <p className="toon-error">{errors.rating}</p>}
      </div>

      <div className="rounded-2xl border-[3px] border-cocoa/20 bg-white/60 p-4">
        <span className="toon-label">Nilai per aspek</span>
        <ul className="space-y-2.5">
          {aspects.map((a) =>
          <li key={a.key} className="flex items-center justify-between gap-3">
              <span className="text-sm font-bold">{a.label}</span>
              <StarRating value={scores[a.key] ?? 0} onChange={(v) => setScores((s) => ({ ...s, [a.key]: v }))} size="sm" label={a.label} />
            </li>
          )}
        </ul>
        {errors.aspects && <p className="toon-error">{errors.aspects}</p>}
      </div>

      <div>
        <label htmlFor={`${kind}-comment`} className="toon-label">Ceritanya</label>
        <textarea
          id={`${kind}-comment`}
          rows={4}
          className="toon-input resize-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={kind === 'website' ? 'Gimana pengalamanmu jelajah website & kesan soal branding Oribrown?' : 'Gimana rasa, tekstur, aroma jeruk, dan pelayanannya?'} />
        
        {errors.comment && <p className="toon-error">{errors.comment}</p>}
      </div>

      <div>
        <span className="toon-label">Foto</span>
        <PhotoUploader photos={photos} onChange={setPhotos} />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? <Loader2Icon className="h-4 w-4 animate-spin" strokeWidth={2.5} /> : <SendIcon className="h-4 w-4" strokeWidth={2.5} />}
        {submitting ? 'Mengirim...' : 'Kirim Review'}
      </button>
    </form>);

}