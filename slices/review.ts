import {fetchReviewsByVendor, reviewForProject} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import reviewsAdapter from '../adapters/review';

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: reviewsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchReviewsByVendor.fulfilled, reviewForProject.fulfilled), (state, action) => {
            reviewsAdapter.upsertMany(state, action.payload.entities.reviews);
        });
    },
});

export const reviewsReducer = reviewsSlice.reducer;

export const reviewsActions = reviewsSlice.actions;