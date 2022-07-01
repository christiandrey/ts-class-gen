import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {MemberPermission} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const memberPermissionsAdapter = createEntityAdapter<Normalized<MemberPermission>>();

const selectors = memberPermissionsAdapter.getSelectors<GlobalState>((state) => state.memberPermissions);

export const {
    selectById: memberPermissionByIdSelector,
    selectAll: allMemberPermissionsSelector,
    selectEntities: memberPermissionEntitiesSelector,
} = selectors;

export default memberPermissionsAdapter;