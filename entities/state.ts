import {UpdatedState} from './updated-state';

export class State extends UpdatedState {
    id: string;
    name: string;
    isActive: boolean;
    twoLetterISOCountryName: string;

    constructor(dto: State) {
        super(dto);

        this.id = dto.id;
        this.name = dto.name;
        this.isActive = dto.isActive;
        this.twoLetterISOCountryName = dto.twoLetterISOCountryName;
    }
}