import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {State} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const statesAdapter = createEntityAdapter<Normalized<State>>();

const selectors = statesAdapter.getSelectors<GlobalState>((state) => state.states);

export const {
    selectById: stateByIdSelector,
    selectAll: allStatesSelector,
    selectEntities: stateEntitiesSelector,
} = selectors;

export default statesAdapter;