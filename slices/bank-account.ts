import {createBankAccount, fetchBankAccounts} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import bankAccountsAdapter from '../adapters/bank-account';

export const bankAccountsSlice = createSlice({
    name: 'bankAccounts',
    initialState: bankAccountsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createBankAccount.fulfilled, fetchBankAccounts.fulfilled), (state, action) => {
            bankAccountsAdapter.upsertMany(state, action.payload.entities.bankAccounts);
        });
    },
});

export const bankAccountsReducer = bankAccountsSlice.reducer;

export const bankAccountsActions = bankAccountsSlice.actions;