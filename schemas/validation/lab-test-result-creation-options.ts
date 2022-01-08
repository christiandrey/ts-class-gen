import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const labTestResultCreationOptions = object({
    type: string().required(getRequiredValidationMessage),
});

export default labTestResultCreationOptions;