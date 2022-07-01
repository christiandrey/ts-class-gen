import {BaseEntity} from './base-entity';
import {UserLite} from './user-lite';

export class ResidentLite extends BaseEntity {
    isOffboarded: boolean;
    offboardedAt?: string;
    estateName: string;
    user: UserLite;
    apartmentId: string;

    constructor(dto: ResidentLite) {
        super(dto);

        this.isOffboarded = dto.isOffboarded;
        this.offboardedAt = dto.offboardedAt;
        this.estateName = dto.estateName;
        this.user = new UserLite(dto.user);
        this.apartmentId = dto.apartmentId;
    }
}