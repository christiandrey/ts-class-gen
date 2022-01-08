import {PatientBiodata} from './patient-biodata';
import {PatientLite} from './patient-lite';
import {PatientSocialHistory} from './patient-social-history';

export class Patient extends PatientLite {
    biodata: PatientBiodata;
    socialHistory: PatientSocialHistory;

    constructor(dto: Patient) {
        super(dto);

        this.biodata = new PatientBiodata(dto.biodata);
        this.socialHistory = new PatientSocialHistory(dto.socialHistory);
    }
}