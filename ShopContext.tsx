import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNow } from '../hooks/useNow';
import { getPhase } from '../utils/schedule';
import { product } from '../data/product';
import type { FlightOrigin, Order, Phase, PhaseOverride } from '../types/shop';

interface Flight extends FlightOrigin {
  id: number;
}

interface ShopContextValue {
  phase: Phase;
  cartQty: number;
  stockLeft: number;
  orders: Order[];
  cartPulse: number;
  flight: Flight | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  setCartQty: (qty: number) => void;
  addToCart: (qty: number, origin?: FlightOrigin) => boolean;
  clearFlight: () => void;
  placeOrder: (order: Order) => boolean;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

interface ShopProviderProps {
  children: React.ReactNode;
  phaseOverride?: PhaseOverride;
}

export function ShopProvider({ children, phaseOverride = 'auto' }: ShopProviderProps) {
  const now = useNow(15000);
  const phase: Phase = phaseOverride === 'auto' ? getPhase(now) : phaseOverride;
  const [orders, saveOrders] = useLocalStorage<Order[]>('oribrown:orders', []);
  const [storedCart, saveCart] = useLocalStorage<number>('oribrown:cart', 0);
  const [cartPulse, setCartPulse] = useState(0);
  const [flight, setFlight] = useState<Flight | null>(null);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  const sold = orders.reduce((sum, o) => sum + o.quantity, 0);
  const stockLeft = Math.max(0, product.totalStock - sold);
  const cartQty = phase === 'closed' ? 0 : Math.min(storedCart, stockLeft);

  const setCartQty = useCallback((qty: number) => saveCart(Math.max(0, Math.min(qty, stockLeft))), [saveCart, stockLeft]);

  const addToCart = useCallback(
    (qty: number, origin?: FlightOrigin) => {
      if (phase === 'closed' || stockLeft === 0) return false;
      const next = Math.min(cartQty + qty, stockLeft);
      if (next === cartQty) return false;
      saveCart(next);
      setCartPulse((p) => p + 1);
      if (origin) setFlight({ ...origin, id: Date.now() });
      return true;
    },
    [phase, stockLeft, cartQty, saveCart]
  );

  const placeOrder = useCallback(
    (order: Order) => {
      const ok = saveOrders([...orders, order]);
      if (ok) saveCart(0);
      return ok;
    },
    [orders, saveOrders, saveCart]
  );

  const value = useMemo<ShopContextValue>(
    () => ({
      phase,
      cartQty,
      stockLeft,
      orders,
      cartPulse,
      flight,
      isCartOpen,
      isCheckoutOpen,
      setCartQty,
      addToCart,
      clearFlight: () => setFlight(null),
      placeOrder,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      openCheckout: () => {
        setCartOpen(false);
        setCheckoutOpen(true);
      },
      closeCheckout: () => setCheckoutOpen(false)
    }),
    [phase, cartQty, stockLeft, orders, cartPulse, flight, isCartOpen, isCheckoutOpen, setCartQty, addToCart, placeOrder]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
}