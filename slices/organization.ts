import {approvePaymentRequest, assignVendorProject, createApartment, createEstate, createOfflineServiceChargePaymentForResident, createOrganization, createPaymentForEstate, createPaymentRequestForEstate, createProject, createVendor, fetchAllApartment, fetchAllEstate, fetchAllProject, fetchAllVendor, fetchApartmentById, fetchApartmentsByEstate, fetchCurrentApartment, fetchCurrentOrganization, fetchCurrentVendor, fetchEstateById, fetchEstatesByFacilityManager, fetchEstatesByOrganization, fetchFacilityManagerEstatesByFacilityManager, fetchOrganizationById, fetchPaymentRequestById, fetchPaymentRequestsByEstate, fetchPaymentRequestsByMember, fetchPaymentRequestsByOrganization, fetchPaymentsByEstate, fetchPaymentsByResident, fetchProjectById, fetchProjectsByEstate, fetchProjectsByFacilityManager, fetchProjectsByResident, fetchProjectsByVendor, fetchPublicProjectsByEstate, fetchVendorById, fetchVendorsByEstate, fetchWithdrawalsByWithdrawal, makePaymentProject, rejectPaymentRequest, updateApartment, updateCommissionEstate, updateEstate, updateFacilityManagerEstate, updateOrganization, updateServicesEstate, updateStatusProject, updateVendorsEstate} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import organizationsAdapter from '../adapters/organization';

export const organizationsSlice = createSlice({
    name: 'organizations',
    initialState: organizationsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(approvePaymentRequest.fulfilled, assignVendorProject.fulfilled, createApartment.fulfilled, createEstate.fulfilled, createOfflineServiceChargePaymentForResident.fulfilled, createOrganization.fulfilled, createPaymentForEstate.fulfilled, createPaymentRequestForEstate.fulfilled, createProject.fulfilled, createVendor.fulfilled, fetchAllApartment.fulfilled, fetchAllEstate.fulfilled, fetchAllProject.fulfilled, fetchAllVendor.fulfilled, fetchApartmentById.fulfilled, fetchApartmentsByEstate.fulfilled, fetchCurrentApartment.fulfilled, fetchCurrentOrganization.fulfilled, fetchCurrentVendor.fulfilled, fetchEstateById.fulfilled, fetchEstatesByFacilityManager.fulfilled, fetchEstatesByOrganization.fulfilled, fetchFacilityManagerEstatesByFacilityManager.fulfilled, fetchOrganizationById.fulfilled, fetchPaymentRequestById.fulfilled, fetchPaymentRequestsByEstate.fulfilled, fetchPaymentRequestsByMember.fulfilled, fetchPaymentRequestsByOrganization.fulfilled, fetchPaymentsByEstate.fulfilled, fetchPaymentsByResident.fulfilled, fetchProjectById.fulfilled, fetchProjectsByEstate.fulfilled, fetchProjectsByFacilityManager.fulfilled, fetchProjectsByResident.fulfilled, fetchProjectsByVendor.fulfilled, fetchPublicProjectsByEstate.fulfilled, fetchVendorById.fulfilled, fetchVendorsByEstate.fulfilled, fetchWithdrawalsByWithdrawal.fulfilled, makePaymentProject.fulfilled, rejectPaymentRequest.fulfilled, updateApartment.fulfilled, updateCommissionEstate.fulfilled, updateEstate.fulfilled, updateFacilityManagerEstate.fulfilled, updateOrganization.fulfilled, updateServicesEstate.fulfilled, updateStatusProject.fulfilled, updateVendorsEstate.fulfilled), (state, action) => {
            organizationsAdapter.upsertMany(state, action.payload.entities.organizations);
        });
    },
});

export const organizationsReducer = organizationsSlice.reducer;

export const organizationsActions = organizationsSlice.actions;