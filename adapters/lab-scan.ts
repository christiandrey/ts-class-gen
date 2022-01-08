import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {LabScan} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const labScansAdapter = createEntityAdapter<Normalized<LabScan>>();

const selectors = labScansAdapter.getSelectors<GlobalState>((state) => state.labScans);

export const {
    selectById: labScanByIdSelector,
    selectAll: allLabScansSelector,
    selectEntities: labScanEntitiesSelector,
} = selectors;

export default labScansAdapter;