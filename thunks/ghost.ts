import {GhostEntities, ghostSchema} from '../../../schemas/normalization/ghost';
import {PaginatedQueryParams} from '../../../typings';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Ghost} from '../../../entities/ghost';
import {api} from '../../../api';

export const fetchCurrentGhost = createTypedAsyncThunk(
    'ghosts/fetchCurrentGhost',
    async () => {
        const response = await api.ghosts().readCurrent();
        const responseData = new Ghost(response.data.data);
        const normalized = safeNormalize<Ghost, GhostEntities, string>(responseData, ghostSchema);
        return normalized;
    },
);

export const fetchGhostById = createTypedAsyncThunk(
    'ghosts/fetchGhostById',
    async (id: string) => {
        const response = await api.ghosts().readById(id);
        const responseData = new Ghost(response.data.data);
        const normalized = safeNormalize<Ghost, GhostEntities, string>(responseData, ghostSchema);
        return normalized;
    },
);

export const fetchAllGhost = createTypedAsyncThunk(
    'ghosts/fetchAllGhost',
    async (params: PaginatedQueryParams) => {
        const {query, page, pageSize} = params;
        const response = await api.ghosts().readAll(query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new Ghost(o));
        const normalized = safeNormalize<Ghost, GhostEntities, Array<string>>(responseData, [ghostSchema]);
        return {...normalized, meta};
    },
);