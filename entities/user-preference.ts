export class UserPreference {
    enableAppointmentReminders: boolean;
    enableEmailNotifications: boolean;
    enableMedicationReminders: boolean;
    enablePushNotifications: boolean;
    languageCode: string;
    militaryTimeFormat: boolean;

    constructor(dto: UserPreference) {
        this.enableAppointmentReminders = dto.enableAppointmentReminders;
        this.enableEmailNotifications = dto.enableEmailNotifications;
        this.enableMedicationReminders = dto.enableMedicationReminders;
        this.enablePushNotifications = dto.enablePushNotifications;
        this.languageCode = dto.languageCode;
        this.militaryTimeFormat = dto.militaryTimeFormat;
    }
}