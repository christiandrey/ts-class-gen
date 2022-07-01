import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const bankAccountCreationOptions = object({
    accountName: string().required(getRequiredValidationMessage),
    accountNumber: string().required(getRequiredValidationMessage),
    bankName: string().required(getRequiredValidationMessage),
    bankCode: string().required(getRequiredValidationMessage),
});

export default bankAccountCreationOptions;