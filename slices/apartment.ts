import {createApartment, fetchAllApartment, fetchApartmentById, fetchApartmentsByEstate, fetchCurrentApartment, updateApartment} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import apartmentsAdapter from '../adapters/apartment';

export const apartmentsSlice = createSlice({
    name: 'apartments',
    initialState: apartmentsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createApartment.fulfilled, fetchAllApartment.fulfilled, fetchApartmentById.fulfilled, fetchApartmentsByEstate.fulfilled, fetchCurrentApartment.fulfilled, updateApartment.fulfilled), (state, action) => {
            apartmentsAdapter.upsertMany(state, action.payload.entities.apartments);
        });
    },
});

export const apartmentsReducer = apartmentsSlice.reducer;

export const apartmentsActions = apartmentsSlice.actions;