import {EncounterLite} from './encounter-lite';
import {LabScan} from './lab-scan';
import {LabTest} from './lab-test';
import {VitalReading} from './vital-reading';

export class Encounter extends EncounterLite {
    vitalReading: VitalReading;
    labTest: LabTest;
    labScans: Array<LabScan>;

    constructor(dto: Encounter) {
        super(dto);

        this.vitalReading = new VitalReading(dto.vitalReading);
        this.labTest = new LabTest(dto.labTest);
        this.labScans = dto.labScans?.map((o) => new LabScan(o)) ?? [];
    }
}