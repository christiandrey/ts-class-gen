import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {LabTestResult} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const labTestResultsAdapter = createEntityAdapter<Normalized<LabTestResult>>();

const selectors = labTestResultsAdapter.getSelectors<GlobalState>((state) => state.labTestResults);

export const {
    selectById: labTestResultByIdSelector,
    selectAll: allLabTestResultsSelector,
    selectEntities: labTestResultEntitiesSelector,
} = selectors;

export default labTestResultsAdapter;