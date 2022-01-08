export class BaseEntity {
    id: string;
    createdAt: string;

    constructor(dto: BaseEntity) {
        this.id = dto.id;
        this.createdAt = dto.createdAt;
    }
}