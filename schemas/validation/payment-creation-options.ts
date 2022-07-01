import {getRequiredValidationMessage} from './utils';
import {number, object, string} from 'yup';

const paymentCreationOptions = object({
    recipientId: string().required(getRequiredValidationMessage),
    localAmount: number().required(getRequiredValidationMessage),
    mode: string().required(getRequiredValidationMessage),
});

export default paymentCreationOptions;