import {assignVendorProject, createProject, createVendor, fetchAllProject, fetchAllVendor, fetchCurrentVendor, fetchProjectById, fetchProjectsByEstate, fetchProjectsByFacilityManager, fetchProjectsByResident, fetchProjectsByVendor, fetchPublicProjectsByEstate, fetchVendorById, fetchVendorsByEstate, makePaymentProject, updateStatusProject} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import vendorsAdapter from '../adapters/vendor';

export const vendorsSlice = createSlice({
    name: 'vendors',
    initialState: vendorsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(assignVendorProject.fulfilled, createProject.fulfilled, createVendor.fulfilled, fetchAllProject.fulfilled, fetchAllVendor.fulfilled, fetchCurrentVendor.fulfilled, fetchProjectById.fulfilled, fetchProjectsByEstate.fulfilled, fetchProjectsByFacilityManager.fulfilled, fetchProjectsByResident.fulfilled, fetchProjectsByVendor.fulfilled, fetchPublicProjectsByEstate.fulfilled, fetchVendorById.fulfilled, fetchVendorsByEstate.fulfilled, makePaymentProject.fulfilled, updateStatusProject.fulfilled), (state, action) => {
            vendorsAdapter.upsertMany(state, action.payload.entities.vendors);
        });
    },
});

export const vendorsReducer = vendorsSlice.reducer;

export const vendorsActions = vendorsSlice.actions;