export class VerifyPhone {
    phoneNumber: string;
    code: string;

    constructor(dto: VerifyPhone) {
        this.phoneNumber = dto.phoneNumber;
        this.code = dto.code;
    }
}