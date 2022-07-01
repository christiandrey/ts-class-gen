import {assignVendorProject, createApartment, createProject, createResident, fetchAllApartment, fetchAllProject, fetchAllResident, fetchApartmentById, fetchApartmentsByEstate, fetchCurrentApartment, fetchCurrentResident, fetchProjectById, fetchProjectsByEstate, fetchProjectsByFacilityManager, fetchProjectsByResident, fetchProjectsByVendor, fetchPublicProjectsByEstate, fetchResidentById, fetchResidentsByEstate, makePaymentProject, updateApartment, updateResident, updateStatusProject} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import serviceChargeLogsAdapter from '../adapters/service-charge-log';

export const serviceChargeLogsSlice = createSlice({
    name: 'serviceChargeLogs',
    initialState: serviceChargeLogsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(assignVendorProject.fulfilled, createApartment.fulfilled, createProject.fulfilled, createResident.fulfilled, fetchAllApartment.fulfilled, fetchAllProject.fulfilled, fetchAllResident.fulfilled, fetchApartmentById.fulfilled, fetchApartmentsByEstate.fulfilled, fetchCurrentApartment.fulfilled, fetchCurrentResident.fulfilled, fetchProjectById.fulfilled, fetchProjectsByEstate.fulfilled, fetchProjectsByFacilityManager.fulfilled, fetchProjectsByResident.fulfilled, fetchProjectsByVendor.fulfilled, fetchPublicProjectsByEstate.fulfilled, fetchResidentById.fulfilled, fetchResidentsByEstate.fulfilled, makePaymentProject.fulfilled, updateApartment.fulfilled, updateResident.fulfilled, updateStatusProject.fulfilled), (state, action) => {
            serviceChargeLogsAdapter.upsertMany(state, action.payload.entities.serviceChargeLogs);
        });
    },
});

export const serviceChargeLogsReducer = serviceChargeLogsSlice.reducer;

export const serviceChargeLogsActions = serviceChargeLogsSlice.actions;