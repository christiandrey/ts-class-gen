import {MemberLite} from './member-lite';
import {MemberPermission} from './member-permission';

export class Member extends MemberLite {
    permissions: MemberPermission;
    paymentLimit: number;
    organizationId: string;

    constructor(dto: Member) {
        super(dto);

        this.permissions = new MemberPermission(dto.permissions);
        this.paymentLimit = dto.paymentLimit;
        this.organizationId = dto.organizationId;
    }
}