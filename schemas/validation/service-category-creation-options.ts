import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const serviceCategoryCreationOptions = object({
    name: string().required(getRequiredValidationMessage),
});

export default serviceCategoryCreationOptions;