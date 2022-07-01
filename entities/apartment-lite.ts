import {BaseEntity} from './base-entity';
import {ResidentLite} from './resident-lite';

export class ApartmentLite extends BaseEntity {
    label: string;
    isNotInUse: boolean;
    isVacant: boolean;
    serviceChargeBalance: number;
    ownerId?: string;
    estateId?: string;
    typeId: string;
    currentResident: ResidentLite;

    constructor(dto: ApartmentLite) {
        super(dto);

        this.label = dto.label;
        this.isNotInUse = dto.isNotInUse;
        this.isVacant = dto.isVacant;
        this.serviceChargeBalance = dto.serviceChargeBalance;
        this.ownerId = dto.ownerId;
        this.estateId = dto.estateId;
        this.typeId = dto.typeId;
        this.currentResident = new ResidentLite(dto.currentResident);
    }
}