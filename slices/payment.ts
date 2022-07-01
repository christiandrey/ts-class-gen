import {assignVendorProject, createOfflineServiceChargePaymentForResident, createPaymentForEstate, createProject, fetchAllProject, fetchPaymentsByEstate, fetchPaymentsByResident, fetchProjectById, fetchProjectsByEstate, fetchProjectsByFacilityManager, fetchProjectsByResident, fetchProjectsByVendor, fetchPublicProjectsByEstate, makePaymentProject, updateStatusProject} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import paymentsAdapter from '../adapters/payment';

export const paymentsSlice = createSlice({
    name: 'payments',
    initialState: paymentsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(assignVendorProject.fulfilled, createOfflineServiceChargePaymentForResident.fulfilled, createPaymentForEstate.fulfilled, createProject.fulfilled, fetchAllProject.fulfilled, fetchPaymentsByEstate.fulfilled, fetchPaymentsByResident.fulfilled, fetchProjectById.fulfilled, fetchProjectsByEstate.fulfilled, fetchProjectsByFacilityManager.fulfilled, fetchProjectsByResident.fulfilled, fetchProjectsByVendor.fulfilled, fetchPublicProjectsByEstate.fulfilled, makePaymentProject.fulfilled, updateStatusProject.fulfilled), (state, action) => {
            paymentsAdapter.upsertMany(state, action.payload.entities.payments);
        });
    },
});

export const paymentsReducer = paymentsSlice.reducer;

export const paymentsActions = paymentsSlice.actions;