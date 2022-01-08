import {createSlice} from '@reduxjs/toolkit';

import faqCategoriesAdapter from '../adapters/faq-category';

export const faqCategoriesSlice = createSlice({
    name: 'faqCategories',
    initialState: faqCategoriesAdapter.getInitialState(),
    reducers: {},
});

export const faqCategoriesReducer = faqCategoriesSlice.reducer;

export const faqCategoriesActions = faqCategoriesSlice.actions;