export class ResetPassword {
    email: string;
    code: string;
    password: string;

    constructor(dto: ResetPassword) {
        this.email = dto.email;
        this.code = dto.code;
        this.password = dto.password;
    }
}