export class UpdatedState {
    kmRadius: number;
    kmBaseDistance: number;
    unitPrice: number;
    baseUnitPrice: number;
    intraUnitPrice: number;
    halfLife: number;

    constructor(dto: UpdatedState) {
        this.kmRadius = dto.kmRadius;
        this.kmBaseDistance = dto.kmBaseDistance;
        this.unitPrice = dto.unitPrice;
        this.baseUnitPrice = dto.baseUnitPrice;
        this.intraUnitPrice = dto.intraUnitPrice;
        this.halfLife = dto.halfLife;
    }
}