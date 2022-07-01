import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const apartmentCreationOptions = object({
    label: string().required(getRequiredValidationMessage),
    typeId: string().required(getRequiredValidationMessage),
});

export default apartmentCreationOptions;