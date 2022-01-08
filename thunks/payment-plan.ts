import {PaymentPlanEntities, paymentPlanSchema} from '../../../schemas/normalization/payment-plan';
import {PaymentPlanCreationOptions, PaymentPlanUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {PaymentPlan} from '../../../entities/payment-plan';
import {api} from '../../../api';

export const createPaymentPlan = createTypedAsyncThunk(
    'paymentPlans/createPaymentPlan',
    async (options: PaymentPlanCreationOptions) => {
        const response = await api.paymentPlans().create(options);
        const responseData = new PaymentPlan(response.data.data);
        const normalized = safeNormalize<PaymentPlan, PaymentPlanEntities, string>(responseData, paymentPlanSchema);
        return normalized;
    },
);

export const fetchPaymentPlans = createTypedAsyncThunk(
    'paymentPlans/fetchPaymentPlans',
    async () => {
        const response = await api.paymentPlans().readPaymentPlans();
        const responseData = response.data.data.map((o) => new PaymentPlan(o));
        const normalized = safeNormalize<PaymentPlan, PaymentPlanEntities, Array<string>>(responseData, [paymentPlanSchema]);
        return normalized;
    },
);

export const updatePaymentPlan = createTypedAsyncThunk(
    'paymentPlans/updatePaymentPlan',
    async (params: {id: string; options: PaymentPlanUpdateOptions}) => {
        const {id, options} = params;
        const response = await api.paymentPlans().update(id, options);
        const responseData = new PaymentPlan(response.data.data);
        const normalized = safeNormalize<PaymentPlan, PaymentPlanEntities, string>(responseData, paymentPlanSchema);
        return normalized;
    },
);

export const deletePaymentPlan = createTypedAsyncThunk(
    'paymentPlans/deletePaymentPlan',
    async (id: string) => {
        const response = await api.paymentPlans().delete(id);
        return response;
    },
);