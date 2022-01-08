import {Gender} from '../typings';

export class UserLite {
    id: string;
    createdAt: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    imageUrl: string;
    gender: Gender;
    phoneNumber: string;
    isActive: boolean;
    emailConfirmed: boolean;
    accountSetup: boolean;
    roleNames: Array<string>;

    constructor(dto: UserLite) {
        this.id = dto.id;
        this.createdAt = dto.createdAt;
        this.email = dto.email;
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
        this.fullName = dto.fullName;
        this.imageUrl = dto.imageUrl;
        this.gender = dto.gender;
        this.phoneNumber = dto.phoneNumber;
        this.isActive = dto.isActive;
        this.emailConfirmed = dto.emailConfirmed;
        this.accountSetup = dto.accountSetup;
        this.roleNames = dto.roleNames;
    }
}