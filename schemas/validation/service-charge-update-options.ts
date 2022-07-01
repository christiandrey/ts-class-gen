import {getRequiredValidationMessage} from './utils';
import {number, object} from 'yup';

const serviceChargeUpdateOptions = object({
    serviceChargeAmount: number().required(getRequiredValidationMessage),
});

export default serviceChargeUpdateOptions;