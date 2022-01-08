import {createBillingItemForHospital, fetchBillingItemById, fetchBillingItemsByHospital, updateBillingItem} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import billingItemsAdapter from '../adapters/billing-item';

export const billingItemsSlice = createSlice({
    name: 'billingItems',
    initialState: billingItemsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createBillingItemForHospital.fulfilled, fetchBillingItemById.fulfilled, fetchBillingItemsByHospital.fulfilled, updateBillingItem.fulfilled), (state, action) => {
            billingItemsAdapter.upsertMany(state, action.payload.entities.billingItems);
        });
    },
});

export const billingItemsReducer = billingItemsSlice.reducer;

export const billingItemsActions = billingItemsSlice.actions;