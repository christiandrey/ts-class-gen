import {getRequiredValidationMessage} from './utils';
import {boolean, object} from 'yup';

const role = object({
    accessAdmin: boolean().required(getRequiredValidationMessage),
    accessSupport: boolean().required(getRequiredValidationMessage),
    createUser: boolean().required(getRequiredValidationMessage),
    createRole: boolean().required(getRequiredValidationMessage),
});

export default role;