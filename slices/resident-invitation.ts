import {fetchResidentInvitationsByFacilityManager} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import residentInvitationsAdapter from '../adapters/resident-invitation';

export const residentInvitationsSlice = createSlice({
    name: 'residentInvitations',
    initialState: residentInvitationsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchResidentInvitationsByFacilityManager.fulfilled), (state, action) => {
            residentInvitationsAdapter.upsertMany(state, action.payload.entities.residentInvitations);
        });
    },
});

export const residentInvitationsReducer = residentInvitationsSlice.reducer;

export const residentInvitationsActions = residentInvitationsSlice.actions;