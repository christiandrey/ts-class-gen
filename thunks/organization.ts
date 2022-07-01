import {OrganizationEntities, organizationSchema} from '../../../schemas/normalization/organization';
import {OrganizationCreationOptions, OrganizationUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Organization} from '../../../entities/organization';
import {api} from '../../../api';

export const createOrganization = createTypedAsyncThunk(
    'organizations/createOrganization',
    async (dto: OrganizationCreationOptions) => {
        const response = await api.organizations().create(dto);
        const responseData = new Organization(response.data.data);
        const normalized = safeNormalize<Organization, OrganizationEntities, string>(responseData, organizationSchema);
        return normalized;
    },
);

export const deleteClaimOrganization = createTypedAsyncThunk(
    'organizations/deleteClaimOrganization',
    async (params: {id: string; claimId: string}) => {
        const {id, claimId} = params;
        const response = await api.organizations().deleteClaim(id, claimId);
        return response;
    },
);

export const fetchCurrentOrganization = createTypedAsyncThunk(
    'organizations/fetchCurrentOrganization',
    async () => {
        const response = await api.organizations().readCurrentOrganization();
        const responseData = new Organization(response.data.data);
        const normalized = safeNormalize<Organization, OrganizationEntities, string>(responseData, organizationSchema);
        return normalized;
    },
);

export const fetchOrganizationById = createTypedAsyncThunk(
    'organizations/fetchOrganizationById',
    async (id: string) => {
        const response = await api.organizations().readById(id);
        const responseData = new Organization(response.data.data);
        const normalized = safeNormalize<Organization, OrganizationEntities, string>(responseData, organizationSchema);
        return normalized;
    },
);

export const updateOrganization = createTypedAsyncThunk(
    'organizations/updateOrganization',
    async (params: {id: string; dto: OrganizationUpdateOptions}) => {
        const {id, dto} = params;
        const response = await api.organizations().update(id, dto);
        const responseData = new Organization(response.data.data);
        const normalized = safeNormalize<Organization, OrganizationEntities, string>(responseData, organizationSchema);
        return normalized;
    },
);

export const fetchWalletBalanceOrganization = createTypedAsyncThunk(
    'organizations/fetchWalletBalanceOrganization',
    async (id: string) => {
        const response = await api.organizations().readWalletBalance(id);
        return response;
    },
);