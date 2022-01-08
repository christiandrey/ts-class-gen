import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Faq} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const faqsAdapter = createEntityAdapter<Normalized<Faq>>();

const selectors = faqsAdapter.getSelectors<GlobalState>((state) => state.faqs);

export const {
    selectById: faqByIdSelector,
    selectAll: allFaqsSelector,
    selectEntities: faqEntitiesSelector,
} = selectors;

export default faqsAdapter;