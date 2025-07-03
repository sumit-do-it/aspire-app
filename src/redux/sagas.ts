import { call, put, takeEvery, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { mockApi } from '../api/mockApi';
import { RootState, AddCardPayload, ToggleFreezePayload } from '@typings/index';
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

// Fetch Cards Saga
function* fetchCardsSaga(): Generator<any, void, any> {
  try {
    const cards = yield call(mockApi.fetchCards);
    yield put(fetchCardsSuccess(cards));
  } catch (error) {
    yield put(fetchCardsFailure(error instanceof Error ? error.message : 'Failed to fetch cards'));
  }
}

// Add Card Saga
function* addCardSaga(action: PayloadAction<AddCardPayload>): Generator<any, void, any> {
  try {
    const { name } = action.payload;
    if (!name.trim()) {
      throw new Error('Card name is required');
    }
    const newCard = yield call(mockApi.addCard, name);
    yield put(addCardSuccess(newCard));
  } catch (error) {
    yield put(addCardFailure(error instanceof Error ? error.message : 'Failed to add card'));
  }
}

// Toggle Card Freeze Saga
function* toggleCardFreezeSaga(action: PayloadAction<ToggleFreezePayload>): Generator<any, void, any> {
  try {
    const { cardId } = action.payload;
    const state: RootState = yield select();
    const card = state.cards.cards.find(c => c.id === cardId);
    
    if (!card) {
      throw new Error('Card not found');
    }

    const result = yield call(mockApi.toggleCardFreeze, cardId, card.isFrozen);
    yield put(toggleCardFreezeSuccess(result));
  } catch (error) {
    yield put(toggleCardFreezeFailure(error instanceof Error ? error.message : 'Failed to toggle card freeze'));
  }
}

// Root Saga
export function* rootSaga() {
  yield takeLatest(fetchCardsRequest.type, fetchCardsSaga);
  yield takeLatest(addCardRequest.type, addCardSaga);
  yield takeLatest(toggleCardFreezeRequest.type, toggleCardFreezeSaga);
}