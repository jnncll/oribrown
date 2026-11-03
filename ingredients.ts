import type { BrownieLayer } from '../types/ingredient';

export const brownieLayers: BrownieLayer[] = [
{
  id: 'kulit-jeruk',
  name: 'Bubuk Kulit Jeruk',
  role: 'Bahan rahasia',
  note: 'Kulit jeruk yang biasanya dibuang, kami keringkan lalu haluskan jadi bubuk. Hasilnya aroma citrus segar yang muncul pelan-pelan di setiap gigitan.',
  fill: 'transparent',
  texture: 'sprinkle',
  height: 18,
  star: true
},
{
  id: 'dark-chocolate',
  name: 'Dark Chocolate',
  role: 'Sumber rasa cokelat',
  note: 'Dilelehkan bersama butter supaya rasa cokelatnya pekat, kaya, dan sedikit pahit yang pas.',
  fill: '#3b2116',
  texture: 'glossy',
  height: 34
},
{
  id: 'cocoa',
  name: 'Cocoa Powder',
  role: 'Pendalam rasa',
  note: 'Bikin warna brownies makin gelap dan rasa cokelatnya makin dalam.',
  fill: '#6b3f2a',
  texture: 'dusty',
  height: 26
},
{
  id: 'butter',
  name: 'Butter',
  role: 'Kunci fudgy',
  note: 'Memberi tekstur lembut-lembap dan aroma gurih yang bikin nagih.',
  fill: '#f6cf6a',
  texture: 'plain',
  height: 22
},
{
  id: 'gula',
  name: 'Gula',
  role: 'Pemanis',
  note: 'Menyeimbangkan pahitnya dark chocolate dan membentuk lapisan atas yang crackly.',
  fill: '#fffaf0',
  texture: 'sparkle',
  height: 22
},
{
  id: 'telur',
  name: 'Telur',
  role: 'Pengikat',
  note: 'Menyatukan semua bahan, bikin brownies padat tapi tetap lembut.',
  fill: '#ffb938',
  texture: 'yolk',
  height: 24
},
{
  id: 'tepung',
  name: 'Tepung Terigu',
  role: 'Struktur',
  note: 'Secukupnya saja, supaya bagian tengah tetap fudgy — bukan seperti bolu.',
  fill: '#f3e3c7',
  texture: 'flour',
  height: 26
},
{
  id: 'vanila',
  name: 'Vanila',
  role: 'Aroma',
  note: 'Menghangatkan aroma cokelat dan menyatu manis dengan citrus.',
  fill: '#fbeed3',
  texture: 'speck',
  height: 18
},
{
  id: 'garam',
  name: 'Garam',
  role: 'Penyeimbang',
  note: 'Sejumput kecil yang bikin rasa cokelat dan jeruknya makin "keluar".',
  fill: '#e9e4dc',
  texture: 'flake',
  height: 18
}];