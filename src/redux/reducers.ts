import { createReducer } from '@reduxjs/toolkit';
import { CardsState } from '@typings/index';
import {
  fetchCardsRequest,
  fetchCardsSuccess,
  fetchCardsFailure,
  addCardRequest,
  addCardSuccess,
  addCardFailure,
  toggleCardFreezeRequest,
  toggleCardFreezeSuccess,
  toggleCardFreezeFailure,
} from './actions';

const initialState: CardsState = {
  cards: [],
  loading: false,
  error: null,
};

export const cardsReducer = createReducer(initialState, (builder) => {
  builder
    // Fetch Cards
    .addCase(fetchCardsRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCardsSuccess, (state, action) => {
      state.loading = false;
      state.cards = action.payload;
      state.error = null;
    })
    .addCase(fetchCardsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Add Card
    .addCase(addCardRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addCardSuccess, (state, action) => {
      state.loading = false;
      state.cards.push(action.payload);
      state.error = null;
    })
    .addCase(addCardFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // Toggle Freeze
    .addCase(toggleCardFreezeRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(toggleCardFreezeSuccess, (state, action) => {
      state.loading = false;
      const { cardId, isFrozen } = action.payload;
      const cardIndex = state.cards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        state.cards[cardIndex].isFrozen = isFrozen;
      }
      state.error = null;
    })
    .addCase(toggleCardFreezeFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});