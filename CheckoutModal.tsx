import React from 'react';
import { Modal } from '../Modal';
import { CheckoutFlow } from './CheckoutFlow';
import { useShop } from '../../contexts/ShopContext';

export function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout } = useShop();
  return (
    <Modal open={isCheckoutOpen} onClose={closeCheckout} title="Form Identitas Pemesan" size="lg">
      <CheckoutFlow onClose={closeCheckout} />
    </Modal>);

}