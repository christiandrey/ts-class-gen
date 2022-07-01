import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Review} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const reviewsAdapter = createEntityAdapter<Normalized<Review>>();

const selectors = reviewsAdapter.getSelectors<GlobalState>((state) => state.reviews);

export const {
    selectById: reviewByIdSelector,
    selectAll: allReviewsSelector,
    selectEntities: reviewEntitiesSelector,
} = selectors;

export default reviewsAdapter;