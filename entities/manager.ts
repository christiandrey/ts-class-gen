import {BaseEntity} from './base-entity';
import {Hospital} from './hospital';
import {UserLite} from './user-lite';

export class Manager extends BaseEntity {
    designation: string;
    user: UserLite;
    hospital: Hospital;

    constructor(dto: Manager) {
        super(dto);

        this.designation = dto.designation;
        this.user = new UserLite(dto.user);
        this.hospital = new Hospital(dto.hospital);
    }
}