import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {PaymentRequest} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const paymentRequestsAdapter = createEntityAdapter<Normalized<PaymentRequest>>();

const selectors = paymentRequestsAdapter.getSelectors<GlobalState>((state) => state.paymentRequests);

export const {
    selectById: paymentRequestByIdSelector,
    selectAll: allPaymentRequestsSelector,
    selectEntities: paymentRequestEntitiesSelector,
} = selectors;

export default paymentRequestsAdapter;