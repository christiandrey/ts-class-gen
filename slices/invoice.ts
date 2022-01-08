import {createClinicalVisitForPatient, createInvoiceForClinicalVisit, fetchClinicalVisitById, fetchClinicalVisitsForCurrentPatient, fetchClinicalVisitsForPatient, fetchInvoiceById, fetchInvoicesByHospital, fetchInvoicesForCurrentPatient, fetchInvoicesForPatient, settleInvoice} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import invoicesAdapter from '../adapters/invoice';

export const invoicesSlice = createSlice({
    name: 'invoices',
    initialState: invoicesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createClinicalVisitForPatient.fulfilled, createInvoiceForClinicalVisit.fulfilled, fetchClinicalVisitById.fulfilled, fetchClinicalVisitsForCurrentPatient.fulfilled, fetchClinicalVisitsForPatient.fulfilled, fetchInvoiceById.fulfilled, fetchInvoicesByHospital.fulfilled, fetchInvoicesForCurrentPatient.fulfilled, fetchInvoicesForPatient.fulfilled, settleInvoice.fulfilled), (state, action) => {
            invoicesAdapter.upsertMany(state, action.payload.entities.invoices);
        });
    },
});

export const invoicesReducer = invoicesSlice.reducer;

export const invoicesActions = invoicesSlice.actions;