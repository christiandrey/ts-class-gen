import {TimeDuration} from '../typings';

export class HospitalPatientsStats {
    timeDuration: TimeDuration;
    startDate: string;
    inPatientsCount: number;
    outPatientsCount: number;

    constructor(dto: HospitalPatientsStats) {
        this.timeDuration = dto.timeDuration;
        this.startDate = dto.startDate;
        this.inPatientsCount = dto.inPatientsCount;
        this.outPatientsCount = dto.outPatientsCount;
    }
}