import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {BillingItem} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const billingItemsAdapter = createEntityAdapter<Normalized<BillingItem>>();

const selectors = billingItemsAdapter.getSelectors<GlobalState>((state) => state.billingItems);

export const {
    selectById: billingItemByIdSelector,
    selectAll: allBillingItemsSelector,
    selectEntities: billingItemEntitiesSelector,
} = selectors;

export default billingItemsAdapter;