import {Recurrence} from '../typings';
import {BaseEntity} from './base-entity';
import {ServiceCategory} from './service-category';

export class ApartmentType extends BaseEntity {
    name: string;
    code: string;
    quantity: number;
    description: string;
    serviceChargeAmount: number;
    serviceChargeRecurrence: Recurrence;
    bedrooms: number;
    size: number;
    estateId?: string;
    services: Array<ServiceCategory>;

    constructor(dto: ApartmentType) {
        super(dto);

        this.name = dto.name;
        this.code = dto.code;
        this.quantity = dto.quantity;
        this.description = dto.description;
        this.serviceChargeAmount = dto.serviceChargeAmount;
        this.serviceChargeRecurrence = dto.serviceChargeRecurrence;
        this.bedrooms = dto.bedrooms;
        this.size = dto.size;
        this.estateId = dto.estateId;
        this.services = dto.services?.map((o) => new ServiceCategory(o)) ?? [];
    }
}