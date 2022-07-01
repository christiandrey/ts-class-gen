import {WalletEntities, walletSchema} from '../../../schemas/normalization/wallet';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Wallet} from '../../../entities/wallet';
import {api} from '../../../api';

export const fetchWallet = createTypedAsyncThunk(
    'wallets/fetchWallet',
    async () => {
        const response = await api.wallets().readWallet();
        const responseData = new Wallet(response.data.data);
        const normalized = safeNormalize<Wallet, WalletEntities, string>(responseData, walletSchema);
        return normalized;
    },
);

export const fetchUserWallet = createTypedAsyncThunk(
    'wallets/fetchUserWallet',
    async (userId: string) => {
        const response = await api.wallets().readUserWallet(userId);
        const responseData = new Wallet(response.data.data);
        const normalized = safeNormalize<Wallet, WalletEntities, string>(responseData, walletSchema);
        return normalized;
    },
);

export const creditUserWallet = createTypedAsyncThunk(
    'wallets/creditUserWallet',
    async (params: {userId: string; amount: number}) => {
        const {userId, amount} = params;
        const response = await api.wallets().creditUserWallet(userId, amount);
        const responseData = new Wallet(response.data.data);
        const normalized = safeNormalize<Wallet, WalletEntities, string>(responseData, walletSchema);
        return normalized;
    },
);

export const debitUserWallet = createTypedAsyncThunk(
    'wallets/debitUserWallet',
    async (params: {userId: string; amount: number}) => {
        const {userId, amount} = params;
        const response = await api.wallets().debitUserWallet(userId, amount);
        const responseData = new Wallet(response.data.data);
        const normalized = safeNormalize<Wallet, WalletEntities, string>(responseData, walletSchema);
        return normalized;
    },
);

export const lockUserWallet = createTypedAsyncThunk(
    'wallets/lockUserWallet',
    async (params: {userId: string; amount: number}) => {
        const {userId, amount} = params;
        const response = await api.wallets().lockUserWallet(userId, amount);
        const responseData = new Wallet(response.data.data);
        const normalized = safeNormalize<Wallet, WalletEntities, string>(responseData, walletSchema);
        return normalized;
    },
);

export const unlockUserWallet = createTypedAsyncThunk(
    'wallets/unlockUserWallet',
    async (params: {userId: string; amount: number}) => {
        const {userId, amount} = params;
        const response = await api.wallets().unlockUserWallet(userId, amount);
        const responseData = new Wallet(response.data.data);
        const normalized = safeNormalize<Wallet, WalletEntities, string>(responseData, walletSchema);
        return normalized;
    },
);