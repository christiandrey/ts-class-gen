export class SocialUser {
    accessToken: string;

    constructor(dto: SocialUser) {
        this.accessToken = dto.accessToken;
    }
}