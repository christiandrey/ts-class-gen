import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const projectCreationOptions = object({
    title: string().required(getRequiredValidationMessage),
    description: string().required(getRequiredValidationMessage),
    categoryId: string().required(getRequiredValidationMessage),
});

export default projectCreationOptions;