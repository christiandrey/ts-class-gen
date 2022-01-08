import {getEmailValidationMessage, getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const userCreationOptions = object({
    lastName: string().required(getRequiredValidationMessage),
    firstName: string().required(getRequiredValidationMessage),
    email: string().email(getEmailValidationMessage).required(getRequiredValidationMessage),
});

export default userCreationOptions;