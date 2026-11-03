import type { ClassOption, PickupDate } from '../types/shop';

export const classOptions: ClassOption[] = [
{ value: 'Kelas X-1', label: 'X-1' },
{ value: 'Kelas X-2', label: 'X-2' },
{ value: 'Kelas XI IPA', label: 'XI IPA' },
{ value: 'Kelas XI IPS', label: 'XI IPS' },
{ value: 'Kelas XII IPA', label: 'XII IPA' },
{ value: 'Kelas XII IPS', label: 'XII IPS' },
{ value: 'Guru', label: 'Guru' },
{ value: 'Lainnya', label: 'Lainnya' }];


export const pickupDates: PickupDate[] = [
{ value: '2026-10-12', day: 'Sen', date: '12', label: 'Senin, 12 Oktober 2026' },
{ value: '2026-10-13', day: 'Sel', date: '13', label: 'Selasa, 13 Oktober 2026' },
{ value: '2026-10-14', day: 'Rab', date: '14', label: 'Rabu, 14 Oktober 2026' },
{ value: '2026-10-15', day: 'Kam', date: '15', label: 'Kamis, 15 Oktober 2026' },
{ value: '2026-10-16', day: 'Jum', date: '16', label: "Jum'at, 16 Oktober 2026" }];