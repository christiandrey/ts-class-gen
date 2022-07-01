import {getRequiredValidationMessage} from './utils';
import {number, object} from 'yup';

const reviewOptions = object({
    stars: number().required(getRequiredValidationMessage),
});

export default reviewOptions;