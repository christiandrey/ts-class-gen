import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const socialUser = object({
    accessToken: string().required(getRequiredValidationMessage),
});

export default socialUser;