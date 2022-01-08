import {createEncounterForClinicalVisit, createLabTestForEncounter, createLabTestResult, fetchEncounterById, fetchEncountersByClinicalVisit, fetchLabTestByCode, fetchLabTestsByHospital, fetchLabTestsForCurrentPatient, fetchLabTestsForPatient, shareLabTest, stopShareLabTest, updateEncounter, updateLabTestResult} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import labTestResultsAdapter from '../adapters/lab-test-result';

export const labTestResultsSlice = createSlice({
    name: 'labTestResults',
    initialState: labTestResultsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createEncounterForClinicalVisit.fulfilled, createLabTestForEncounter.fulfilled, createLabTestResult.fulfilled, fetchEncounterById.fulfilled, fetchEncountersByClinicalVisit.fulfilled, fetchLabTestByCode.fulfilled, fetchLabTestsByHospital.fulfilled, fetchLabTestsForCurrentPatient.fulfilled, fetchLabTestsForPatient.fulfilled, shareLabTest.fulfilled, stopShareLabTest.fulfilled, updateEncounter.fulfilled, updateLabTestResult.fulfilled), (state, action) => {
            labTestResultsAdapter.upsertMany(state, action.payload.entities.labTestResults);
        });
    },
});

export const labTestResultsReducer = labTestResultsSlice.reducer;

export const labTestResultsActions = labTestResultsSlice.actions;