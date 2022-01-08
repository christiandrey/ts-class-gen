import {createManager, fetchCurrentManager, updateCurrentManager} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import managersAdapter from '../adapters/manager';

export const managersSlice = createSlice({
    name: 'managers',
    initialState: managersAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createManager.fulfilled, fetchCurrentManager.fulfilled, updateCurrentManager.fulfilled), (state, action) => {
            managersAdapter.upsertMany(state, action.payload.entities.managers);
        });
    },
});

export const managersReducer = managersSlice.reducer;

export const managersActions = managersSlice.actions;