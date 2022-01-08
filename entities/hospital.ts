import {BaseEntity} from './base-entity';
import {Country} from './country';
import {State} from './state';

export class Hospital extends BaseEntity {
    name: string;
    code: string;
    imageUrl: string;
    managerId: string;
    addressLine1: string;
    addressLine2: string;
    state: State;
    country: Country;

    constructor(dto: Hospital) {
        super(dto);

        this.name = dto.name;
        this.code = dto.code;
        this.imageUrl = dto.imageUrl;
        this.managerId = dto.managerId;
        this.addressLine1 = dto.addressLine1;
        this.addressLine2 = dto.addressLine2;
        this.state = new State(dto.state);
        this.country = new Country(dto.country);
    }
}