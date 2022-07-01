import {MemberLite} from './member-lite';

export class Member extends MemberLite {
    organizationId: string;

    constructor(dto: Member) {
        super(dto);

        this.organizationId = dto.organizationId;
    }
}