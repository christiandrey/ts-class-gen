import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {EstateWallet} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const estateWalletsAdapter = createEntityAdapter<Normalized<EstateWallet>>();

const selectors = estateWalletsAdapter.getSelectors<GlobalState>((state) => state.estateWallets);

export const {
    selectById: estateWalletByIdSelector,
    selectAll: allEstateWalletsSelector,
    selectEntities: estateWalletEntitiesSelector,
} = selectors;

export default estateWalletsAdapter;