import {fetchVendorInvitationsByFacilityManager} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import vendorInvitationsAdapter from '../adapters/vendor-invitation';

export const vendorInvitationsSlice = createSlice({
    name: 'vendorInvitations',
    initialState: vendorInvitationsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchVendorInvitationsByFacilityManager.fulfilled), (state, action) => {
            vendorInvitationsAdapter.upsertMany(state, action.payload.entities.vendorInvitations);
        });
    },
});

export const vendorInvitationsReducer = vendorInvitationsSlice.reducer;

export const vendorInvitationsActions = vendorInvitationsSlice.actions;