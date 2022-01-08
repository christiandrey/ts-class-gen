import {TimeDuration} from '../typings';

export class HospitalClinicalVisitsStats {
    timeDuration: TimeDuration;
    startDate: string;
    newPatientsCurrentCount: number;
    newPatientsPreviousCount: number;
    oldPatientsCurrentCount: number;
    oldPatientsPreviousCount: number;

    constructor(dto: HospitalClinicalVisitsStats) {
        this.timeDuration = dto.timeDuration;
        this.startDate = dto.startDate;
        this.newPatientsCurrentCount = dto.newPatientsCurrentCount;
        this.newPatientsPreviousCount = dto.newPatientsPreviousCount;
        this.oldPatientsCurrentCount = dto.oldPatientsCurrentCount;
        this.oldPatientsPreviousCount = dto.oldPatientsPreviousCount;
    }
}