export class OnboardedUser {
    userId: string;
    email: string;
    password: string;

    constructor(dto: OnboardedUser) {
        this.userId = dto.userId;
        this.email = dto.email;
        this.password = dto.password;
    }
}