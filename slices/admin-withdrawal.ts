import {fetchWithdrawalsByWithdrawal} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import adminWithdrawalsAdapter from '../adapters/admin-withdrawal';

export const adminWithdrawalsSlice = createSlice({
    name: 'adminWithdrawals',
    initialState: adminWithdrawalsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchWithdrawalsByWithdrawal.fulfilled), (state, action) => {
            adminWithdrawalsAdapter.upsertMany(state, action.payload.entities.adminWithdrawals);
        });
    },
});

export const adminWithdrawalsReducer = adminWithdrawalsSlice.reducer;

export const adminWithdrawalsActions = adminWithdrawalsSlice.actions;