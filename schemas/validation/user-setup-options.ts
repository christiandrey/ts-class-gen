import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const userSetupOptions = object({
    password: string().min(4).required(getRequiredValidationMessage),
});

export default userSetupOptions;