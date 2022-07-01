import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {OrganizationClaim} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const organizationClaimsAdapter = createEntityAdapter<Normalized<OrganizationClaim>>();

const selectors = organizationClaimsAdapter.getSelectors<GlobalState>((state) => state.organizationClaims);

export const {
    selectById: organizationClaimByIdSelector,
    selectAll: allOrganizationClaimsSelector,
    selectEntities: organizationClaimEntitiesSelector,
} = selectors;

export default organizationClaimsAdapter;