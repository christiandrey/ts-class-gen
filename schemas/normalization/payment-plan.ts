import {PaymentPlan} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const paymentPlanSchema = new schema.Entity('paymentPlans');

export type PaymentPlanEntities = SchemaEntities<{
    paymentPlan: PaymentPlan;
}>