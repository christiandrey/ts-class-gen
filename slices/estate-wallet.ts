import {createSlice} from '@reduxjs/toolkit';

import estateWalletsAdapter from '../adapters/estate-wallet';

export const estateWalletsSlice = createSlice({
    name: 'estateWallets',
    initialState: estateWalletsAdapter.getInitialState(),
    reducers: {},
});

export const estateWalletsReducer = estateWalletsSlice.reducer;

export const estateWalletsActions = estateWalletsSlice.actions;