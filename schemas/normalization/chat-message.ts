import {UserEntities, userSchema} from './user';

import {ChatMessage} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const chatMessageSchema = new schema.Entity('chatMessages', {
    user: userSchema,
});

export type ChatMessageEntities = SchemaEntities<{
    chatMessage: ChatMessage;
}> & UserEntities;