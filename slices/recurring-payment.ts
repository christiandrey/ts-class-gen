import {fetchRecurringPaymentsByEstate} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import recurringPaymentsAdapter from '../adapters/recurring-payment';

export const recurringPaymentsSlice = createSlice({
    name: 'recurringPayments',
    initialState: recurringPaymentsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchRecurringPaymentsByEstate.fulfilled), (state, action) => {
            recurringPaymentsAdapter.upsertMany(state, action.payload.entities.recurringPayments);
        });
    },
});

export const recurringPaymentsReducer = recurringPaymentsSlice.reducer;

export const recurringPaymentsActions = recurringPaymentsSlice.actions;