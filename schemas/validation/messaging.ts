import {getRequiredValidationMessage} from './utils';
import {array, object, string} from 'yup';

const messaging = object({
    content: string().required(getRequiredValidationMessage),
    phoneNumbers: array().required(getRequiredValidationMessage),
});

export default messaging;