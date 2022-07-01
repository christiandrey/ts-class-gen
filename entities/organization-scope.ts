export class OrganizationScope {
    name: string;
    description: string;

    constructor(dto: OrganizationScope) {
        this.name = dto.name;
        this.description = dto.description;
    }
}