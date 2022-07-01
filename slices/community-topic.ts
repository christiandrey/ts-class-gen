import {fetchCommunityCategoriesByEstate} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import communityTopicsAdapter from '../adapters/community-topic';

export const communityTopicsSlice = createSlice({
    name: 'communityTopics',
    initialState: communityTopicsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchCommunityCategoriesByEstate.fulfilled), (state, action) => {
            communityTopicsAdapter.upsertMany(state, action.payload.entities.communityTopics);
        });
    },
});

export const communityTopicsReducer = communityTopicsSlice.reducer;

export const communityTopicsActions = communityTopicsSlice.actions;