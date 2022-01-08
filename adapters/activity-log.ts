import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {ActivityLog} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const activityLogsAdapter = createEntityAdapter<Normalized<ActivityLog>>();

const selectors = activityLogsAdapter.getSelectors<GlobalState>((state) => state.activityLogs);

export const {
    selectById: activityLogByIdSelector,
    selectAll: allActivityLogsSelector,
    selectEntities: activityLogEntitiesSelector,
} = selectors;

export default activityLogsAdapter;