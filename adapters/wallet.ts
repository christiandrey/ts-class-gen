import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Wallet} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const walletsAdapter = createEntityAdapter<Normalized<Wallet>>();

const selectors = walletsAdapter.getSelectors<GlobalState>((state) => state.wallets);

export const {
    selectById: walletByIdSelector,
    selectAll: allWalletsSelector,
    selectEntities: walletEntitiesSelector,
} = selectors;

export default walletsAdapter;