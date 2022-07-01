import {assignVendorProject, createOfflineServiceChargePaymentForResident, createPaymentForEstate, createProject, fetchAllProject, fetchPaymentsByEstate, fetchPaymentsByResident, fetchProjectById, fetchProjectsByEstate, fetchProjectsByFacilityManager, fetchProjectsByResident, fetchProjectsByVendor, fetchPublicProjectsByEstate, fetchTransactions, fetchTransactionsByUser, fundOrganizationWalletForOrganization, fundWalletFromCardForCard, makePaymentProject, updateStatusProject, withdrawToBankAccountForBankAccount, withdrawToCardForCard} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import transactionsAdapter from '../adapters/transaction';

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: transactionsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(assignVendorProject.fulfilled, createOfflineServiceChargePaymentForResident.fulfilled, createPaymentForEstate.fulfilled, createProject.fulfilled, fetchAllProject.fulfilled, fetchPaymentsByEstate.fulfilled, fetchPaymentsByResident.fulfilled, fetchProjectById.fulfilled, fetchProjectsByEstate.fulfilled, fetchProjectsByFacilityManager.fulfilled, fetchProjectsByResident.fulfilled, fetchProjectsByVendor.fulfilled, fetchPublicProjectsByEstate.fulfilled, fetchTransactions.fulfilled, fetchTransactionsByUser.fulfilled, fundOrganizationWalletForOrganization.fulfilled, fundWalletFromCardForCard.fulfilled, makePaymentProject.fulfilled, updateStatusProject.fulfilled, withdrawToBankAccountForBankAccount.fulfilled, withdrawToCardForCard.fulfilled), (state, action) => {
            transactionsAdapter.upsertMany(state, action.payload.entities.transactions);
        });
    },
});

export const transactionsReducer = transactionsSlice.reducer;

export const transactionsActions = transactionsSlice.actions;