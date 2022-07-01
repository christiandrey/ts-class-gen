import {createSlice} from '@reduxjs/toolkit';

import userSummariesAdapter from '../adapters/user-summary';

export const userSummariesSlice = createSlice({
    name: 'userSummaries',
    initialState: userSummariesAdapter.getInitialState(),
    reducers: {},
});

export const userSummariesReducer = userSummariesSlice.reducer;

export const userSummariesActions = userSummariesSlice.actions;