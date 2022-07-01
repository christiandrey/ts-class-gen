import {createApartment, fetchAllApartment, fetchApartmentById, fetchApartmentsByEstate, fetchCurrentApartment, updateApartment} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import ownersAdapter from '../adapters/owner';

export const ownersSlice = createSlice({
    name: 'owners',
    initialState: ownersAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createApartment.fulfilled, fetchAllApartment.fulfilled, fetchApartmentById.fulfilled, fetchApartmentsByEstate.fulfilled, fetchCurrentApartment.fulfilled, updateApartment.fulfilled), (state, action) => {
            ownersAdapter.upsertMany(state, action.payload.entities.owners);
        });
    },
});

export const ownersReducer = ownersSlice.reducer;

export const ownersActions = ownersSlice.actions;