import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Medication} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const medicationsAdapter = createEntityAdapter<Normalized<Medication>>();

const selectors = medicationsAdapter.getSelectors<GlobalState>((state) => state.medications);

export const {
    selectById: medicationByIdSelector,
    selectAll: allMedicationsSelector,
    selectEntities: medicationEntitiesSelector,
} = selectors;

export default medicationsAdapter;