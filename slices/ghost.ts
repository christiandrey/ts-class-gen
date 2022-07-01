import {fetchAllGhost, fetchCurrentGhost, fetchGhostById} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import ghostsAdapter from '../adapters/ghost';

export const ghostsSlice = createSlice({
    name: 'ghosts',
    initialState: ghostsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchAllGhost.fulfilled, fetchCurrentGhost.fulfilled, fetchGhostById.fulfilled), (state, action) => {
            ghostsAdapter.upsertMany(state, action.payload.entities.ghosts);
        });
    },
});

export const ghostsReducer = ghostsSlice.reducer;

export const ghostsActions = ghostsSlice.actions;