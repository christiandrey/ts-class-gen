import {createAppointmentForPatient, createClinicalVisitForPatient, createDischargeSummaryForClinicalVisit, createEncounterForClinicalVisit, createForInvoice, createInvoiceForClinicalVisit, createLabScanForEncounter, createMedicForHospital, createMedicationForPatient, createServiceCategory, fetchAppointmentByCalendarEvent, fetchAppointmentById, fetchAppointmentsByMedic, fetchAppointmentsForCurrentMedic, fetchAppointmentsForCurrentPatient, fetchAppointmentsForPatient, fetchClinicalVisitById, fetchClinicalVisitsForCurrentPatient, fetchClinicalVisitsForPatient, fetchCurrentMedic, fetchEncounterById, fetchEncountersByClinicalVisit, fetchInvoiceById, fetchInvoicesByHospital, fetchInvoicesForCurrentPatient, fetchInvoicesForPatient, fetchLabScansByEncounter, fetchLabScansForCurrentPatient, fetchLabScansForPatient, fetchMedicationsForCurrentPatient, fetchMedicationsForPatient, fetchMedicsByHospital, fetchServiceCategory, fetchServicesByHospital, rescheduleAppointment, settleInvoice, updateCurrentMedic, updateEncounter, updateLabScan, updateServicesMedic, updateStatusAppointment} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import serviceCategoriesAdapter from '../adapters/service-category';

export const serviceCategoriesSlice = createSlice({
    name: 'serviceCategories',
    initialState: serviceCategoriesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createAppointmentForPatient.fulfilled, createClinicalVisitForPatient.fulfilled, createDischargeSummaryForClinicalVisit.fulfilled, createEncounterForClinicalVisit.fulfilled, createForInvoice.fulfilled, createInvoiceForClinicalVisit.fulfilled, createLabScanForEncounter.fulfilled, createMedicForHospital.fulfilled, createMedicationForPatient.fulfilled, createServiceCategory.fulfilled, fetchAppointmentByCalendarEvent.fulfilled, fetchAppointmentById.fulfilled, fetchAppointmentsByMedic.fulfilled, fetchAppointmentsForCurrentMedic.fulfilled, fetchAppointmentsForCurrentPatient.fulfilled, fetchAppointmentsForPatient.fulfilled, fetchClinicalVisitById.fulfilled, fetchClinicalVisitsForCurrentPatient.fulfilled, fetchClinicalVisitsForPatient.fulfilled, fetchCurrentMedic.fulfilled, fetchEncounterById.fulfilled, fetchEncountersByClinicalVisit.fulfilled, fetchInvoiceById.fulfilled, fetchInvoicesByHospital.fulfilled, fetchInvoicesForCurrentPatient.fulfilled, fetchInvoicesForPatient.fulfilled, fetchLabScansByEncounter.fulfilled, fetchLabScansForCurrentPatient.fulfilled, fetchLabScansForPatient.fulfilled, fetchMedicationsForCurrentPatient.fulfilled, fetchMedicationsForPatient.fulfilled, fetchMedicsByHospital.fulfilled, fetchServiceCategory.fulfilled, fetchServicesByHospital.fulfilled, rescheduleAppointment.fulfilled, settleInvoice.fulfilled, updateCurrentMedic.fulfilled, updateEncounter.fulfilled, updateLabScan.fulfilled, updateServicesMedic.fulfilled, updateStatusAppointment.fulfilled), (state, action) => {
            serviceCategoriesAdapter.upsertMany(state, action.payload.entities.serviceCategories);
        });
    },
});

export const serviceCategoriesReducer = serviceCategoriesSlice.reducer;

export const serviceCategoriesActions = serviceCategoriesSlice.actions;