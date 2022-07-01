import {BaseEntity} from './base-entity';

export class MemberPermission extends BaseEntity {
    canOffboardResident: boolean;
    canOnboardResident: boolean;
    canAddNewApartment: boolean;

    constructor(dto: MemberPermission) {
        super(dto);

        this.canOffboardResident = dto.canOffboardResident;
        this.canOnboardResident = dto.canOnboardResident;
        this.canAddNewApartment = dto.canAddNewApartment;
    }
}