import {createSlice} from '@reduxjs/toolkit';

import memberPermissionsAdapter from '../adapters/member-permission';

export const memberPermissionsSlice = createSlice({
    name: 'memberPermissions',
    initialState: memberPermissionsAdapter.getInitialState(),
    reducers: {},
});

export const memberPermissionsReducer = memberPermissionsSlice.reducer;

export const memberPermissionsActions = memberPermissionsSlice.actions;