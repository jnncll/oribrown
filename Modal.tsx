import React, { useEffect, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'md' | 'lg';
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        key="modal"
        className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
        initial={{ opacity: 1 }}
        exit={{ opacity: 1 }}>
        
          <motion.div
          className="absolute inset-0 bg-cocoa/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose} />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border-[3px] border-cocoa bg-vanilla shadow-toon-lg sm:rounded-3xl ${size === 'lg' ? 'sm:max-w-2xl' : 'sm:max-w-lg'}`}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b-[3px] border-cocoa bg-cream px-5 py-3">
              <h2 id={titleId} className="font-display text-xl font-semibold">
                {title}
              </h2>
              <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="grid h-9 w-9 place-items-center rounded-xl border-[3px] border-cocoa bg-vanilla transition-colors duration-150 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zest/40">
              
                <XIcon className="h-4 w-4" strokeWidth={3} />
              </button>
            </div>
            <div className="p-5 sm:p-6">{children}</div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}