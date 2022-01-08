import {getRequiredValidationMessage} from './utils';
import {number, object, string} from 'yup';

const billingItemCreationOptions = object({
    name: string().required(getRequiredValidationMessage),
    localUnitPrice: number().required(getRequiredValidationMessage),
});

export default billingItemCreationOptions;