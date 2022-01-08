import {getEmailValidationMessage, getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const resetPassword = object({
    email: string().email(getEmailValidationMessage).required(getRequiredValidationMessage),
    code: string().required(getRequiredValidationMessage),
    password: string().required(getRequiredValidationMessage),
});

export default resetPassword;