import {BaseEntity} from './base-entity';

export class FacilityManagerLog extends BaseEntity {
    facilityManagerId: string;
    estateId: string;
    userId: string;

    constructor(dto: FacilityManagerLog) {
        super(dto);

        this.facilityManagerId = dto.facilityManagerId;
        this.estateId = dto.estateId;
        this.userId = dto.userId;
    }
}