export class VerifyEmail {
    email: string;
    code: string;

    constructor(dto: VerifyEmail) {
        this.email = dto.email;
        this.code = dto.code;
    }
}