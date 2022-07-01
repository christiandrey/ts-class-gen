import {BaseEntity} from './base-entity';
import {UserLite} from './user-lite';

export class Ghost extends BaseEntity {
    user: UserLite;

    constructor(dto: Ghost) {
        super(dto);

        this.user = new UserLite(dto.user);
    }
}