import React from 'react';
import { useShop } from '../contexts/ShopContext';
import { product } from '../data/product';

export function StockMeter({ tone = 'light' }: {tone?: 'light' | 'dark';}) {
  const { stockLeft } = useShop();
  const total = product.totalStock;
  const low = stockLeft > 0 && stockLeft <= 10;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className={`font-display text-sm font-semibold ${tone === 'dark' ? 'text-cream' : ''}`}>Stok pre-order</span>
        <span className={`font-display text-sm font-bold ${low ? 'text-burnt' : tone === 'dark' ? 'text-cream' : ''}`}>
          {stockLeft === 0 ? 'Habis' : `${stockLeft}/${total} cup`}
        </span>
      </div>
      <div
        className="mt-1.5 flex gap-[2px] rounded-lg border-[3px] border-cocoa bg-white p-[3px]"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={stockLeft}
        aria-label="Sisa stok">
        
        {Array.from({ length: total }).map((_, i) =>
        <span key={i} className={`h-3 flex-1 rounded-[2px] ${i < stockLeft ? low ? 'bg-burnt' : 'bg-zest' : 'bg-cocoa/10'}`} />
        )}
      </div>
    </div>);

}