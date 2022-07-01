import {createMessageForProject, fetchMessageProjectById, fetchMessagesByProject} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import projectMessagesAdapter from '../adapters/project-message';

export const projectMessagesSlice = createSlice({
    name: 'projectMessages',
    initialState: projectMessagesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createMessageForProject.fulfilled, fetchMessageProjectById.fulfilled, fetchMessagesByProject.fulfilled), (state, action) => {
            projectMessagesAdapter.upsertMany(state, action.payload.entities.projectMessages);
        });
    },
});

export const projectMessagesReducer = projectMessagesSlice.reducer;

export const projectMessagesActions = projectMessagesSlice.actions;