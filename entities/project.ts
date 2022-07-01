import {PaymentLite} from './payment-lite';
import {ProjectLite} from './project-lite';
import {ProjectResource} from './project-resource';
import {ResidentLite} from './resident-lite';
import {VendorLite} from './vendor-lite';

export class Project extends ProjectLite {
    dueDate?: string;
    isRated: boolean;
    vendor: VendorLite;
    resident: ResidentLite;
    payment: PaymentLite;
    resources: Array<ProjectResource>;

    constructor(dto: Project) {
        super(dto);

        this.dueDate = dto.dueDate;
        this.isRated = dto.isRated;
        this.vendor = new VendorLite(dto.vendor);
        this.resident = new ResidentLite(dto.resident);
        this.payment = new PaymentLite(dto.payment);
        this.resources = dto.resources?.map((o) => new ProjectResource(o)) ?? [];
    }
}