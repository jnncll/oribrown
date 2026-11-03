import type { ReviewAspect, ReviewKind } from '../types/review';

export const reviewAspects: Record<ReviewKind, ReviewAspect[]> = {
  website: [
  { key: 'tampilan', label: 'Tampilan Website' },
  { key: 'kemudahan', label: 'Kemudahan Order' },
  { key: 'branding', label: 'Branding & Logo' },
  { key: 'keseruan', label: 'Keseruan Interaksi' }],

  product: [
  { key: 'rasa', label: 'Rasa Cokelat' },
  { key: 'jeruk', label: 'Aroma Jeruk' },
  { key: 'tekstur', label: 'Tekstur Fudgy' },
  { key: 'kemasan', label: 'Kemasan' },
  { key: 'pelayanan', label: 'Pelayanan' }]

};