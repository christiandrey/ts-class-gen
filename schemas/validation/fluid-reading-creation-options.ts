import {getRequiredValidationMessage} from './utils';
import {number, object, string} from 'yup';

const fluidReadingCreationOptions = object({
    type: string().required(getRequiredValidationMessage),
    route: string().required(getRequiredValidationMessage),
    unit: string().required(getRequiredValidationMessage),
    quantity: number().required(getRequiredValidationMessage),
});

export default fluidReadingCreationOptions;