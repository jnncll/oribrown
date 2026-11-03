export type Phase = 'open' | 'closed';
export type PhaseOverride = Phase | 'auto';
export type FulfillmentMethod = 'ambil' | 'antar';
export type PaymentMethod = 'qris' | 'chat';

export interface Order {
  orderNumber: string;
  name: string;
  kelas: string;
  quantity: number;
  details: string;
  method: FulfillmentMethod;
  location: string;
  date: string;
  contactId: string;
  paymentMethod?: PaymentMethod;
  total: number;
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  phoneDisplay: string;
  wa: string;
}

export interface PickupDate {
  value: string;
  day: string;
  date: string;
  label: string;
}

export interface ClassOption {
  value: string;
  label: string;
}

export interface FlightOrigin {
  x: number;
  y: number;
}