import {AvpuScale} from '../typings';
import {BaseEntity} from './base-entity';

export class VitalReading extends BaseEntity {
    pulse: number;
    bloodPressureSystolic: number;
    bloodPressureDiastolic: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    temperatureCelsius: number;
    avpu: AvpuScale;
    encounterId: string;

    constructor(dto: VitalReading) {
        super(dto);

        this.pulse = dto.pulse;
        this.bloodPressureSystolic = dto.bloodPressureSystolic;
        this.bloodPressureDiastolic = dto.bloodPressureDiastolic;
        this.respiratoryRate = dto.respiratoryRate;
        this.oxygenSaturation = dto.oxygenSaturation;
        this.temperatureCelsius = dto.temperatureCelsius;
        this.avpu = dto.avpu;
        this.encounterId = dto.encounterId;
    }
}