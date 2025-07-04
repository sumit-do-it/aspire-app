import { createAction } from '@reduxjs/toolkit';
import { Card, AddCardPayload, ToggleFreezePayload } from '@typings/index';

// Fetch Cards Actions
export const fetchCardsRequest = createAction('cards/fetchCardsRequest');
export const fetchCardsSuccess = createAction<Card[]>('cards/fetchCardsSuccess');
export const fetchCardsFailure = createAction<string>('cards/fetchCardsFailure');

// Add Card Actions
export const addCardRequest = createAction<AddCardPayload>('cards/addCardRequest');
export const addCardSuccess = createAction<Card>('cards/addCardSuccess');
export const addCardFailure = createAction<string>('cards/addCardFailure');

// Toggle Freeze Actions
export const toggleCardFreezeRequest = createAction<ToggleFreezePayload>('cards/toggleCardFreezeRequest');
export const toggleCardFreezeSuccess = createAction<{ cardId: string; isFrozen: boolean }>('cards/toggleCardFreezeSuccess');
export const toggleCardFreezeFailure = createAction<string>('cards/toggleCardFreezeFailure');

// Update the selected Card
export const updateSelectedCard = createAction<number>('cards/updateSelectedCard');