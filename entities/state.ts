export class State {
    id: string;
    name: string;
    isActive: boolean;
    twoLetterISOCountryName: string;

    constructor(dto: State) {
        this.id = dto.id;
        this.name = dto.name;
        this.isActive = dto.isActive;
        this.twoLetterISOCountryName = dto.twoLetterISOCountryName;
    }
}