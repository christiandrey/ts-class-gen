import {getRequiredValidationMessage} from './utils';
import {array, object, string} from 'yup';

const hospitalCreationOptions = object({
    name: string().required(getRequiredValidationMessage),
    addressLine1: string().required(getRequiredValidationMessage),
    stateId: string().required(getRequiredValidationMessage),
    countryId: string().required(getRequiredValidationMessage),
    managerId: string().required(getRequiredValidationMessage),
    servicesIds: array().min(1).required(getRequiredValidationMessage),
});

export default hospitalCreationOptions;