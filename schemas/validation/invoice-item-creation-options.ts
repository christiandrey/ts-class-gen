import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const invoiceItemCreationOptions = object({
    billingItemId: string().required(getRequiredValidationMessage),
});

export default invoiceItemCreationOptions;