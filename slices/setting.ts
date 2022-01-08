import {addOrUpdateSetting, fetchAllSetting} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import settingsAdapter from '../adapters/setting';

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: settingsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(addOrUpdateSetting.fulfilled, fetchAllSetting.fulfilled), (state, action) => {
            settingsAdapter.upsertMany(state, action.payload.entities.settings);
        });
    },
});

export const settingsReducer = settingsSlice.reducer;

export const settingsActions = settingsSlice.actions;