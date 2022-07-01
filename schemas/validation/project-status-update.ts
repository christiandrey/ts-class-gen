import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const projectStatusUpdate = object({
    status: string().required(getRequiredValidationMessage),
});

export default projectStatusUpdate;