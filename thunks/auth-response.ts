import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {AuthResponse} from '../../../entities/auth-response';
import {api} from '../../../api';

export const updateUserPasswordByUser = createTypedAsyncThunk(
    'authResponses/updateUserPasswordByUser',
    async (password: string) => {
        const response = await api.users().updateUserPassword(password);
        const responseData = new AuthResponse(response.data.data);
        return responseData;
    },
);