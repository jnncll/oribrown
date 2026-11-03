import { pickupDates } from '../data/orderOptions';
import { product } from '../data/product';
import { formatRupiah } from './format';
import type { Order } from '../types/shop';

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateOrderNumber(existing: string[]): string {
  let code = '';
  do {
    code = 'ORB-';
    for (let i = 0; i < 4; i++) code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  } while (existing.includes(code));
  return code;
}

export function getPickupLabel(value: string): string {
  return pickupDates.find((d) => d.value === value)?.label ?? value;
}

export function buildOrderMessage(order: Order, contactName: string): string {
  const method = order.method === 'antar' ? `Diantarkan ke ${order.location}` : 'Ambil sendiri';
  const lines = [
  `Halo Kak ${contactName}! Saya mau pre-order Oribrown.`,
  '',
  '*PRE-ORDER ORIBROWN*',
  `No. Pesanan: ${order.orderNumber}`,
  `Nama: ${order.name}`,
  `Kelas: ${order.kelas}`,
  `Jumlah: ${order.quantity} ${product.unit} ${product.name}`,
  `Total: ${formatRupiah(order.total)}`,
  `Metode: ${method}`,
  `Tanggal: ${getPickupLabel(order.date)}`,
  `Pembayaran: ${order.paymentMethod === 'qris' ? 'QRIS (bukti bayar saya kirim di chat ini)' : 'Diatur lewat chat'}`];

  if (order.details.trim()) lines.push(`Detail: ${order.details.trim()}`);
  lines.push('', 'Terima kasih!');
  return lines.join('\n');
}

export function buildWaLink(wa: string, text?: string): string {
  return text ? `https://wa.me/${wa}?text=${encodeURIComponent(text)}` : `https://wa.me/${wa}`;
}