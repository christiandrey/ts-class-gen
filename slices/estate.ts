import {approvePaymentRequest, assignVendorProject, createApartment, createEstate, createOfflineServiceChargePaymentForResident, createPaymentForEstate, createPaymentRequestForEstate, createProject, createVendor, fetchAllApartment, fetchAllEstate, fetchAllProject, fetchAllVendor, fetchApartmentById, fetchApartmentsByEstate, fetchCurrentApartment, fetchCurrentVendor, fetchEstateById, fetchEstatesByFacilityManager, fetchEstatesByOrganization, fetchFacilityManagerEstatesByFacilityManager, fetchPaymentRequestById, fetchPaymentRequestsByEstate, fetchPaymentRequestsByMember, fetchPaymentRequestsByOrganization, fetchPaymentsByEstate, fetchPaymentsByResident, fetchProjectById, fetchProjectsByEstate, fetchProjectsByFacilityManager, fetchProjectsByResident, fetchProjectsByVendor, fetchPublicProjectsByEstate, fetchVendorById, fetchVendorsByEstate, fetchWithdrawalsByWithdrawal, makePaymentProject, rejectPaymentRequest, updateApartment, updateCommissionEstate, updateEstate, updateFacilityManagerEstate, updateServicesEstate, updateStatusProject, updateVendorsEstate} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import estatesAdapter from '../adapters/estate';

export const estatesSlice = createSlice({
    name: 'estates',
    initialState: estatesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(approvePaymentRequest.fulfilled, assignVendorProject.fulfilled, createApartment.fulfilled, createEstate.fulfilled, createOfflineServiceChargePaymentForResident.fulfilled, createPaymentForEstate.fulfilled, createPaymentRequestForEstate.fulfilled, createProject.fulfilled, createVendor.fulfilled, fetchAllApartment.fulfilled, fetchAllEstate.fulfilled, fetchAllProject.fulfilled, fetchAllVendor.fulfilled, fetchApartmentById.fulfilled, fetchApartmentsByEstate.fulfilled, fetchCurrentApartment.fulfilled, fetchCurrentVendor.fulfilled, fetchEstateById.fulfilled, fetchEstatesByFacilityManager.fulfilled, fetchEstatesByOrganization.fulfilled, fetchFacilityManagerEstatesByFacilityManager.fulfilled, fetchPaymentRequestById.fulfilled, fetchPaymentRequestsByEstate.fulfilled, fetchPaymentRequestsByMember.fulfilled, fetchPaymentRequestsByOrganization.fulfilled, fetchPaymentsByEstate.fulfilled, fetchPaymentsByResident.fulfilled, fetchProjectById.fulfilled, fetchProjectsByEstate.fulfilled, fetchProjectsByFacilityManager.fulfilled, fetchProjectsByResident.fulfilled, fetchProjectsByVendor.fulfilled, fetchPublicProjectsByEstate.fulfilled, fetchVendorById.fulfilled, fetchVendorsByEstate.fulfilled, fetchWithdrawalsByWithdrawal.fulfilled, makePaymentProject.fulfilled, rejectPaymentRequest.fulfilled, updateApartment.fulfilled, updateCommissionEstate.fulfilled, updateEstate.fulfilled, updateFacilityManagerEstate.fulfilled, updateServicesEstate.fulfilled, updateStatusProject.fulfilled, updateVendorsEstate.fulfilled), (state, action) => {
            estatesAdapter.upsertMany(state, action.payload.entities.estates);
        });
    },
});

export const estatesReducer = estatesSlice.reducer;

export const estatesActions = estatesSlice.actions;