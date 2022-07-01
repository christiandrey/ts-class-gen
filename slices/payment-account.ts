import {activatePaymentAccountByEstate, approvePaymentRequest, assignVendorProject, createOfflineServiceChargePaymentForResident, createPaymentAccountForEstate, createPaymentForEstate, createPaymentRequestForEstate, createProject, deactivatePaymentAccountByEstate, fetchAllProject, fetchBalancesByApartment, fetchPaymentAccountsByEstate, fetchPaymentRequestById, fetchPaymentRequestsByEstate, fetchPaymentRequestsByMember, fetchPaymentRequestsByOrganization, fetchPaymentsByEstate, fetchPaymentsByResident, fetchProjectById, fetchProjectsByEstate, fetchProjectsByFacilityManager, fetchProjectsByResident, fetchProjectsByVendor, fetchPublicProjectsByEstate, fetchRecurringPaymentsByEstate, makePaymentProject, rejectPaymentRequest, updatePaymentAccountByEstate, updateStatusProject} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import paymentAccountsAdapter from '../adapters/payment-account';

export const paymentAccountsSlice = createSlice({
    name: 'paymentAccounts',
    initialState: paymentAccountsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(activatePaymentAccountByEstate.fulfilled, approvePaymentRequest.fulfilled, assignVendorProject.fulfilled, createOfflineServiceChargePaymentForResident.fulfilled, createPaymentAccountForEstate.fulfilled, createPaymentForEstate.fulfilled, createPaymentRequestForEstate.fulfilled, createProject.fulfilled, deactivatePaymentAccountByEstate.fulfilled, fetchAllProject.fulfilled, fetchBalancesByApartment.fulfilled, fetchPaymentAccountsByEstate.fulfilled, fetchPaymentRequestById.fulfilled, fetchPaymentRequestsByEstate.fulfilled, fetchPaymentRequestsByMember.fulfilled, fetchPaymentRequestsByOrganization.fulfilled, fetchPaymentsByEstate.fulfilled, fetchPaymentsByResident.fulfilled, fetchProjectById.fulfilled, fetchProjectsByEstate.fulfilled, fetchProjectsByFacilityManager.fulfilled, fetchProjectsByResident.fulfilled, fetchProjectsByVendor.fulfilled, fetchPublicProjectsByEstate.fulfilled, fetchRecurringPaymentsByEstate.fulfilled, makePaymentProject.fulfilled, rejectPaymentRequest.fulfilled, updatePaymentAccountByEstate.fulfilled, updateStatusProject.fulfilled), (state, action) => {
            paymentAccountsAdapter.upsertMany(state, action.payload.entities.paymentAccounts);
        });
    },
});

export const paymentAccountsReducer = paymentAccountsSlice.reducer;

export const paymentAccountsActions = paymentAccountsSlice.actions;