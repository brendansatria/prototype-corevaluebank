export type CardType = 'sun' | 'plant' | 'water' | 'grasshopper';

export interface Card {
  type: CardType;
  id: string;
  flipped: boolean;
  removed: boolean;
}

export const CARD_TYPES: Record<CardType, { emoji: string; name: string }> = {
  sun: { emoji: '☀️', name: 'Sun' },
  plant: { emoji: '🌱', name: 'Plant' },
  water: { emoji: '💧', name: 'Water' },
  grasshopper: { emoji: '🦗', name: 'Grasshopper' },
};