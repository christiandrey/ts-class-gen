export class Role {
    id: string;
    name: string;
    accessAdmin: boolean;
    accessSupport: boolean;
    createUser: boolean;
    createRole: boolean;

    constructor(dto: Role) {
        this.id = dto.id;
        this.name = dto.name;
        this.accessAdmin = dto.accessAdmin;
        this.accessSupport = dto.accessSupport;
        this.createUser = dto.createUser;
        this.createRole = dto.createRole;
    }
}