import {ApartmentTypeEntities, apartmentTypeSchema} from '../../../schemas/normalization/apartment-type';
import {PaginatedQueryParams} from '../../../typings';
import {ApartmentTypeCreationOptions, ApartmentTypeUpdateOptions, ServiceChargeUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {ApartmentType} from '../../../entities/apartment-type';
import {api} from '../../../api';

export const createApartmentType = createTypedAsyncThunk(
    'apartmentTypes/createApartmentType',
    async (dto: ApartmentTypeCreationOptions) => {
        const response = await api.apartmentTypes().create(dto);
        const responseData = new ApartmentType(response.data.data);
        const normalized = safeNormalize<ApartmentType, ApartmentTypeEntities, string>(responseData, apartmentTypeSchema);
        return normalized;
    },
);

export const fetchApartmentTypeById = createTypedAsyncThunk(
    'apartmentTypes/fetchApartmentTypeById',
    async (id: string) => {
        const response = await api.apartmentTypes().readById(id);
        const responseData = new ApartmentType(response.data.data);
        const normalized = safeNormalize<ApartmentType, ApartmentTypeEntities, string>(responseData, apartmentTypeSchema);
        return normalized;
    },
);

export const fetchAllApartmentType = createTypedAsyncThunk(
    'apartmentTypes/fetchAllApartmentType',
    async (params: PaginatedQueryParams) => {
        const {query, page, pageSize} = params;
        const response = await api.apartmentTypes().readAll(query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new ApartmentType(o));
        const normalized = safeNormalize<ApartmentType, ApartmentTypeEntities, Array<string>>(responseData, [apartmentTypeSchema]);
        return {...normalized, meta};
    },
);

export const updateApartmentType = createTypedAsyncThunk(
    'apartmentTypes/updateApartmentType',
    async (params: {id: string; dto: ApartmentTypeUpdateOptions}) => {
        const {id, dto} = params;
        const response = await api.apartmentTypes().update(id, dto);
        const responseData = new ApartmentType(response.data.data);
        const normalized = safeNormalize<ApartmentType, ApartmentTypeEntities, string>(responseData, apartmentTypeSchema);
        return normalized;
    },
);

export const updateServicesApartmentType = createTypedAsyncThunk(
    'apartmentTypes/updateServicesApartmentType',
    async (params: {id: string; servicesIds: Array<string>}) => {
        const {id, servicesIds} = params;
        const response = await api.apartmentTypes().updateServices(id, servicesIds);
        const responseData = new ApartmentType(response.data.data);
        const normalized = safeNormalize<ApartmentType, ApartmentTypeEntities, string>(responseData, apartmentTypeSchema);
        return normalized;
    },
);

export const updateServiceChargeApartmentType = createTypedAsyncThunk(
    'apartmentTypes/updateServiceChargeApartmentType',
    async (params: {id: string; dto: ServiceChargeUpdateOptions}) => {
        const {id, dto} = params;
        const response = await api.apartmentTypes().updateServiceCharge(id, dto);
        const responseData = new ApartmentType(response.data.data);
        const normalized = safeNormalize<ApartmentType, ApartmentTypeEntities, string>(responseData, apartmentTypeSchema);
        return normalized;
    },
);

export const deleteApartmentType = createTypedAsyncThunk(
    'apartmentTypes/deleteApartmentType',
    async (id: string) => {
        const response = await api.apartmentTypes().delete(id);
        return response;
    },
);