import {BaseEntity} from './base-entity';
import {MemberLite} from './member-lite';

export class Organization extends BaseEntity {
    name: string;
    members: Array<MemberLite>;

    constructor(dto: Organization) {
        super(dto);

        this.name = dto.name;
        this.members = dto.members?.map((o) => new MemberLite(o)) ?? [];
    }
}