import {getRequiredValidationMessage} from './utils';
import {array, object} from 'yup';

const vendorCreationOptions = object({
    servicesIds: array().min(1).required(getRequiredValidationMessage),
});

export default vendorCreationOptions;