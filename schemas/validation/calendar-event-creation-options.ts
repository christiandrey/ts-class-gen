import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const calendarEventCreationOptions = object({
    title: string().required(getRequiredValidationMessage),
    startAt: string().required(getRequiredValidationMessage),
    endAt: string().required(getRequiredValidationMessage),
});

export default calendarEventCreationOptions;