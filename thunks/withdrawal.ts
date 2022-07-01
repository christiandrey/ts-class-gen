import {WithdrawalEntities, withdrawalSchema} from '../../../schemas/normalization/withdrawal';
import {PaginatedQueryParams} from '../../../typings';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Withdrawal} from '../../../entities/withdrawal';
import {api} from '../../../api';

export const fetchWithdrawalsByUser = createTypedAsyncThunk(
    'withdrawals/fetchWithdrawalsByUser',
    async (params: PaginatedQueryParams) => {
        const {page, pageSize} = params;
        const response = await api.withdrawals().readWithdrawalsByUser(page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new Withdrawal(o));
        const normalized = safeNormalize<Withdrawal, WithdrawalEntities, Array<string>>(responseData, [withdrawalSchema]);
        return {...normalized, meta};
    },
);

export const fixEstatesWithdrawal = createTypedAsyncThunk(
    'withdrawals/fixEstatesWithdrawal',
    async () => {
        const response = await api.withdrawals().fixEstates();
        return response;
    },
);

export const cancelWithdrawal = createTypedAsyncThunk(
    'withdrawals/cancelWithdrawal',
    async (id: string) => {
        const response = await api.withdrawals().cancelWithdrawal(id);
        const responseData = new Withdrawal(response.data.data);
        const normalized = safeNormalize<Withdrawal, WithdrawalEntities, string>(responseData, withdrawalSchema);
        return normalized;
    },
);