import {FaqCategoryEntities, faqCategorySchema} from '../../../schemas/normalization/faq-category';
import {PaginatedQueryParams} from '../../../typings';
import {FaqCategoryCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {FaqCategory} from '../../../entities/faq-category';
import {api} from '../../../api';

export const fetchAllCategoriesFaqCategory = createTypedAsyncThunk(
    'faqCategories/fetchAllCategoriesFaqCategory',
    async (params: PaginatedQueryParams) => {
        const {query} = params;
        const response = await api.faqCategories().readAllCategories(query);
        const responseData = new FaqCategory(response.data.data);
        const normalized = safeNormalize<FaqCategory, FaqCategoryEntities, string>(responseData, faqCategorySchema);
        return normalized;
    },
);

export const fetchFaqCategoryById = createTypedAsyncThunk(
    'faqCategories/fetchFaqCategoryById',
    async (categoryId: string) => {
        const response = await api.faqCategories().readFaqCategoryById(categoryId);
        const responseData = new FaqCategory(response.data.data);
        const normalized = safeNormalize<FaqCategory, FaqCategoryEntities, string>(responseData, faqCategorySchema);
        return normalized;
    },
);

export const createFaqCategory = createTypedAsyncThunk(
    'faqCategories/createFaqCategory',
    async (creationOptions: FaqCategoryCreationOptions) => {
        const response = await api.faqCategories().createFaqCategory(creationOptions);
        const responseData = new FaqCategory(response.data.data);
        const normalized = safeNormalize<FaqCategory, FaqCategoryEntities, string>(responseData, faqCategorySchema);
        return normalized;
    },
);

export const updateFaqCategory = createTypedAsyncThunk(
    'faqCategories/updateFaqCategory',
    async (params: {categoryId: string; creationOptions: FaqCategoryCreationOptions}) => {
        const {categoryId, creationOptions} = params;
        const response = await api.faqCategories().updateFaqCategory(categoryId, creationOptions);
        const responseData = new FaqCategory(response.data.data);
        const normalized = safeNormalize<FaqCategory, FaqCategoryEntities, string>(responseData, faqCategorySchema);
        return normalized;
    },
);

export const deleteFaqCategory = createTypedAsyncThunk(
    'faqCategories/deleteFaqCategory',
    async (categoryId: string) => {
        const response = await api.faqCategories().deleteFaqCategory(categoryId);
        return response;
    },
);