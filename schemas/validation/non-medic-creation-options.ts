import {getEmailValidationMessage, getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const nonMedicCreationOptions = object({
    email: string().email(getEmailValidationMessage).required(getRequiredValidationMessage),
    firstName: string().required(getRequiredValidationMessage),
    lastName: string().required(getRequiredValidationMessage),
    designation: string().required(getRequiredValidationMessage),
});

export default nonMedicCreationOptions;