import {PaymentRequestEntities, paymentRequestSchema} from '../../../schemas/normalization/payment-request';
import {PaginatedQueryParams} from '../../../typings';
import {PaymentCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {PaymentRequest} from '../../../entities/payment-request';
import {PaymentRequestLite} from '../../../entities/payment-request-lite';
import {api} from '../../../api';

export const fetchPaymentRequestsByEstate = createTypedAsyncThunk(
    'paymentRequests/fetchPaymentRequestsByEstate',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, query, page, pageSize} = params;
        const response = await api.estates().readPaymentRequests(id, query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new PaymentRequestLite(o));
        const normalized = safeNormalize<PaymentRequest, PaymentRequestEntities, Array<string>>(responseData, [paymentRequestSchema]);
        return {...normalized, meta};
    },
);

export const createPaymentRequestForEstate = createTypedAsyncThunk(
    'paymentRequests/createPaymentRequestForEstate',
    async (params: {id: string; dto: PaymentCreationOptions; serviceCategoryId?: string; beneficiaryId?: string}) => {
        const {id, dto, serviceCategoryId, beneficiaryId} = params;
        const response = await api.estates().createPaymentRequest(id, dto, serviceCategoryId, beneficiaryId);
        const responseData = new PaymentRequest(response.data.data);
        const normalized = safeNormalize<PaymentRequest, PaymentRequestEntities, string>(responseData, paymentRequestSchema);
        return normalized;
    },
);

export const fetchPaymentRequestsByMember = createTypedAsyncThunk(
    'paymentRequests/fetchPaymentRequestsByMember',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, query, page, pageSize} = params;
        const response = await api.members().readPaymentRequests(id, query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new PaymentRequestLite(o));
        const normalized = safeNormalize<PaymentRequest, PaymentRequestEntities, Array<string>>(responseData, [paymentRequestSchema]);
        return {...normalized, meta};
    },
);

export const fetchPaymentRequestsByOrganization = createTypedAsyncThunk(
    'paymentRequests/fetchPaymentRequestsByOrganization',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, query, page, pageSize} = params;
        const response = await api.organizations().readPaymentRequests(id, query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new PaymentRequestLite(o));
        const normalized = safeNormalize<PaymentRequest, PaymentRequestEntities, Array<string>>(responseData, [paymentRequestSchema]);
        return {...normalized, meta};
    },
);

export const fetchPaymentRequestById = createTypedAsyncThunk(
    'paymentRequests/fetchPaymentRequestById',
    async (id: string) => {
        const response = await api.paymentRequests().readById(id);
        const responseData = new PaymentRequest(response.data.data);
        const normalized = safeNormalize<PaymentRequest, PaymentRequestEntities, string>(responseData, paymentRequestSchema);
        return normalized;
    },
);

export const approvePaymentRequest = createTypedAsyncThunk(
    'paymentRequests/approvePaymentRequest',
    async (id: string) => {
        const response = await api.paymentRequests().approvePaymentRequest(id);
        const responseData = new PaymentRequest(response.data.data);
        const normalized = safeNormalize<PaymentRequest, PaymentRequestEntities, string>(responseData, paymentRequestSchema);
        return normalized;
    },
);

export const rejectPaymentRequest = createTypedAsyncThunk(
    'paymentRequests/rejectPaymentRequest',
    async (id: string) => {
        const response = await api.paymentRequests().rejectPaymentRequest(id);
        const responseData = new PaymentRequest(response.data.data);
        const normalized = safeNormalize<PaymentRequest, PaymentRequestEntities, string>(responseData, paymentRequestSchema);
        return normalized;
    },
);