import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {BankAccount} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const bankAccountsAdapter = createEntityAdapter<Normalized<BankAccount>>();

const selectors = bankAccountsAdapter.getSelectors<GlobalState>((state) => state.bankAccounts);

export const {
    selectById: bankAccountByIdSelector,
    selectAll: allBankAccountsSelector,
    selectEntities: bankAccountEntitiesSelector,
} = selectors;

export default bankAccountsAdapter;