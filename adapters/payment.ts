import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Payment} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const paymentsAdapter = createEntityAdapter<Normalized<Payment>>();

const selectors = paymentsAdapter.getSelectors<GlobalState>((state) => state.payments);

export const {
    selectById: paymentByIdSelector,
    selectAll: allPaymentsSelector,
    selectEntities: paymentEntitiesSelector,
} = selectors;

export default paymentsAdapter;