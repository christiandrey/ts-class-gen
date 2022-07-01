import {BaseEntity} from './base-entity';
import {UserLite} from './user-lite';

export class FacilityManager extends BaseEntity {
    memberId?: string;
    user: UserLite;

    constructor(dto: FacilityManager) {
        super(dto);

        this.memberId = dto.memberId;
        this.user = new UserLite(dto.user);
    }
}