import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {InvoiceItem} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const invoiceItemsAdapter = createEntityAdapter<Normalized<InvoiceItem>>();

const selectors = invoiceItemsAdapter.getSelectors<GlobalState>((state) => state.invoiceItems);

export const {
    selectById: invoiceItemByIdSelector,
    selectAll: allInvoiceItemsSelector,
    selectEntities: invoiceItemEntitiesSelector,
} = selectors;

export default invoiceItemsAdapter;