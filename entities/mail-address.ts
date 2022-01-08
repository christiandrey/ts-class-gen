export class MailAddress {
    email: string;
    name: string;

    constructor(dto: MailAddress) {
        this.email = dto.email;
        this.name = dto.name;
    }
}