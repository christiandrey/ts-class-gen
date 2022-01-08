import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Transaction} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const transactionsAdapter = createEntityAdapter<Normalized<Transaction>>();

const selectors = transactionsAdapter.getSelectors<GlobalState>((state) => state.transactions);

export const {
    selectById: transactionByIdSelector,
    selectAll: allTransactionsSelector,
    selectEntities: transactionEntitiesSelector,
} = selectors;

export default transactionsAdapter;