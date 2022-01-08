import {createEncounterForClinicalVisit, createVitalReadingForEncounter, fetchEncounterById, fetchEncountersByClinicalVisit, fetchLatestVitalReadingForCurrentPatient, fetchLatestVitalReadingForPatient, updateEncounter} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import vitalReadingsAdapter from '../adapters/vital-reading';

export const vitalReadingsSlice = createSlice({
    name: 'vitalReadings',
    initialState: vitalReadingsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createEncounterForClinicalVisit.fulfilled, createVitalReadingForEncounter.fulfilled, fetchEncounterById.fulfilled, fetchEncountersByClinicalVisit.fulfilled, fetchLatestVitalReadingForCurrentPatient.fulfilled, fetchLatestVitalReadingForPatient.fulfilled, updateEncounter.fulfilled), (state, action) => {
            vitalReadingsAdapter.upsertMany(state, action.payload.entities.vitalReadings);
        });
    },
});

export const vitalReadingsReducer = vitalReadingsSlice.reducer;

export const vitalReadingsActions = vitalReadingsSlice.actions;