import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const event = object({
    title: string().required(getRequiredValidationMessage),
    body: string().required(getRequiredValidationMessage),
});

export default event;