import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {PaymentPlan} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const paymentPlansAdapter = createEntityAdapter<Normalized<PaymentPlan>>();

const selectors = paymentPlansAdapter.getSelectors<GlobalState>((state) => state.paymentPlans);

export const {
    selectById: paymentPlanByIdSelector,
    selectAll: allPaymentPlansSelector,
    selectEntities: paymentPlanEntitiesSelector,
} = selectors;

export default paymentPlansAdapter;