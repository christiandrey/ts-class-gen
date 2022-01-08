export class Authenticate {
    username: string;
    password: string;

    constructor(dto: Authenticate) {
        this.username = dto.username;
        this.password = dto.password;
    }
}