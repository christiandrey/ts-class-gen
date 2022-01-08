import {createClinicalVisitForPatient, createDischargeSummaryForClinicalVisit, fetchClinicalVisitById, fetchClinicalVisitsForCurrentPatient, fetchClinicalVisitsForPatient} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import dischargeSummariesAdapter from '../adapters/discharge-summary';

export const dischargeSummariesSlice = createSlice({
    name: 'dischargeSummaries',
    initialState: dischargeSummariesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createClinicalVisitForPatient.fulfilled, createDischargeSummaryForClinicalVisit.fulfilled, fetchClinicalVisitById.fulfilled, fetchClinicalVisitsForCurrentPatient.fulfilled, fetchClinicalVisitsForPatient.fulfilled), (state, action) => {
            dischargeSummariesAdapter.upsertMany(state, action.payload.entities.dischargeSummaries);
        });
    },
});

export const dischargeSummariesReducer = dischargeSummariesSlice.reducer;

export const dischargeSummariesActions = dischargeSummariesSlice.actions;