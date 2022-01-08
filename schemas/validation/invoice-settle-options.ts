import {getRequiredValidationMessage} from './utils';
import {number, object, string} from 'yup';

const invoiceSettleOptions = object({
    localAmount: number().required(getRequiredValidationMessage),
    mode: string().required(getRequiredValidationMessage),
});

export default invoiceSettleOptions;