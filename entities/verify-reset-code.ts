export class VerifyResetCode {
    email: string;
    code: string;

    constructor(dto: VerifyResetCode) {
        this.email = dto.email;
        this.code = dto.code;
    }
}