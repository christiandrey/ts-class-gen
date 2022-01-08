import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Invoice} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const invoicesAdapter = createEntityAdapter<Normalized<Invoice>>();

const selectors = invoicesAdapter.getSelectors<GlobalState>((state) => state.invoices);

export const {
    selectById: invoiceByIdSelector,
    selectAll: allInvoicesSelector,
    selectEntities: invoiceEntitiesSelector,
} = selectors;

export default invoicesAdapter;