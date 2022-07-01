import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {WithdrawalSummary} from '../../../entities/withdrawal-summary';
import {api} from '../../../api';

export const fetchWithdrawalSummaryByWithdrawal = createTypedAsyncThunk(
    'withdrawalSummaries/fetchWithdrawalSummaryByWithdrawal',
    async () => {
        const response = await api.withdrawals().readWithdrawalSummary();
        const responseData = new WithdrawalSummary(response.data.data);
        return responseData;
    },
);