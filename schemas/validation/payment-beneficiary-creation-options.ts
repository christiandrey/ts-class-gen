import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const paymentBeneficiaryCreationOptions = object({
    accountName: string().required(getRequiredValidationMessage),
    accountNumber: string().required(getRequiredValidationMessage),
    bankName: string().required(getRequiredValidationMessage),
    bankCode: string().required(getRequiredValidationMessage),
});

export default paymentBeneficiaryCreationOptions;