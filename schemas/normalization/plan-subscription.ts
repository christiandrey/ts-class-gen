import {PlanSubscription} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const planSubscriptionSchema = new schema.Entity('planSubscriptions');

export type PlanSubscriptionEntities = SchemaEntities<{
    planSubscription: PlanSubscription;
}>