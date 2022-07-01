import {OrganizationClaimEntities, organizationClaimSchema} from '../../../schemas/normalization/organization-claim';
import {OrganizationClaimCreationOptions, OrganizationClaimUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {OrganizationClaim} from '../../../entities/organization-claim';
import {api} from '../../../api';

export const fetchClaimsByOrganization = createTypedAsyncThunk(
    'organizationClaims/fetchClaimsByOrganization',
    async (id: string) => {
        const response = await api.organizations().readClaims(id);
        const responseData = response.data.data.map((o) => new OrganizationClaim(o));
        const normalized = safeNormalize<OrganizationClaim, OrganizationClaimEntities, Array<string>>(responseData, [organizationClaimSchema]);
        return normalized;
    },
);

export const createClaimForOrganization = createTypedAsyncThunk(
    'organizationClaims/createClaimForOrganization',
    async (params: {id: string; dto: OrganizationClaimCreationOptions}) => {
        const {id, dto} = params;
        const response = await api.organizations().createClaim(id, dto);
        const responseData = new OrganizationClaim(response.data.data);
        const normalized = safeNormalize<OrganizationClaim, OrganizationClaimEntities, string>(responseData, organizationClaimSchema);
        return normalized;
    },
);

export const updateClaimByOrganization = createTypedAsyncThunk(
    'organizationClaims/updateClaimByOrganization',
    async (params: {id: string; claimId: string; dto: OrganizationClaimUpdateOptions}) => {
        const {id, claimId, dto} = params;
        const response = await api.organizations().updateClaim(id, claimId, dto);
        const responseData = new OrganizationClaim(response.data.data);
        const normalized = safeNormalize<OrganizationClaim, OrganizationClaimEntities, string>(responseData, organizationClaimSchema);
        return normalized;
    },
);