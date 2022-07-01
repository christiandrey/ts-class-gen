import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const projectMessageCreationOptions = object({
    body: string().required(getRequiredValidationMessage),
    hash: string().required(getRequiredValidationMessage),
});

export default projectMessageCreationOptions;