import {createSlice} from '@reduxjs/toolkit';

import communityCommentsAdapter from '../adapters/community-comment';

export const communityCommentsSlice = createSlice({
    name: 'communityComments',
    initialState: communityCommentsAdapter.getInitialState(),
    reducers: {},
});

export const communityCommentsReducer = communityCommentsSlice.reducer;

export const communityCommentsActions = communityCommentsSlice.actions;