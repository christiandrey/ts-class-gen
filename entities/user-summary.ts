import {UserStatus} from '../typings';

export class UserSummary {
    id: string;
    createdAt: string;
    email: string;
    phoneNumber: string;
    emailConfirmed: boolean;
    phoneNumberConfirmed: boolean;
    status: UserStatus;
    roleNames: Array<string>;

    constructor(dto: UserSummary) {
        this.id = dto.id;
        this.createdAt = dto.createdAt;
        this.email = dto.email;
        this.phoneNumber = dto.phoneNumber;
        this.emailConfirmed = dto.emailConfirmed;
        this.phoneNumberConfirmed = dto.phoneNumberConfirmed;
        this.status = dto.status;
        this.roleNames = dto.roleNames;
    }
}