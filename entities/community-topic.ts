import {UserLite} from './user-lite';

export class CommunityTopic {
    id: string;
    createdAt: string;
    name: string;
    description: string;
    user: UserLite;
    categoryId: string;
    commentsCount: number;

    constructor(dto: CommunityTopic) {
        this.id = dto.id;
        this.createdAt = dto.createdAt;
        this.name = dto.name;
        this.description = dto.description;
        this.user = new UserLite(dto.user);
        this.categoryId = dto.categoryId;
        this.commentsCount = dto.commentsCount;
    }
}