import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const appointmentStatusUpdateOptions = object({
    status: string().required(getRequiredValidationMessage),
});

export default appointmentStatusUpdateOptions;