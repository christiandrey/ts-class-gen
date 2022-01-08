import {BillingItemEntities, billingItemSchema} from '../../../schemas/normalization/billing-item';
import {PaginatedQueryParams} from '../../../typings';
import {BillingItemCreationOptions, BillingItemUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {BillingItem} from '../../../entities/billing-item';
import {api} from '../../../api';

export const fetchBillingItemById = createTypedAsyncThunk(
    'billingItems/fetchBillingItemById',
    async (id: string) => {
        const response = await api.billingItems().readById(id);
        const responseData = new BillingItem(response.data.data);
        const normalized = safeNormalize<BillingItem, BillingItemEntities, string>(responseData, billingItemSchema);
        return normalized;
    },
);

export const updateBillingItem = createTypedAsyncThunk(
    'billingItems/updateBillingItem',
    async (params: {id: string; options: BillingItemUpdateOptions}) => {
        const {id, options} = params;
        const response = await api.billingItems().update(id, options);
        const responseData = new BillingItem(response.data.data);
        const normalized = safeNormalize<BillingItem, BillingItemEntities, string>(responseData, billingItemSchema);
        return normalized;
    },
);

export const deleteBillingItem = createTypedAsyncThunk(
    'billingItems/deleteBillingItem',
    async (id: string) => {
        const response = await api.billingItems().delete(id);
        return response;
    },
);

export const fetchBillingItemsByHospital = createTypedAsyncThunk(
    'billingItems/fetchBillingItemsByHospital',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, query, page, pageSize} = params;
        const response = await api.hospitals().readBillingItems(id, query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new BillingItem(o));
        const normalized = safeNormalize<BillingItem, BillingItemEntities, Array<string>>(responseData, [billingItemSchema]);
        return {...normalized, meta};
    },
);

export const createBillingItemForHospital = createTypedAsyncThunk(
    'billingItems/createBillingItemForHospital',
    async (params: {id: string; options: BillingItemCreationOptions}) => {
        const {id, options} = params;
        const response = await api.hospitals().createBillingItem(id, options);
        const responseData = new BillingItem(response.data.data);
        const normalized = safeNormalize<BillingItem, BillingItemEntities, string>(responseData, billingItemSchema);
        return normalized;
    },
);