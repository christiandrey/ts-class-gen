import {getEmailValidationMessage, getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const checkEmail = object({
    email: string().email(getEmailValidationMessage).required(getRequiredValidationMessage),
});

export default checkEmail;