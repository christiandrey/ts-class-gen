import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const communityCategoryCreationOptions = object({
    name: string().required(getRequiredValidationMessage),
    color: string().required(getRequiredValidationMessage),
});

export default communityCategoryCreationOptions;