import {PaymentBeneficiaryEntities, paymentBeneficiarySchema} from '../../../schemas/normalization/payment-beneficiary';
import {PaymentBeneficiaryCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {PaymentBeneficiary} from '../../../entities/payment-beneficiary';
import {api} from '../../../api';

export const fetchPaymentBeneficiariesByEstate = createTypedAsyncThunk(
    'paymentBeneficiaries/fetchPaymentBeneficiariesByEstate',
    async (id: string) => {
        const response = await api.estates().readPaymentBeneficiaries(id);
        const responseData = response.data.data.map((o) => new PaymentBeneficiary(o));
        const normalized = safeNormalize<PaymentBeneficiary, PaymentBeneficiaryEntities, Array<string>>(responseData, [paymentBeneficiarySchema]);
        return normalized;
    },
);

export const createPaymentBeneficiaryForEstate = createTypedAsyncThunk(
    'paymentBeneficiaries/createPaymentBeneficiaryForEstate',
    async (params: {id: string; dto: PaymentBeneficiaryCreationOptions}) => {
        const {id, dto} = params;
        const response = await api.estates().createPaymentBeneficiary(id, dto);
        const responseData = new PaymentBeneficiary(response.data.data);
        const normalized = safeNormalize<PaymentBeneficiary, PaymentBeneficiaryEntities, string>(responseData, paymentBeneficiarySchema);
        return normalized;
    },
);

export const addPaymentBeneficiaryByEstate = createTypedAsyncThunk(
    'paymentBeneficiaries/addPaymentBeneficiaryByEstate',
    async (params: {id: string; beneficiaryId: string}) => {
        const {id, beneficiaryId} = params;
        const response = await api.estates().addPaymentBeneficiary(id, beneficiaryId);
        const responseData = new PaymentBeneficiary(response.data.data);
        const normalized = safeNormalize<PaymentBeneficiary, PaymentBeneficiaryEntities, string>(responseData, paymentBeneficiarySchema);
        return normalized;
    },
);

export const removePaymentBeneficiaryByEstate = createTypedAsyncThunk(
    'paymentBeneficiaries/removePaymentBeneficiaryByEstate',
    async (params: {id: string; beneficiaryId: string}) => {
        const {id, beneficiaryId} = params;
        const response = await api.estates().removePaymentBeneficiary(id, beneficiaryId);
        const responseData = new PaymentBeneficiary(response.data.data);
        const normalized = safeNormalize<PaymentBeneficiary, PaymentBeneficiaryEntities, string>(responseData, paymentBeneficiarySchema);
        return normalized;
    },
);

export const fetchPaymentBeneficiariesByFacilityManager = createTypedAsyncThunk(
    'paymentBeneficiaries/fetchPaymentBeneficiariesByFacilityManager',
    async () => {
        const response = await api.facilityManagers().readPaymentBeneficiaries();
        const responseData = response.data.data.map((o) => new PaymentBeneficiary(o));
        const normalized = safeNormalize<PaymentBeneficiary, PaymentBeneficiaryEntities, Array<string>>(responseData, [paymentBeneficiarySchema]);
        return normalized;
    },
);