import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Hospital} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const hospitalsAdapter = createEntityAdapter<Normalized<Hospital>>();

const selectors = hospitalsAdapter.getSelectors<GlobalState>((state) => state.hospitals);

export const {
    selectById: hospitalByIdSelector,
    selectAll: allHospitalsSelector,
    selectEntities: hospitalEntitiesSelector,
} = selectors;

export default hospitalsAdapter;