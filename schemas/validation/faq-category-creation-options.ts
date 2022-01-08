import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const faqCategoryCreationOptions = object({
    name: string().required(getRequiredValidationMessage),
});

export default faqCategoryCreationOptions;