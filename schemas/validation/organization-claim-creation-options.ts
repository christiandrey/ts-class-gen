import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const organizationClaimCreationOptions = object({
    name: string().required(getRequiredValidationMessage),
});

export default organizationClaimCreationOptions;