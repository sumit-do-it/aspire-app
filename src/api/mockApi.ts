import { Card } from '@typings/index';
import { createNewCard } from '@utils/cardUtils';

// Mock data for initial cards
const initialCards: Card[] = [
  {
    id: '1',
    name: 'Personal Card',
    cardNumber: '1234 5678 9012 3456',
    expirationDate: '12/26',
    isFrozen: false,
    createdAt: '2024-01-01T00:00:00Z',
    balance: 3000,
    cvv: '321'
  },
  {
    id: '2',
    name: 'Business Card',
    cardNumber: '9876 5432 1098 7654',
    expirationDate: '06/27',
    isFrozen: true,
    createdAt: '2024-01-15T00:00:00Z',
    balance: 4500,
    cvv: '823'
  },
];

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Fetch all cards
  fetchCards: async (): Promise<Card[]> => {
    await delay();
    return [...initialCards];
  },

  // Add a new card
  addCard: async (name: string): Promise<Card> => {
    await delay();
    const newCardData = createNewCard(name);
    const newCard: Card = {
      ...newCardData,
      id: Date.now().toString(),
    };
    return newCard;
  },

  // Toggle freeze status
  toggleCardFreeze: async (cardId: string, currentStatus: boolean): Promise<{ cardId: string; isFrozen: boolean }> => {
    await delay();
    return {
      cardId,
      isFrozen: !currentStatus,
    };
  },
};