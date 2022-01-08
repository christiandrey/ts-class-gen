import {BaseEntity} from './base-entity';
import {Country} from './country';
import {State} from './state';
import {UserLite} from './user-lite';

export class PatientLite extends BaseEntity {
    dateOfBirth: string;
    addressLine1: string;
    addressLine2: string;
    state: State;
    country: Country;
    user: UserLite;

    constructor(dto: PatientLite) {
        super(dto);

        this.dateOfBirth = dto.dateOfBirth;
        this.addressLine1 = dto.addressLine1;
        this.addressLine2 = dto.addressLine2;
        this.state = new State(dto.state);
        this.country = new Country(dto.country);
        this.user = new UserLite(dto.user);
    }
}