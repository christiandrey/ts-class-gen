import {getRequiredValidationMessage} from './utils';
import {number, object} from 'yup';

const updatedState = object({
    kmRadius: number().required(getRequiredValidationMessage),
    kmBaseDistance: number().required(getRequiredValidationMessage),
    unitPrice: number().required(getRequiredValidationMessage),
    baseUnitPrice: number().required(getRequiredValidationMessage),
    intraUnitPrice: number().required(getRequiredValidationMessage),
    halfLife: number().required(getRequiredValidationMessage),
});

export default updatedState;