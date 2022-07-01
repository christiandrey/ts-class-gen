export class ServiceCategory {
    id: string;
    name: string;
    isPaymentOnly: boolean;

    constructor(dto: ServiceCategory) {
        this.id = dto.id;
        this.name = dto.name;
        this.isPaymentOnly = dto.isPaymentOnly;
    }
}