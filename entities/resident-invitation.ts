import {BaseEntity} from './base-entity';

export class ResidentInvitation extends BaseEntity {
    email: string;
    accepted: boolean;
    acceptedAt?: string;
    apartmentId: string;
    estateId?: string;
    estateName: string;
    estateAddress: string;
    facilityManagerName: string;

    constructor(dto: ResidentInvitation) {
        super(dto);

        this.email = dto.email;
        this.accepted = dto.accepted;
        this.acceptedAt = dto.acceptedAt;
        this.apartmentId = dto.apartmentId;
        this.estateId = dto.estateId;
        this.estateName = dto.estateName;
        this.estateAddress = dto.estateAddress;
        this.facilityManagerName = dto.facilityManagerName;
    }
}