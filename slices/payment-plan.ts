import {createPaymentPlan, fetchPaymentPlans, updatePaymentPlan} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import paymentPlansAdapter from '../adapters/payment-plan';

export const paymentPlansSlice = createSlice({
    name: 'paymentPlans',
    initialState: paymentPlansAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createPaymentPlan.fulfilled, fetchPaymentPlans.fulfilled, updatePaymentPlan.fulfilled), (state, action) => {
            paymentPlansAdapter.upsertMany(state, action.payload.entities.paymentPlans);
        });
    },
});

export const paymentPlansReducer = paymentPlansSlice.reducer;

export const paymentPlansActions = paymentPlansSlice.actions;