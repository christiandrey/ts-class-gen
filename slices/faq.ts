import {createSlice} from '@reduxjs/toolkit';

import faqsAdapter from '../adapters/faq';

export const faqsSlice = createSlice({
    name: 'faqs',
    initialState: faqsAdapter.getInitialState(),
    reducers: {},
});

export const faqsReducer = faqsSlice.reducer;

export const faqsActions = faqsSlice.actions;