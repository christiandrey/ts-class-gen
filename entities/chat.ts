import {BaseEntity} from './base-entity';
import {ChatMessage} from './chat-message';
import {UserLite} from './user-lite';

export class Chat extends BaseEntity {
    users: Array<UserLite>;
    lastMessage: ChatMessage;

    constructor(dto: Chat) {
        super(dto);

        this.users = dto.users?.map((o) => new UserLite(o)) ?? [];
        this.lastMessage = new ChatMessage(dto.lastMessage);
    }
}