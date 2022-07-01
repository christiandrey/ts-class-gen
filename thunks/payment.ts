import {PaymentEntities, paymentSchema} from '../../../schemas/normalization/payment';
import {PaginatedQueryParams} from '../../../typings';
import {PaymentCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Payment} from '../../../entities/payment';
import {PaymentLite} from '../../../entities/payment-lite';
import {api} from '../../../api';

export const fetchPaymentsByEstate = createTypedAsyncThunk(
    'payments/fetchPaymentsByEstate',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, query, page, pageSize} = params;
        const response = await api.estates().readPayments(id, query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new PaymentLite(o));
        const normalized = safeNormalize<Payment, PaymentEntities, Array<string>>(responseData, [paymentSchema]);
        return {...normalized, meta};
    },
);

export const createPaymentForEstate = createTypedAsyncThunk(
    'payments/createPaymentForEstate',
    async (params: {id: string; dto: PaymentCreationOptions; serviceCategoryId?: string; beneficiaryId?: string}) => {
        const {id, dto, serviceCategoryId, beneficiaryId} = params;
        const response = await api.estates().createPayment(id, dto, serviceCategoryId, beneficiaryId);
        const responseData = new Payment(response.data.data);
        const normalized = safeNormalize<Payment, PaymentEntities, string>(responseData, paymentSchema);
        return normalized;
    },
);

export const fetchPaymentsByResident = createTypedAsyncThunk(
    'payments/fetchPaymentsByResident',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, query, page, pageSize} = params;
        const response = await api.residents().readPayments(id, query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new PaymentLite(o));
        const normalized = safeNormalize<Payment, PaymentEntities, Array<string>>(responseData, [paymentSchema]);
        return {...normalized, meta};
    },
);

export const createOfflineServiceChargePaymentForResident = createTypedAsyncThunk(
    'payments/createOfflineServiceChargePaymentForResident',
    async (params: {id: string; localAmount: number; paymentAccountId?: string}) => {
        const {id, localAmount, paymentAccountId} = params;
        const response = await api.residents().createOfflineServiceChargePayment(id, localAmount, paymentAccountId);
        const responseData = new Payment(response.data.data);
        const normalized = safeNormalize<Payment, PaymentEntities, string>(responseData, paymentSchema);
        return normalized;
    },
);