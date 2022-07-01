import {fetchCommunityCategoriesByEstate} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import communityCategoriesAdapter from '../adapters/community-category';

export const communityCategoriesSlice = createSlice({
    name: 'communityCategories',
    initialState: communityCategoriesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchCommunityCategoriesByEstate.fulfilled), (state, action) => {
            communityCategoriesAdapter.upsertMany(state, action.payload.entities.communityCategories);
        });
    },
});

export const communityCategoriesReducer = communityCategoriesSlice.reducer;

export const communityCategoriesActions = communityCategoriesSlice.actions;