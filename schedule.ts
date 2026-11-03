import type { Phase } from '../types/shop';

export const PREORDER_START = new Date('2026-10-05T00:00:00+07:00');
export const PREORDER_END = new Date('2026-10-11T23:59:59+07:00');
export const PREORDER_LABEL = '5–11 Oktober 2026';
export const FULFILLMENT_LABEL = '12–16 Oktober 2026';

export function getPhase(now: Date): Phase {
  return now > PREORDER_END ? 'closed' : 'open';
}

export function isBeforeOfficialStart(now: Date): boolean {
  return now < PREORDER_START;
}

export function getTimeParts(target: Date, now: Date) {
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60
  };
}