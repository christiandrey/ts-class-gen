import {getRequiredValidationMessage} from './utils';
import {number, object} from 'yup';

const updatedCountry = object({
    kmRadius: number().required(getRequiredValidationMessage),
    unitPrice: number().required(getRequiredValidationMessage),
    halfLife: number().required(getRequiredValidationMessage),
});

export default updatedCountry;