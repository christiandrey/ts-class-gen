import {getEmailValidationMessage, getRequiredValidationMessage} from './utils';
import {array, object, string} from 'yup';

const vendorInvitationCreationOptions = object({
    email: string().email(getEmailValidationMessage).required(getRequiredValidationMessage),
    estateId: string().required(getRequiredValidationMessage),
    servicesIds: array().min(1).required(getRequiredValidationMessage),
});

export default vendorInvitationCreationOptions;