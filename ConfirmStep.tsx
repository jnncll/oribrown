import React from 'react';
import { CopyIcon, MessageCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
import { contacts } from '../../data/contacts';
import { product } from '../../data/product';
import { formatRupiah } from '../../utils/format';
import { getPickupLabel } from '../../utils/order';
import type { CheckoutStepProps } from './useCheckoutForm';

export function ConfirmStep({ values, errors, update, orderNumber }: CheckoutStepProps & {orderNumber: string;}) {
  const kelas = values.kelasChoice === 'Lainnya' ? values.kelasOther : values.kelasChoice;
  const rows: [string, string][] = [
  ['Nama', values.name],
  ['Kelas', kelas],
  ['Pesanan', `${values.quantity} cup ${product.name}`],
  ['Metode', values.method === 'antar' ? `Diantarkan · ${values.location}` : 'Ambil sendiri'],
  ['Tanggal', getPickupLabel(values.date)],
  ['Pembayaran', values.paymentMethod === 'qris' ? 'QRIS' : 'Lewat chat']];

  if (values.details.trim()) rows.push(['Detail', values.details.trim()]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 rounded-2xl border-[3px] border-cocoa bg-choco p-4 text-cream">
        <div>
          <p className="text-xs font-bold text-cream/80">Nomor pesanan kamu</p>
          <p className="font-display text-3xl font-bold tracking-wider">{orderNumber}</p>
          <p className="text-xs text-cream/80">Simpan untuk menulis review setelah menerima brownies.</p>
        </div>
        <button
          type="button"
          aria-label="Salin nomor pesanan"
          onClick={() => navigator.clipboard?.writeText(orderNumber).then(() => toast.success('Nomor pesanan disalin'), () => toast.error('Gagal menyalin'))}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-[3px] border-cocoa bg-vanilla text-cocoa">
          
          <CopyIcon className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>

      <dl className="divide-y-2 divide-dashed divide-cocoa/15 rounded-2xl border-[3px] border-cocoa/20 bg-white/60 px-4">
        {rows.map(([k, v]) =>
        <div key={k} className="flex justify-between gap-4 py-2.5 text-sm">
            <dt className="font-bold text-cocoa/65">{k}</dt>
            <dd className="text-right font-semibold">{v}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4 py-3">
          <dt className="font-display font-semibold">Total</dt>
          <dd className="font-display text-xl font-bold text-burnt">{formatRupiah(values.quantity * product.price)}</dd>
        </div>
      </dl>

      <fieldset>
        <legend className="toon-label">Kirim data pesanan lewat WhatsApp ke</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {contacts.map((c) => {
            const selected = values.contactId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={selected}
                onClick={() => update('contactId', c.id)}
                className={`chip-toggle flex items-center gap-3 p-3 text-left ${selected ? 'bg-leaf text-white' : 'bg-white hover:bg-cream'}`}>
                
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-[3px] border-cocoa font-display text-lg ${selected ? 'bg-vanilla text-cocoa' : 'bg-caramel'}`}>
                  {c.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-base">{c.name}</span>
                  <span className={`block font-body text-xs font-semibold ${selected ? 'text-white' : 'text-cocoa/65'}`}>{c.phoneDisplay}</span>
                </span>
                <MessageCircleIcon className="ml-auto h-5 w-5" strokeWidth={2.5} />
              </button>);

          })}
        </div>
        {errors.contactId && <p className="toon-error">{errors.contactId}</p>}
        {values.paymentMethod === 'qris' &&
        <p className="mt-3 rounded-xl bg-cream px-3 py-2 text-sm font-semibold">Jangan lupa lampirkan screenshot bukti bayar QRIS di chat ya!</p>
        }
      </fieldset>
    </div>);

}