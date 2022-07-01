import {assignVendorProject, createProject, fetchAllProject, fetchProjectById, fetchProjectsByEstate, fetchProjectsByFacilityManager, fetchProjectsByResident, fetchProjectsByVendor, fetchPublicProjectsByEstate, makePaymentProject, updateStatusProject} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import projectResourcesAdapter from '../adapters/project-resource';

export const projectResourcesSlice = createSlice({
    name: 'projectResources',
    initialState: projectResourcesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(assignVendorProject.fulfilled, createProject.fulfilled, fetchAllProject.fulfilled, fetchProjectById.fulfilled, fetchProjectsByEstate.fulfilled, fetchProjectsByFacilityManager.fulfilled, fetchProjectsByResident.fulfilled, fetchProjectsByVendor.fulfilled, fetchPublicProjectsByEstate.fulfilled, makePaymentProject.fulfilled, updateStatusProject.fulfilled), (state, action) => {
            projectResourcesAdapter.upsertMany(state, action.payload.entities.projectResources);
        });
    },
});

export const projectResourcesReducer = projectResourcesSlice.reducer;

export const projectResourcesActions = projectResourcesSlice.actions;