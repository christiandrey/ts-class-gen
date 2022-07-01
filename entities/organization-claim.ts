import {BaseEntity} from './base-entity';

export class OrganizationClaim extends BaseEntity {
    name: string;
    organizationId: string;
    scopes: Array<string>;

    constructor(dto: OrganizationClaim) {
        super(dto);

        this.name = dto.name;
        this.organizationId = dto.organizationId;
        this.scopes = dto.scopes;
    }
}