import {creditUserWallet, debitUserWallet, fetchUserWallet, fetchWallet, lockUserWallet, unlockUserWallet} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import walletsAdapter from '../adapters/wallet';

export const walletsSlice = createSlice({
    name: 'wallets',
    initialState: walletsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(creditUserWallet.fulfilled, debitUserWallet.fulfilled, fetchUserWallet.fulfilled, fetchWallet.fulfilled, lockUserWallet.fulfilled, unlockUserWallet.fulfilled), (state, action) => {
            walletsAdapter.upsertMany(state, action.payload.entities.wallets);
        });
    },
});

export const walletsReducer = walletsSlice.reducer;

export const walletsActions = walletsSlice.actions;