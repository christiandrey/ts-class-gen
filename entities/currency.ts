export class Currency {
    id: string;
    isDefault: boolean;
    isActive: boolean;
    displayName: string;
    symbol: string;
    isoSymbol: string;
    twoLetterISOCountryName: string;
    threeLetterISOCountryName: string;
    countryName: string;
    exchangeRate: number;
    baseToCurrencyExchangeRate: number;
    override: boolean;

    constructor(dto: Currency) {
        this.id = dto.id;
        this.isDefault = dto.isDefault;
        this.isActive = dto.isActive;
        this.displayName = dto.displayName;
        this.symbol = dto.symbol;
        this.isoSymbol = dto.isoSymbol;
        this.twoLetterISOCountryName = dto.twoLetterISOCountryName;
        this.threeLetterISOCountryName = dto.threeLetterISOCountryName;
        this.countryName = dto.countryName;
        this.exchangeRate = dto.exchangeRate;
        this.baseToCurrencyExchangeRate = dto.baseToCurrencyExchangeRate;
        this.override = dto.override;
    }
}