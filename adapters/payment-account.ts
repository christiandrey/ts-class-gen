import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {PaymentAccount} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const paymentAccountsAdapter = createEntityAdapter<Normalized<PaymentAccount>>();

const selectors = paymentAccountsAdapter.getSelectors<GlobalState>((state) => state.paymentAccounts);

export const {
    selectById: paymentAccountByIdSelector,
    selectAll: allPaymentAccountsSelector,
    selectEntities: paymentAccountEntitiesSelector,
} = selectors;

export default paymentAccountsAdapter;