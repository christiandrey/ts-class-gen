import {BaseEntity} from './base-entity';
import {UserLite} from './user-lite';

export class Owner extends BaseEntity {
    user: UserLite;

    constructor(dto: Owner) {
        super(dto);

        this.user = new UserLite(dto.user);
    }
}