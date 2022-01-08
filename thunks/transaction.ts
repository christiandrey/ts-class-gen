import {TransactionEntities, transactionSchema} from '../../../schemas/normalization/transaction';
import {PaginatedQueryParams} from '../../../typings';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Transaction} from '../../../entities/transaction';
import {api} from '../../../api';

export const fetchTransactionsByHospital = createTypedAsyncThunk(
    'transactions/fetchTransactionsByHospital',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, query, page, pageSize} = params;
        const response = await api.hospitals().readTransactions(id, query, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new Transaction(o));
        const normalized = safeNormalize<Transaction, TransactionEntities, Array<string>>(responseData, [transactionSchema]);
        return {...normalized, meta};
    },
);

export const fetchTransactionsForCurrentPatient = createTypedAsyncThunk(
    'transactions/fetchTransactionsForCurrentPatient',
    async (params: PaginatedQueryParams) => {
        const {page, pageSize, query} = params;
        const response = await api.patients().readTransactionsForCurrent(page, pageSize, query);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new Transaction(o));
        const normalized = safeNormalize<Transaction, TransactionEntities, Array<string>>(responseData, [transactionSchema]);
        return {...normalized, meta};
    },
);

export const fetchTransactionsForPatient = createTypedAsyncThunk(
    'transactions/fetchTransactionsForPatient',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, page, pageSize, query} = params;
        const response = await api.patients().readTransactionsForPatient(id, page, pageSize, query);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new Transaction(o));
        const normalized = safeNormalize<Transaction, TransactionEntities, Array<string>>(responseData, [transactionSchema]);
        return {...normalized, meta};
    },
);