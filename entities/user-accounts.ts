import {FacilityManager} from './facility-manager';
import {Ghost} from './ghost';
import {Owner} from './owner';
import {Resident} from './resident';
import {Vendor} from './vendor';

export class UserAccounts {
    residents: Array<Resident>;
    facilityManager: FacilityManager;
    ghost: Ghost;
    owner: Owner;
    vendor: Vendor;

    constructor(dto: UserAccounts) {
        this.residents = dto.residents?.map((o) => new Resident(o)) ?? [];
        this.facilityManager = new FacilityManager(dto.facilityManager);
        this.ghost = new Ghost(dto.ghost);
        this.owner = new Owner(dto.owner);
        this.vendor = new Vendor(dto.vendor);
    }
}