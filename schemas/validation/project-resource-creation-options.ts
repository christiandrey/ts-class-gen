import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const projectResourceCreationOptions = object({
    url: string().required(getRequiredValidationMessage),
});

export default projectResourceCreationOptions;