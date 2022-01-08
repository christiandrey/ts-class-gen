import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {VitalReading} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const vitalReadingsAdapter = createEntityAdapter<Normalized<VitalReading>>();

const selectors = vitalReadingsAdapter.getSelectors<GlobalState>((state) => state.vitalReadings);

export const {
    selectById: vitalReadingByIdSelector,
    selectAll: allVitalReadingsSelector,
    selectEntities: vitalReadingEntitiesSelector,
} = selectors;

export default vitalReadingsAdapter;