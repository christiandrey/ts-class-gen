import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {DataRange} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const dataRangesAdapter = createEntityAdapter<Normalized<DataRange>>();

const selectors = dataRangesAdapter.getSelectors<GlobalState>((state) => state.dataRanges);

export const {
    selectById: dataRangeByIdSelector,
    selectAll: allDataRangesSelector,
    selectEntities: dataRangeEntitiesSelector,
} = selectors;

export default dataRangesAdapter;