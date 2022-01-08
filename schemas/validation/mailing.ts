import {getRequiredValidationMessage} from './utils';
import {array, object, string} from 'yup';

const mailing = object({
    content: string().required(getRequiredValidationMessage),
    subject: string().required(getRequiredValidationMessage),
    addresses: array().required(getRequiredValidationMessage),
});

export default mailing;