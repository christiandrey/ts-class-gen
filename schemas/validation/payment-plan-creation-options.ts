import {getRequiredValidationMessage} from './utils';
import {number, object, string} from 'yup';

const paymentPlanCreationOptions = object({
    name: string().required(getRequiredValidationMessage),
    medics: number().required(getRequiredValidationMessage),
    nonMedics: number().required(getRequiredValidationMessage),
    localPrice: number().required(getRequiredValidationMessage),
});

export default paymentPlanCreationOptions;