import {getRequiredValidationMessage} from './utils';
import {number, object} from 'yup';

const dataRangeUpdateOptions = object({
    upperValue: number().required(getRequiredValidationMessage),
});

export default dataRangeUpdateOptions;