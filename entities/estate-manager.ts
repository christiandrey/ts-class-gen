import {BaseEntity} from './base-entity';
import {MemberLite} from './member-lite';

export class EstateManager extends BaseEntity {
    isActive: boolean;
    paymentLimit: number;
    estateId: string;
    memberId: string;
    organizationClaimId: string;
    member: MemberLite;

    constructor(dto: EstateManager) {
        super(dto);

        this.isActive = dto.isActive;
        this.paymentLimit = dto.paymentLimit;
        this.estateId = dto.estateId;
        this.memberId = dto.memberId;
        this.organizationClaimId = dto.organizationClaimId;
        this.member = new MemberLite(dto.member);
    }
}