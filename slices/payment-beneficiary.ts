import {addPaymentBeneficiaryByEstate, approvePaymentRequest, assignVendorProject, createOfflineServiceChargePaymentForResident, createPaymentBeneficiaryForEstate, createPaymentForEstate, createPaymentRequestForEstate, createProject, fetchAllProject, fetchPaymentBeneficiariesByEstate, fetchPaymentBeneficiariesByFacilityManager, fetchPaymentRequestById, fetchPaymentRequestsByEstate, fetchPaymentRequestsByMember, fetchPaymentRequestsByOrganization, fetchPaymentsByEstate, fetchPaymentsByResident, fetchProjectById, fetchProjectsByEstate, fetchProjectsByFacilityManager, fetchProjectsByResident, fetchProjectsByVendor, fetchPublicProjectsByEstate, fetchRecurringPaymentsByEstate, makePaymentProject, rejectPaymentRequest, removePaymentBeneficiaryByEstate, updateStatusProject} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import paymentBeneficiariesAdapter from '../adapters/payment-beneficiary';

export const paymentBeneficiariesSlice = createSlice({
    name: 'paymentBeneficiaries',
    initialState: paymentBeneficiariesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(addPaymentBeneficiaryByEstate.fulfilled, approvePaymentRequest.fulfilled, assignVendorProject.fulfilled, createOfflineServiceChargePaymentForResident.fulfilled, createPaymentBeneficiaryForEstate.fulfilled, createPaymentForEstate.fulfilled, createPaymentRequestForEstate.fulfilled, createProject.fulfilled, fetchAllProject.fulfilled, fetchPaymentBeneficiariesByEstate.fulfilled, fetchPaymentBeneficiariesByFacilityManager.fulfilled, fetchPaymentRequestById.fulfilled, fetchPaymentRequestsByEstate.fulfilled, fetchPaymentRequestsByMember.fulfilled, fetchPaymentRequestsByOrganization.fulfilled, fetchPaymentsByEstate.fulfilled, fetchPaymentsByResident.fulfilled, fetchProjectById.fulfilled, fetchProjectsByEstate.fulfilled, fetchProjectsByFacilityManager.fulfilled, fetchProjectsByResident.fulfilled, fetchProjectsByVendor.fulfilled, fetchPublicProjectsByEstate.fulfilled, fetchRecurringPaymentsByEstate.fulfilled, makePaymentProject.fulfilled, rejectPaymentRequest.fulfilled, removePaymentBeneficiaryByEstate.fulfilled, updateStatusProject.fulfilled), (state, action) => {
            paymentBeneficiariesAdapter.upsertMany(state, action.payload.entities.paymentBeneficiaries);
        });
    },
});

export const paymentBeneficiariesReducer = paymentBeneficiariesSlice.reducer;

export const paymentBeneficiariesActions = paymentBeneficiariesSlice.actions;