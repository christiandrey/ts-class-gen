import {getEmailValidationMessage, getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const medicCreationOptions = object({
    email: string().email(getEmailValidationMessage).required(getRequiredValidationMessage),
    firstName: string().required(getRequiredValidationMessage),
    lastName: string().required(getRequiredValidationMessage),
    designation: string().required(getRequiredValidationMessage),
    servicesIds: string().min(1).required(getRequiredValidationMessage),
});

export default medicCreationOptions;