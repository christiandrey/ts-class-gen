import {UserLite} from './user-lite';

export class Review {
    id: string;
    stars: number;
    body: string;
    userId: string;
    vendorId: string;
    user: UserLite;

    constructor(dto: Review) {
        this.id = dto.id;
        this.stars = dto.stars;
        this.body = dto.body;
        this.userId = dto.userId;
        this.vendorId = dto.vendorId;
        this.user = new UserLite(dto.user);
    }
}