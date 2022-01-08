import {createAppointmentForPatient, createClinicalVisitForPatient, createInvoiceForClinicalVisit, createPatientForHospital, fetchAppointmentByCalendarEvent, fetchAppointmentById, fetchAppointmentsByMedic, fetchAppointmentsForCurrentMedic, fetchAppointmentsForCurrentPatient, fetchAppointmentsForPatient, fetchClinicalVisitById, fetchClinicalVisitsForCurrentPatient, fetchClinicalVisitsForPatient, fetchCurrentPatient, fetchInvoiceById, fetchInvoicesByHospital, fetchInvoicesForCurrentPatient, fetchInvoicesForPatient, fetchPatientById, fetchPatientsByHospital, fetchTransactionsByHospital, fetchTransactionsForCurrentPatient, fetchTransactionsForPatient, rescheduleAppointment, settleInvoice, updatePatient, updateStatusAppointment} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import patientsAdapter from '../adapters/patient';

export const patientsSlice = createSlice({
    name: 'patients',
    initialState: patientsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createAppointmentForPatient.fulfilled, createClinicalVisitForPatient.fulfilled, createInvoiceForClinicalVisit.fulfilled, createPatientForHospital.fulfilled, fetchAppointmentByCalendarEvent.fulfilled, fetchAppointmentById.fulfilled, fetchAppointmentsByMedic.fulfilled, fetchAppointmentsForCurrentMedic.fulfilled, fetchAppointmentsForCurrentPatient.fulfilled, fetchAppointmentsForPatient.fulfilled, fetchClinicalVisitById.fulfilled, fetchClinicalVisitsForCurrentPatient.fulfilled, fetchClinicalVisitsForPatient.fulfilled, fetchCurrentPatient.fulfilled, fetchInvoiceById.fulfilled, fetchInvoicesByHospital.fulfilled, fetchInvoicesForCurrentPatient.fulfilled, fetchInvoicesForPatient.fulfilled, fetchPatientById.fulfilled, fetchPatientsByHospital.fulfilled, fetchTransactionsByHospital.fulfilled, fetchTransactionsForCurrentPatient.fulfilled, fetchTransactionsForPatient.fulfilled, rescheduleAppointment.fulfilled, settleInvoice.fulfilled, updatePatient.fulfilled, updateStatusAppointment.fulfilled), (state, action) => {
            patientsAdapter.upsertMany(state, action.payload.entities.patients);
        });
    },
});

export const patientsReducer = patientsSlice.reducer;

export const patientsActions = patientsSlice.actions;