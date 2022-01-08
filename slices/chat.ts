import {createChat, fetchChatById, fetchChats} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import chatsAdapter from '../adapters/chat';

export const chatsSlice = createSlice({
    name: 'chats',
    initialState: chatsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createChat.fulfilled, fetchChatById.fulfilled, fetchChats.fulfilled), (state, action) => {
            chatsAdapter.upsertMany(state, action.payload.entities.chats);
        });
    },
});

export const chatsReducer = chatsSlice.reducer;

export const chatsActions = chatsSlice.actions;