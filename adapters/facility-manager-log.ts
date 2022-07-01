import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {FacilityManagerLog} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const facilityManagerLogsAdapter = createEntityAdapter<Normalized<FacilityManagerLog>>();

const selectors = facilityManagerLogsAdapter.getSelectors<GlobalState>((state) => state.facilityManagerLogs);

export const {
    selectById: facilityManagerLogByIdSelector,
    selectAll: allFacilityManagerLogsSelector,
    selectEntities: facilityManagerLogEntitiesSelector,
} = selectors;

export default facilityManagerLogsAdapter;