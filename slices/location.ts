import {approvePaymentRequest, assignVendorProject, createApartment, createEstate, createOfflineServiceChargePaymentForResident, createPaymentForEstate, createPaymentRequestForEstate, createProject, createVendor, fetchAllApartment, fetchAllEstate, fetchAllProject, fetchAllVendor, fetchApartmentById, fetchApartmentsByEstate, fetchCurrentApartment, fetchCurrentVendor, fetchEstateById, fetchEstatesByFacilityManager, fetchEstatesByOrganization, fetchFacilityManagerEstatesByFacilityManager, fetchPaymentRequestById, fetchPaymentRequestsByEstate, fetchPaymentRequestsByMember, fetchPaymentRequestsByOrganization, fetchPaymentsByEstate, fetchPaymentsByResident, fetchProjectById, fetchProjectsByEstate, fetchProjectsByFacilityManager, fetchProjectsByResident, fetchProjectsByVendor, fetchPublicProjectsByEstate, fetchVendorById, fetchVendorsByEstate, fetchWithdrawalsByWithdrawal, geocodeAddressByLocation, geocodeAddressLocationByPlaceId, geolocateLocation, makePaymentProject, rejectPaymentRequest, updateApartment, updateCommissionEstate, updateEstate, updateFacilityManagerEstate, updateServicesEstate, updateStatusProject, updateVendorsEstate} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import locationsAdapter from '../adapters/location';

export const locationsSlice = createSlice({
    name: 'locations',
    initialState: locationsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(approvePaymentRequest.fulfilled, assignVendorProject.fulfilled, createApartment.fulfilled, createEstate.fulfilled, createOfflineServiceChargePaymentForResident.fulfilled, createPaymentForEstate.fulfilled, createPaymentRequestForEstate.fulfilled, createProject.fulfilled, createVendor.fulfilled, fetchAllApartment.fulfilled, fetchAllEstate.fulfilled, fetchAllProject.fulfilled, fetchAllVendor.fulfilled, fetchApartmentById.fulfilled, fetchApartmentsByEstate.fulfilled, fetchCurrentApartment.fulfilled, fetchCurrentVendor.fulfilled, fetchEstateById.fulfilled, fetchEstatesByFacilityManager.fulfilled, fetchEstatesByOrganization.fulfilled, fetchFacilityManagerEstatesByFacilityManager.fulfilled, fetchPaymentRequestById.fulfilled, fetchPaymentRequestsByEstate.fulfilled, fetchPaymentRequestsByMember.fulfilled, fetchPaymentRequestsByOrganization.fulfilled, fetchPaymentsByEstate.fulfilled, fetchPaymentsByResident.fulfilled, fetchProjectById.fulfilled, fetchProjectsByEstate.fulfilled, fetchProjectsByFacilityManager.fulfilled, fetchProjectsByResident.fulfilled, fetchProjectsByVendor.fulfilled, fetchPublicProjectsByEstate.fulfilled, fetchVendorById.fulfilled, fetchVendorsByEstate.fulfilled, fetchWithdrawalsByWithdrawal.fulfilled, geocodeAddressByLocation.fulfilled, geocodeAddressLocationByPlaceId.fulfilled, geolocateLocation.fulfilled, makePaymentProject.fulfilled, rejectPaymentRequest.fulfilled, updateApartment.fulfilled, updateCommissionEstate.fulfilled, updateEstate.fulfilled, updateFacilityManagerEstate.fulfilled, updateServicesEstate.fulfilled, updateStatusProject.fulfilled, updateVendorsEstate.fulfilled), (state, action) => {
            locationsAdapter.upsertMany(state, action.payload.entities.locations);
        });
    },
});

export const locationsReducer = locationsSlice.reducer;

export const locationsActions = locationsSlice.actions;