import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const paymentUpdateOptions = object({
    evidenceUrl: string().required(getRequiredValidationMessage),
});

export default paymentUpdateOptions;