import {VendorEntities, vendorSchema} from '../../../schemas/normalization/vendor';
import {PaginatedQueryParams} from '../../../typings';
import {VendorCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Vendor} from '../../../entities/vendor';
import {VendorLite} from '../../../entities/vendor-lite';
import {api} from '../../../api';

export const fetchVendorsByEstate = createTypedAsyncThunk(
    'vendors/fetchVendorsByEstate',
    async (id: string) => {
        const response = await api.estates().readVendors(id);
        const responseData = response.data.data.map((o) => new VendorLite(o));
        const normalized = safeNormalize<Vendor, VendorEntities, Array<string>>(responseData, [vendorSchema]);
        return normalized;
    },
);

export const createVendor = createTypedAsyncThunk(
    'vendors/createVendor',
    async (dto: VendorCreationOptions) => {
        const response = await api.vendors().create(dto);
        const responseData = new Vendor(response.data.data);
        const normalized = safeNormalize<Vendor, VendorEntities, string>(responseData, vendorSchema);
        return normalized;
    },
);

export const fetchCurrentVendor = createTypedAsyncThunk(
    'vendors/fetchCurrentVendor',
    async () => {
        const response = await api.vendors().readCurrent();
        const responseData = new Vendor(response.data.data);
        const normalized = safeNormalize<Vendor, VendorEntities, string>(responseData, vendorSchema);
        return normalized;
    },
);

export const fetchVendorById = createTypedAsyncThunk(
    'vendors/fetchVendorById',
    async (id: string) => {
        const response = await api.vendors().readById(id);
        const responseData = new Vendor(response.data.data);
        const normalized = safeNormalize<Vendor, VendorEntities, string>(responseData, vendorSchema);
        return normalized;
    },
);

export const fetchAllVendor = createTypedAsyncThunk(
    'vendors/fetchAllVendor',
    async (params: PaginatedQueryParams) => {
        const {query, page, pageSize} = params;
        const response = await api.vendors().readAll(query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new VendorLite(o));
        const normalized = safeNormalize<Vendor, VendorEntities, Array<string>>(responseData, [vendorSchema]);
        return {...normalized, meta};
    },
);