import {activateEstateManagerByEstate, approvePaymentRequest, createEstateManagerForEstate, createPaymentRequestForEstate, deactivateEstateManagerByEstate, fetchEstateManagersByEstate, fetchEstateManagersByMember, fetchPaymentRequestById, fetchPaymentRequestsByEstate, fetchPaymentRequestsByMember, fetchPaymentRequestsByOrganization, rejectPaymentRequest, updateEstateManagerClaimByEstate, updateEstateManagerPaymentLimitByEstate} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import estateManagersAdapter from '../adapters/estate-manager';

export const estateManagersSlice = createSlice({
    name: 'estateManagers',
    initialState: estateManagersAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(activateEstateManagerByEstate.fulfilled, approvePaymentRequest.fulfilled, createEstateManagerForEstate.fulfilled, createPaymentRequestForEstate.fulfilled, deactivateEstateManagerByEstate.fulfilled, fetchEstateManagersByEstate.fulfilled, fetchEstateManagersByMember.fulfilled, fetchPaymentRequestById.fulfilled, fetchPaymentRequestsByEstate.fulfilled, fetchPaymentRequestsByMember.fulfilled, fetchPaymentRequestsByOrganization.fulfilled, rejectPaymentRequest.fulfilled, updateEstateManagerClaimByEstate.fulfilled, updateEstateManagerPaymentLimitByEstate.fulfilled), (state, action) => {
            estateManagersAdapter.upsertMany(state, action.payload.entities.estateManagers);
        });
    },
});

export const estateManagersReducer = estateManagersSlice.reducer;

export const estateManagersActions = estateManagersSlice.actions;