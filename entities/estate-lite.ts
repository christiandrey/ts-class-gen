import {ApportionmentType, CommissionType} from '../typings';
import {BaseEntity} from './base-entity';
import {Location} from './location';

export class EstateLite extends BaseEntity {
    facilityManagerName: string;
    facilityManagerFullName: string;
    apportionmentType: ApportionmentType;
    commissionType: CommissionType;
    commission: number;
    concealResidentNames: boolean;
    name: string;
    code: string;
    imageUrl: string;
    address: Location;
    memberId?: string;
    organizationId?: string;

    constructor(dto: EstateLite) {
        super(dto);

        this.facilityManagerName = dto.facilityManagerName;
        this.facilityManagerFullName = dto.facilityManagerFullName;
        this.apportionmentType = dto.apportionmentType;
        this.commissionType = dto.commissionType;
        this.commission = dto.commission;
        this.concealResidentNames = dto.concealResidentNames;
        this.name = dto.name;
        this.code = dto.code;
        this.imageUrl = dto.imageUrl;
        this.address = new Location(dto.address);
        this.memberId = dto.memberId;
        this.organizationId = dto.organizationId;
    }
}