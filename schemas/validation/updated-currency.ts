import {getRequiredValidationMessage} from './utils';
import {number, object} from 'yup';

const updatedCurrency = object({
    exchangeRate: number().required(getRequiredValidationMessage),
});

export default updatedCurrency;