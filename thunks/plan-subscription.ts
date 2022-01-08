import {PlanSubscriptionEntities, planSubscriptionSchema} from '../../../schemas/normalization/plan-subscription';
import {PaginatedQueryParams} from '../../../typings';
import {PlanSubscriptionCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {PlanSubscription} from '../../../entities/plan-subscription';
import {api} from '../../../api';

export const fetchPlanSubscriptionsByHospital = createTypedAsyncThunk(
    'planSubscriptions/fetchPlanSubscriptionsByHospital',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, page, pageSize} = params;
        const response = await api.hospitals().readPlanSubscriptions(id, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new PlanSubscription(o));
        const normalized = safeNormalize<PlanSubscription, PlanSubscriptionEntities, Array<string>>(responseData, [planSubscriptionSchema]);
        return {...normalized, meta};
    },
);

export const createPlanSubscriptionsForHospital = createTypedAsyncThunk(
    'planSubscriptions/createPlanSubscriptionsForHospital',
    async (params: {id: string; options: PlanSubscriptionCreationOptions}) => {
        const {id, options} = params;
        const response = await api.hospitals().createPlanSubscriptions(id, options);
        const responseData = new PlanSubscription(response.data.data);
        const normalized = safeNormalize<PlanSubscription, PlanSubscriptionEntities, string>(responseData, planSubscriptionSchema);
        return normalized;
    },
);

export const fetchActivePlanSubscriptionByHospital = createTypedAsyncThunk(
    'planSubscriptions/fetchActivePlanSubscriptionByHospital',
    async (id: string) => {
        const response = await api.hospitals().readActivePlanSubscription(id);
        const responseData = new PlanSubscription(response.data.data);
        const normalized = safeNormalize<PlanSubscription, PlanSubscriptionEntities, string>(responseData, planSubscriptionSchema);
        return normalized;
    },
);

export const fetchPaymentPlanSubscriptionsByPaymentPlan = createTypedAsyncThunk(
    'planSubscriptions/fetchPaymentPlanSubscriptionsByPaymentPlan',
    async (id: string) => {
        const response = await api.paymentPlans().readPaymentPlanSubscriptions(id);
        const responseData = response.data.data.map((o) => new PlanSubscription(o));
        const normalized = safeNormalize<PlanSubscription, PlanSubscriptionEntities, Array<string>>(responseData, [planSubscriptionSchema]);
        return normalized;
    },
);

export const fetchPlanSubscriptions = createTypedAsyncThunk(
    'planSubscriptions/fetchPlanSubscriptions',
    async (params: PaginatedQueryParams) => {
        const {page, pageSize} = params;
        const response = await api.planSubscriptions().readPlanSubscriptions(page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new PlanSubscription(o));
        const normalized = safeNormalize<PlanSubscription, PlanSubscriptionEntities, Array<string>>(responseData, [planSubscriptionSchema]);
        return {...normalized, meta};
    },
);

export const fetchActivePlanSubscriptions = createTypedAsyncThunk(
    'planSubscriptions/fetchActivePlanSubscriptions',
    async (params: PaginatedQueryParams) => {
        const {page, pageSize} = params;
        const response = await api.planSubscriptions().readActivePlanSubscriptions(page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new PlanSubscription(o));
        const normalized = safeNormalize<PlanSubscription, PlanSubscriptionEntities, Array<string>>(responseData, [planSubscriptionSchema]);
        return {...normalized, meta};
    },
);

export const cancelPlanSubscription = createTypedAsyncThunk(
    'planSubscriptions/cancelPlanSubscription',
    async (id: string) => {
        const response = await api.planSubscriptions().cancel(id);
        const responseData = new PlanSubscription(response.data.data);
        const normalized = safeNormalize<PlanSubscription, PlanSubscriptionEntities, string>(responseData, planSubscriptionSchema);
        return normalized;
    },
);