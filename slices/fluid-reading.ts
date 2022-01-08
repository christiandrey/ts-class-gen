import {createFluidReadingForEncounter, fetchFluidReadingsByClinicalVisit, fetchFluidReadingsByEncounter} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import fluidReadingsAdapter from '../adapters/fluid-reading';

export const fluidReadingsSlice = createSlice({
    name: 'fluidReadings',
    initialState: fluidReadingsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createFluidReadingForEncounter.fulfilled, fetchFluidReadingsByClinicalVisit.fulfilled, fetchFluidReadingsByEncounter.fulfilled), (state, action) => {
            fluidReadingsAdapter.upsertMany(state, action.payload.entities.fluidReadings);
        });
    },
});

export const fluidReadingsReducer = fluidReadingsSlice.reducer;

export const fluidReadingsActions = fluidReadingsSlice.actions;