import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const chatMessageCreationOptions = object({
    body: string().required(getRequiredValidationMessage),
    hash: string().required(getRequiredValidationMessage),
});

export default chatMessageCreationOptions;