import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const memberRoleTypeUpdateOptions = object({
    role: string().required(getRequiredValidationMessage),
});

export default memberRoleTypeUpdateOptions;