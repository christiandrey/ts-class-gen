import {createFaq, fetchAllFaqs, fetchFaqById, updateFaq} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import faqsAdapter from '../adapters/faq';

export const faqsSlice = createSlice({
    name: 'faqs',
    initialState: faqsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createFaq.fulfilled, fetchAllFaqs.fulfilled, fetchFaqById.fulfilled, updateFaq.fulfilled), (state, action) => {
            faqsAdapter.upsertMany(state, action.payload.entities.faqs);
        });
    },
});

export const faqsReducer = faqsSlice.reducer;

export const faqsActions = faqsSlice.actions;