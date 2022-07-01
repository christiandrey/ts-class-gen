import {approvePaymentRequest, assignVendorProject, createApartment, createApartmentType, createEstate, createOfflineServiceChargePaymentForResident, createPaymentForEstate, createPaymentRequestForEstate, createProject, createVendor, fetchAllApartment, fetchAllApartmentType, fetchAllEstate, fetchAllProject, fetchAllVendor, fetchApartmentById, fetchApartmentTypeById, fetchApartmentsByEstate, fetchCurrentApartment, fetchCurrentVendor, fetchEstateById, fetchEstatesByFacilityManager, fetchEstatesByOrganization, fetchFacilityManagerEstatesByFacilityManager, fetchPaymentRequestById, fetchPaymentRequestsByEstate, fetchPaymentRequestsByMember, fetchPaymentRequestsByOrganization, fetchPaymentsByEstate, fetchPaymentsByResident, fetchProjectById, fetchProjectsByEstate, fetchProjectsByFacilityManager, fetchProjectsByResident, fetchProjectsByVendor, fetchPublicProjectsByEstate, fetchVendorById, fetchVendorsByEstate, fetchWithdrawalsByWithdrawal, makePaymentProject, rejectPaymentRequest, updateApartment, updateApartmentType, updateCommissionEstate, updateEstate, updateFacilityManagerEstate, updateServiceChargeApartmentType, updateServicesApartmentType, updateServicesEstate, updateStatusProject, updateVendorsEstate} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import apartmentTypesAdapter from '../adapters/apartment-type';

export const apartmentTypesSlice = createSlice({
    name: 'apartmentTypes',
    initialState: apartmentTypesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(approvePaymentRequest.fulfilled, assignVendorProject.fulfilled, createApartment.fulfilled, createApartmentType.fulfilled, createEstate.fulfilled, createOfflineServiceChargePaymentForResident.fulfilled, createPaymentForEstate.fulfilled, createPaymentRequestForEstate.fulfilled, createProject.fulfilled, createVendor.fulfilled, fetchAllApartment.fulfilled, fetchAllApartmentType.fulfilled, fetchAllEstate.fulfilled, fetchAllProject.fulfilled, fetchAllVendor.fulfilled, fetchApartmentById.fulfilled, fetchApartmentTypeById.fulfilled, fetchApartmentsByEstate.fulfilled, fetchCurrentApartment.fulfilled, fetchCurrentVendor.fulfilled, fetchEstateById.fulfilled, fetchEstatesByFacilityManager.fulfilled, fetchEstatesByOrganization.fulfilled, fetchFacilityManagerEstatesByFacilityManager.fulfilled, fetchPaymentRequestById.fulfilled, fetchPaymentRequestsByEstate.fulfilled, fetchPaymentRequestsByMember.fulfilled, fetchPaymentRequestsByOrganization.fulfilled, fetchPaymentsByEstate.fulfilled, fetchPaymentsByResident.fulfilled, fetchProjectById.fulfilled, fetchProjectsByEstate.fulfilled, fetchProjectsByFacilityManager.fulfilled, fetchProjectsByResident.fulfilled, fetchProjectsByVendor.fulfilled, fetchPublicProjectsByEstate.fulfilled, fetchVendorById.fulfilled, fetchVendorsByEstate.fulfilled, fetchWithdrawalsByWithdrawal.fulfilled, makePaymentProject.fulfilled, rejectPaymentRequest.fulfilled, updateApartment.fulfilled, updateApartmentType.fulfilled, updateCommissionEstate.fulfilled, updateEstate.fulfilled, updateFacilityManagerEstate.fulfilled, updateServiceChargeApartmentType.fulfilled, updateServicesApartmentType.fulfilled, updateServicesEstate.fulfilled, updateStatusProject.fulfilled, updateVendorsEstate.fulfilled), (state, action) => {
            apartmentTypesAdapter.upsertMany(state, action.payload.entities.apartmentTypes);
        });
    },
});

export const apartmentTypesReducer = apartmentTypesSlice.reducer;

export const apartmentTypesActions = apartmentTypesSlice.actions;