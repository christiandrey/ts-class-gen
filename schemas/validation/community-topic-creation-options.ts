import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const communityTopicCreationOptions = object({
    name: string().required(getRequiredValidationMessage),
    description: string().required(getRequiredValidationMessage),
    categoryId: string().required(getRequiredValidationMessage),
    estateId: string().required(getRequiredValidationMessage),
});

export default communityTopicCreationOptions;