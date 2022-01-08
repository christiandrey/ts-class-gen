import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {LabTest} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const labTestsAdapter = createEntityAdapter<Normalized<LabTest>>();

const selectors = labTestsAdapter.getSelectors<GlobalState>((state) => state.labTests);

export const {
    selectById: labTestByIdSelector,
    selectAll: allLabTestsSelector,
    selectEntities: labTestEntitiesSelector,
} = selectors;

export default labTestsAdapter;