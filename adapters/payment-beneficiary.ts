import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {PaymentBeneficiary} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const paymentBeneficiariesAdapter = createEntityAdapter<Normalized<PaymentBeneficiary>>();

const selectors = paymentBeneficiariesAdapter.getSelectors<GlobalState>((state) => state.paymentBeneficiaries);

export const {
    selectById: paymentBeneficiaryByIdSelector,
    selectAll: allPaymentBeneficiariesSelector,
    selectEntities: paymentBeneficiaryEntitiesSelector,
} = selectors;

export default paymentBeneficiariesAdapter;