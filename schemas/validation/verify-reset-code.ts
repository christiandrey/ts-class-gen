import {getEmailValidationMessage, getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const verifyResetCode = object({
    email: string().email(getEmailValidationMessage).required(getRequiredValidationMessage),
    code: string().required(getRequiredValidationMessage),
});

export default verifyResetCode;