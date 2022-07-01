import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Ghost} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const ghostsAdapter = createEntityAdapter<Normalized<Ghost>>();

const selectors = ghostsAdapter.getSelectors<GlobalState>((state) => state.ghosts);

export const {
    selectById: ghostByIdSelector,
    selectAll: allGhostsSelector,
    selectEntities: ghostEntitiesSelector,
} = selectors;

export default ghostsAdapter;