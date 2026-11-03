import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, SparklesIcon, TrophyIcon } from 'lucide-react';
import { brownieLayers } from '../../data/ingredients';
import { ConfettiBurst } from '../ConfettiBurst';

interface IngredientPanelProps {
  isOpen: boolean;
  selectedId: string | null;
  discovered: Set<string>;
  onSelect: (id: string) => void;
}

export function IngredientPanel({ isOpen, selectedId, discovered, onSelect }: IngredientPanelProps) {
  const selected = brownieLayers.find((l) => l.id === selectedId);
  const total = brownieLayers.length;
  const found = discovered.size;
  const complete = found === total;

  return (
    <div className="rounded-3xl border-[3px] border-cocoa bg-vanilla p-5 text-cocoa shadow-toon-lg sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-lg font-semibold">Koleksi Bahan</p>
        <p className="font-display font-semibold">
          {found}/{total}
        </p>
      </div>
      <div className="mt-2 h-3.5 overflow-hidden rounded-full border-[3px] border-cocoa bg-white">
        <motion.div className="h-full bg-zest" animate={{ width: `${found / total * 100}%` }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} />
      </div>

      <div className="mt-5 min-h-[150px]">
        {!isOpen ?
        <p className="leading-relaxed text-cocoa/80">
            Brownies ini kelihatan biasa aja dari luar. Klik brownie-nya untuk membedah lapisan demi lapisan dan temukan semua bahannya.
          </p> :

        <AnimatePresence mode="wait" initial={false}>
            {selected ?
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}>
            
                <p className="text-sm font-bold text-burnt">{selected.role}</p>
                <h3 className="mt-0.5 flex items-center gap-2 font-display text-3xl font-bold">
                  {selected.name}
                  {selected.star && <SparklesIcon className="h-6 w-6 text-zest" strokeWidth={2.5} aria-label="Bahan rahasia" />}
                </h3>
                <p className="mt-2 leading-relaxed">{selected.note}</p>
              </motion.div> :

          <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="leading-relaxed text-cocoa/80">
                Brownie terbelah! Klik tiap lapisan (atau nama bahan di bawah) untuk mengoleksinya.
              </motion.p>
          }
          </AnimatePresence>
        }
      </div>

      {isOpen &&
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Daftar bahan">
          {brownieLayers.map((l) => {
          const got = discovered.has(l.id);
          const active = selectedId === l.id;
          return (
            <li key={l.id}>
                <button
                type="button"
                onClick={() => onSelect(l.id)}
                aria-pressed={active}
                className={`chip-toggle flex items-center gap-1.5 px-2.5 py-1.5 text-xs ${active ? 'bg-zest text-white' : got ? 'bg-cream text-cocoa' : 'bg-white text-cocoa/70 hover:bg-cream'}`}>
                
                  {got && <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />}
                  {l.name}
                </button>
              </li>);

        })}
        </ul>
      }

      <AnimatePresence>
        {complete &&
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="relative mt-5 flex items-center gap-3 rounded-2xl border-[3px] border-cocoa bg-choco p-3 text-cream">
          
            <ConfettiBurst />
            <TrophyIcon className="h-8 w-8 shrink-0 text-zest" strokeWidth={2.5} />
            <div>
              <p className="font-display font-semibold">Achievement: Brownie Scientist</p>
              <p className="text-sm text-cream/85">Semua 9 bahan sudah kamu temukan!</p>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}