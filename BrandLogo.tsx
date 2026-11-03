import React from 'react';
import { images } from '../data/images';

export function BrandLogo({ className = '' }: {className?: string;}) {
  return (
    <div className={`overflow-hidden ${className}`} style={{ aspectRatio: '2.6 / 1' }}>
      <img src={images.logo} alt="Oribrown — A Little Orange, A Lot of Brownie" className="h-full w-full object-cover object-center" />
    </div>);

}