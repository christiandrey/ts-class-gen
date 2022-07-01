import {ResidentLite} from './resident-lite';
import {ServiceChargeLog} from './service-charge-log';

export class Resident extends ResidentLite {
    serviceChargeDueDate?: string;
    serviceChargeBalance: number;
    serviceChargeLogs: Array<ServiceChargeLog>;

    constructor(dto: Resident) {
        super(dto);

        this.serviceChargeDueDate = dto.serviceChargeDueDate;
        this.serviceChargeBalance = dto.serviceChargeBalance;
        this.serviceChargeLogs = dto.serviceChargeLogs?.map((o) => new ServiceChargeLog(o)) ?? [];
    }
}