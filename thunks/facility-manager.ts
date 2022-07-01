import {FacilityManagerEntities, facilityManagerSchema} from '../../../schemas/normalization/facility-manager';
import {PaginatedQueryParams} from '../../../typings';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {FacilityManager} from '../../../entities/facility-manager';
import {api} from '../../../api';

export const fetchFacilityManagerByEstate = createTypedAsyncThunk(
    'facilityManagers/fetchFacilityManagerByEstate',
    async (id: string) => {
        const response = await api.estates().readFacilityManager(id);
        const responseData = new FacilityManager(response.data.data);
        const normalized = safeNormalize<FacilityManager, FacilityManagerEntities, string>(responseData, facilityManagerSchema);
        return normalized;
    },
);

export const createFacilityManager = createTypedAsyncThunk(
    'facilityManagers/createFacilityManager',
    async () => {
        const response = await api.facilityManagers().create();
        const responseData = new FacilityManager(response.data.data);
        const normalized = safeNormalize<FacilityManager, FacilityManagerEntities, string>(responseData, facilityManagerSchema);
        return normalized;
    },
);

export const fetchCurrentFacilityManager = createTypedAsyncThunk(
    'facilityManagers/fetchCurrentFacilityManager',
    async () => {
        const response = await api.facilityManagers().readCurrent();
        const responseData = new FacilityManager(response.data.data);
        const normalized = safeNormalize<FacilityManager, FacilityManagerEntities, string>(responseData, facilityManagerSchema);
        return normalized;
    },
);

export const fetchFacilityManagerById = createTypedAsyncThunk(
    'facilityManagers/fetchFacilityManagerById',
    async (id: string) => {
        const response = await api.facilityManagers().readById(id);
        const responseData = new FacilityManager(response.data.data);
        const normalized = safeNormalize<FacilityManager, FacilityManagerEntities, string>(responseData, facilityManagerSchema);
        return normalized;
    },
);

export const fetchAllFacilityManager = createTypedAsyncThunk(
    'facilityManagers/fetchAllFacilityManager',
    async (params: PaginatedQueryParams) => {
        const {query, page, pageSize} = params;
        const response = await api.facilityManagers().readAll(query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new FacilityManager(o));
        const normalized = safeNormalize<FacilityManager, FacilityManagerEntities, Array<string>>(responseData, [facilityManagerSchema]);
        return {...normalized, meta};
    },
);

export const fetchWalletBalanceFacilityManager = createTypedAsyncThunk(
    'facilityManagers/fetchWalletBalanceFacilityManager',
    async () => {
        const response = await api.facilityManagers().readWalletBalance();
        return response;
    },
);