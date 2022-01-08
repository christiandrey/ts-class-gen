import {TimeDuration} from '../typings';

export class HospitalInvoiceStats {
    timeDuration: TimeDuration;
    startDate: string;
    totalInvoicesCount: number;
    outstandingInvoicesCount: number;

    constructor(dto: HospitalInvoiceStats) {
        this.timeDuration = dto.timeDuration;
        this.startDate = dto.startDate;
        this.totalInvoicesCount = dto.totalInvoicesCount;
        this.outstandingInvoicesCount = dto.outstandingInvoicesCount;
    }
}