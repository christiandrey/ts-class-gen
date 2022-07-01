export class Register {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;

    constructor(dto: Register) {
        this.email = dto.email;
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
        this.phoneNumber = dto.phoneNumber;
        this.password = dto.password;
    }
}