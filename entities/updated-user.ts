import {Gender} from '../typings';

export class UpdatedUser {
    gender: Gender;
    lastName: string;
    firstName: string;
    imageUrl: string;

    constructor(dto: UpdatedUser) {
        this.gender = dto.gender;
        this.lastName = dto.lastName;
        this.firstName = dto.firstName;
        this.imageUrl = dto.imageUrl;
    }
}