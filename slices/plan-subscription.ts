import {cancelPlanSubscription, createPlanSubscriptionsForHospital, fetchActivePlanSubscriptionByHospital, fetchActivePlanSubscriptions, fetchPaymentPlanSubscriptionsByPaymentPlan, fetchPlanSubscriptions, fetchPlanSubscriptionsByHospital} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import planSubscriptionsAdapter from '../adapters/plan-subscription';

export const planSubscriptionsSlice = createSlice({
    name: 'planSubscriptions',
    initialState: planSubscriptionsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(cancelPlanSubscription.fulfilled, createPlanSubscriptionsForHospital.fulfilled, fetchActivePlanSubscriptionByHospital.fulfilled, fetchActivePlanSubscriptions.fulfilled, fetchPaymentPlanSubscriptionsByPaymentPlan.fulfilled, fetchPlanSubscriptions.fulfilled, fetchPlanSubscriptionsByHospital.fulfilled), (state, action) => {
            planSubscriptionsAdapter.upsertMany(state, action.payload.entities.planSubscriptions);
        });
    },
});

export const planSubscriptionsReducer = planSubscriptionsSlice.reducer;

export const planSubscriptionsActions = planSubscriptionsSlice.actions;