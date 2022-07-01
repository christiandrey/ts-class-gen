import {ApartmentLite} from './apartment-lite';
import {ApartmentType} from './apartment-type';
import {EstateLite} from './estate-lite';
import {Owner} from './owner';
import {Resident} from './resident';

export class Apartment extends ApartmentLite {
    owner: Owner;
    type: ApartmentType;
    estate: EstateLite;
    currentResident: Resident;

    constructor(dto: Apartment) {
        super(dto);

        this.owner = new Owner(dto.owner);
        this.type = new ApartmentType(dto.type);
        this.estate = new EstateLite(dto.estate);
        this.currentResident = new Resident(dto.currentResident);
    }
}