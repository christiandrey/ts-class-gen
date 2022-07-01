import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Member} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const membersAdapter = createEntityAdapter<Normalized<Member>>();

const selectors = membersAdapter.getSelectors<GlobalState>((state) => state.members);

export const {
    selectById: memberByIdSelector,
    selectAll: allMembersSelector,
    selectEntities: memberEntitiesSelector,
} = selectors;

export default membersAdapter;