import {TimeDuration} from '../typings';
import {BaseEntity} from './base-entity';

export class PatientSocialHistory extends BaseEntity {
    smoker: boolean;
    smokingDuration: number;
    smokingDurationUnit: TimeDuration;
    dailySmokingFrequency: number;
    occupation: string;

    constructor(dto: PatientSocialHistory) {
        super(dto);

        this.smoker = dto.smoker;
        this.smokingDuration = dto.smokingDuration;
        this.smokingDurationUnit = dto.smokingDurationUnit;
        this.dailySmokingFrequency = dto.dailySmokingFrequency;
        this.occupation = dto.occupation;
    }
}