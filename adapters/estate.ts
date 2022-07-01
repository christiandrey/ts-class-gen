import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Estate} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const estatesAdapter = createEntityAdapter<Normalized<Estate>>();

const selectors = estatesAdapter.getSelectors<GlobalState>((state) => state.estates);

export const {
    selectById: estateByIdSelector,
    selectAll: allEstatesSelector,
    selectEntities: estateEntitiesSelector,
} = selectors;

export default estatesAdapter;