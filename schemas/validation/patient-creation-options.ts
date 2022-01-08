import {getEmailValidationMessage, getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const patientCreationOptions = object({
    email: string().email(getEmailValidationMessage).required(getRequiredValidationMessage),
    firstName: string().required(getRequiredValidationMessage),
    lastName: string().required(getRequiredValidationMessage),
    dateOfBirth: string().required(getRequiredValidationMessage),
    addressLine1: string().required(getRequiredValidationMessage),
    stateId: string().required(getRequiredValidationMessage),
    countryId: string().required(getRequiredValidationMessage),
    biodata: object().required(getRequiredValidationMessage),
    socialHistory: object().required(getRequiredValidationMessage),
});

export default patientCreationOptions;