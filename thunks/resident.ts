import {ResidentEntities, residentSchema} from '../../../schemas/normalization/resident';
import {PaginatedQueryParams} from '../../../typings';
import {ResidentUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Resident} from '../../../entities/resident';
import {ResidentLite} from '../../../entities/resident-lite';
import {api} from '../../../api';

export const fetchResidentsByEstate = createTypedAsyncThunk(
    'residents/fetchResidentsByEstate',
    async (id: string) => {
        const response = await api.estates().readResidents(id);
        const responseData = response.data.data.map((o) => new ResidentLite(o));
        const normalized = safeNormalize<Resident, ResidentEntities, Array<string>>(responseData, [residentSchema]);
        return normalized;
    },
);

export const createResident = createTypedAsyncThunk(
    'residents/createResident',
    async () => {
        const response = await api.residents().create();
        const responseData = response.data.data.map((o) => new Resident(o));
        const normalized = safeNormalize<Resident, ResidentEntities, Array<string>>(responseData, [residentSchema]);
        return normalized;
    },
);

export const fetchCurrentResident = createTypedAsyncThunk(
    'residents/fetchCurrentResident',
    async () => {
        const response = await api.residents().readCurrent();
        const responseData = new Resident(response.data.data);
        const normalized = safeNormalize<Resident, ResidentEntities, string>(responseData, residentSchema);
        return normalized;
    },
);

export const fetchResidentById = createTypedAsyncThunk(
    'residents/fetchResidentById',
    async (id: string) => {
        const response = await api.residents().readById(id);
        const responseData = new Resident(response.data.data);
        const normalized = safeNormalize<Resident, ResidentEntities, string>(responseData, residentSchema);
        return normalized;
    },
);

export const fetchAllResident = createTypedAsyncThunk(
    'residents/fetchAllResident',
    async (params: PaginatedQueryParams) => {
        const {query, page, pageSize} = params;
        const response = await api.residents().readAll(query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new ResidentLite(o));
        const normalized = safeNormalize<Resident, ResidentEntities, Array<string>>(responseData, [residentSchema]);
        return {...normalized, meta};
    },
);

export const updateResident = createTypedAsyncThunk(
    'residents/updateResident',
    async (params: {id: string; dto: ResidentUpdateOptions}) => {
        const {id, dto} = params;
        const response = await api.residents().update(id, dto);
        const responseData = new Resident(response.data.data);
        const normalized = safeNormalize<Resident, ResidentEntities, string>(responseData, residentSchema);
        return normalized;
    },
);

export const deleteResident = createTypedAsyncThunk(
    'residents/deleteResident',
    async (id: string) => {
        const response = await api.residents().deleteResident(id);
        return response;
    },
);

export const offboardResident = createTypedAsyncThunk(
    'residents/offboardResident',
    async (id: string) => {
        const response = await api.residents().offboardResident(id);
        return response;
    },
);