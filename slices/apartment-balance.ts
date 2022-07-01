import {fetchBalancesByApartment} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import apartmentBalancesAdapter from '../adapters/apartment-balance';

export const apartmentBalancesSlice = createSlice({
    name: 'apartmentBalances',
    initialState: apartmentBalancesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchBalancesByApartment.fulfilled), (state, action) => {
            apartmentBalancesAdapter.upsertMany(state, action.payload.entities.apartmentBalances);
        });
    },
});

export const apartmentBalancesReducer = apartmentBalancesSlice.reducer;

export const apartmentBalancesActions = apartmentBalancesSlice.actions;