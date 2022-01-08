import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {DischargeSummary} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const dischargeSummariesAdapter = createEntityAdapter<Normalized<DischargeSummary>>();

const selectors = dischargeSummariesAdapter.getSelectors<GlobalState>((state) => state.dischargeSummaries);

export const {
    selectById: dischargeSummaryByIdSelector,
    selectAll: allDischargeSummariesSelector,
    selectEntities: dischargeSummaryEntitiesSelector,
} = selectors;

export default dischargeSummariesAdapter;