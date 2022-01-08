import {UserEntities, userSchema} from '../../../schemas/normalization/user';
import {PaginatedQueryParams} from '../../../typings';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {UpdatedUser} from '../../../entities/updated-user';
import {User} from '../../../entities/user';
import {UserLite} from '../../../entities/user-lite';
import {api} from '../../../api';

export const fetchUsers = createTypedAsyncThunk(
    'users/fetchUsers',
    async (params: PaginatedQueryParams) => {
        const {query, page, pageSize} = params;
        const response = await api.users().readUsers(query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new UserLite(o));
        const normalized = safeNormalize<User, UserEntities, Array<string>>(responseData, [userSchema]);
        return {...normalized, meta};
    },
);

export const exportUser = createTypedAsyncThunk(
    'users/exportUser',
    async (params: PaginatedQueryParams) => {
        const {page, pageSize, query} = params;
        const response = await api.users().export(page, pageSize, query);
        return response;
    },
);

export const exportAllUser = createTypedAsyncThunk(
    'users/exportAllUser',
    async () => {
        const response = await api.users().exportAll();
        return response;
    },
);

export const fetchUserProfileById = createTypedAsyncThunk(
    'users/fetchUserProfileById',
    async (userId: string) => {
        const response = await api.users().readUserProfileById(userId);
        const responseData = new User(response.data.data);
        const normalized = safeNormalize<User, UserEntities, string>(responseData, userSchema);
        return normalized;
    },
);

export const deleteUser = createTypedAsyncThunk(
    'users/deleteUser',
    async (params: {userId: string; mode?: DeleteMode}) => {
        const {userId, mode} = params;
        const response = await api.users().deleteUser(userId, mode);
        return response;
    },
);

export const activateUser = createTypedAsyncThunk(
    'users/activateUser',
    async (userId: string) => {
        const response = await api.users().activateUser(userId);
        return response;
    },
);

export const dectivateUser = createTypedAsyncThunk(
    'users/dectivateUser',
    async (userId: string) => {
        const response = await api.users().dectivateUser(userId);
        return response;
    },
);

export const setupUser = createTypedAsyncThunk(
    'users/setupUser',
    async (password: string) => {
        const response = await api.users().setupUser(password);
        const responseData = new User(response.data.data);
        const normalized = safeNormalize<User, UserEntities, string>(responseData, userSchema);
        return normalized;
    },
);

export const fetchCurrentUserProfile = createTypedAsyncThunk(
    'users/fetchCurrentUserProfile',
    async () => {
        const response = await api.users().readCurrentUserProfile();
        const responseData = new User(response.data.data);
        const normalized = safeNormalize<User, UserEntities, string>(responseData, userSchema);
        return normalized;
    },
);

export const updateUserProfile = createTypedAsyncThunk(
    'users/updateUserProfile',
    async (dto: UpdatedUser) => {
        const response = await api.users().updateUserProfile(dto);
        const responseData = new User(response.data.data);
        const normalized = safeNormalize<User, UserEntities, string>(responseData, userSchema);
        return normalized;
    },
);