import {createAppointmentForPatient, createClinicalVisitForPatient, createInvoiceForClinicalVisit, createPatientForHospital, fetchAppointmentByCalendarEvent, fetchAppointmentById, fetchAppointmentsByMedic, fetchAppointmentsForCurrentMedic, fetchAppointmentsForCurrentPatient, fetchAppointmentsForPatient, fetchClinicalVisitById, fetchClinicalVisitsForCurrentPatient, fetchClinicalVisitsForPatient, fetchCurrentPatient, fetchInvoiceById, fetchInvoicesByHospital, fetchInvoicesForCurrentPatient, fetchInvoicesForPatient, fetchPatientById, fetchPatientsByHospital, fetchTransactionsByHospital, fetchTransactionsForCurrentPatient, fetchTransactionsForPatient, rescheduleAppointment, settleInvoice, updatePatient, updatePatientSocialHistoryByPatient, updateStatusAppointment} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import patientSocialHistoriesAdapter from '../adapters/patient-social-history';

export const patientSocialHistoriesSlice = createSlice({
    name: 'patientSocialHistories',
    initialState: patientSocialHistoriesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createAppointmentForPatient.fulfilled, createClinicalVisitForPatient.fulfilled, createInvoiceForClinicalVisit.fulfilled, createPatientForHospital.fulfilled, fetchAppointmentByCalendarEvent.fulfilled, fetchAppointmentById.fulfilled, fetchAppointmentsByMedic.fulfilled, fetchAppointmentsForCurrentMedic.fulfilled, fetchAppointmentsForCurrentPatient.fulfilled, fetchAppointmentsForPatient.fulfilled, fetchClinicalVisitById.fulfilled, fetchClinicalVisitsForCurrentPatient.fulfilled, fetchClinicalVisitsForPatient.fulfilled, fetchCurrentPatient.fulfilled, fetchInvoiceById.fulfilled, fetchInvoicesByHospital.fulfilled, fetchInvoicesForCurrentPatient.fulfilled, fetchInvoicesForPatient.fulfilled, fetchPatientById.fulfilled, fetchPatientsByHospital.fulfilled, fetchTransactionsByHospital.fulfilled, fetchTransactionsForCurrentPatient.fulfilled, fetchTransactionsForPatient.fulfilled, rescheduleAppointment.fulfilled, settleInvoice.fulfilled, updatePatient.fulfilled, updatePatientSocialHistoryByPatient.fulfilled, updateStatusAppointment.fulfilled), (state, action) => {
            patientSocialHistoriesAdapter.upsertMany(state, action.payload.entities.patientSocialHistories);
        });
    },
});

export const patientSocialHistoriesReducer = patientSocialHistoriesSlice.reducer;

export const patientSocialHistoriesActions = patientSocialHistoriesSlice.actions;