import { Card } from '@typings/index';

export const generateCardNumber = (): string => {
  const segments = [];
  for (let i = 0; i < 4; i++) {
    const segment = Math.floor(1000 + Math.random() * 9000).toString();
    segments.push(segment);
  }
  return segments.join(' ');
};

export const generateExpirationDate = (): string => {
  const currentDate = new Date();
  const futureYear = currentDate.getFullYear() + Math.floor(Math.random() * 5) + 1;
  const month = Math.floor(Math.random() * 12) + 1;
  return `${month.toString().padStart(2, '0')}/${futureYear.toString().slice(-2)}`;
};

export const createNewCard = (name: string): Omit<Card, 'id'> => {
  return {
    name: name.trim(),
    cardNumber: generateCardNumber(),
    expirationDate: generateExpirationDate(),
    isFrozen: false,
    createdAt: new Date().toISOString(),
    balance: Math.floor(1000 + Math.random() * 9000),
    cvv: (Math.floor(100 + Math.random() * 900)).toString(),
  };
};

export const maskCardNumber = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  const lastFour = cleanNumber.slice(-4);
  return `**** **** **** ${lastFour}`;
};

export const formatCardNumber = (cardNumber: string): string => {
  return cardNumber.replace(/(.{4})/g, '$1 ').trim();
};