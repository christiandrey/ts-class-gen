import {fetchActivityLogsByHospital} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import activityLogsAdapter from '../adapters/activity-log';

export const activityLogsSlice = createSlice({
    name: 'activityLogs',
    initialState: activityLogsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchActivityLogsByHospital.fulfilled), (state, action) => {
            activityLogsAdapter.upsertMany(state, action.payload.entities.activityLogs);
        });
    },
});

export const activityLogsReducer = activityLogsSlice.reducer;

export const activityLogsActions = activityLogsSlice.actions;