import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {NonMedic} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const nonMedicsAdapter = createEntityAdapter<Normalized<NonMedic>>();

const selectors = nonMedicsAdapter.getSelectors<GlobalState>((state) => state.nonMedics);

export const {
    selectById: nonMedicByIdSelector,
    selectAll: allNonMedicsSelector,
    selectEntities: nonMedicEntitiesSelector,
} = selectors;

export default nonMedicsAdapter;