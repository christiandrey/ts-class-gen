import {AdminWithdrawalEntities, adminWithdrawalSchema} from '../../../schemas/normalization/admin-withdrawal';
import {PaginatedQueryParams} from '../../../typings';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {AdminWithdrawal} from '../../../entities/admin-withdrawal';
import {api} from '../../../api';

export const fetchWithdrawalsByWithdrawal = createTypedAsyncThunk(
    'adminWithdrawals/fetchWithdrawalsByWithdrawal',
    async (params: PaginatedQueryParams) => {
        const {query, page, pageSize} = params;
        const response = await api.withdrawals().readWithdrawals(query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new AdminWithdrawal(o));
        const normalized = safeNormalize<AdminWithdrawal, AdminWithdrawalEntities, Array<string>>(responseData, [adminWithdrawalSchema]);
        return {...normalized, meta};
    },
);