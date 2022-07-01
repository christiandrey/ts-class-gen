import {activateCountryLocation, deactivateCountryLocation, fetchActiveCountriesLocation, fetchCountriesLocation, fetchCountryLocation, updateCountryLocation} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import countriesAdapter from '../adapters/country';

export const countriesSlice = createSlice({
    name: 'countries',
    initialState: countriesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(activateCountryLocation.fulfilled, deactivateCountryLocation.fulfilled, fetchActiveCountriesLocation.fulfilled, fetchCountriesLocation.fulfilled, fetchCountryLocation.fulfilled, updateCountryLocation.fulfilled), (state, action) => {
            countriesAdapter.upsertMany(state, action.payload.entities.countries);
        });
    },
});

export const countriesReducer = countriesSlice.reducer;

export const countriesActions = countriesSlice.actions;