import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const labTestResultUpdateOptions = object({
    data: string().required(getRequiredValidationMessage),
});

export default labTestResultUpdateOptions;