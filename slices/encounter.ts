import {createEncounterForClinicalVisit, fetchEncounterById, fetchEncountersByClinicalVisit, updateEncounter} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import encountersAdapter from '../adapters/encounter';

export const encountersSlice = createSlice({
    name: 'encounters',
    initialState: encountersAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createEncounterForClinicalVisit.fulfilled, fetchEncounterById.fulfilled, fetchEncountersByClinicalVisit.fulfilled, updateEncounter.fulfilled), (state, action) => {
            encountersAdapter.upsertMany(state, action.payload.entities.encounters);
        });
    },
});

export const encountersReducer = encountersSlice.reducer;

export const encountersActions = encountersSlice.actions;