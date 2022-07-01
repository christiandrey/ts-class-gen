import {Gender} from '../typings';

export class UpdatedUser {
    gender: Gender;
    lastName: string;
    firstName: string;
    name: string;
    userName: string;
    imageUrl: string;

    constructor(dto: UpdatedUser) {
        this.gender = dto.gender;
        this.lastName = dto.lastName;
        this.firstName = dto.firstName;
        this.name = dto.name;
        this.userName = dto.userName;
        this.imageUrl = dto.imageUrl;
    }
}