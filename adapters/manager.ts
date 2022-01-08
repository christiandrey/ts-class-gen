import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Manager} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const managersAdapter = createEntityAdapter<Normalized<Manager>>();

const selectors = managersAdapter.getSelectors<GlobalState>((state) => state.managers);

export const {
    selectById: managerByIdSelector,
    selectAll: allManagersSelector,
    selectEntities: managerEntitiesSelector,
} = selectors;

export default managersAdapter;