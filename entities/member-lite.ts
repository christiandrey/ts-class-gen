import {MemberRoleType} from '../typings';
import {BaseEntity} from './base-entity';
import {FacilityManager} from './facility-manager';

export class MemberLite extends BaseEntity {
    isActive: boolean;
    role: MemberRoleType;
    facilityManager: FacilityManager;

    constructor(dto: MemberLite) {
        super(dto);

        this.isActive = dto.isActive;
        this.role = dto.role;
        this.facilityManager = new FacilityManager(dto.facilityManager);
    }
}