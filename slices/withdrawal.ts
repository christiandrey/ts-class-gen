import {cancelWithdrawal, fetchWithdrawalsByUser} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import withdrawalsAdapter from '../adapters/withdrawal';

export const withdrawalsSlice = createSlice({
    name: 'withdrawals',
    initialState: withdrawalsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(cancelWithdrawal.fulfilled, fetchWithdrawalsByUser.fulfilled), (state, action) => {
            withdrawalsAdapter.upsertMany(state, action.payload.entities.withdrawals);
        });
    },
});

export const withdrawalsReducer = withdrawalsSlice.reducer;

export const withdrawalsActions = withdrawalsSlice.actions;