import {fetchLog, fetchLogById} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import logsAdapter from '../adapters/log';

export const logsSlice = createSlice({
    name: 'logs',
    initialState: logsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchLog.fulfilled, fetchLogById.fulfilled), (state, action) => {
            logsAdapter.upsertMany(state, action.payload.entities.logs);
        });
    },
});

export const logsReducer = logsSlice.reducer;

export const logsActions = logsSlice.actions;