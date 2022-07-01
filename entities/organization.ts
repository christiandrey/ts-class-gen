import {BaseEntity} from './base-entity';
import {MemberLite} from './member-lite';
import {OrganizationClaim} from './organization-claim';

export class Organization extends BaseEntity {
    name: string;
    manageFundsOffline: boolean;
    isOnTrial: boolean;
    trialEndsOn?: string;
    members: Array<MemberLite>;
    claims: Array<OrganizationClaim>;

    constructor(dto: Organization) {
        super(dto);

        this.name = dto.name;
        this.manageFundsOffline = dto.manageFundsOffline;
        this.isOnTrial = dto.isOnTrial;
        this.trialEndsOn = dto.trialEndsOn;
        this.members = dto.members?.map((o) => new MemberLite(o)) ?? [];
        this.claims = dto.claims?.map((o) => new OrganizationClaim(o)) ?? [];
    }
}