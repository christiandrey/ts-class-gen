import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const verifyPhone = object({
    phoneNumber: string().required(getRequiredValidationMessage),
    code: string().required(getRequiredValidationMessage),
});

export default verifyPhone;