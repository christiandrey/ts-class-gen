import {ReviewEntities, reviewSchema} from '../../../schemas/normalization/review';
import {ReviewOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Review} from '../../../entities/review';
import {api} from '../../../api';

export const reviewForProject = createTypedAsyncThunk(
    'reviews/reviewForProject',
    async (params: {id: string; dto: ReviewOptions}) => {
        const {id, dto} = params;
        const response = await api.projects().review(id, dto);
        const responseData = new Review(response.data.data);
        const normalized = safeNormalize<Review, ReviewEntities, string>(responseData, reviewSchema);
        return normalized;
    },
);

export const fetchReviewsByVendor = createTypedAsyncThunk(
    'reviews/fetchReviewsByVendor',
    async (id: string) => {
        const response = await api.vendors().readReviews(id);
        const responseData = response.data.data.map((o) => new Review(o));
        const normalized = safeNormalize<Review, ReviewEntities, Array<string>>(responseData, [reviewSchema]);
        return normalized;
    },
);