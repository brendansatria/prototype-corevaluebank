export type CardType = 'sun' | 'co2' | 'water' | 'grasshopper';

export interface Card {
  type: CardType;
  id: string;
  flipped: boolean;
  removed: boolean;
}

export const CARD_TYPES: Record<CardType, { emoji: string; name: string }> = {
  sun: { emoji: '☀️', name: 'Sun' },
  co2: { emoji: '💨', name: 'CO2' },
  water: { emoji: '💧', name: 'Water' },
  grasshopper: { emoji: '🦗', name: 'Grasshopper' },
};