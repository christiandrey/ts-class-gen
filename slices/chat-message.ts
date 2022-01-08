import {createChat, createMessageForChat, fetchChatById, fetchChatMessageById, fetchChatMessagesByChat, fetchChats} from '../thunks';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import chatMessagesAdapter from '../adapters/chat-message';

export const chatMessagesSlice = createSlice({
    name: 'chatMessages',
    initialState: chatMessagesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(createChat.fulfilled, createMessageForChat.fulfilled, fetchChatById.fulfilled, fetchChatMessageById.fulfilled, fetchChatMessagesByChat.fulfilled, fetchChats.fulfilled), (state, action) => {
            chatMessagesAdapter.upsertMany(state, action.payload.entities.chatMessages);
        });
    },
});

export const chatMessagesReducer = chatMessagesSlice.reducer;

export const chatMessagesActions = chatMessagesSlice.actions;