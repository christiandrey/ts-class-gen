import {ChatMessageEntities, chatMessageSchema} from './chat-message';
import {UserEntities, userSchema} from './user';

import {Chat} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const chatSchema = new schema.Entity('chats', {
    users: [userSchema],
    lastMessage: chatMessageSchema,
});

export type ChatEntities = SchemaEntities<{
    chat: Chat;
}> & UserEntities & ChatMessageEntities;