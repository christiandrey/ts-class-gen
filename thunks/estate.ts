import {EstateEntities, estateSchema} from '../../../schemas/normalization/estate';
import {PaginatedQueryParams} from '../../../typings';
import {CommissionUpdateOptions, EstateCreationOptions, EstateUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Estate} from '../../../entities/estate';
import {EstateLite} from '../../../entities/estate-lite';
import {api} from '../../../api';

export const createEstate = createTypedAsyncThunk(
    'estates/createEstate',
    async (dto: EstateCreationOptions) => {
        const response = await api.estates().create(dto);
        const responseData = new Estate(response.data.data);
        const normalized = safeNormalize<Estate, EstateEntities, string>(responseData, estateSchema);
        return normalized;
    },
);

export const fetchEstateById = createTypedAsyncThunk(
    'estates/fetchEstateById',
    async (id: string) => {
        const response = await api.estates().readById(id);
        const responseData = new Estate(response.data.data);
        const normalized = safeNormalize<Estate, EstateEntities, string>(responseData, estateSchema);
        return normalized;
    },
);

export const fetchAllEstate = createTypedAsyncThunk(
    'estates/fetchAllEstate',
    async (params: PaginatedQueryParams) => {
        const {query, page, pageSize} = params;
        const response = await api.estates().readAll(query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new EstateLite(o));
        const normalized = safeNormalize<Estate, EstateEntities, Array<string>>(responseData, [estateSchema]);
        return {...normalized, meta};
    },
);

export const fetchWalletBalanceEstate = createTypedAsyncThunk(
    'estates/fetchWalletBalanceEstate',
    async (id: string) => {
        const response = await api.estates().readWalletBalance(id);
        return response;
    },
);

export const deleteEstate = createTypedAsyncThunk(
    'estates/deleteEstate',
    async (id: string) => {
        const response = await api.estates().delete(id);
        return response;
    },
);

export const updateEstate = createTypedAsyncThunk(
    'estates/updateEstate',
    async (params: {id: string; dto: EstateUpdateOptions}) => {
        const {id, dto} = params;
        const response = await api.estates().update(id, dto);
        const responseData = new Estate(response.data.data);
        const normalized = safeNormalize<Estate, EstateEntities, string>(responseData, estateSchema);
        return normalized;
    },
);

export const updateFacilityManagerEstate = createTypedAsyncThunk(
    'estates/updateFacilityManagerEstate',
    async (params: {id: string; facilityManagerId: string}) => {
        const {id, facilityManagerId} = params;
        const response = await api.estates().updateFacilityManager(id, facilityManagerId);
        const responseData = new Estate(response.data.data);
        const normalized = safeNormalize<Estate, EstateEntities, string>(responseData, estateSchema);
        return normalized;
    },
);

export const updateVendorsEstate = createTypedAsyncThunk(
    'estates/updateVendorsEstate',
    async (params: {id: string; vendorIds: Array<string>}) => {
        const {id, vendorIds} = params;
        const response = await api.estates().updateVendors(id, vendorIds);
        const responseData = new Estate(response.data.data);
        const normalized = safeNormalize<Estate, EstateEntities, string>(responseData, estateSchema);
        return normalized;
    },
);

export const updateServicesEstate = createTypedAsyncThunk(
    'estates/updateServicesEstate',
    async (params: {id: string; servicesIds: Array<string>}) => {
        const {id, servicesIds} = params;
        const response = await api.estates().updateServices(id, servicesIds);
        const responseData = new Estate(response.data.data);
        const normalized = safeNormalize<Estate, EstateEntities, string>(responseData, estateSchema);
        return normalized;
    },
);

export const updateCommissionEstate = createTypedAsyncThunk(
    'estates/updateCommissionEstate',
    async (params: {id: string; dto: CommissionUpdateOptions}) => {
        const {id, dto} = params;
        const response = await api.estates().updateCommission(id, dto);
        const responseData = new Estate(response.data.data);
        const normalized = safeNormalize<Estate, EstateEntities, string>(responseData, estateSchema);
        return normalized;
    },
);

export const exportPaymentsEstate = createTypedAsyncThunk(
    'estates/exportPaymentsEstate',
    async (params: {id: string; startDate?: string; endDate?: string}) => {
        const {id, startDate, endDate} = params;
        const response = await api.estates().exportPayments(id, startDate, endDate);
        return response;
    },
);

export const fetchEstatesByFacilityManager = createTypedAsyncThunk(
    'estates/fetchEstatesByFacilityManager',
    async () => {
        const response = await api.facilityManagers().readEstates();
        const responseData = response.data.data.map((o) => new EstateLite(o));
        const normalized = safeNormalize<Estate, EstateEntities, Array<string>>(responseData, [estateSchema]);
        return normalized;
    },
);

export const fetchFacilityManagerEstatesByFacilityManager = createTypedAsyncThunk(
    'estates/fetchFacilityManagerEstatesByFacilityManager',
    async (id: string) => {
        const response = await api.facilityManagers().readFacilityManagerEstates(id);
        const responseData = response.data.data.map((o) => new EstateLite(o));
        const normalized = safeNormalize<Estate, EstateEntities, Array<string>>(responseData, [estateSchema]);
        return normalized;
    },
);

export const fetchEstatesByOrganization = createTypedAsyncThunk(
    'estates/fetchEstatesByOrganization',
    async (id: string) => {
        const response = await api.organizations().readEstates(id);
        const responseData = response.data.data.map((o) => new EstateLite(o));
        const normalized = safeNormalize<Estate, EstateEntities, Array<string>>(responseData, [estateSchema]);
        return normalized;
    },
);