import {fetchRoles, updateRole} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import rolesAdapter from '../adapters/role';

export const rolesSlice = createSlice({
    name: 'roles',
    initialState: rolesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchRoles.fulfilled, updateRole.fulfilled), (state, action) => {
            rolesAdapter.upsertMany(state, action.payload.entities.roles);
        });
    },
});

export const rolesReducer = rolesSlice.reducer;

export const rolesActions = rolesSlice.actions;