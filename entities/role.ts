export class Role {
    id: string;
    name: string;
    accessAdmin: boolean;
    accessMedicAppointments: boolean;
    accessFullPatientRecords: boolean;
    accessHospitalAdmissions: boolean;
    accessHospitalFinances: boolean;
    accessPatientMedications: boolean;
    accessPatientPaymentRecords: boolean;
    accessSummarizedPatientRecords: boolean;
    answerMedicalEnquiries: boolean;
    answerNonMedicalEnquiries: boolean;
    createRole: boolean;
    createUser: boolean;
    manageHospitalPrices: boolean;
    uploadLabTestResults: boolean;

    constructor(dto: Role) {
        this.id = dto.id;
        this.name = dto.name;
        this.accessAdmin = dto.accessAdmin;
        this.accessMedicAppointments = dto.accessMedicAppointments;
        this.accessFullPatientRecords = dto.accessFullPatientRecords;
        this.accessHospitalAdmissions = dto.accessHospitalAdmissions;
        this.accessHospitalFinances = dto.accessHospitalFinances;
        this.accessPatientMedications = dto.accessPatientMedications;
        this.accessPatientPaymentRecords = dto.accessPatientPaymentRecords;
        this.accessSummarizedPatientRecords = dto.accessSummarizedPatientRecords;
        this.answerMedicalEnquiries = dto.answerMedicalEnquiries;
        this.answerNonMedicalEnquiries = dto.answerNonMedicalEnquiries;
        this.createRole = dto.createRole;
        this.createUser = dto.createUser;
        this.manageHospitalPrices = dto.manageHospitalPrices;
        this.uploadLabTestResults = dto.uploadLabTestResults;
    }
}