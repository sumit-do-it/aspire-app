export interface Card {
    id: string;
    name: string;
    cardNumber: string;
    cvv:  string;
    expirationDate: string;
    isFrozen: boolean;
    createdAt: string;
    balance: number;
  }
  
  export interface CardsState {
    cards: Card[];
    loading: boolean;
    error: string | null;
  }
  
  export interface RootState {
    cards: CardsState;
  }
  
  export interface AddCardPayload {
    name: string;
  }
  
  export interface ToggleFreezePayload {
    cardId: string;
  }
  