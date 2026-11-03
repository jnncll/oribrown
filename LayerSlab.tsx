import React from 'react';
import type { BrownieLayer } from '../../types/ingredient';

const SPOTS = [
{ l: 8, t: 30 }, { l: 20, t: 60 }, { l: 33, t: 25 }, { l: 45, t: 55 },
{ l: 58, t: 35 }, { l: 70, t: 65 }, { l: 82, t: 30 }, { l: 92, t: 55 }];


function Texture({ texture }: {texture: BrownieLayer['texture'];}) {
  switch (texture) {
    case 'glossy':
      return (
        <>
          <span className="absolute left-4 top-1.5 h-1.5 w-16 rounded-full bg-white/30" />
          <span className="absolute left-24 top-1.5 h-1.5 w-4 rounded-full bg-white/30" />
        </>);

    case 'dusty':
      return <>{SPOTS.map((s, i) => <span key={i} className="absolute h-1.5 w-1.5 rounded-full bg-[#a0704f]" style={{ left: `${s.l}%`, top: `${s.t}%` }} />)}</>;
    case 'sparkle':
      return <>{SPOTS.map((s, i) => <span key={i} className="absolute h-1.5 w-1.5 rotate-45 bg-caramel" style={{ left: `${s.l}%`, top: `${s.t}%` }} />)}</>;
    case 'yolk':
      return <span className="absolute left-5 top-1 h-2 w-10 rounded-full bg-white/50" />;
    case 'flour':
      return <>{SPOTS.map((s, i) => <span key={i} className="absolute h-2 w-2 rounded-full bg-white" style={{ left: `${s.l}%`, top: `${s.t - 10}%` }} />)}</>;
    case 'speck':
      return <>{SPOTS.map((s, i) => <span key={i} className="absolute h-1 w-1 rounded-full bg-cocoa/70" style={{ left: `${s.l}%`, top: `${s.t}%` }} />)}</>;
    case 'flake':
      return <>{SPOTS.map((s, i) => <span key={i} className="absolute h-1.5 w-1.5 border border-cocoa/40 bg-white" style={{ left: `${s.l}%`, top: `${s.t - 5}%` }} />)}</>;
    case 'plain':
      return <span className="absolute left-4 top-1 h-1.5 w-20 rounded-full bg-white/50" />;
    default:
      return null;
  }
}

const ZEST_BITS = [
{ l: 6, r: -20, w: 14 }, { l: 16, r: 30, w: 10 }, { l: 27, r: -10, w: 16 }, { l: 38, r: 45, w: 10 },
{ l: 49, r: -35, w: 14 }, { l: 60, r: 15, w: 12 }, { l: 71, r: -25, w: 16 }, { l: 82, r: 35, w: 10 }, { l: 91, r: -5, w: 12 }];


export function LayerSlab({ layer }: {layer: BrownieLayer;}) {
  if (layer.texture === 'sprinkle') {
    return (
      <div className="relative w-full" style={{ height: layer.height }}>
        {ZEST_BITS.map((b, i) =>
        <span
          key={i}
          className="absolute top-1/2 h-2.5 rounded-full border-2 border-cocoa bg-zest"
          style={{ left: `${b.l}%`, width: b.w, transform: `translate(-50%, -50%) rotate(${b.r}deg)` }} />

        )}
      </div>);

  }
  return (
    <div className="relative w-full overflow-hidden rounded-xl border-[3px] border-cocoa" style={{ height: layer.height, backgroundColor: layer.fill }}>
      <Texture texture={layer.texture} />
    </div>);

}