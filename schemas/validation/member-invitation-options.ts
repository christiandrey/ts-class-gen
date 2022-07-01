import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const memberInvitationOptions = object({
    facilityManagerId: string().required(getRequiredValidationMessage),
});

export default memberInvitationOptions;