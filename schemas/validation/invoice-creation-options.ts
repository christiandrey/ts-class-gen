import {getRequiredValidationMessage} from './utils';
import {array, object} from 'yup';

const invoiceCreationOptions = object({
    items: array().min(1).required(getRequiredValidationMessage),
});

export default invoiceCreationOptions;