import {fetchCurrenciesCurrency, fetchCurrencyForCurrentRegion, updateCurrency} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import currenciesAdapter from '../adapters/currency';

export const currenciesSlice = createSlice({
    name: 'currencies',
    initialState: currenciesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchCurrenciesCurrency.fulfilled, fetchCurrencyForCurrentRegion.fulfilled, updateCurrency.fulfilled), (state, action) => {
            currenciesAdapter.upsertMany(state, action.payload.entities.currencies);
        });
    },
});

export const currenciesReducer = currenciesSlice.reducer;

export const currenciesActions = currenciesSlice.actions;