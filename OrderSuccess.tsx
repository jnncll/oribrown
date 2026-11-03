import React from 'react';
import { motion } from 'framer-motion';
import { CopyIcon, ExternalLinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ConfettiBurst } from '../ConfettiBurst';
import { images } from '../../data/images';
import { getPickupLabel } from '../../utils/order';
import type { Order } from '../../types/shop';

interface OrderSuccessProps {
  order: Order;
  waLink: string;
  onClose: () => void;
}

export function OrderSuccess({ order, waLink, onClose }: OrderSuccessProps) {
  return (
    <div className="relative text-center">
      <ConfettiBurst count={32} />
      <motion.img
        src={images.oriri}
        alt="Oriri merayakan pesananmu"
        className="mx-auto h-36 w-36 rounded-full border-[3px] border-cocoa bg-white object-contain p-1"
        initial={{ scale: 0.96, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: [-10, 6, 0] }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} />
      
      <h3 className="mt-4 font-display text-3xl font-bold">Quest selesai!</h3>
      <p className="mx-auto mt-2 max-w-md text-cocoa/80">
        Pesananmu sudah tercatat. Selesaikan chat di WhatsApp supaya pesanan diproses. Brownies siap di tanggal <strong>{getPickupLabel(order.date)}</strong>.
      </p>
      {order.paymentMethod === 'qris' &&
      <p className="mx-auto mt-3 max-w-md rounded-xl bg-cream px-3 py-2 text-sm font-bold">
          Sudah bayar pakai QRIS? Kirim screenshot bukti bayarnya di chat WhatsApp ya.
        </p>
      }

      <div className="mx-auto mt-6 max-w-xs rounded-2xl border-[3px] border-cocoa bg-choco p-4 text-cream">
        <p className="text-xs font-bold text-cream/80">Nomor pesanan</p>
        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="font-display text-3xl font-bold tracking-wider">{order.orderNumber}</span>
          <button
            type="button"
            aria-label="Salin nomor pesanan"
            onClick={() => navigator.clipboard?.writeText(order.orderNumber).then(() => toast.success('Nomor pesanan disalin'), () => toast.error('Gagal menyalin'))}
            className="grid h-9 w-9 place-items-center rounded-lg border-2 border-cocoa bg-vanilla text-cocoa">
            
            <CopyIcon className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
        <p className="mt-1 text-xs text-cream/80">Pakai nomor ini untuk menulis review makanan & service.</p>
      </div>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          <ExternalLinkIcon className="h-4 w-4" strokeWidth={2.5} />
          WhatsApp belum terbuka?
        </a>
        <button type="button" onClick={onClose} className="btn-primary">
          Selesai
        </button>
      </div>
    </div>);

}