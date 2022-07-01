import {activateStateLocation, deactivateStateLocation, fetchStatesLocation, fetchStatesLocationByCountry, updateStateLocation} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import statesAdapter from '../adapters/state';

export const statesSlice = createSlice({
    name: 'states',
    initialState: statesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(activateStateLocation.fulfilled, deactivateStateLocation.fulfilled, fetchStatesLocation.fulfilled, fetchStatesLocationByCountry.fulfilled, updateStateLocation.fulfilled), (state, action) => {
            statesAdapter.upsertMany(state, action.payload.entities.states);
        });
    },
});

export const statesReducer = statesSlice.reducer;

export const statesActions = statesSlice.actions;