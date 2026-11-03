import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { supabase } from '../utils/supabaseClient';
import type { NewReview, Review, ReviewKind, ReviewStatus } from '../types/review';

interface ReviewContextValue {
  reviews: Review[];
  status: ReviewStatus;
  isShared: boolean;
  addReview: (review: NewReview) => Promise<boolean>;
  deleteReview: (id: string) => Promise<boolean>;
  isMine: (id: string) => boolean;
}

interface ReviewRow {
  id: string;
  kind: ReviewKind;
  name: string;
  kelas: string;
  rating: number;
  aspects: Record<string, number>;
  comment: string;
  photos: string[];
  order_number: string | null;
  created_at: string;
}

const COLUMNS = 'id,kind,name,kelas,rating,aspects,comment,photos,order_number,created_at';

const ReviewContext = createContext<ReviewContextValue | null>(null);

export function ReviewProvider({ children }: {children: React.ReactNode;}) {
  const [localReviews, saveLocalReviews] = useLocalStorage<Review[]>('oribrown:reviews', []);
  const [tokens, saveTokens] = useLocalStorage<Record<string, string>>('oribrown:review-tokens', {});
  const [remoteReviews, setRemoteReviews] = useState<Review[]>([]);
  const [status, setStatus] = useState<ReviewStatus>(supabase ? 'loading' : 'ready');
  const isShared = supabase !== null;

  const fetchRemote = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase.from('reviews').select(COLUMNS).order('created_at', { ascending: false });
    if (error) {
      setStatus('error');
      return;
    }
    setRemoteReviews((data as ReviewRow[]).map(fromRow));
    setStatus('ready');
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    fetchRemote();
    const channel = client.
    channel('oribrown-reviews').
    on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, () => {
      fetchRemote();
    }).
    subscribe();
    const onFocus = () => fetchRemote();
    window.addEventListener('focus', onFocus);
    return () => {
      client.removeChannel(channel);
      window.removeEventListener('focus', onFocus);
    };
  }, [fetchRemote]);

  const addReview = useCallback(
    async (input: NewReview) => {
      const token = makeToken();
      if (supabase) {
        const { data, error } = await supabase.rpc('add_review', {
          p_kind: input.kind,
          p_name: input.name,
          p_kelas: input.kelas,
          p_rating: input.rating,
          p_aspects: input.aspects,
          p_comment: input.comment,
          p_photos: input.photos,
          p_order_number: input.orderNumber ?? '',
          p_token: token
        });
        if (error || !data) return false;
        saveTokens({ ...tokens, [String(data)]: token });
        await fetchRemote();
        return true;
      }
      const review: Review = { ...input, id: token.slice(0, 16), createdAt: new Date().toISOString() };
      const ok = saveLocalReviews([review, ...localReviews]);
      if (ok) saveTokens({ ...tokens, [review.id]: token });
      return ok;
    },
    [tokens, saveTokens, fetchRemote, localReviews, saveLocalReviews]
  );

  const deleteReview = useCallback(
    async (id: string) => {
      const token = tokens[id];
      if (!token) return false;
      if (supabase) {
        const { data, error } = await supabase.rpc('delete_review', { p_id: id, p_token: token });
        if (error || !data) return false;
        await fetchRemote();
      } else if (!saveLocalReviews(localReviews.filter((r) => r.id !== id))) {
        return false;
      }
      const next = { ...tokens };
      delete next[id];
      saveTokens(next);
      return true;
    },
    [tokens, saveTokens, fetchRemote, localReviews, saveLocalReviews]
  );

  const isMine = useCallback((id: string) => Boolean(tokens[id]), [tokens]);

  const value = useMemo<ReviewContextValue>(
    () => ({ reviews: isShared ? remoteReviews : localReviews, status, isShared, addReview, deleteReview, isMine }),
    [isShared, remoteReviews, localReviews, status, addReview, deleteReview, isMine]
  );

  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
}

export function useReviews(): ReviewContextValue {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error('useReviews must be used within ReviewProvider');
  return ctx;
}

function fromRow(r: ReviewRow): Review {
  return {
    id: r.id,
    kind: r.kind,
    name: r.name,
    kelas: r.kelas,
    rating: r.rating,
    aspects: r.aspects ?? {},
    comment: r.comment,
    photos: Array.isArray(r.photos) ? r.photos : [],
    createdAt: r.created_at,
    orderNumber: r.order_number ?? undefined
  };
}

function makeToken(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}