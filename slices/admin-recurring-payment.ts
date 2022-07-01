import {createSlice} from '@reduxjs/toolkit';

import adminRecurringPaymentsAdapter from '../adapters/admin-recurring-payment';

export const adminRecurringPaymentsSlice = createSlice({
    name: 'adminRecurringPayments',
    initialState: adminRecurringPaymentsAdapter.getInitialState(),
    reducers: {},
});

export const adminRecurringPaymentsReducer = adminRecurringPaymentsSlice.reducer;

export const adminRecurringPaymentsActions = adminRecurringPaymentsSlice.actions;