import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBasketIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useShop } from '../contexts/ShopContext';
import { QuantityStepper } from './QuantityStepper';
import { StockMeter } from './StockMeter';
import { ClosedNotice } from './ClosedNotice';
import { SectionHeading } from './SectionHeading';
import { images } from '../data/images';
import { product } from '../data/product';
import { orderSteps } from '../data/reasons';
import { formatRupiah } from '../utils/format';
import { FULFILLMENT_LABEL, PREORDER_LABEL } from '../utils/schedule';

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

export function OrderSection() {
  const { phase, stockLeft, cartQty, addToCart, openCart } = useShop();
  const available = Math.max(0, stockLeft - cartQty);
  const [qty, setQty] = useState(1);
  const [pops, setPops] = useState<{id: number;qty: number;}[]>([]);

  useEffect(() => {
    if (qty > Math.max(1, available)) setQty(Math.max(1, available));
  }, [available, qty]);

  function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (addToCart(qty, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })) {
      const id = Date.now();
      setPops((p) => [...p, { id, qty }]);
      window.setTimeout(() => setPops((p) => p.filter((x) => x.id !== id)), 700);
      toast.success(`${qty} cup masuk keranjang!`, { action: { label: 'Lihat', onClick: openCart } });
      setQty(1);
    } else {
      toast.error('Stok tidak cukup.');
    }
  }

  return (
    <section id="pesan" className="border-t-[3px] border-cocoa bg-caramel/40 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading level={4} title="Quest: Pesan Oribrown" desc={`Hanya satu menu, hanya ${product.totalStock} cup untuk gelombang pre-order ini.`} />

        <div className="mt-12">
          {phase === 'closed' ?
          <ClosedNotice /> :

          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="toon-card grid overflow-hidden sm:grid-cols-[0.9fr_1fr]">
              
                <div className="group overflow-hidden border-b-[3px] border-cocoa bg-[#fbe3c3] sm:border-b-0 sm:border-r-[3px]">
                  <img src={images.heroCup} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col p-6">
                  <h3 className="font-display text-3xl font-bold">{product.name}</h3>
                  <p className="mt-2 text-cocoa/80">Brownies cokelat fudgy dengan bubuk kulit jeruk, dalam square dessert cup berlabel Oribrown.</p>
                  <p className="mt-4 font-display text-3xl font-bold text-burnt">
                    {formatRupiah(product.price)} <span className="text-base font-semibold text-cocoa/70">/ cup</span>
                  </p>
                  <div className="mt-5">
                    <StockMeter />
                  </div>

                  <div className="mt-auto pt-6">
                    {stockLeft === 0 ?
                  <p className="rounded-2xl border-[3px] border-cocoa bg-cocoa px-4 py-3 text-center font-display font-semibold text-cream">Stok pre-order habis</p> :

                  <>
                        <div className="flex flex-wrap items-center gap-3">
                          <QuantityStepper value={qty} max={Math.max(1, available)} onChange={setQty} />
                          <div className="relative flex-1">
                            <button type="button" onClick={handleAdd} disabled={available === 0} className="btn-primary w-full">
                              <ShoppingBasketIcon className="h-5 w-5" strokeWidth={2.5} />
                              Tambah · {formatRupiah(qty * product.price)}
                            </button>
                            <AnimatePresence>
                              {pops.map((p) =>
                          <motion.span
                            key={p.id}
                            className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 font-display text-2xl font-bold text-burnt"
                            initial={{ opacity: 0, y: 0, scale: 0.96 }}
                            animate={{ opacity: [0, 1, 0], y: -44, scale: 1.1 }}
                            transition={{ duration: 0.6, ease: EASE }}
                            aria-hidden="true">
                            
                                  +{p.qty}
                                </motion.span>
                          )}
                            </AnimatePresence>
                          </div>
                        </div>
                        {available === 0 && <p className="mt-2 text-sm font-bold text-burnt">Semua stok tersisa sudah ada di keranjangmu.</p>}
                      </>
                  }
                  </div>
                </div>
              </motion.div>

              <div>
                <h3 className="font-display text-2xl font-semibold">Cara main</h3>
                <ol className="mt-5">
                  {orderSteps.map((s, i) =>
                <motion.li
                  key={s.title}
                  className="relative flex gap-4 pb-6 last:pb-0"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.25, delay: i * 0.05, ease: EASE }}>
                  
                      {i < orderSteps.length - 1 && <span className="absolute left-[18px] top-10 h-[calc(100%-2.5rem)] w-[3px] bg-cocoa/25" aria-hidden="true" />}
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-[3px] border-cocoa bg-vanilla font-display font-bold">{i + 1}</span>
                      <div className="pt-1">
                        <p className="font-display text-lg font-semibold">{s.title}</p>
                        <p className="text-cocoa/80">{s.desc}</p>
                      </div>
                    </motion.li>
                )}
                </ol>
                <dl className="mt-8 grid grid-cols-2 gap-3 rounded-2xl border-[3px] border-cocoa bg-choco p-4 text-cream">
                  <div>
                    <dt className="text-xs font-bold text-cream/80">Jadwal Pre-Order</dt>
                    <dd className="font-display font-semibold">{PREORDER_LABEL}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold text-cream/80">Ambil / Kirim Produk</dt>
                    <dd className="font-display font-semibold">{FULFILLMENT_LABEL}</dd>
                  </div>
                  <p className="col-span-2 text-sm text-cream/80">Sudah bisa pesan dari sekarang. Selebihnya akan diinfokan kembali.</p>
                </dl>
              </div>
            </div>
          }
        </div>
      </div>
    </section>);

}