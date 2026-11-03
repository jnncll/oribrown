import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcwIcon } from 'lucide-react';
import { toast } from 'sonner';
import { brownieLayers } from '../../data/ingredients';
import { LayerSlab } from './LayerSlab';
import { WholeBrownie } from './WholeBrownie';
import { IngredientPanel } from './IngredientPanel';
import { SectionHeading } from '../SectionHeading';
import { FloatingSnacks } from '../FloatingSnacks';

export function BrownieBurger() {
  const [isOpen, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());

  function select(id: string) {
    setOpen(true);
    setSelectedId(id);
    setDiscovered((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  useEffect(() => {
    if (discovered.size === brownieLayers.length) toast.success('Achievement terbuka: Brownie Scientist!');
  }, [discovered.size]);

  const count = brownieLayers.length;

  return (
    <section id="bedah" className="relative overflow-hidden border-t-[3px] border-cocoa bg-choco py-20 text-cream">
      <FloatingSnacks tone="dark" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading level={2} title="Bedah Brownie" desc="Satu cup, sembilan bahan, dan satu bahan rahasia dari kulit jeruk. Temukan semuanya." tone="dark" />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex min-h-[460px] flex-col items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              {!isOpen ?
              <motion.div key="whole" exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.16 }}>
                  <WholeBrownie onOpen={() => setOpen(true)} />
                </motion.div> :

              <motion.div key="layers" className="w-full max-w-md">
                  <ul className="flex flex-col gap-2.5" aria-label="Lapisan brownie">
                    {brownieLayers.map((layer, i) => {
                    const active = selectedId === layer.id;
                    return (
                      <motion.li
                        key={layer.id}
                        initial={{ opacity: 0, y: (count - i) * 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: (count - 1 - i) * 0.04, ease: [0.23, 1, 0.32, 1] }}>
                        
                          <button
                          type="button"
                          onClick={() => select(layer.id)}
                          aria-pressed={active}
                          aria-label={layer.name}
                          className="group flex w-full items-center gap-3 rounded-xl text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zest/60">
                          
                            <span className={`block w-56 shrink-0 transition-transform duration-150 ease-toon group-hover:-translate-y-0.5 sm:w-64 ${active ? 'translate-x-2' : ''}`}>
                              <LayerSlab layer={layer} />
                            </span>
                            <span className="hidden flex-1 items-center gap-2 sm:flex">
                              <span className="h-0 flex-1 border-t-2 border-dashed border-cream/40" />
                              <span className={`whitespace-nowrap font-display text-sm font-semibold ${active ? 'text-zest' : discovered.has(layer.id) ? 'text-cream' : 'text-cream/70'}`}>
                                {layer.name}
                              </span>
                            </span>
                          </button>
                        </motion.li>);

                  })}
                  </ul>
                  <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setSelectedId(null);
                  }}
                  className="btn-secondary mt-8">
                  
                    <RotateCcwIcon className="h-4 w-4" strokeWidth={2.5} />
                    Satukan lagi
                  </button>
                </motion.div>
              }
            </AnimatePresence>
          </div>

          <IngredientPanel isOpen={isOpen} selectedId={selectedId} discovered={discovered} onSelect={select} />
        </div>
      </div>
    </section>);

}