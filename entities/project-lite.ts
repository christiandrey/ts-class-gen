import {ProjectStatus} from '../typings';
import {BaseEntity} from './base-entity';
import {EstateLite} from './estate-lite';
import {ServiceCategory} from './service-category';

export class ProjectLite extends BaseEntity {
    title: string;
    description: string;
    isFacilityManagerRequest: boolean;
    isMaintenance: boolean;
    isPublic: boolean;
    category: ServiceCategory;
    status: ProjectStatus;
    estate: EstateLite;
    vendorId?: string;
    categoryId: string;
    residentId: string;
    paymentId?: string;
    estateId: string;

    constructor(dto: ProjectLite) {
        super(dto);

        this.title = dto.title;
        this.description = dto.description;
        this.isFacilityManagerRequest = dto.isFacilityManagerRequest;
        this.isMaintenance = dto.isMaintenance;
        this.isPublic = dto.isPublic;
        this.category = new ServiceCategory(dto.category);
        this.status = dto.status;
        this.estate = new EstateLite(dto.estate);
        this.vendorId = dto.vendorId;
        this.categoryId = dto.categoryId;
        this.residentId = dto.residentId;
        this.paymentId = dto.paymentId;
        this.estateId = dto.estateId;
    }
}