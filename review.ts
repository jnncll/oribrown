export type ReviewKind = 'website' | 'product';

export interface ReviewAspect {
  key: string;
  label: string;
}

export interface Review {
  id: string;
  kind: ReviewKind;
  name: string;
  kelas: string;
  rating: number;
  aspects: Record<string, number>;
  comment: string;
  photos: string[];
  createdAt: string;
  orderNumber?: string;
}

export type NewReview = Omit<Review, 'id' | 'createdAt'>;

export type ReviewStatus = 'loading' | 'ready' | 'error';