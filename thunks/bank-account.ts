import {BankAccountEntities, bankAccountSchema} from '../../../schemas/normalization/bank-account';
import {BankAccountCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {BankAccount} from '../../../entities/bank-account';
import {api} from '../../../api';

export const fetchBankAccounts = createTypedAsyncThunk(
    'bankAccounts/fetchBankAccounts',
    async () => {
        const response = await api.bankAccounts().readBankAccounts();
        const responseData = response.data.data.map((o) => new BankAccount(o));
        const normalized = safeNormalize<BankAccount, BankAccountEntities, Array<string>>(responseData, [bankAccountSchema]);
        return normalized;
    },
);

export const createBankAccount = createTypedAsyncThunk(
    'bankAccounts/createBankAccount',
    async (dto: BankAccountCreationOptions) => {
        const response = await api.bankAccounts().createBankAccount(dto);
        const responseData = new BankAccount(response.data.data);
        const normalized = safeNormalize<BankAccount, BankAccountEntities, string>(responseData, bankAccountSchema);
        return normalized;
    },
);

export const deleteBankAccount = createTypedAsyncThunk(
    'bankAccounts/deleteBankAccount',
    async (bankAccountId: string) => {
        const response = await api.bankAccounts().deleteBankAccount(bankAccountId);
        return response;
    },
);