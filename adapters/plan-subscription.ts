import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {PlanSubscription} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const planSubscriptionsAdapter = createEntityAdapter<Normalized<PlanSubscription>>();

const selectors = planSubscriptionsAdapter.getSelectors<GlobalState>((state) => state.planSubscriptions);

export const {
    selectById: planSubscriptionByIdSelector,
    selectAll: allPlanSubscriptionsSelector,
    selectEntities: planSubscriptionEntitiesSelector,
} = selectors;

export default planSubscriptionsAdapter;