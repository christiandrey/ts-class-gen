import {Role} from './role';
import {UserLite} from './user-lite';

export class User extends UserLite {
    dateOfBirth: string;
    roles: Array<Role>;

    constructor(dto: User) {
        super(dto);

        this.dateOfBirth = dto.dateOfBirth;
        this.roles = dto.roles?.map((o) => new Role(o)) ?? [];
    }
}