import {CommunityTopic} from './community-topic';

export class CommunityCategory {
    id: string;
    createdAt: string;
    name: string;
    color: string;
    topics: Array<CommunityTopic>;

    constructor(dto: CommunityCategory) {
        this.id = dto.id;
        this.createdAt = dto.createdAt;
        this.name = dto.name;
        this.color = dto.color;
        this.topics = dto.topics?.map((o) => new CommunityTopic(o)) ?? [];
    }
}