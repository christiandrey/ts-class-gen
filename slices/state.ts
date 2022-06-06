import {createAppointmentForPatient, createClinicalVisitForPatient, createDischargeSummaryForClinicalVisit, createEncounterForClinicalVisit, createForInvoice, createHospital, createInvoiceForClinicalVisit, createLabScanForEncounter, createLabTestForEncounter, createLabTestResult, createManager, createMedicForHospital, createMedicationForPatient, createNonMedicForHospital, createPatientForHospital, fetchAppointmentByCalendarEvent, fetchAppointmentById, fetchAppointmentsByMedic, fetchAppointmentsForCurrentMedic, fetchAppointmentsForCurrentPatient, fetchAppointmentsForPatient, fetchClinicalVisitById, fetchClinicalVisitsForCurrentPatient, fetchClinicalVisitsForPatient, fetchCurrentHospital, fetchCurrentManager, fetchCurrentMedic, fetchCurrentNonMedic, fetchCurrentPatient, fetchEncounterById, fetchEncountersByClinicalVisit, fetchHospital, fetchHospitals, fetchInvoiceById, fetchInvoicesByHospital, fetchInvoicesForCurrentPatient, fetchInvoicesForPatient, fetchLabScansByEncounter, fetchLabScansForCurrentPatient, fetchLabScansForPatient, fetchLabTestByCode, fetchLabTestsByHospital, fetchLabTestsForCurrentPatient, fetchLabTestsForPatient, fetchMedicationsForCurrentPatient, fetchMedicationsForPatient, fetchMedicsByHospital, fetchNonMedicsByHospital, fetchPatientById, fetchPatientsByHospital, fetchStatesLocationByCountry, fetchTransactionsByHospital, fetchTransactionsForCurrentPatient, fetchTransactionsForPatient, rescheduleAppointment, settleInvoice, shareLabTest, stopShareLabTest, updateCurrentManager, updateCurrentMedic, updateCurrentNonMedic, updateEncounter, updateHospital, updateHospitalServices, updateLabScan, updateLabTestResult, updatePatient, updateServicesMedic, updateStatusAppointment} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import statesAdapter from '../adapters/state';

export const statesSlice = createSlice({
    name: 'states',
    initialState: statesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createAppointmentForPatient.fulfilled, createClinicalVisitForPatient.fulfilled, createDischargeSummaryForClinicalVisit.fulfilled, createEncounterForClinicalVisit.fulfilled, createForInvoice.fulfilled, createHospital.fulfilled, createInvoiceForClinicalVisit.fulfilled, createLabScanForEncounter.fulfilled, createLabTestForEncounter.fulfilled, createLabTestResult.fulfilled, createManager.fulfilled, createMedicForHospital.fulfilled, createMedicationForPatient.fulfilled, createNonMedicForHospital.fulfilled, createPatientForHospital.fulfilled, fetchAppointmentByCalendarEvent.fulfilled, fetchAppointmentById.fulfilled, fetchAppointmentsByMedic.fulfilled, fetchAppointmentsForCurrentMedic.fulfilled, fetchAppointmentsForCurrentPatient.fulfilled, fetchAppointmentsForPatient.fulfilled, fetchClinicalVisitById.fulfilled, fetchClinicalVisitsForCurrentPatient.fulfilled, fetchClinicalVisitsForPatient.fulfilled, fetchCurrentHospital.fulfilled, fetchCurrentManager.fulfilled, fetchCurrentMedic.fulfilled, fetchCurrentNonMedic.fulfilled, fetchCurrentPatient.fulfilled, fetchEncounterById.fulfilled, fetchEncountersByClinicalVisit.fulfilled, fetchHospital.fulfilled, fetchHospitals.fulfilled, fetchInvoiceById.fulfilled, fetchInvoicesByHospital.fulfilled, fetchInvoicesForCurrentPatient.fulfilled, fetchInvoicesForPatient.fulfilled, fetchLabScansByEncounter.fulfilled, fetchLabScansForCurrentPatient.fulfilled, fetchLabScansForPatient.fulfilled, fetchLabTestByCode.fulfilled, fetchLabTestsByHospital.fulfilled, fetchLabTestsForCurrentPatient.fulfilled, fetchLabTestsForPatient.fulfilled, fetchMedicationsForCurrentPatient.fulfilled, fetchMedicationsForPatient.fulfilled, fetchMedicsByHospital.fulfilled, fetchNonMedicsByHospital.fulfilled, fetchPatientById.fulfilled, fetchPatientsByHospital.fulfilled, fetchStatesLocationByCountry.fulfilled, fetchTransactionsByHospital.fulfilled, fetchTransactionsForCurrentPatient.fulfilled, fetchTransactionsForPatient.fulfilled, rescheduleAppointment.fulfilled, settleInvoice.fulfilled, shareLabTest.fulfilled, stopShareLabTest.fulfilled, updateCurrentManager.fulfilled, updateCurrentMedic.fulfilled, updateCurrentNonMedic.fulfilled, updateEncounter.fulfilled, updateHospital.fulfilled, updateHospitalServices.fulfilled, updateLabScan.fulfilled, updateLabTestResult.fulfilled, updatePatient.fulfilled, updateServicesMedic.fulfilled, updateStatusAppointment.fulfilled), (state, action) => {
            statesAdapter.upsertMany(state, action.payload.entities.states);
        });
    },
});

export const statesReducer = statesSlice.reducer;

export const statesActions = statesSlice.actions;