import React from 'react';
import { motion } from 'framer-motion';
import { CopyIcon, DownloadIcon, MessageCircleIcon, ScanLineIcon } from 'lucide-react';
import { toast } from 'sonner';
import { images } from '../../data/images';
import { product } from '../../data/product';
import { formatRupiah } from '../../utils/format';
import type { CheckoutStepProps } from './useCheckoutForm';
import type { PaymentMethod } from '../../types/shop';

const OPTIONS: {value: PaymentMethod;label: string;hint: string;icon: typeof ScanLineIcon;}[] = [
{ value: 'qris', label: 'Bayar pakai QRIS', hint: 'Scan pakai e-wallet / m-banking, lalu kirim buktinya di chat', icon: ScanLineIcon },
{ value: 'chat', label: 'Bayar lewat chat', hint: 'Atur pembayaran langsung dengan Joanna/Arvin', icon: MessageCircleIcon }];


export function PaymentStep({ values, errors, update }: CheckoutStepProps) {
  const total = values.quantity * product.price;

  return (
    <div>
      <fieldset>
        <legend className="toon-label">Mau bayar pakai apa?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {OPTIONS.map(({ value, label, hint, icon: Icon }) => {
            const selected = values.paymentMethod === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => update('paymentMethod', value)}
                className={`chip-toggle flex items-center gap-3 p-3 text-left ${selected ? 'bg-zest text-white' : 'bg-white hover:bg-cream'}`}>
                
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border-[3px] border-cocoa ${selected ? 'bg-vanilla text-cocoa' : 'bg-cream'}`}>
                  <Icon className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <span>
                  <span className="block text-base">{label}</span>
                  <span className={`block font-body text-xs font-semibold ${selected ? 'text-white' : 'text-cocoa/65'}`}>{hint}</span>
                </span>
              </button>);

          })}
        </div>
        {errors.paymentMethod && <p className="toon-error">{errors.paymentMethod}</p>}
      </fieldset>

      {values.paymentMethod === 'qris' &&
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
        className="mt-5 grid gap-5 rounded-2xl border-[3px] border-cocoa bg-white p-4 sm:grid-cols-[200px_1fr]">
        
          <a href={images.qris} target="_blank" rel="noopener noreferrer" className="mx-auto block w-full max-w-[220px] overflow-hidden rounded-xl border-[3px] border-cocoa" aria-label="Buka QRIS ukuran penuh">
            <img src={images.qris} alt="QRIS Oribrown (GoPay Merchant, NMID ID1026602378048)" className="w-full" />
          </a>
          <div>
            <p className="text-xs font-bold text-cocoa/65">Nominal yang harus dibayar</p>
            <div className="flex items-center gap-2">
              <p className="font-display text-3xl font-bold text-burnt">{formatRupiah(total)}</p>
              <button
              type="button"
              aria-label="Salin nominal"
              onClick={() => navigator.clipboard?.writeText(String(total)).then(() => toast.success('Nominal disalin'), () => toast.error('Gagal menyalin'))}
              className="grid h-9 w-9 place-items-center rounded-lg border-2 border-cocoa bg-cream">
              
                <CopyIcon className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
              <li>Scan QRIS pakai GoPay, OVO, DANA, ShopeePay, atau m-banking.</li>
              <li>Masukkan nominal persis <strong>{formatRupiah(total)}</strong>.</li>
              <li>Screenshot bukti pembayaran.</li>
              <li>Kirim screenshot di chat WhatsApp pada langkah berikutnya.</li>
            </ol>
            <p className="mt-3 rounded-xl bg-cream px-3 py-2 text-xs font-semibold text-cocoa/80">
              Pakai HP yang sama? Simpan gambar QRIS, lalu pilih "upload dari galeri" di aplikasi pembayaranmu.
            </p>
            <a href={images.qris} target="_blank" rel="noopener noreferrer" download="QRIS-Oribrown.jpg" className="btn-secondary mt-4 px-4 py-2 text-sm">
              <DownloadIcon className="h-4 w-4" strokeWidth={2.5} />
              Buka / simpan QRIS
            </a>
          </div>
        </motion.div>
      }

      {values.paymentMethod === 'chat' &&
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
        className="mt-5 rounded-2xl border-[3px] border-cocoa/20 bg-white/70 p-4 text-sm leading-relaxed">
        
          Oke! Joanna atau Arvin akan bantu atur pembayarannya (cash atau transfer) setelah kamu kirim data pesanan lewat WhatsApp.
        </motion.p>
      }
    </div>);

}