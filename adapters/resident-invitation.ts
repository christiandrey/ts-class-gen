import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {ResidentInvitation} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const residentInvitationsAdapter = createEntityAdapter<Normalized<ResidentInvitation>>();

const selectors = residentInvitationsAdapter.getSelectors<GlobalState>((state) => state.residentInvitations);

export const {
    selectById: residentInvitationByIdSelector,
    selectAll: allResidentInvitationsSelector,
    selectEntities: residentInvitationEntitiesSelector,
} = selectors;

export default residentInvitationsAdapter;