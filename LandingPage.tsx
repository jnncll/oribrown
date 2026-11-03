import React from 'react';
import { ScheduleTicker } from './ScheduleTicker';
import { HudBar } from './HudBar';
import { Hero } from './Hero';
import { Marquee } from './Marquee';
import { BrownieBurger } from './brownie/BrownieBurger';
import { WhyOribrown } from './WhyOribrown';
import { OrderSection } from './OrderSection';
import { ReviewSection } from './reviews/ReviewSection';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { CartFlyer } from './CartFlyer';
import { CheckoutModal } from './checkout/CheckoutModal';
import { ScheduleNotice } from './ScheduleNotice';
import { OririGuide } from './OririGuide';

const TOP_MARQUEE = ['A Little Orange, A Lot of Brownie', 'Pre-Order 5–11 Oktober 2026', 'Cuma 40 cup', 'Rp12.000 / cup', 'Bisa bayar pakai QRIS'];
const BOTTOM_MARQUEE = ['Kel 1: Joanna & Arvin', '#ORIBROWN', '#UpcycledDessert', '#BrowniesWithPurpose', 'Ambil/Kirim 12–16 Oktober 2026'];

export function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-cream">
      <ScheduleTicker />
      <HudBar />
      <main>
        <Hero />
        <Marquee items={TOP_MARQUEE} tone="zest" />
        <BrownieBurger />
        <WhyOribrown />
        <OrderSection />
        <ReviewSection />
      </main>
      <Marquee items={BOTTOM_MARQUEE} tone="choco" reverse />
      <Footer />
      <CartDrawer />
      <CartFlyer />
      <CheckoutModal />
      <ScheduleNotice />
      <OririGuide />
    </div>);

}