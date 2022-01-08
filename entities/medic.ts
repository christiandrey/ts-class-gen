import {BaseEntity} from './base-entity';
import {Hospital} from './hospital';
import {ServiceCategory} from './service-category';
import {UserLite} from './user-lite';

export class Medic extends BaseEntity {
    designation: string;
    registrationNumber: string;
    user: UserLite;
    hospital: Hospital;
    services: Array<ServiceCategory>;

    constructor(dto: Medic) {
        super(dto);

        this.designation = dto.designation;
        this.registrationNumber = dto.registrationNumber;
        this.user = new UserLite(dto.user);
        this.hospital = new Hospital(dto.hospital);
        this.services = dto.services?.map((o) => new ServiceCategory(o)) ?? [];
    }
}