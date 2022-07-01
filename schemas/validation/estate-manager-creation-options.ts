import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const estateManagerCreationOptions = object({
    memberId: string().required(getRequiredValidationMessage),
    organizationClaimId: string().required(getRequiredValidationMessage),
});

export default estateManagerCreationOptions;