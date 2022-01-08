import {getRequiredValidationMessage} from './utils';
import {number, object, string} from 'yup';

const dataRangeCreationOptions = object({
    name: string().required(getRequiredValidationMessage),
    lowerValue: number().required(getRequiredValidationMessage),
    upperValue: number().required(getRequiredValidationMessage),
});

export default dataRangeCreationOptions;