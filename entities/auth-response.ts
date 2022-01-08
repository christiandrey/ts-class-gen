import {Role} from './role';
import {UserLite} from './user-lite';

export class AuthResponse extends UserLite {
    accessToken: string;
    refreshToken: string;
    issuedAt: string;
    expiresAt: string;
    roles: Array<Role>;

    constructor(dto: AuthResponse) {
        super(dto);

        this.accessToken = dto.accessToken;
        this.refreshToken = dto.refreshToken;
        this.issuedAt = dto.issuedAt;
        this.expiresAt = dto.expiresAt;
        this.roles = dto.roles?.map((o) => new Role(o)) ?? [];
    }
}