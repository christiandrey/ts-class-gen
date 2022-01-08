import {getEmailValidationMessage, getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const mailAddress = object({
    email: string().email(getEmailValidationMessage).required(getRequiredValidationMessage),
    name: string().required(getRequiredValidationMessage),
});

export default mailAddress;