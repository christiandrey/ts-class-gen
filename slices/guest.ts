import {createGuestForPatient, fetchCurrentGuest, fetchGuestsForCurrentPatient, updateGuest} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import guestsAdapter from '../adapters/guest';

export const guestsSlice = createSlice({
    name: 'guests',
    initialState: guestsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createGuestForPatient.fulfilled, fetchCurrentGuest.fulfilled, fetchGuestsForCurrentPatient.fulfilled, updateGuest.fulfilled), (state, action) => {
            guestsAdapter.upsertMany(state, action.payload.entities.guests);
        });
    },
});

export const guestsReducer = guestsSlice.reducer;

export const guestsActions = guestsSlice.actions;