import {Gender} from '../typings';
import {UserSummary} from './user-summary';

export class UserLite extends UserSummary {
    name: string;
    firstName: string;
    lastName: string;
    userName: string;
    fullName: string;
    imageUrl: string;
    address: string;
    gender: Gender;
    isActive: boolean;

    constructor(dto: UserLite) {
        super(dto);

        this.name = dto.name;
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
        this.userName = dto.userName;
        this.fullName = dto.fullName;
        this.imageUrl = dto.imageUrl;
        this.address = dto.address;
        this.gender = dto.gender;
        this.isActive = dto.isActive;
    }
}