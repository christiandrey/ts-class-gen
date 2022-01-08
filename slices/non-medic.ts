import {createClinicalVisitForPatient, createEncounterForClinicalVisit, createInvoiceForClinicalVisit, createLabScanForEncounter, createLabTestForEncounter, createLabTestResult, createNonMedicForHospital, fetchClinicalVisitById, fetchClinicalVisitsForCurrentPatient, fetchClinicalVisitsForPatient, fetchCurrentNonMedic, fetchEncounterById, fetchEncountersByClinicalVisit, fetchInvoiceById, fetchInvoicesByHospital, fetchInvoicesForCurrentPatient, fetchInvoicesForPatient, fetchLabScansByEncounter, fetchLabScansForCurrentPatient, fetchLabScansForPatient, fetchLabTestByCode, fetchLabTestsByHospital, fetchLabTestsForCurrentPatient, fetchLabTestsForPatient, fetchNonMedicsByHospital, settleInvoice, shareLabTest, stopShareLabTest, updateCurrentNonMedic, updateEncounter, updateLabScan, updateLabTestResult} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import nonMedicsAdapter from '../adapters/non-medic';

export const nonMedicsSlice = createSlice({
    name: 'nonMedics',
    initialState: nonMedicsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createClinicalVisitForPatient.fulfilled, createEncounterForClinicalVisit.fulfilled, createInvoiceForClinicalVisit.fulfilled, createLabScanForEncounter.fulfilled, createLabTestForEncounter.fulfilled, createLabTestResult.fulfilled, createNonMedicForHospital.fulfilled, fetchClinicalVisitById.fulfilled, fetchClinicalVisitsForCurrentPatient.fulfilled, fetchClinicalVisitsForPatient.fulfilled, fetchCurrentNonMedic.fulfilled, fetchEncounterById.fulfilled, fetchEncountersByClinicalVisit.fulfilled, fetchInvoiceById.fulfilled, fetchInvoicesByHospital.fulfilled, fetchInvoicesForCurrentPatient.fulfilled, fetchInvoicesForPatient.fulfilled, fetchLabScansByEncounter.fulfilled, fetchLabScansForCurrentPatient.fulfilled, fetchLabScansForPatient.fulfilled, fetchLabTestByCode.fulfilled, fetchLabTestsByHospital.fulfilled, fetchLabTestsForCurrentPatient.fulfilled, fetchLabTestsForPatient.fulfilled, fetchNonMedicsByHospital.fulfilled, settleInvoice.fulfilled, shareLabTest.fulfilled, stopShareLabTest.fulfilled, updateCurrentNonMedic.fulfilled, updateEncounter.fulfilled, updateLabScan.fulfilled, updateLabTestResult.fulfilled), (state, action) => {
            nonMedicsAdapter.upsertMany(state, action.payload.entities.nonMedics);
        });
    },
});

export const nonMedicsReducer = nonMedicsSlice.reducer;

export const nonMedicsActions = nonMedicsSlice.actions;