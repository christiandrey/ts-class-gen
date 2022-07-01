import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Organization} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const organizationsAdapter = createEntityAdapter<Normalized<Organization>>();

const selectors = organizationsAdapter.getSelectors<GlobalState>((state) => state.organizations);

export const {
    selectById: organizationByIdSelector,
    selectAll: allOrganizationsSelector,
    selectEntities: organizationEntitiesSelector,
} = selectors;

export default organizationsAdapter;