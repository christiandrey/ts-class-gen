import {createClinicalVisitForPatient, createForInvoice, createInvoiceForClinicalVisit, fetchClinicalVisitById, fetchClinicalVisitsForCurrentPatient, fetchClinicalVisitsForPatient, fetchInvoiceById, fetchInvoicesByHospital, fetchInvoicesForCurrentPatient, fetchInvoicesForPatient, settleInvoice} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import invoiceItemsAdapter from '../adapters/invoice-item';

export const invoiceItemsSlice = createSlice({
    name: 'invoiceItems',
    initialState: invoiceItemsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createClinicalVisitForPatient.fulfilled, createForInvoice.fulfilled, createInvoiceForClinicalVisit.fulfilled, fetchClinicalVisitById.fulfilled, fetchClinicalVisitsForCurrentPatient.fulfilled, fetchClinicalVisitsForPatient.fulfilled, fetchInvoiceById.fulfilled, fetchInvoicesByHospital.fulfilled, fetchInvoicesForCurrentPatient.fulfilled, fetchInvoicesForPatient.fulfilled, settleInvoice.fulfilled), (state, action) => {
            invoiceItemsAdapter.upsertMany(state, action.payload.entities.invoiceItems);
        });
    },
});

export const invoiceItemsReducer = invoiceItemsSlice.reducer;

export const invoiceItemsActions = invoiceItemsSlice.actions;