import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const organizationCreationOptions = object({
    name: string().required(getRequiredValidationMessage),
});

export default organizationCreationOptions;