import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {RecurringPayment} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const recurringPaymentsAdapter = createEntityAdapter<Normalized<RecurringPayment>>();

const selectors = recurringPaymentsAdapter.getSelectors<GlobalState>((state) => state.recurringPayments);

export const {
    selectById: recurringPaymentByIdSelector,
    selectAll: allRecurringPaymentsSelector,
    selectEntities: recurringPaymentEntitiesSelector,
} = selectors;

export default recurringPaymentsAdapter;