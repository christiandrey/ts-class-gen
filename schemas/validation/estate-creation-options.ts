import {getRequiredValidationMessage} from './utils';
import {array, object, string} from 'yup';

const estateCreationOptions = object({
    name: string().required(getRequiredValidationMessage),
    placeId: string().required(getRequiredValidationMessage),
    servicesIds: array().min(1).required(getRequiredValidationMessage),
});

export default estateCreationOptions;