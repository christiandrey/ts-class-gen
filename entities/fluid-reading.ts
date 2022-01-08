import {FluidReadingRoute, FluidReadingType, FluidReadingUnit} from '../typings';
import {BaseEntity} from './base-entity';

export class FluidReading extends BaseEntity {
    recordedAt: string;
    type: FluidReadingType;
    route: FluidReadingRoute;
    unit: FluidReadingUnit;
    quantity: number;

    constructor(dto: FluidReading) {
        super(dto);

        this.recordedAt = dto.recordedAt;
        this.type = dto.type;
        this.route = dto.route;
        this.unit = dto.unit;
        this.quantity = dto.quantity;
    }
}