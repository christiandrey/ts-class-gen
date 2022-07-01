import {createFaq, createFaqCategory, fetchAllCategoriesFaqCategory, fetchAllFaqs, fetchFaqById, fetchFaqCategoryById, updateFaq, updateFaqCategory} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import faqCategoriesAdapter from '../adapters/faq-category';

export const faqCategoriesSlice = createSlice({
    name: 'faqCategories',
    initialState: faqCategoriesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createFaq.fulfilled, createFaqCategory.fulfilled, fetchAllCategoriesFaqCategory.fulfilled, fetchAllFaqs.fulfilled, fetchFaqById.fulfilled, fetchFaqCategoryById.fulfilled, updateFaq.fulfilled, updateFaqCategory.fulfilled), (state, action) => {
            faqCategoriesAdapter.upsertMany(state, action.payload.entities.faqCategories);
        });
    },
});

export const faqCategoriesReducer = faqCategoriesSlice.reducer;

export const faqCategoriesActions = faqCategoriesSlice.actions;