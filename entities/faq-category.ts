export class FaqCategory {
    id: string;
    name: string;

    constructor(dto: FaqCategory) {
        this.id = dto.id;
        this.name = dto.name;
    }
}