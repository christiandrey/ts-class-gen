export class Register {
    email: string;
    firstName: string;
    lastName: string;
    password: string;

    constructor(dto: Register) {
        this.email = dto.email;
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
        this.password = dto.password;
    }
}