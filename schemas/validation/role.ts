import {getRequiredValidationMessage} from './utils';
import {boolean, object} from 'yup';

const role = object({
    accessAdmin: boolean().required(getRequiredValidationMessage),
    accessMedicAppointments: boolean().required(getRequiredValidationMessage),
    accessFullPatientRecords: boolean().required(getRequiredValidationMessage),
    accessHospitalAdmissions: boolean().required(getRequiredValidationMessage),
    accessHospitalFinances: boolean().required(getRequiredValidationMessage),
    accessPatientMedications: boolean().required(getRequiredValidationMessage),
    accessPatientPaymentRecords: boolean().required(getRequiredValidationMessage),
    accessSummarizedPatientRecords: boolean().required(getRequiredValidationMessage),
    answerMedicalEnquiries: boolean().required(getRequiredValidationMessage),
    answerNonMedicalEnquiries: boolean().required(getRequiredValidationMessage),
    createRole: boolean().required(getRequiredValidationMessage),
    createUser: boolean().required(getRequiredValidationMessage),
    manageHospitalPrices: boolean().required(getRequiredValidationMessage),
    uploadLabTestResults: boolean().required(getRequiredValidationMessage),
});

export default role;