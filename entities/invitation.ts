import {ResidentInvitation} from './resident-invitation';
import {VendorInvitation} from './vendor-invitation';

export class Invitation {
    vendor: VendorInvitation;
    residents: Array<ResidentInvitation>;

    constructor(dto: Invitation) {
        this.vendor = new VendorInvitation(dto.vendor);
        this.residents = dto.residents?.map((o) => new ResidentInvitation(o)) ?? [];
    }
}