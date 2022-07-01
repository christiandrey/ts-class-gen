import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {AdminWithdrawal} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const adminWithdrawalsAdapter = createEntityAdapter<Normalized<AdminWithdrawal>>();

const selectors = adminWithdrawalsAdapter.getSelectors<GlobalState>((state) => state.adminWithdrawals);

export const {
    selectById: adminWithdrawalByIdSelector,
    selectAll: allAdminWithdrawalsSelector,
    selectEntities: adminWithdrawalEntitiesSelector,
} = selectors;

export default adminWithdrawalsAdapter;