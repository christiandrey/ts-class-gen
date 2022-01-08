import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Role} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const rolesAdapter = createEntityAdapter<Normalized<Role>>();

const selectors = rolesAdapter.getSelectors<GlobalState>((state) => state.roles);

export const {
    selectById: roleByIdSelector,
    selectAll: allRolesSelector,
    selectEntities: roleEntitiesSelector,
} = selectors;

export default rolesAdapter;