import {BaseEntity} from './base-entity';
import {ServiceCategory} from './service-category';
import {UserLite} from './user-lite';

export class VendorLite extends BaseEntity {
    averageStars: number;
    user: UserLite;
    services: Array<ServiceCategory>;

    constructor(dto: VendorLite) {
        super(dto);

        this.averageStars = dto.averageStars;
        this.user = new UserLite(dto.user);
        this.services = dto.services?.map((o) => new ServiceCategory(o)) ?? [];
    }
}