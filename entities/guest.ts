import {BaseEntity} from './base-entity';
import {UserLite} from './user-lite';

export class Guest extends BaseEntity {
    isActive: boolean;
    patientId: string;
    accessExpiresAt?: string;
    canAccessFinances: boolean;
    canAccessMedication: boolean;
    canAccessAppointments: boolean;
    canAccessLabResults: boolean;
    user: UserLite;

    constructor(dto: Guest) {
        super(dto);

        this.isActive = dto.isActive;
        this.patientId = dto.patientId;
        this.accessExpiresAt = dto.accessExpiresAt;
        this.canAccessFinances = dto.canAccessFinances;
        this.canAccessMedication = dto.canAccessMedication;
        this.canAccessAppointments = dto.canAccessAppointments;
        this.canAccessLabResults = dto.canAccessLabResults;
        this.user = new UserLite(dto.user);
    }
}