import {createAppointmentForPatient, createClinicalVisitForPatient, createInvoiceForClinicalVisit, createPatientForHospital, fetchAppointmentByCalendarEvent, fetchAppointmentById, fetchAppointmentsByMedic, fetchAppointmentsForCurrentMedic, fetchAppointmentsForCurrentPatient, fetchAppointmentsForPatient, fetchClinicalVisitById, fetchClinicalVisitsForCurrentPatient, fetchClinicalVisitsForPatient, fetchCurrentPatient, fetchInvoiceById, fetchInvoicesByHospital, fetchInvoicesForCurrentPatient, fetchInvoicesForPatient, fetchPatientById, fetchPatientsByHospital, fetchTransactionsByHospital, fetchTransactionsForCurrentPatient, fetchTransactionsForPatient, rescheduleAppointment, settleInvoice, updatePatient, updatePatientBiodataByPatient, updateStatusAppointment} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import patientBiodatasAdapter from '../adapters/patient-biodata';

export const patientBiodatasSlice = createSlice({
    name: 'patientBiodatas',
    initialState: patientBiodatasAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createAppointmentForPatient.fulfilled, createClinicalVisitForPatient.fulfilled, createInvoiceForClinicalVisit.fulfilled, createPatientForHospital.fulfilled, fetchAppointmentByCalendarEvent.fulfilled, fetchAppointmentById.fulfilled, fetchAppointmentsByMedic.fulfilled, fetchAppointmentsForCurrentMedic.fulfilled, fetchAppointmentsForCurrentPatient.fulfilled, fetchAppointmentsForPatient.fulfilled, fetchClinicalVisitById.fulfilled, fetchClinicalVisitsForCurrentPatient.fulfilled, fetchClinicalVisitsForPatient.fulfilled, fetchCurrentPatient.fulfilled, fetchInvoiceById.fulfilled, fetchInvoicesByHospital.fulfilled, fetchInvoicesForCurrentPatient.fulfilled, fetchInvoicesForPatient.fulfilled, fetchPatientById.fulfilled, fetchPatientsByHospital.fulfilled, fetchTransactionsByHospital.fulfilled, fetchTransactionsForCurrentPatient.fulfilled, fetchTransactionsForPatient.fulfilled, rescheduleAppointment.fulfilled, settleInvoice.fulfilled, updatePatient.fulfilled, updatePatientBiodataByPatient.fulfilled, updateStatusAppointment.fulfilled), (state, action) => {
            patientBiodatasAdapter.upsertMany(state, action.payload.entities.patientBiodatas);
        });
    },
});

export const patientBiodatasReducer = patientBiodatasSlice.reducer;

export const patientBiodatasActions = patientBiodatasSlice.actions;