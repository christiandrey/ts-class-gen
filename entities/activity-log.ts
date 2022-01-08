import {BaseEntity} from './base-entity';
import {UserLite} from './user-lite';

export class ActivityLog extends BaseEntity {
    description: string;
    user: UserLite;

    constructor(dto: ActivityLog) {
        super(dto);

        this.description = dto.description;
        this.user = new UserLite(dto.user);
    }
}