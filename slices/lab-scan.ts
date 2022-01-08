import {createEncounterForClinicalVisit, createLabScanForEncounter, fetchEncounterById, fetchEncountersByClinicalVisit, fetchLabScansByEncounter, fetchLabScansForCurrentPatient, fetchLabScansForPatient, updateEncounter, updateLabScan} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import labScansAdapter from '../adapters/lab-scan';

export const labScansSlice = createSlice({
    name: 'labScans',
    initialState: labScansAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createEncounterForClinicalVisit.fulfilled, createLabScanForEncounter.fulfilled, fetchEncounterById.fulfilled, fetchEncountersByClinicalVisit.fulfilled, fetchLabScansByEncounter.fulfilled, fetchLabScansForCurrentPatient.fulfilled, fetchLabScansForPatient.fulfilled, updateEncounter.fulfilled, updateLabScan.fulfilled), (state, action) => {
            labScansAdapter.upsertMany(state, action.payload.entities.labScans);
        });
    },
});

export const labScansReducer = labScansSlice.reducer;

export const labScansActions = labScansSlice.actions;