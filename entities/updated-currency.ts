export class UpdatedCurrency {
    exchangeRate: number;
    isActive: boolean;
    override: boolean;
    isDefault: boolean;

    constructor(dto: UpdatedCurrency) {
        this.exchangeRate = dto.exchangeRate;
        this.isActive = dto.isActive;
        this.override = dto.override;
        this.isDefault = dto.isDefault;
    }
}