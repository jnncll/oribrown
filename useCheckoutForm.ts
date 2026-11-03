import { useState } from 'react';
import { useShop } from '../../contexts/ShopContext';
import { contacts } from '../../data/contacts';
import { product } from '../../data/product';
import { buildOrderMessage, buildWaLink, generateOrderNumber } from '../../utils/order';
import type { FulfillmentMethod, Order, PaymentMethod } from '../../types/shop';

export interface CheckoutValues {
  name: string;
  kelasChoice: string;
  kelasOther: string;
  quantity: number;
  details: string;
  method: FulfillmentMethod | '';
  location: string;
  date: string;
  paymentMethod: PaymentMethod | '';
  contactId: string;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;
export type CheckoutUpdate = <K extends keyof CheckoutValues>(key: K, value: CheckoutValues[K]) => void;

export interface CheckoutStepProps {
  values: CheckoutValues;
  errors: CheckoutErrors;
  update: CheckoutUpdate;
}

export const CHECKOUT_STEPS = ['Identitas', 'Pesanan', 'Bayar', 'Kirim'];
const LAST_STEP = CHECKOUT_STEPS.length - 1;

export function useCheckoutForm() {
  const { cartQty, stockLeft, orders, placeOrder, phase } = useShop();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<CheckoutValues>({
    name: '',
    kelasChoice: '',
    kelasOther: '',
    quantity: Math.max(1, Math.min(cartQty || 1, stockLeft)),
    details: '',
    method: '',
    location: '',
    date: '',
    paymentMethod: '',
    contactId: ''
  });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [orderNumber] = useState(() => generateOrderNumber(orders.map((o) => o.orderNumber)));
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [waLink, setWaLink] = useState('');

  const update: CheckoutUpdate = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validate(target: number): CheckoutErrors {
    const e: CheckoutErrors = {};
    if (target === 0) {
      if (values.name.trim().length < 2) e.name = 'Isi nama lengkapmu dulu ya.';
      if (!values.kelasChoice) e.kelasChoice = 'Pilih kelasmu.';else
      if (values.kelasChoice === 'Lainnya' && !values.kelasOther.trim()) e.kelasOther = 'Tulis kelas atau status kamu.';
    }
    if (target === 1) {
      if (values.quantity < 1) e.quantity = 'Minimal 1 cup.';else
      if (values.quantity > stockLeft) e.quantity = `Stok tersisa ${stockLeft} cup.`;
      if (!values.method) e.method = 'Pilih diantarkan atau ambil sendiri.';
      if (values.method === 'antar' && !values.location.trim()) e.location = 'Tulis lokasi pengantaran.';
      if (!values.date) e.date = 'Pilih tanggal pengambilan/pengiriman.';
    }
    if (target === 2 && !values.paymentMethod) e.paymentMethod = 'Pilih cara bayar.';
    if (target === 3 && !values.contactId) e.contactId = 'Pilih mau lanjut chat ke siapa.';
    return e;
  }

  function next() {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => Math.min(s + 1, LAST_STEP));
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function submit() {
    const e = validate(LAST_STEP);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (phase !== 'open') {
      setErrors({ contactId: 'Pre-order sedang tidak dibuka.' });
      return;
    }
    const contact = contacts.find((c) => c.id === values.contactId);
    if (!contact) return;
    const order: Order = {
      orderNumber,
      name: values.name.trim(),
      kelas: values.kelasChoice === 'Lainnya' ? values.kelasOther.trim() : values.kelasChoice,
      quantity: values.quantity,
      details: values.details.trim(),
      method: values.method as FulfillmentMethod,
      location: values.method === 'antar' ? values.location.trim() : '',
      date: values.date,
      contactId: contact.id,
      paymentMethod: values.paymentMethod as PaymentMethod,
      total: values.quantity * product.price,
      createdAt: new Date().toISOString()
    };
    if (!placeOrder(order)) {
      setErrors({ contactId: 'Gagal menyimpan pesanan. Coba lagi ya.' });
      return;
    }
    const link = buildWaLink(contact.wa, buildOrderMessage(order, contact.name));
    setWaLink(link);
    setPlacedOrder(order);
    window.open(link, '_blank', 'noopener,noreferrer');
  }

  return { step, values, errors, orderNumber, placedOrder, waLink, stockLeft, phase, update, next, back, submit };
}