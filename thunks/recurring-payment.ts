import {RecurringPaymentEntities, recurringPaymentSchema} from '../../../schemas/normalization/recurring-payment';
import {PaginatedQueryParams} from '../../../typings';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {RecurringPayment} from '../../../entities/recurring-payment';
import {api} from '../../../api';

export const fetchRecurringPaymentsByEstate = createTypedAsyncThunk(
    'recurringPayments/fetchRecurringPaymentsByEstate',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, page, pageSize} = params;
        const response = await api.estates().readRecurringPayments(id, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new RecurringPayment(o));
        const normalized = safeNormalize<RecurringPayment, RecurringPaymentEntities, Array<string>>(responseData, [recurringPaymentSchema]);
        return {...normalized, meta};
    },
);