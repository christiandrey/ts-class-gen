import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const medicationCreationOptions = object({
    name: string().required(getRequiredValidationMessage),
    dosage: string().required(getRequiredValidationMessage),
    frequency: string().required(getRequiredValidationMessage),
    firstDoseAt: string().required(getRequiredValidationMessage),
});

export default medicationCreationOptions;