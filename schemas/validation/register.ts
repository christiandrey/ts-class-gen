import {getEmailValidationMessage, getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const register = object({
    email: string().email(getEmailValidationMessage).required(getRequiredValidationMessage),
    firstName: string().required(getRequiredValidationMessage),
    lastName: string().required(getRequiredValidationMessage),
    phoneNumber: string().required(getRequiredValidationMessage),
    password: string().min(4).required(getRequiredValidationMessage),
});

export default register;