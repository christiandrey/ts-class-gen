import {ApartmentType} from './apartment-type';
import {EstateLite} from './estate-lite';
import {FacilityManager} from './facility-manager';
import {Organization} from './organization';
import {ServiceCategory} from './service-category';

export class Estate extends EstateLite {
    facilityManager: FacilityManager;
    organization: Organization;
    unavailableServicesWhenVacant: Array<string>;
    apartmentTypes: Array<ApartmentType>;
    services: Array<ServiceCategory>;

    constructor(dto: Estate) {
        super(dto);

        this.facilityManager = new FacilityManager(dto.facilityManager);
        this.organization = new Organization(dto.organization);
        this.unavailableServicesWhenVacant = dto.unavailableServicesWhenVacant;
        this.apartmentTypes = dto.apartmentTypes?.map((o) => new ApartmentType(o)) ?? [];
        this.services = dto.services?.map((o) => new ServiceCategory(o)) ?? [];
    }
}