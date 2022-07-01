import {getRequiredValidationMessage} from './utils';
import {number, object, string} from 'yup';

const apartmentTypeCreationOptions = object({
    name: string().required(getRequiredValidationMessage),
    bedrooms: number().required(getRequiredValidationMessage),
    size: number().required(getRequiredValidationMessage),
});

export default apartmentTypeCreationOptions;