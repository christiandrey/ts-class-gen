import {createEncounterForClinicalVisit, createLabTestForEncounter, fetchEncounterById, fetchEncountersByClinicalVisit, fetchLabTestByCode, fetchLabTestsByHospital, fetchLabTestsForCurrentPatient, fetchLabTestsForPatient, shareLabTest, stopShareLabTest, updateEncounter} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import labTestsAdapter from '../adapters/lab-test';

export const labTestsSlice = createSlice({
    name: 'labTests',
    initialState: labTestsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createEncounterForClinicalVisit.fulfilled, createLabTestForEncounter.fulfilled, fetchEncounterById.fulfilled, fetchEncountersByClinicalVisit.fulfilled, fetchLabTestByCode.fulfilled, fetchLabTestsByHospital.fulfilled, fetchLabTestsForCurrentPatient.fulfilled, fetchLabTestsForPatient.fulfilled, shareLabTest.fulfilled, stopShareLabTest.fulfilled, updateEncounter.fulfilled), (state, action) => {
            labTestsAdapter.upsertMany(state, action.payload.entities.labTests);
        });
    },
});

export const labTestsReducer = labTestsSlice.reducer;

export const labTestsActions = labTestsSlice.actions;