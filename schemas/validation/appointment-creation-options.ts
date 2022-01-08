import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const appointmentCreationOptions = object({
    medicId: string().required(getRequiredValidationMessage),
    startAt: string().required(getRequiredValidationMessage),
    endAt: string().required(getRequiredValidationMessage),
});

export default appointmentCreationOptions;