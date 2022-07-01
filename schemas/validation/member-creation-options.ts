import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const memberCreationOptions = object({
    username: string().required(getRequiredValidationMessage),
    name: string().required(getRequiredValidationMessage),
});

export default memberCreationOptions;