import {PaymentAccountEntities, paymentAccountSchema} from '../../../schemas/normalization/payment-account';
import {PaymentAccountCreationOptions, PaymentAccountUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {PaymentAccount} from '../../../entities/payment-account';
import {api} from '../../../api';

export const fetchPaymentAccountsByEstate = createTypedAsyncThunk(
    'paymentAccounts/fetchPaymentAccountsByEstate',
    async (id: string) => {
        const response = await api.estates().readPaymentAccounts(id);
        const responseData = response.data.data.map((o) => new PaymentAccount(o));
        const normalized = safeNormalize<PaymentAccount, PaymentAccountEntities, Array<string>>(responseData, [paymentAccountSchema]);
        return normalized;
    },
);

export const createPaymentAccountForEstate = createTypedAsyncThunk(
    'paymentAccounts/createPaymentAccountForEstate',
    async (params: {id: string; dto: PaymentAccountCreationOptions}) => {
        const {id, dto} = params;
        const response = await api.estates().createPaymentAccount(id, dto);
        const responseData = new PaymentAccount(response.data.data);
        const normalized = safeNormalize<PaymentAccount, PaymentAccountEntities, string>(responseData, paymentAccountSchema);
        return normalized;
    },
);

export const updatePaymentAccountByEstate = createTypedAsyncThunk(
    'paymentAccounts/updatePaymentAccountByEstate',
    async (params: {id: string; paymentAccountId: string; dto: PaymentAccountUpdateOptions}) => {
        const {id, paymentAccountId, dto} = params;
        const response = await api.estates().updatePaymentAccount(id, paymentAccountId, dto);
        const responseData = new PaymentAccount(response.data.data);
        const normalized = safeNormalize<PaymentAccount, PaymentAccountEntities, string>(responseData, paymentAccountSchema);
        return normalized;
    },
);

export const activatePaymentAccountByEstate = createTypedAsyncThunk(
    'paymentAccounts/activatePaymentAccountByEstate',
    async (params: {id: string; paymentAccountId: string}) => {
        const {id, paymentAccountId} = params;
        const response = await api.estates().activatePaymentAccount(id, paymentAccountId);
        const responseData = new PaymentAccount(response.data.data);
        const normalized = safeNormalize<PaymentAccount, PaymentAccountEntities, string>(responseData, paymentAccountSchema);
        return normalized;
    },
);

export const deactivatePaymentAccountByEstate = createTypedAsyncThunk(
    'paymentAccounts/deactivatePaymentAccountByEstate',
    async (params: {id: string; paymentAccountId: string}) => {
        const {id, paymentAccountId} = params;
        const response = await api.estates().deactivatePaymentAccount(id, paymentAccountId);
        const responseData = new PaymentAccount(response.data.data);
        const normalized = safeNormalize<PaymentAccount, PaymentAccountEntities, string>(responseData, paymentAccountSchema);
        return normalized;
    },
);