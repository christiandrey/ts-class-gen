export class Country {
    id: string;
    name: string;
    isActive: boolean;
    twoLetterISOName: string;
    threeLetterISOName: string;

    constructor(dto: Country) {
        this.id = dto.id;
        this.name = dto.name;
        this.isActive = dto.isActive;
        this.twoLetterISOName = dto.twoLetterISOName;
        this.threeLetterISOName = dto.threeLetterISOName;
    }
}