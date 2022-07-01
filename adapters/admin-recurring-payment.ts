import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {AdminRecurringPayment} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const adminRecurringPaymentsAdapter = createEntityAdapter<Normalized<AdminRecurringPayment>>();

const selectors = adminRecurringPaymentsAdapter.getSelectors<GlobalState>((state) => state.adminRecurringPayments);

export const {
    selectById: adminRecurringPaymentByIdSelector,
    selectAll: allAdminRecurringPaymentsSelector,
    selectEntities: adminRecurringPaymentEntitiesSelector,
} = selectors;

export default adminRecurringPaymentsAdapter;