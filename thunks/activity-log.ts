import {ActivityLogEntities, activityLogSchema} from '../../../schemas/normalization/activity-log';
import {PaginatedQueryParams} from '../../../typings';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {ActivityLog} from '../../../entities/activity-log';
import {api} from '../../../api';

export const fetchActivityLogsByHospital = createTypedAsyncThunk(
    'activityLogs/fetchActivityLogsByHospital',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, query, page, pageSize} = params;
        const response = await api.hospitals().readActivityLogs(id, query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new ActivityLog(o));
        const normalized = safeNormalize<ActivityLog, ActivityLogEntities, Array<string>>(responseData, [activityLogSchema]);
        return {...normalized, meta};
    },
);