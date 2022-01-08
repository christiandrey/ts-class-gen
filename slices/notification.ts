import {fetchNotifications} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import notificationsAdapter from '../adapters/notification';

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: notificationsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(fetchNotifications.fulfilled), (state, action) => {
            notificationsAdapter.upsertMany(state, action.payload.entities.notifications);
        });
    },
});

export const notificationsReducer = notificationsSlice.reducer;

export const notificationsActions = notificationsSlice.actions;