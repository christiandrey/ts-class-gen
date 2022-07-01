export class Messaging {
    content: string;
    phoneNumbers: Array<string>;

    constructor(dto: Messaging) {
        this.content = dto.content;
        this.phoneNumbers = dto.phoneNumbers;
    }
}