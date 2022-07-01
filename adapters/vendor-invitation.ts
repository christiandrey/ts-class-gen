import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {VendorInvitation} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const vendorInvitationsAdapter = createEntityAdapter<Normalized<VendorInvitation>>();

const selectors = vendorInvitationsAdapter.getSelectors<GlobalState>((state) => state.vendorInvitations);

export const {
    selectById: vendorInvitationByIdSelector,
    selectAll: allVendorInvitationsSelector,
    selectEntities: vendorInvitationEntitiesSelector,
} = selectors;

export default vendorInvitationsAdapter;