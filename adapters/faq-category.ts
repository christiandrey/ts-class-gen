import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {FaqCategory} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const faqCategoriesAdapter = createEntityAdapter<Normalized<FaqCategory>>();

const selectors = faqCategoriesAdapter.getSelectors<GlobalState>((state) => state.faqCategories);

export const {
    selectById: faqCategoryByIdSelector,
    selectAll: allFaqCategoriesSelector,
    selectEntities: faqCategoryEntitiesSelector,
} = selectors;

export default faqCategoriesAdapter;