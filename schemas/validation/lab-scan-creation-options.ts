import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const labScanCreationOptions = object({
    url: string().required(getRequiredValidationMessage),
});

export default labScanCreationOptions;