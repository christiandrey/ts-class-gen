import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Resident} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const residentsAdapter = createEntityAdapter<Normalized<Resident>>();

const selectors = residentsAdapter.getSelectors<GlobalState>((state) => state.residents);

export const {
    selectById: residentByIdSelector,
    selectAll: allResidentsSelector,
    selectEntities: residentEntitiesSelector,
} = selectors;

export default residentsAdapter;