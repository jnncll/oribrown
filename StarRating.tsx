import React, { useState } from 'react';
import { StarIcon } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const STARS = [1, 2, 3, 4, 5];

export function StarRating({ value, onChange, size = 'md', label = 'Rating' }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const px = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-8 w-8' : 'h-6 w-6';

  if (!onChange) {
    return (
      <div className="flex items-center gap-0.5" role="img" aria-label={`${value.toFixed(1)} dari 5 bintang`}>
        {STARS.map((i) =>
        <StarIcon
          key={i}
          className={`${px} ${i <= Math.round(value) ? 'fill-zest text-cocoa' : 'fill-transparent text-cocoa/25'}`}
          strokeWidth={2} />

        )}
      </div>);

  }

  return (
    <div role="radiogroup" aria-label={label} className="flex gap-1" onMouseLeave={() => setHover(0)}>
      {STARS.map((i) => {
        const active = i <= (hover || value);
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={value === i}
            aria-label={`${i} bintang`}
            onMouseEnter={() => setHover(i)}
            onClick={() => onChange(i)}
            className="rounded-md transition-transform duration-100 ease-toon hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zest">
            
            <StarIcon className={`${px} ${active ? 'fill-zest text-cocoa' : 'fill-white text-cocoa/40'}`} strokeWidth={2} />
          </button>);

      })}
    </div>);

}