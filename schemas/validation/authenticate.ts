import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const authenticate = object({
    username: string().required(getRequiredValidationMessage),
    password: string().required(getRequiredValidationMessage),
});

export default authenticate;