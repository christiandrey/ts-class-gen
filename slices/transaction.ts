import {createClinicalVisitForPatient, createInvoiceForClinicalVisit, fetchClinicalVisitById, fetchClinicalVisitsForCurrentPatient, fetchClinicalVisitsForPatient, fetchInvoiceById, fetchInvoicesByHospital, fetchInvoicesForCurrentPatient, fetchInvoicesForPatient, fetchTransactionsByHospital, fetchTransactionsForCurrentPatient, fetchTransactionsForPatient, settleInvoice} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import transactionsAdapter from '../adapters/transaction';

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: transactionsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createClinicalVisitForPatient.fulfilled, createInvoiceForClinicalVisit.fulfilled, fetchClinicalVisitById.fulfilled, fetchClinicalVisitsForCurrentPatient.fulfilled, fetchClinicalVisitsForPatient.fulfilled, fetchInvoiceById.fulfilled, fetchInvoicesByHospital.fulfilled, fetchInvoicesForCurrentPatient.fulfilled, fetchInvoicesForPatient.fulfilled, fetchTransactionsByHospital.fulfilled, fetchTransactionsForCurrentPatient.fulfilled, fetchTransactionsForPatient.fulfilled, settleInvoice.fulfilled), (state, action) => {
            transactionsAdapter.upsertMany(state, action.payload.entities.transactions);
        });
    },
});

export const transactionsReducer = transactionsSlice.reducer;

export const transactionsActions = transactionsSlice.actions;