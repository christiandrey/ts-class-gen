import {createSlice} from '@reduxjs/toolkit';

import organizationWalletsAdapter from '../adapters/organization-wallet';

export const organizationWalletsSlice = createSlice({
    name: 'organizationWallets',
    initialState: organizationWalletsAdapter.getInitialState(),
    reducers: {},
});

export const organizationWalletsReducer = organizationWalletsSlice.reducer;

export const organizationWalletsActions = organizationWalletsSlice.actions;