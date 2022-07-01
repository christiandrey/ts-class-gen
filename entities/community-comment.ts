import {UserLite} from './user-lite';

export class CommunityComment {
    id: string;
    createdAt: string;
    body: string;
    hash: string;
    user: UserLite;
    topicId: string;
    userId: string;

    constructor(dto: CommunityComment) {
        this.id = dto.id;
        this.createdAt = dto.createdAt;
        this.body = dto.body;
        this.hash = dto.hash;
        this.user = new UserLite(dto.user);
        this.topicId = dto.topicId;
        this.userId = dto.userId;
    }
}