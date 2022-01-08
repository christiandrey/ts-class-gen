import {BaseEntity} from './base-entity';
import {LabTestResult} from './lab-test-result';

export class LabTest extends BaseEntity {
    code: string;
    isPublic: boolean;
    results: Array<LabTestResult>;

    constructor(dto: LabTest) {
        super(dto);

        this.code = dto.code;
        this.isPublic = dto.isPublic;
        this.results = dto.results?.map((o) => new LabTestResult(o)) ?? [];
    }
}