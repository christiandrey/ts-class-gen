export class UpdatedCountry {
    kmRadius: number;
    unitPrice: number;
    halfLife: number;

    constructor(dto: UpdatedCountry) {
        this.kmRadius = dto.kmRadius;
        this.unitPrice = dto.unitPrice;
        this.halfLife = dto.halfLife;
    }
}