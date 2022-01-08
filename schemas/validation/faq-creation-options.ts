import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const faqCreationOptions = object({
    title: string().required(getRequiredValidationMessage),
    description: string().required(getRequiredValidationMessage),
    faqCategoryId: string().required(getRequiredValidationMessage),
});

export default faqCreationOptions;