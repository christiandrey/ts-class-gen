import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Withdrawal} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const withdrawalsAdapter = createEntityAdapter<Normalized<Withdrawal>>();

const selectors = withdrawalsAdapter.getSelectors<GlobalState>((state) => state.withdrawals);

export const {
    selectById: withdrawalByIdSelector,
    selectAll: allWithdrawalsSelector,
    selectEntities: withdrawalEntitiesSelector,
} = selectors;

export default withdrawalsAdapter;