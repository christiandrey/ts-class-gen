import {approvePaymentRequest, createPaymentRequestForEstate, fetchPaymentRequestById, fetchPaymentRequestsByEstate, fetchPaymentRequestsByMember, fetchPaymentRequestsByOrganization, rejectPaymentRequest} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import paymentRequestsAdapter from '../adapters/payment-request';

export const paymentRequestsSlice = createSlice({
    name: 'paymentRequests',
    initialState: paymentRequestsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(approvePaymentRequest.fulfilled, createPaymentRequestForEstate.fulfilled, fetchPaymentRequestById.fulfilled, fetchPaymentRequestsByEstate.fulfilled, fetchPaymentRequestsByMember.fulfilled, fetchPaymentRequestsByOrganization.fulfilled, rejectPaymentRequest.fulfilled), (state, action) => {
            paymentRequestsAdapter.upsertMany(state, action.payload.entities.paymentRequests);
        });
    },
});

export const paymentRequestsReducer = paymentRequestsSlice.reducer;

export const paymentRequestsActions = paymentRequestsSlice.actions;