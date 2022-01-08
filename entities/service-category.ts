export class ServiceCategory {
    id: string;
    name: string;

    constructor(dto: ServiceCategory) {
        this.id = dto.id;
        this.name = dto.name;
    }
}