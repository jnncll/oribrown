import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBasketIcon, Trash2Icon, XIcon } from 'lucide-react';
import { useShop } from '../contexts/ShopContext';
import { QuantityStepper } from './QuantityStepper';
import { ClosedNotice } from './ClosedNotice';
import { images } from '../data/images';
import { product } from '../data/product';
import { formatRupiah } from '../utils/format';

export function CartDrawer() {
  const { isCartOpen, closeCart, cartQty, setCartQty, stockLeft, phase, openCheckout } = useShop();

  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen &&
      <motion.div key="cart" className="fixed inset-0 z-50" initial={{ opacity: 1 }} exit={{ opacity: 1 }}>
          <motion.div className="absolute inset-0 bg-cocoa/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={closeCart} />
          <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label="Keranjang belanja"
          className="absolute bottom-0 right-0 top-0 flex w-full max-w-md flex-col border-l-[3px] border-cocoa bg-vanilla"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex items-center justify-between border-b-[3px] border-cocoa bg-cream px-5 py-4">
              <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
                <ShoppingBasketIcon className="h-6 w-6" strokeWidth={2.5} /> Keranjang
              </h2>
              <button type="button" onClick={closeCart} aria-label="Tutup keranjang" className="grid h-9 w-9 place-items-center rounded-xl border-[3px] border-cocoa bg-vanilla hover:bg-white">
                <XIcon className="h-4 w-4" strokeWidth={3} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {phase === 'closed' ?
            <ClosedNotice compact /> :
            cartQty === 0 ?
            <div className="flex h-full flex-col items-center justify-center text-center">
                  <img src={images.oriri} alt="Oriri" className="h-28 w-28 rounded-full border-[3px] border-cocoa bg-white object-contain p-1" />
                  <p className="mt-4 font-display text-xl font-semibold">Keranjangmu masih kosong</p>
                  <p className="mt-1 text-cocoa/75">Ayo ambil brownies pertamamu.</p>
                  <a href="#pesan" onClick={closeCart} className="btn-primary mt-5">Pilih brownies</a>
                </div> :

            <div className="flex gap-4 rounded-2xl border-[3px] border-cocoa bg-white p-3 shadow-toon-sm">
                  <img src={images.heroCup} alt="" className="h-20 w-20 shrink-0 rounded-xl border-[3px] border-cocoa object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-lg font-semibold leading-tight">{product.name}</p>
                        <p className="text-sm text-cocoa/70">{formatRupiah(product.price)} / cup</p>
                      </div>
                      <button type="button" onClick={() => setCartQty(0)} aria-label="Hapus dari keranjang" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-cocoa/70 hover:bg-cream hover:text-burnt">
                        <Trash2Icon className="h-4 w-4" strokeWidth={2.5} />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QuantityStepper value={cartQty} max={stockLeft} onChange={setCartQty} />
                      <p className="font-display font-bold">{formatRupiah(cartQty * product.price)}</p>
                    </div>
                  </div>
                </div>
            }
            </div>

            {phase !== 'closed' && cartQty > 0 &&
          <div className="border-t-[3px] border-cocoa bg-cream p-5">
                <div className="flex items-baseline justify-between">
                  <span className="font-display font-semibold">Total</span>
                  <span className="font-display text-2xl font-bold text-burnt">{formatRupiah(cartQty * product.price)}</span>
                </div>
                <button type="button" onClick={openCheckout} className="btn-primary mt-4 w-full py-3 text-lg">
                  Checkout
                </button>
              </div>
          }
          </motion.aside>
        </motion.div>
      }
    </AnimatePresence>);

}