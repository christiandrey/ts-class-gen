import {ChatEntities, chatSchema} from '../../../schemas/normalization/chat';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Chat} from '../../../entities/chat';
import {api} from '../../../api';

export const createChat = createTypedAsyncThunk(
    'chats/createChat',
    async (params: {id: string; participantsIds: Array<string>}) => {
        const {id, participantsIds} = params;
        const response = await api.chats().create(id, participantsIds);
        const responseData = new Chat(response.data.data);
        const normalized = safeNormalize<Chat, ChatEntities, string>(responseData, chatSchema);
        return normalized;
    },
);

export const fetchChatById = createTypedAsyncThunk(
    'chats/fetchChatById',
    async (id: string) => {
        const response = await api.chats().readChatById(id);
        const responseData = new Chat(response.data.data);
        const normalized = safeNormalize<Chat, ChatEntities, string>(responseData, chatSchema);
        return normalized;
    },
);

export const fetchChats = createTypedAsyncThunk(
    'chats/fetchChats',
    async () => {
        const response = await api.chats().readChats();
        const responseData = response.data.data.map((o) => new Chat(o));
        const normalized = safeNormalize<Chat, ChatEntities, Array<string>>(responseData, [chatSchema]);
        return normalized;
    },
);