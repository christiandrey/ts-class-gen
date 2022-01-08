import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {ServiceCategory} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const serviceCategoriesAdapter = createEntityAdapter<Normalized<ServiceCategory>>();

const selectors = serviceCategoriesAdapter.getSelectors<GlobalState>((state) => state.serviceCategories);

export const {
    selectById: serviceCategoryByIdSelector,
    selectAll: allServiceCategoriesSelector,
    selectEntities: serviceCategoryEntitiesSelector,
} = selectors;

export default serviceCategoriesAdapter;