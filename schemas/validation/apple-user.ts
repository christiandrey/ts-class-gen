import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const appleUser = object({
    accessToken: string().required(getRequiredValidationMessage),
});

export default appleUser;