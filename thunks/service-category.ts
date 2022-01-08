import {ServiceCategoryEntities, serviceCategorySchema} from '../../../schemas/normalization/service-category';
import {ServiceCategoryCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {ServiceCategory} from '../../../entities/service-category';
import {api} from '../../../api';

export const fetchServicesByHospital = createTypedAsyncThunk(
    'serviceCategories/fetchServicesByHospital',
    async (id: string) => {
        const response = await api.hospitals().readServices(id);
        const responseData = response.data.data.map((o) => new ServiceCategory(o));
        const normalized = safeNormalize<ServiceCategory, ServiceCategoryEntities, Array<string>>(responseData, [serviceCategorySchema]);
        return normalized;
    },
);

export const fetchServiceCategory = createTypedAsyncThunk(
    'serviceCategories/fetchServiceCategory',
    async () => {
        const response = await api.serviceCategories().read();
        const responseData = response.data.data.map((o) => new ServiceCategory(o));
        const normalized = safeNormalize<ServiceCategory, ServiceCategoryEntities, Array<string>>(responseData, [serviceCategorySchema]);
        return normalized;
    },
);

export const createServiceCategory = createTypedAsyncThunk(
    'serviceCategories/createServiceCategory',
    async (dto: ServiceCategoryCreationOptions) => {
        const response = await api.serviceCategories().create(dto);
        const responseData = new ServiceCategory(response.data.data);
        const normalized = safeNormalize<ServiceCategory, ServiceCategoryEntities, string>(responseData, serviceCategorySchema);
        return normalized;
    },
);

export const deleteServiceCategory = createTypedAsyncThunk(
    'serviceCategories/deleteServiceCategory',
    async (id: string) => {
        const response = await api.serviceCategories().delete(id);
        return response;
    },
);