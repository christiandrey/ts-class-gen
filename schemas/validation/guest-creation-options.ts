import {getEmailValidationMessage, getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const guestCreationOptions = object({
    email: string().email(getEmailValidationMessage).required(getRequiredValidationMessage),
    firstName: string().required(getRequiredValidationMessage),
    lastName: string().required(getRequiredValidationMessage),
});

export default guestCreationOptions;