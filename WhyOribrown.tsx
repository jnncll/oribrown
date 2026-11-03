import React from 'react';
import { motion } from 'framer-motion';
import { CandyIcon, LeafIcon, LightbulbIcon, RecycleIcon } from 'lucide-react';
import { brandSkills, brandStats, upcycleSteps } from '../data/reasons';
import { images } from '../data/images';
import { SectionHeading } from './SectionHeading';

const SKILL_ICONS: Record<string, typeof RecycleIcon> = {
  upcycle: RecycleIcon,
  taste: CandyIcon,
  eco: LeafIcon,
  innovation: LightbulbIcon
};

export function WhyOribrown() {
  return (
    <section id="kenapa" className="border-t-[3px] border-cocoa bg-cream py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading level={3} title="Kenapa harus Oribrown?" desc="Brownies biasanya cuma beda di topping. Oribrown beda dari dalam — dan punya cerita." />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="toon-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-semibold">Stat Karakter</h3>
              <span className="rounded-full border-[3px] border-cocoa bg-zest px-3 py-0.5 font-display text-sm font-semibold text-white">Lv. 99</span>
            </div>
            <ul className="mt-5 space-y-4">
              {brandStats.map((s, i) =>
              <li key={s.label}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-lg font-semibold">{s.label}</span>
                    <span className="text-sm font-bold text-cocoa/70">{s.caption}</span>
                  </div>
                  <div className="mt-1.5 h-5 overflow-hidden rounded-full border-[3px] border-cocoa bg-white">
                    <motion.div
                    className={`h-full ${s.label === 'Jeruk' ? 'bg-zest' : s.label === 'Eco' ? 'bg-leaf' : 'bg-choco'}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.value}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.3, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }} />
                  
                  </div>
                </li>
              )}
            </ul>

            <h4 className="mt-8 font-display text-lg font-semibold">Skill Pasif</h4>
            <ul className="mt-3 divide-y-2 divide-dashed divide-cocoa/15">
              {brandSkills.map((s) => {
                const Icon = SKILL_ICONS[s.key];
                return (
                  <li key={s.key} className="flex gap-3 py-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-[3px] border-cocoa bg-cream">
                      <Icon className="h-5 w-5" strokeWidth={2.5} />
                    </span>
                    <div>
                      <p className="font-display font-semibold">{s.title}</p>
                      <p className="text-sm text-cocoa/80">{s.desc}</p>
                    </div>
                  </li>);

              })}
            </ul>
          </div>

          <div>
            <div className="overflow-hidden rounded-3xl border-[3px] border-cocoa bg-[#fbe3c3] shadow-toon">
              <img src={images.peelUpcycle} alt="Ilustrasi kulit jeruk yang diolah menjadi bubuk" className="aspect-[4/3] w-full object-cover" />
            </div>
            <h3 className="mt-8 font-display text-2xl font-semibold">Dari sampah jadi rasa</h3>
            <p className="mt-2 text-cocoa/80">Kulit jeruk sering cuma berakhir di tempat sampah, padahal masih bisa jadi bahan pangan.</p>
            <ol className="mt-6 space-y-0">
              {upcycleSteps.map((s, i) =>
              <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < upcycleSteps.length - 1 && <span className="absolute left-[18px] top-10 h-[calc(100%-2.5rem)] w-[3px] bg-cocoa/25" aria-hidden="true" />}
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-[3px] border-cocoa bg-zest font-display font-bold text-white">{i + 1}</span>
                  <div className="pt-1">
                    <p className="font-display text-lg font-semibold">{s.title}</p>
                    <p className="text-cocoa/80">{s.desc}</p>
                  </div>
                </li>
              )}
            </ol>
            <p className="mt-6 font-display font-semibold text-burnt">#ORIBROWN #UpcycledDessert #BrowniesWithPurpose</p>
          </div>
        </div>
      </div>
    </section>);

}