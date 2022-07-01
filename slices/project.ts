import {assignVendorProject, createProject, fetchAllProject, fetchProjectById, fetchProjectsByEstate, fetchProjectsByFacilityManager, fetchProjectsByResident, fetchProjectsByVendor, fetchPublicProjectsByEstate, makePaymentProject, updateStatusProject} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import projectsAdapter from '../adapters/project';

export const projectsSlice = createSlice({
    name: 'projects',
    initialState: projectsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(assignVendorProject.fulfilled, createProject.fulfilled, fetchAllProject.fulfilled, fetchProjectById.fulfilled, fetchProjectsByEstate.fulfilled, fetchProjectsByFacilityManager.fulfilled, fetchProjectsByResident.fulfilled, fetchProjectsByVendor.fulfilled, fetchPublicProjectsByEstate.fulfilled, makePaymentProject.fulfilled, updateStatusProject.fulfilled), (state, action) => {
            projectsAdapter.upsertMany(state, action.payload.entities.projects);
        });
    },
});

export const projectsReducer = projectsSlice.reducer;

export const projectsActions = projectsSlice.actions;