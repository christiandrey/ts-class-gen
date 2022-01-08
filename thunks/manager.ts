import {ManagerEntities, managerSchema} from '../../../schemas/normalization/manager';
import {ManagerCreationOptions, ManagerUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Manager} from '../../../entities/manager';
import {api} from '../../../api';

export const createManager = createTypedAsyncThunk(
    'managers/createManager',
    async (options: ManagerCreationOptions) => {
        const response = await api.managers().create(options);
        const responseData = new Manager(response.data.data);
        const normalized = safeNormalize<Manager, ManagerEntities, string>(responseData, managerSchema);
        return normalized;
    },
);

export const fetchCurrentManager = createTypedAsyncThunk(
    'managers/fetchCurrentManager',
    async () => {
        const response = await api.managers().readCurrent();
        const responseData = new Manager(response.data.data);
        const normalized = safeNormalize<Manager, ManagerEntities, string>(responseData, managerSchema);
        return normalized;
    },
);

export const updateCurrentManager = createTypedAsyncThunk(
    'managers/updateCurrentManager',
    async (options: ManagerUpdateOptions) => {
        const response = await api.managers().updateCurrent(options);
        const responseData = new Manager(response.data.data);
        const normalized = safeNormalize<Manager, ManagerEntities, string>(responseData, managerSchema);
        return normalized;
    },
);

export const deleteManager = createTypedAsyncThunk(
    'managers/deleteManager',
    async (id: string) => {
        const response = await api.managers().delete(id);
        return response;
    },
);