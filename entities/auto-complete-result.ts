export class AutoCompleteResult {
    placeId: string;
    mainText: string;
    description: string;
    secondaryText: string;

    constructor(dto: AutoCompleteResult) {
        this.placeId = dto.placeId;
        this.mainText = dto.mainText;
        this.description = dto.description;
        this.secondaryText = dto.secondaryText;
    }
}