import {createClinicalVisitForPatient, fetchClinicalVisitById, fetchClinicalVisitsForCurrentPatient, fetchClinicalVisitsForPatient} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import clinicalVisitsAdapter from '../adapters/clinical-visit';

export const clinicalVisitsSlice = createSlice({
    name: 'clinicalVisits',
    initialState: clinicalVisitsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createClinicalVisitForPatient.fulfilled, fetchClinicalVisitById.fulfilled, fetchClinicalVisitsForCurrentPatient.fulfilled, fetchClinicalVisitsForPatient.fulfilled), (state, action) => {
            clinicalVisitsAdapter.upsertMany(state, action.payload.entities.clinicalVisits);
        });
    },
});

export const clinicalVisitsReducer = clinicalVisitsSlice.reducer;

export const clinicalVisitsActions = clinicalVisitsSlice.actions;