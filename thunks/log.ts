import {LogEntities, logSchema} from '../../../schemas/normalization/log';
import {LogLevel, PaginatedQueryParams} from '../../../typings';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Log} from '../../../entities/log';
import {LogLite} from '../../../entities/log-lite';
import {api} from '../../../api';

export const fetchLog = createTypedAsyncThunk(
    'logs/fetchLog',
    async (params: PaginatedQueryParams<{level?: LogLevel}>) => {
        const {page, pageSize, level} = params;
        const response = await api.logs().read(page, pageSize, level);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new LogLite(o));
        const normalized = safeNormalize<Log, LogEntities, Array<string>>(responseData, [logSchema]);
        return {...normalized, meta};
    },
);

export const fetchLogById = createTypedAsyncThunk(
    'logs/fetchLogById',
    async (id: string) => {
        const response = await api.logs().readById(id);
        const responseData = new Log(response.data.data);
        const normalized = safeNormalize<Log, LogEntities, string>(responseData, logSchema);
        return normalized;
    },
);

export const deleteByLog = createTypedAsyncThunk(
    'logs/deleteByLog',
    async (id: string) => {
        const response = await api.logs().deleteBy(id);
        return response;
    },
);

export const deleteLog = createTypedAsyncThunk(
    'logs/deleteLog',
    async (params: {startDate?: string; endDate?: string}) => {
        const {startDate, endDate} = params;
        const response = await api.logs().delete(startDate, endDate);
        return response;
    },
);