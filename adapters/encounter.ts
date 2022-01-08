import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Encounter} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const encountersAdapter = createEntityAdapter<Normalized<Encounter>>();

const selectors = encountersAdapter.getSelectors<GlobalState>((state) => state.encounters);

export const {
    selectById: encounterByIdSelector,
    selectAll: allEncountersSelector,
    selectEntities: encounterEntitiesSelector,
} = selectors;

export default encountersAdapter;