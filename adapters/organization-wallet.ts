import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {OrganizationWallet} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const organizationWalletsAdapter = createEntityAdapter<Normalized<OrganizationWallet>>();

const selectors = organizationWalletsAdapter.getSelectors<GlobalState>((state) => state.organizationWallets);

export const {
    selectById: organizationWalletByIdSelector,
    selectAll: allOrganizationWalletsSelector,
    selectEntities: organizationWalletEntitiesSelector,
} = selectors;

export default organizationWalletsAdapter;