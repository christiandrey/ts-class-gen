import {createCard, fetchCards} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import cardsAdapter from '../adapters/card';

export const cardsSlice = createSlice({
    name: 'cards',
    initialState: cardsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createCard.fulfilled, fetchCards.fulfilled), (state, action) => {
            cardsAdapter.upsertMany(state, action.payload.entities.cards);
        });
    },
});

export const cardsReducer = cardsSlice.reducer;

export const cardsActions = cardsSlice.actions;