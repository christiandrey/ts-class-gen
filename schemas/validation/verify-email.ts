import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const verifyEmail = object({
    email: string().required(getRequiredValidationMessage),
    code: string().required(getRequiredValidationMessage),
});

export default verifyEmail;