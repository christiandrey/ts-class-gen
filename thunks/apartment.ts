import {ApartmentEntities, apartmentSchema} from '../../../schemas/normalization/apartment';
import {PaginatedQueryParams} from '../../../typings';
import {ApartmentCreationOptions, ApartmentUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Apartment} from '../../../entities/apartment';
import {ApartmentLite} from '../../../entities/apartment-lite';
import {api} from '../../../api';

export const createApartment = createTypedAsyncThunk(
    'apartments/createApartment',
    async (options: ApartmentCreationOptions) => {
        const response = await api.apartments().create(options);
        const responseData = new Apartment(response.data.data);
        const normalized = safeNormalize<Apartment, ApartmentEntities, string>(responseData, apartmentSchema);
        return normalized;
    },
);

export const fetchCurrentApartment = createTypedAsyncThunk(
    'apartments/fetchCurrentApartment',
    async () => {
        const response = await api.apartments().readCurrent();
        const responseData = new Apartment(response.data.data);
        const normalized = safeNormalize<Apartment, ApartmentEntities, string>(responseData, apartmentSchema);
        return normalized;
    },
);

export const fetchApartmentById = createTypedAsyncThunk(
    'apartments/fetchApartmentById',
    async (id: string) => {
        const response = await api.apartments().readById(id);
        const responseData = new Apartment(response.data.data);
        const normalized = safeNormalize<Apartment, ApartmentEntities, string>(responseData, apartmentSchema);
        return normalized;
    },
);

export const fetchAllApartment = createTypedAsyncThunk(
    'apartments/fetchAllApartment',
    async (params: PaginatedQueryParams) => {
        const {query, page, pageSize} = params;
        const response = await api.apartments().readAll(query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new ApartmentLite(o));
        const normalized = safeNormalize<Apartment, ApartmentEntities, Array<string>>(responseData, [apartmentSchema]);
        return {...normalized, meta};
    },
);

export const updateApartment = createTypedAsyncThunk(
    'apartments/updateApartment',
    async (params: {id: string; options: ApartmentUpdateOptions}) => {
        const {id, options} = params;
        const response = await api.apartments().update(id, options);
        const responseData = new Apartment(response.data.data);
        const normalized = safeNormalize<Apartment, ApartmentEntities, string>(responseData, apartmentSchema);
        return normalized;
    },
);

export const deleteApartment = createTypedAsyncThunk(
    'apartments/deleteApartment',
    async (id: string) => {
        const response = await api.apartments().delete(id);
        return response;
    },
);

export const fetchApartmentsByEstate = createTypedAsyncThunk(
    'apartments/fetchApartmentsByEstate',
    async (id: string) => {
        const response = await api.estates().readApartments(id);
        const responseData = response.data.data.map((o) => new ApartmentLite(o));
        const normalized = safeNormalize<Apartment, ApartmentEntities, Array<string>>(responseData, [apartmentSchema]);
        return normalized;
    },
);