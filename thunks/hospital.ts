import {HospitalEntities, hospitalSchema} from '../../../schemas/normalization/hospital';
import {PaginatedQueryParams} from '../../../typings';
import {HospitalCreationOptions, HospitalUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Hospital} from '../../../entities/hospital';
import {api} from '../../../api';

export const createHospital = createTypedAsyncThunk(
    'hospitals/createHospital',
    async (options: HospitalCreationOptions) => {
        const response = await api.hospitals().createHospital(options);
        const responseData = new Hospital(response.data.data);
        const normalized = safeNormalize<Hospital, HospitalEntities, string>(responseData, hospitalSchema);
        return normalized;
    },
);

export const fetchCurrentHospital = createTypedAsyncThunk(
    'hospitals/fetchCurrentHospital',
    async () => {
        const response = await api.hospitals().readCurrentHospital();
        const responseData = new Hospital(response.data.data);
        const normalized = safeNormalize<Hospital, HospitalEntities, string>(responseData, hospitalSchema);
        return normalized;
    },
);

export const fetchHospitals = createTypedAsyncThunk(
    'hospitals/fetchHospitals',
    async (params: PaginatedQueryParams) => {
        const {query, page, pageSize} = params;
        const response = await api.hospitals().readHospitals(query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new Hospital(o));
        const normalized = safeNormalize<Hospital, HospitalEntities, Array<string>>(responseData, [hospitalSchema]);
        return {...normalized, meta};
    },
);

export const updateHospital = createTypedAsyncThunk(
    'hospitals/updateHospital',
    async (params: {id: string; options: HospitalUpdateOptions}) => {
        const {id, options} = params;
        const response = await api.hospitals().updateHospital(id, options);
        const responseData = new Hospital(response.data.data);
        const normalized = safeNormalize<Hospital, HospitalEntities, string>(responseData, hospitalSchema);
        return normalized;
    },
);

export const updateHospitalServices = createTypedAsyncThunk(
    'hospitals/updateHospitalServices',
    async (params: {id: string; servicesIds: Array<string>}) => {
        const {id, servicesIds} = params;
        const response = await api.hospitals().updateHospitalServices(id, servicesIds);
        const responseData = new Hospital(response.data.data);
        const normalized = safeNormalize<Hospital, HospitalEntities, string>(responseData, hospitalSchema);
        return normalized;
    },
);

export const deleteHospital = createTypedAsyncThunk(
    'hospitals/deleteHospital',
    async (id: string) => {
        const response = await api.hospitals().deleteHospital(id);
        return response;
    },
);

export const fetchHospital = createTypedAsyncThunk(
    'hospitals/fetchHospital',
    async (id: string) => {
        const response = await api.hospitals().readHospital(id);
        const responseData = new Hospital(response.data.data);
        const normalized = safeNormalize<Hospital, HospitalEntities, string>(responseData, hospitalSchema);
        return normalized;
    },
);