export type LayerTexture = 'sprinkle' | 'glossy' | 'dusty' | 'plain' | 'sparkle' | 'yolk' | 'flour' | 'speck' | 'flake';

export interface BrownieLayer {
  id: string;
  name: string;
  role: string;
  note: string;
  fill: string;
  texture: LayerTexture;
  height: number;
  star?: boolean;
}