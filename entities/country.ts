import {UpdatedCountry} from './updated-country';

export class Country extends UpdatedCountry {
    id: string;
    name: string;
    isActive: boolean;
    twoLetterISOName: string;
    threeLetterISOName: string;

    constructor(dto: Country) {
        super(dto);

        this.id = dto.id;
        this.name = dto.name;
        this.isActive = dto.isActive;
        this.twoLetterISOName = dto.twoLetterISOName;
        this.threeLetterISOName = dto.threeLetterISOName;
    }
}