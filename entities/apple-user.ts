export class AppleUser {
    accessToken: string;
    firstName: string;
    lastName: string;

    constructor(dto: AppleUser) {
        this.accessToken = dto.accessToken;
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
    }
}