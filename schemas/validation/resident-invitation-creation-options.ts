import {getEmailValidationMessage, getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const residentInvitationCreationOptions = object({
    email: string().email(getEmailValidationMessage).required(getRequiredValidationMessage),
});

export default residentInvitationCreationOptions;