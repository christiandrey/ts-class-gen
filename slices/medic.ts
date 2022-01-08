import {createAppointmentForPatient, createClinicalVisitForPatient, createDischargeSummaryForClinicalVisit, createEncounterForClinicalVisit, createForInvoice, createInvoiceForClinicalVisit, createLabScanForEncounter, createMedicForHospital, createMedicationForPatient, fetchAppointmentByCalendarEvent, fetchAppointmentById, fetchAppointmentsByMedic, fetchAppointmentsForCurrentMedic, fetchAppointmentsForCurrentPatient, fetchAppointmentsForPatient, fetchClinicalVisitById, fetchClinicalVisitsForCurrentPatient, fetchClinicalVisitsForPatient, fetchCurrentMedic, fetchEncounterById, fetchEncountersByClinicalVisit, fetchInvoiceById, fetchInvoicesByHospital, fetchInvoicesForCurrentPatient, fetchInvoicesForPatient, fetchLabScansByEncounter, fetchLabScansForCurrentPatient, fetchLabScansForPatient, fetchMedicationsForCurrentPatient, fetchMedicationsForPatient, fetchMedicsByHospital, rescheduleAppointment, settleInvoice, updateCurrentMedic, updateEncounter, updateLabScan, updateServicesMedic, updateStatusAppointment} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import medicsAdapter from '../adapters/medic';

export const medicsSlice = createSlice({
    name: 'medics',
    initialState: medicsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createAppointmentForPatient.fulfilled, createClinicalVisitForPatient.fulfilled, createDischargeSummaryForClinicalVisit.fulfilled, createEncounterForClinicalVisit.fulfilled, createForInvoice.fulfilled, createInvoiceForClinicalVisit.fulfilled, createLabScanForEncounter.fulfilled, createMedicForHospital.fulfilled, createMedicationForPatient.fulfilled, fetchAppointmentByCalendarEvent.fulfilled, fetchAppointmentById.fulfilled, fetchAppointmentsByMedic.fulfilled, fetchAppointmentsForCurrentMedic.fulfilled, fetchAppointmentsForCurrentPatient.fulfilled, fetchAppointmentsForPatient.fulfilled, fetchClinicalVisitById.fulfilled, fetchClinicalVisitsForCurrentPatient.fulfilled, fetchClinicalVisitsForPatient.fulfilled, fetchCurrentMedic.fulfilled, fetchEncounterById.fulfilled, fetchEncountersByClinicalVisit.fulfilled, fetchInvoiceById.fulfilled, fetchInvoicesByHospital.fulfilled, fetchInvoicesForCurrentPatient.fulfilled, fetchInvoicesForPatient.fulfilled, fetchLabScansByEncounter.fulfilled, fetchLabScansForCurrentPatient.fulfilled, fetchLabScansForPatient.fulfilled, fetchMedicationsForCurrentPatient.fulfilled, fetchMedicationsForPatient.fulfilled, fetchMedicsByHospital.fulfilled, rescheduleAppointment.fulfilled, settleInvoice.fulfilled, updateCurrentMedic.fulfilled, updateEncounter.fulfilled, updateLabScan.fulfilled, updateServicesMedic.fulfilled, updateStatusAppointment.fulfilled), (state, action) => {
            medicsAdapter.upsertMany(state, action.payload.entities.medics);
        });
    },
});

export const medicsReducer = medicsSlice.reducer;

export const medicsActions = medicsSlice.actions;