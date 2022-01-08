import {RoleEntities, roleSchema} from '../../../schemas/normalization/role';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Role} from '../../../entities/role';
import {api} from '../../../api';

export const fetchRoles = createTypedAsyncThunk(
    'roles/fetchRoles',
    async () => {
        const response = await api.roles().readRoles();
        const responseData = response.data.data.map((o) => new Role(o));
        const normalized = safeNormalize<Role, RoleEntities, Array<string>>(responseData, [roleSchema]);
        return normalized;
    },
);

export const updateRole = createTypedAsyncThunk(
    'roles/updateRole',
    async (params: {roleId: string; dto: Role}) => {
        const {roleId, dto} = params;
        const response = await api.roles().updateRole(roleId, dto);
        const responseData = new Role(response.data.data);
        const normalized = safeNormalize<Role, RoleEntities, string>(responseData, roleSchema);
        return normalized;
    },
);

export const updateRolesByUser = createTypedAsyncThunk(
    'roles/updateRolesByUser',
    async (params: {userId: string; roles: Array<UserRoleType>}) => {
        const {userId, roles} = params;
        const response = await api.users().updateRoles(userId, roles);
        const responseData = response.data.data.map((o) => new Role(o));
        const normalized = safeNormalize<Role, RoleEntities, Array<string>>(responseData, [roleSchema]);
        return normalized;
    },
);