import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {ChatMessage} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const chatMessagesAdapter = createEntityAdapter<Normalized<ChatMessage>>();

const selectors = chatMessagesAdapter.getSelectors<GlobalState>((state) => state.chatMessages);

export const {
    selectById: chatMessageByIdSelector,
    selectAll: allChatMessagesSelector,
    selectEntities: chatMessageEntitiesSelector,
} = selectors;

export default chatMessagesAdapter;