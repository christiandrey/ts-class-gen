import {getRequiredValidationMessage} from './utils';
import {number, object, string} from 'yup';

const commissionUpdateOptions = object({
    commissionType: string().required(getRequiredValidationMessage),
    commission: number().required(getRequiredValidationMessage),
});

export default commissionUpdateOptions;