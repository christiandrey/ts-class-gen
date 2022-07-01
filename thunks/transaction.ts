import {TransactionEntities, transactionSchema} from '../../../schemas/normalization/transaction';
import {PaginatedQueryParams} from '../../../typings';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Transaction} from '../../../entities/transaction';
import {api} from '../../../api';

export const withdrawToBankAccountForBankAccount = createTypedAsyncThunk(
    'transactions/withdrawToBankAccountForBankAccount',
    async (params: {bankAccountId: string; localAmount: number}) => {
        const {bankAccountId, localAmount} = params;
        const response = await api.bankAccounts().withdrawToBankAccount(bankAccountId, localAmount);
        const responseData = new Transaction(response.data.data);
        const normalized = safeNormalize<Transaction, TransactionEntities, string>(responseData, transactionSchema);
        return normalized;
    },
);

export const fundWalletFromCardForCard = createTypedAsyncThunk(
    'transactions/fundWalletFromCardForCard',
    async (params: {cardId: string; localAmount: number}) => {
        const {cardId, localAmount} = params;
        const response = await api.cards().fundWalletFromCard(cardId, localAmount);
        const responseData = new Transaction(response.data.data);
        const normalized = safeNormalize<Transaction, TransactionEntities, string>(responseData, transactionSchema);
        return normalized;
    },
);

export const withdrawToCardForCard = createTypedAsyncThunk(
    'transactions/withdrawToCardForCard',
    async (params: {cardId: string; localAmount: number}) => {
        const {cardId, localAmount} = params;
        const response = await api.cards().withdrawToCard(cardId, localAmount);
        const responseData = new Transaction(response.data.data);
        const normalized = safeNormalize<Transaction, TransactionEntities, string>(responseData, transactionSchema);
        return normalized;
    },
);

export const fundOrganizationWalletForOrganization = createTypedAsyncThunk(
    'transactions/fundOrganizationWalletForOrganization',
    async (params: {id: string; localAmount: number}) => {
        const {id, localAmount} = params;
        const response = await api.organizations().fundOrganizationWallet(id, localAmount);
        const responseData = new Transaction(response.data.data);
        const normalized = safeNormalize<Transaction, TransactionEntities, string>(responseData, transactionSchema);
        return normalized;
    },
);

export const withdrawFromOrganizationWalletForOrganization = createTypedAsyncThunk(
    'transactions/withdrawFromOrganizationWalletForOrganization',
    async (params: {id: string; localAmount: number}) => {
        const {id, localAmount} = params;
        const response = await api.organizations().withdrawFromOrganizationWallet(id, localAmount);
        const responseData = new Transaction(response.data.data);
        const normalized = safeNormalize<Transaction, TransactionEntities, string>(responseData, transactionSchema);
        return normalized;
    },
);

export const fetchTransactionsByUser = createTypedAsyncThunk(
    'transactions/fetchTransactionsByUser',
    async (params: PaginatedQueryParams<{startDate?: string; endDate?: string}>) => {
        const {page, pageSize, query, startDate, endDate} = params;
        const response = await api.transactions().readTransactionsByUser(page, pageSize, query, startDate, endDate);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new Transaction(o));
        const normalized = safeNormalize<Transaction, TransactionEntities, Array<string>>(responseData, [transactionSchema]);
        return {...normalized, meta};
    },
);

export const fetchTransactions = createTypedAsyncThunk(
    'transactions/fetchTransactions',
    async (params: PaginatedQueryParams<{userId?: string}>) => {
        const {query, page, pageSize, userId} = params;
        const response = await api.transactions().readTransactions(query, page, pageSize, userId);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new Transaction(o));
        const normalized = safeNormalize<Transaction, TransactionEntities, Array<string>>(responseData, [transactionSchema]);
        return {...normalized, meta};
    },
);