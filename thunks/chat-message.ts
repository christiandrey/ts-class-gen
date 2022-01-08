import {ChatMessageEntities, chatMessageSchema} from '../../../schemas/normalization/chat-message';
import {PaginatedQueryParams} from '../../../typings';
import {ChatMessageCreationOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {ChatMessage} from '../../../entities/chat-message';
import {api} from '../../../api';

export const createMessageForChat = createTypedAsyncThunk(
    'chatMessages/createMessageForChat',
    async (params: {id: string; options: ChatMessageCreationOptions}) => {
        const {id, options} = params;
        const response = await api.chats().createMessage(id, options);
        const responseData = new ChatMessage(response.data.data);
        const normalized = safeNormalize<ChatMessage, ChatMessageEntities, string>(responseData, chatMessageSchema);
        return normalized;
    },
);

export const fetchChatMessagesByChat = createTypedAsyncThunk(
    'chatMessages/fetchChatMessagesByChat',
    async (params: PaginatedQueryParams<{id: string}>) => {
        const {id, page, pageSize} = params;
        const response = await api.chats().readChatMessages(id, page, pageSize);
        const meta = response.data.meta;
        const responseData = response.data.data.map((o) => new ChatMessage(o));
        const normalized = safeNormalize<ChatMessage, ChatMessageEntities, Array<string>>(responseData, [chatMessageSchema]);
        return {...normalized, meta};
    },
);

export const fetchChatMessageById = createTypedAsyncThunk(
    'chatMessages/fetchChatMessageById',
    async (params: {id: string; messageId: string}) => {
        const {id, messageId} = params;
        const response = await api.chats().readChatMessageById(id, messageId);
        const responseData = new ChatMessage(response.data.data);
        const normalized = safeNormalize<ChatMessage, ChatMessageEntities, string>(responseData, chatMessageSchema);
        return normalized;
    },
);