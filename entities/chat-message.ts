import {MessageType} from '../typings';
import {BaseEntity} from './base-entity';
import {UserLite} from './user-lite';

export class ChatMessage extends BaseEntity {
    body: string;
    hash: string;
    type: MessageType;
    chatId: string;
    user: UserLite;

    constructor(dto: ChatMessage) {
        super(dto);

        this.body = dto.body;
        this.hash = dto.hash;
        this.type = dto.type;
        this.chatId = dto.chatId;
        this.user = new UserLite(dto.user);
    }
}