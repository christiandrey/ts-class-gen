import {CurrencyEntities, currencySchema} from '../../../schemas/normalization/currency';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Currency} from '../../../entities/currency';
import {UpdatedCurrency} from '../../../entities/updated-currency';
import {api} from '../../../api';

export const fetchCurrenciesCurrency = createTypedAsyncThunk(
    'currencies/fetchCurrenciesCurrency',
    async () => {
        const response = await api.currencies().readCurrencies();
        const responseData = response.data.data.map((o) => new Currency(o));
        const normalized = safeNormalize<Currency, CurrencyEntities, Array<string>>(responseData, [currencySchema]);
        return normalized;
    },
);

export const fetchCurrencyForCurrentRegion = createTypedAsyncThunk(
    'currencies/fetchCurrencyForCurrentRegion',
    async () => {
        const response = await api.currencies().readCurrencyForCurrentRegion();
        const responseData = new Currency(response.data.data);
        const normalized = safeNormalize<Currency, CurrencyEntities, string>(responseData, currencySchema);
        return normalized;
    },
);

export const updateCurrency = createTypedAsyncThunk(
    'currencies/updateCurrency',
    async (params: {currencyId: string; dto: UpdatedCurrency}) => {
        const {currencyId, dto} = params;
        const response = await api.currencies().updateCurrency(currencyId, dto);
        const responseData = new Currency(response.data.data);
        const normalized = safeNormalize<Currency, CurrencyEntities, string>(responseData, currencySchema);
        return normalized;
    },
);