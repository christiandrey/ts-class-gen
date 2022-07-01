import {BaseEntity} from './base-entity';

export class VendorInvitation extends BaseEntity {
    email: string;
    accepted: boolean;
    acceptedAt?: string;
    estateId: string;
    servicesIds: Array<string>;
    estateName: string;
    estateAddress: string;
    facilityManagerName: string;

    constructor(dto: VendorInvitation) {
        super(dto);

        this.email = dto.email;
        this.accepted = dto.accepted;
        this.acceptedAt = dto.acceptedAt;
        this.estateId = dto.estateId;
        this.servicesIds = dto.servicesIds;
        this.estateName = dto.estateName;
        this.estateAddress = dto.estateAddress;
        this.facilityManagerName = dto.facilityManagerName;
    }
}