import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, MessageCircleIcon } from 'lucide-react';
import { CHECKOUT_STEPS, useCheckoutForm } from './useCheckoutForm';
import { StepPath } from './StepPath';
import { IdentityStep } from './IdentityStep';
import { OrderDetailsStep } from './OrderDetailsStep';
import { PaymentStep } from './PaymentStep';
import { ConfirmStep } from './ConfirmStep';
import { OrderSuccess } from './OrderSuccess';

export function CheckoutFlow({ onClose }: {onClose: () => void;}) {
  const f = useCheckoutForm();

  if (f.placedOrder) return <OrderSuccess order={f.placedOrder} waLink={f.waLink} onClose={onClose} />;

  if (f.stockLeft === 0) {
    return <p className="py-8 text-center font-display text-xl font-semibold">Yah, stok pre-order sudah habis.</p>;
  }

  const stepProps = { values: f.values, errors: f.errors, update: f.update };
  const isLast = f.step === CHECKOUT_STEPS.length - 1;

  return (
    <div>
      <StepPath current={f.step} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={f.step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}>
          
          {f.step === 0 && <IdentityStep {...stepProps} />}
          {f.step === 1 && <OrderDetailsStep {...stepProps} stockLeft={f.stockLeft} />}
          {f.step === 2 && <PaymentStep {...stepProps} />}
          {f.step === 3 && <ConfirmStep {...stepProps} orderNumber={f.orderNumber} />}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-3 border-t-[3px] border-dashed border-cocoa/20 pt-5">
        {f.step > 0 ?
        <button type="button" onClick={f.back} className="btn-secondary">
            <ArrowLeftIcon className="h-4 w-4" strokeWidth={2.5} />
            Kembali
          </button> :

        <span />
        }
        {!isLast ?
        <button type="button" onClick={f.next} className="btn-primary">
            Lanjut
            <ArrowRightIcon className="h-4 w-4" strokeWidth={2.5} />
          </button> :

        <button type="button" onClick={f.submit} disabled={f.phase !== 'open'} className="btn-toon bg-leaf text-white">
            <MessageCircleIcon className="h-4 w-4" strokeWidth={2.5} />
            Lanjut ke WhatsApp
          </button>
        }
      </div>
    </div>);

}