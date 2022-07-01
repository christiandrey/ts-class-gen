import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {OrganizationScope} from '../../../entities/organization-scope';
import {api} from '../../../api';

export const fetchAllOrganizationScopesByOrganization = createTypedAsyncThunk(
    'organizationScopes/fetchAllOrganizationScopesByOrganization',
    async () => {
        const response = await api.organizations().readAllOrganizationScopes();
        const responseData = response.data.data.map((o) => new OrganizationScope(o));
        return responseData;
    },
);