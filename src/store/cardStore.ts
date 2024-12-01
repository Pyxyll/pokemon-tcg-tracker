import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Card = {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
  set: {
    name: string;
  };
};

type CardStore = {
  cards: Card[];
  addCard: (card: Card) => void;
  removeCard: (cardId: string) => void;
};

export const useCardStore = create(
  persist<CardStore>(
    (set) => ({
      cards: [],
      addCard: (card) =>
        set((state) => ({
          cards: state.cards.some((c) => c.id === card.id)
            ? state.cards
            : [...state.cards, card],
        })),
      removeCard: (cardId) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== cardId),
        })),
    }),
    {
      name: 'pokemon-tcg-storage',
    }
  )
);