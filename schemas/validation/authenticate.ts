import {getEmailValidationMessage, getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const authenticate = object({
    username: string().email(getEmailValidationMessage).required(getRequiredValidationMessage),
    password: string().required(getRequiredValidationMessage),
});

export default authenticate;