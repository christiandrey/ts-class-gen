import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const paymentAccountCreationOptions = object({
    name: string().required(getRequiredValidationMessage),
});

export default paymentAccountCreationOptions;