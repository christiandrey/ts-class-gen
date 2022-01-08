import {getRequiredValidationMessage} from './utils';
import {array, object} from 'yup';

const labTestCreationOptions = object({
    results: array().min(1).required(getRequiredValidationMessage),
});

export default labTestCreationOptions;